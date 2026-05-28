/**
 * withModularHeaders.js
 *
 * Applies Podfile patches required to build @react-native-firebase
 * (app + auth + firestore) v24 with Expo managed workflow on modern
 * Xcode + arm64.
 *
 * 1. use_frameworks! :linkage => :static
 *    Firebase iOS SDK 12.x (RNFB v24) contains Swift code in FirebaseAuth.
 *    In a static-library CocoaPods setup (use_modular_headers! only), the
 *    Swift compiler puts the generated ObjC interface header
 *    (FirebaseAuth-Swift.h) in a per-target derived-sources directory that
 *    is invisible to other pods at compile time. Building as static
 *    frameworks copies that header into the framework's Headers/ directory,
 *    making `#import <FirebaseAuth/FirebaseAuth-Swift.h>` resolve correctly
 *    in RNFBAuth, RNFBFirestore, and RNFBApp.
 *
 * 2. pre_install: gRPC pods -> static_library
 *    gRPC-Core, gRPC-C++, and BoringSSL-GRPC cannot be compiled as
 *    frameworks. A pre_install hook monkey-patches their build_type back
 *    to Pod::BuildType.static_library, opting them out of use_frameworks!.
 *
 * 3. post_install: strip BoringSSL-GRPC -GCC_WARN_INHIBIT_ALL_WARNINGS
 *    Apple Clang parses this flag as -G, which is unsupported on arm64.
 *    Strip it from per-file COMPILER_FLAGS in the BoringSSL-GRPC target.
 *
 * NOTE on C++ standard:
 *   We deliberately do NOT override CLANG_CXX_LANGUAGE_STANDARD here.
 *   With Firebase iOS SDK 12.x (RNFB v24) the bundled abseil is modern
 *   and aligns with RN 0.85's C++20 requirement. Touching it from here
 *   creates the C++17 vs C++20 conflict we saw with Firebase 10.7.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs   = require('fs');
const path = require('path');

// ── Patch 1 ──────────────────────────────────────────────────────────────────
const FRAMEWORKS_MARKER = '# [withModularHeaders] use_frameworks';

// ── Patch 2 ──────────────────────────────────────────────────────────────────
const PRE_INSTALL_MARKER = '# [withModularHeaders] pre_install gRPC';
const PRE_INSTALL_SNIPPET = `
${PRE_INSTALL_MARKER}
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if %w[gRPC-Core gRPC-C++ BoringSSL-GRPC].include?(pod.name)
      def pod.build_type
        Pod::BuildType.static_library
      end
    end
  end
end
`;

// ── Patch 3 ──────────────────────────────────────────────────────────────────
const BORING_MARKER = '# [withModularHeaders] BoringSSL-GRPC -GCC_WARN fix';
const BORING_SNIPPET = `
  ${BORING_MARKER}
  boringssl = installer.pods_project.targets.find { |t| t.name == 'BoringSSL-GRPC' }
  if boringssl
    boringssl.source_build_phase.files.each do |file|
      if file.settings && file.settings['COMPILER_FLAGS']
        flags = file.settings['COMPILER_FLAGS'].split
        flags.reject! { |f| f.start_with?('-GCC_WARN') }
        file.settings['COMPILER_FLAGS'] = flags.join(' ')
      end
    end
  end`;

/**
 * Find the insertion point just before the closing `end` of the
 * post_install block by matching the opening line's indent.
 */
function findPostInstallInsertPoint(contents) {
  const postInstallRe = /^([ \t]*)post_install do \|[^|]*\|[ \t]*$/m;
  const match = postInstallRe.exec(contents);
  if (!match) return -1;

  const indent = match[1];
  const blockStart = match.index + match[0].length;

  const closingEndRe = new RegExp(
    '(\\n' + escapeRegex(indent) + 'end[ \\t]*(?:\\n|$))',
  );

  const afterBlock = contents.slice(blockStart);
  const endMatch = closingEndRe.exec(afterBlock);
  if (!endMatch) return -1;

  return blockStart + endMatch.index + 1;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = function withModularHeaders(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      if (!fs.existsSync(podfilePath)) return config;

      let contents = fs.readFileSync(podfilePath, 'utf8');

      // ── 1. use_frameworks! :linkage => :static after the platform line ───────
      // Remove any legacy use_modular_headers! left by older versions of this plugin.
      contents = contents.replace(/\nuse_modular_headers!\n?/g, '\n');

      if (!contents.includes(FRAMEWORKS_MARKER)) {
        contents = contents.replace(
          /(^platform :ios.+$)/m,
          `$1\n${FRAMEWORKS_MARKER}\nuse_frameworks! :linkage => :static`,
        );
      }

      // ── 2. pre_install hook before the first target block ────────────────────
      if (!contents.includes(PRE_INSTALL_MARKER)) {
        contents = contents.replace(
          /(\ntarget\s+['"][^'"]+['"]\s+do\s*\n)/,
          `\n${PRE_INSTALL_SNIPPET}$1`,
        );
      }

      // ── 3. BoringSSL-GRPC -GCC_WARN strip in post_install ───────────────────
      if (!contents.includes(BORING_MARKER)) {
        const insertPos = findPostInstallInsertPoint(contents);
        if (insertPos !== -1) {
          contents =
            contents.slice(0, insertPos) +
            BORING_SNIPPET + '\n' +
            contents.slice(insertPos);
        } else {
          // Fallback: inject right after react_native_post_install(...)
          const rnCall = 'react_native_post_install(';
          const rnIdx  = contents.lastIndexOf(rnCall);
          if (rnIdx !== -1) {
            let depth = 1;
            let i = rnIdx + rnCall.length;
            while (i < contents.length && depth > 0) {
              if (contents[i] === '(') depth++;
              else if (contents[i] === ')') depth--;
              i++;
            }
            const eol = contents.indexOf('\n', i - 1);
            const pos = eol !== -1 ? eol + 1 : i;
            contents = contents.slice(0, pos) + BORING_SNIPPET + '\n' + contents.slice(pos);
          }
        }
      }

      fs.writeFileSync(podfilePath, contents, 'utf8');
      return config;
    },
  ]);
};

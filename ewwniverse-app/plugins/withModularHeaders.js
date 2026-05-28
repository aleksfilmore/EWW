/**
 * withModularHeaders.js
 *
 * Applies Podfile patches required to build @react-native-firebase
 * (app + auth + firestore) v24 with Expo managed workflow on modern
 * Xcode + arm64.
 *
 * 1. use_modular_headers! — Firebase Swift pods need GoogleUtilities
 *    to define modules.
 *
 * 2. gRPC pod opt-outs — gRPC-Core / BoringSSL-GRPC / gRPC-C++ cannot
 *    build with modular headers; opt them back out.
 *
 * 3. BoringSSL-GRPC -GCC_WARN_INHIBIT_ALL_WARNINGS flag — Apple Clang
 *    parses this as the -G flag, which is unsupported on arm64 targets.
 *    Strip it from per-file COMPILER_FLAGS in the BoringSSL-GRPC target.
 *
 * NOTE on C++ standard:
 *   We deliberately do NOT override CLANG_CXX_LANGUAGE_STANDARD here.
 *   With Firebase iOS SDK 12.10 (pulled by RNFB v24) the bundled
 *   abseil is modern and aligns with RN 0.85's C++20 requirement.
 *   Every relevant podspec (React-*, Expo*, Reanimated, Firebase 12)
 *   sets its own standard via pod_target_xcconfig. Touching it from
 *   here just creates the C++17 ↔ C++20 conflict we saw with
 *   Firebase 10.7 — leave each pod alone.
 *
 * Injection strategy for (3):
 *   Find `post_install do |installer|` and its closing `end` by
 *   matching the indent. Snippet runs after react_native_post_install
 *   so our settings are final.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs   = require('fs');
const path = require('path');

// ── Patch 2: pod-level opt-outs injected right after use_expo_modules! ───────
const GRPC_OVERRIDES = [
  "  pod 'BoringSSL-GRPC',  :modular_headers => false",
  "  pod 'gRPC-Core',       :modular_headers => false",
  "  pod 'gRPC-C++',        :modular_headers => false",
].join('\n');
const GRPC_MARKER = '# [withModularHeaders] gRPC overrides';

// ── Patch 3 ─────────────────────────────────────────────────────────────────
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
 * Find the insertion point right before the closing `end` of the
 * post_install block, by indent-matching `post_install do |installer|`
 * to its closing end. Format-agnostic: works whether post_install is
 * nested in the target block or at the top level, and regardless of
 * how react_native_post_install is called.
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

      // ── 1. Global use_modular_headers! after the platform line ───────────────
      if (!contents.includes('use_modular_headers!')) {
        contents = contents.replace(
          /(^platform :ios.+$)/m,
          '$1\nuse_modular_headers!'
        );
      }

      // ── 2. Per-pod opt-outs right after use_expo_modules! ────────────────────
      if (!contents.includes(GRPC_MARKER)) {
        contents = contents.replace(
          /([ \t]*use_expo_modules!)/,
          `$1\n\n${GRPC_MARKER}\n${GRPC_OVERRIDES}`
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
          // Fallback: balanced-paren scan from react_native_post_install(
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

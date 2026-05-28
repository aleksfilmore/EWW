/**
 * withModularHeaders.js
 *
 * Applies all Podfile patches required to build @react-native-firebase
 * (app + auth + firestore) with Expo managed workflow on modern Xcode:
 *
 * 1. use_modular_headers! — Firebase Swift pods need GoogleUtilities to
 *    define modules.
 *
 * 2. gRPC pod opt-outs — gRPC-Core / BoringSSL-GRPC / gRPC-C++ cannot
 *    build with modular headers; opt them back out.
 *
 * 3. C++17 standard — Abseil (absl) aliases make_unique to std::make_unique
 *    only when compiled with C++14+. Without this setting pods default to
 *    C++11, where std::make_unique does not exist.
 *
 * 4. BoringSSL-GRPC -GCC_WARN_INHIBIT_ALL_WARNINGS flag — Apple Clang
 *    parses this as the -G flag, which is unsupported on arm64 targets.
 *    Strip it from per-file COMPILER_FLAGS in the BoringSSL-GRPC target.
 *
 * Injection strategy for (3) & (4):
 *   We inject our Ruby code immediately AFTER the line containing
 *   react_native_post_install(installer). This anchor is:
 *     - Always present in Expo-generated Podfiles
 *     - Always inside the post_install block (installer is in scope)
 *     - Format-agnostic: works whether post_install is nested inside
 *       the target block or defined at the top level
 *   This avoids the lastIndexOf('\nend') pitfall where — when post_install
 *   is nested inside the target block — the wrong `end` is found and the
 *   snippets land outside post_install where `installer` is not in scope.
 *
 * C++17 loop uses installer.pods_project.targets (available in all
 * CocoaPods versions) rather than installer.generated_projects (1.10+).
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

// ── Patches 3 & 4: anchor — guaranteed inside post_install ───────────────────
// Match the start of the call so variations like
//   react_native_post_install(installer, :mac_catalyst_enabled => false)
// are also handled.
const RN_POST_INSTALL_ANCHOR = 'react_native_post_install(installer';

const CXX_MARKER    = '# [withModularHeaders] C++17';
const BORING_MARKER = '# [withModularHeaders] BoringSSL-GRPC -GCC_WARN fix';

const CXX_SNIPPET = `
  ${CXX_MARKER}
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |cfg|
      cfg.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'
    end
  end`;

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

      // ── 3 & 4. Inject right after react_native_post_install(installer...) ────
      // Using this anchor guarantees installer is in scope, regardless of
      // whether post_install is nested inside the target block or top-level.
      let snippets = '';
      if (!contents.includes(CXX_MARKER))    snippets += CXX_SNIPPET;
      if (!contents.includes(BORING_MARKER)) snippets += '\n' + BORING_SNIPPET;

      if (snippets) {
        const anchorIdx = contents.lastIndexOf(RN_POST_INSTALL_ANCHOR);
        if (anchorIdx !== -1) {
          // Advance to the end of the anchor line, then insert after it.
          const endOfLine = contents.indexOf('\n', anchorIdx);
          const insertPos = endOfLine !== -1 ? endOfLine + 1 : anchorIdx + RN_POST_INSTALL_ANCHOR.length;
          contents =
            contents.slice(0, insertPos) +
            snippets + '\n' +
            contents.slice(insertPos);
        }
      }

      fs.writeFileSync(podfilePath, contents, 'utf8');
      return config;
    },
  ]);
};

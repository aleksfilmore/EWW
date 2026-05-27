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
 * 3. C++17 standard — Abseil removed absl::make_unique; requires C++17.
 *
 * 4. BoringSSL-GRPC -G flag — Apple Clang rejects the bare '-G' compiler
 *    flag on arm64 targets. Strip it from BoringSSL-GRPC source file flags.
 *
 * The Podfile is regenerated every EAS build, so all patches must be
 * applied via a config plugin.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

// Pods that cannot build with modular headers enabled
const GRPC_OVERRIDES = [
  "  pod 'BoringSSL-GRPC',  :modular_headers => false",
  "  pod 'gRPC-Core',       :modular_headers => false",
  "  pod 'gRPC-C++',        :modular_headers => false",
].join('\n');

const GRPC_MARKER  = '# [withModularHeaders] gRPC overrides';
const CXX_MARKER   = '# [withModularHeaders] C++17';
const BORING_MARKER = '# [withModularHeaders] BoringSSL-GRPC -G fix';

module.exports = function withModularHeaders(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      if (!fs.existsSync(podfilePath)) return config;

      let contents = fs.readFileSync(podfilePath, 'utf8');

      // ── 1. Global use_modular_headers! ────────────────────────────────────────
      if (!contents.includes('use_modular_headers!')) {
        contents = contents.replace(
          /(^platform :ios.+$)/m,
          '$1\nuse_modular_headers!'
        );
      }

      // ── 2. Per-pod opt-outs for gRPC pods ────────────────────────────────────
      if (!contents.includes(GRPC_MARKER)) {
        contents = contents.replace(
          /([ \t]*use_expo_modules!)/,
          `$1\n\n${GRPC_MARKER}\n${GRPC_OVERRIDES}`
        );
      }

      // ── 3 & 4. Inject into existing post_install block ───────────────────────
      // CocoaPods forbids multiple post_install blocks — inject into Expo's.
      const POST_INSTALL_SNIPPETS = [];

      if (!contents.includes(CXX_MARKER)) {
        POST_INSTALL_SNIPPETS.push([
          `  ${CXX_MARKER}`,
          '  installer.pods_project.targets.each do |target|',
          '    target.build_configurations.each do |cfg|',
          "      cfg.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'",
          '    end',
          '  end',
        ].join('\n'));
      }

      if (!contents.includes(BORING_MARKER)) {
        POST_INSTALL_SNIPPETS.push([
          `  ${BORING_MARKER}`,
          "  boringssl = installer.pods_project.targets.find { |t| t.name == 'BoringSSL-GRPC' }",
          '  if boringssl',
          '    boringssl.source_build_phase.files.each do |file|',
          '      if file.settings && file.settings[\'COMPILER_FLAGS\']',
          '        flags = file.settings[\'COMPILER_FLAGS\'].split',
          "        flags.reject! { |f| f == '-G' }",
          "        file.settings['COMPILER_FLAGS'] = flags.join(' ')",
          '      end',
          '    end',
          '  end',
        ].join('\n'));
      }

      if (POST_INSTALL_SNIPPETS.length > 0) {
        contents = contents.replace(
          /(post_install do \|installer\|)/,
          `$1\n${POST_INSTALL_SNIPPETS.join('\n\n')}`
        );
      }

      fs.writeFileSync(podfilePath, contents, 'utf8');
      return config;
    },
  ]);
};

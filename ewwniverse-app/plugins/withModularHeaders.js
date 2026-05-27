/**
 * withModularHeaders.js
 *
 * Applies three Podfile patches required to build @react-native-firebase
 * with Firestore on Expo managed workflow:
 *
 * 1. use_modular_headers! — Firebase Swift pods (FirebaseCoreInternal) need
 *    GoogleUtilities to define modules; this enables that globally.
 *
 * 2. gRPC pod opt-outs — gRPC-Core / BoringSSL-GRPC / gRPC-C++ (used by
 *    Firestore) cannot build with modular headers. Re-declared with
 *    :modular_headers => false to override the global flag.
 *
 * 3. C++17 post_install hook — Abseil (absl) removed make_unique in newer
 *    releases; it requires C++17. Without this the Xcode build fails with
 *    "no template named 'make_unique' in namespace 'absl'".
 *
 * The Podfile is regenerated every EAS build so all patches must be applied
 * via a config plugin.
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

const GRPC_MARKER = '# [withModularHeaders] gRPC overrides';

module.exports = function withModularHeaders(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      if (!fs.existsSync(podfilePath)) return config;

      let contents = fs.readFileSync(podfilePath, 'utf8');

      // ── 1. Add global use_modular_headers! after the platform line ──────────
      if (!contents.includes('use_modular_headers!')) {
        contents = contents.replace(
          /(^platform :ios.+$)/m,
          '$1\nuse_modular_headers!'
        );
      }

      // ── 2. Inject per-pod opt-outs inside the app target ────────────────────
      if (!contents.includes(GRPC_MARKER)) {
        // Insert right after `use_expo_modules!` which is always in the target block
        contents = contents.replace(
          /([ \t]*use_expo_modules!)/,
          `$1\n\n${GRPC_MARKER}\n${GRPC_OVERRIDES}`
        );
      }

      // ── 3. Add C++17 post_install hook for Abseil / absl::make_unique ────────
      const CXX_MARKER = '# [withModularHeaders] C++17';
      if (!contents.includes(CXX_MARKER)) {
        contents += `
${CXX_MARKER}
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'
    end
  end
end
`;
      }

      fs.writeFileSync(podfilePath, contents, 'utf8');
      return config;
    },
  ]);
};

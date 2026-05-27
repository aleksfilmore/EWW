/**
 * withModularHeaders.js
 *
 * Firebase (Swift) requires `use_modular_headers!` so that GoogleUtilities
 * and FirebaseCoreInternal generate module maps.  However, that flag breaks
 * gRPC-Core / BoringSSL-GRPC / gRPC-C++ (used by Firestore) because those
 * pods don't support modular headers.
 *
 * Fix: enable modular headers globally, then explicitly opt-out the three
 * gRPC pods by re-declaring them with `:modular_headers => false` inside
 * the main app target.
 *
 * The Podfile is regenerated every EAS build so this must be a plugin.
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

      fs.writeFileSync(podfilePath, contents, 'utf8');
      return config;
    },
  ]);
};

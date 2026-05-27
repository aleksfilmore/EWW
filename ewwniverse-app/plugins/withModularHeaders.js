/**
 * withModularHeaders.js
 *
 * Adds `use_modular_headers!` to the generated iOS Podfile.
 *
 * Required because FirebaseCoreInternal (Swift) depends on GoogleUtilities,
 * which doesn't define modules. Without this directive CocoaPods cannot
 * build Firebase as a static library and pod install fails with:
 *   "The Swift pod `FirebaseCoreInternal` depends upon `GoogleUtilities`,
 *    which does not define modules."
 *
 * The Podfile is re-generated every EAS build during `expo prebuild`, so
 * this must be applied as a config plugin rather than editing the file directly.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withModularHeaders(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');

      if (!fs.existsSync(podfilePath)) return config; // nothing to do yet

      let contents = fs.readFileSync(podfilePath, 'utf8');

      if (contents.includes('use_modular_headers!')) return config; // already patched

      // Insert after the `platform :ios, ...` line — the first place Ruby
      // will accept a top-level directive.
      const patched = contents.replace(
        /(^platform :ios.+$)/m,
        '$1\nuse_modular_headers!'
      );

      if (patched === contents) {
        // Fallback: prepend to file if platform line wasn't found
        fs.writeFileSync(podfilePath, 'use_modular_headers!\n' + contents, 'utf8');
      } else {
        fs.writeFileSync(podfilePath, patched, 'utf8');
      }

      return config;
    },
  ]);
};

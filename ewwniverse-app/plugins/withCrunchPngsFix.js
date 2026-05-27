/**
 * Config plugin: disable AAPT2 PNG crunching for release builds.
 *
 * AAPT2 chokes on PNGs with embedded ICC color profiles or non-standard
 * metadata (common with art/illustration assets exported from Photoshop /
 * Illustrator). Setting crunchPngs false tells Gradle to skip the
 * re-compression step so the images are packaged as-is.
 *
 * This has zero impact on runtime quality — Android simply stores the
 * original PNG bytes rather than a re-compressed version.
 */
const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withCrunchPngsFix(config) {
  return withAppBuildGradle(config, (config) => {
    const contents = config.modResults.contents;

    // Idempotent — don't double-inject
    if (contents.includes('crunchPngs false')) return config;

    // Insert after "release {" inside buildTypes
    config.modResults.contents = contents.replace(
      /(\s*release\s*\{)/,
      '$1\n            crunchPngs false'
    );

    return config;
  });
};

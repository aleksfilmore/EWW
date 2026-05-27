/**
 * withRecaptchaUpgrade.js
 *
 * Forces com.google.android.recaptcha:recaptcha to 18.4.0+ across the entire
 * Gradle dependency tree. The transitive 18.0.1 version (brought in by
 * @react-native-firebase/auth) is flagged as deprecated with a critical
 * security vulnerability.
 *
 * Play Console enforces removal within 90 days of submission; this plugin
 * ensures every future build ships the patched version.
 */
const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function withRecaptchaUpgrade(config) {
  return withProjectBuildGradle(config, (config) => {
    const contents = config.modResults.contents;

    // Idempotent guard
    if (contents.includes('recaptcha:recaptcha')) return config;

    // Inject a resolution strategy inside the allprojects block so every
    // sub-project (app + modules) honours it.
    const resolutionBlock = `
    // Force reCAPTCHA Enterprise to patched version (CVE fix, Play Console requirement)
    configurations.all {
        resolutionStrategy {
            force 'com.google.android.recaptcha:recaptcha:18.4.0'
        }
    }`;

    // Insert just before the closing brace of allprojects { repositories { ... } }
    // Fallback: append before the last closing brace of the file.
    if (contents.includes('allprojects {')) {
      config.modResults.contents = contents.replace(
        /allprojects\s*\{/,
        `allprojects {${resolutionBlock}\n`
      );
    } else {
      // No allprojects block — append at end
      config.modResults.contents = contents + `\nallprojects {${resolutionBlock}\n}\n`;
    }

    return config;
  });
};

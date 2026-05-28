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
 *   CocoaPods only allows one post_install block (Expo already has one).
 *   We inject our Ruby code immediately before the closing `end` of that
 *   block using lastIndexOf — format-agnostic and always runs AFTER
 *   react_native_post_install, so our settings are never overridden.
 *
 * The Podfile is regenerated every EAS build, so all patches must be
 * applied via a config plugin.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs   = require('fs');
const path = require('path');

// ── Patch 2: pod-level opt-outs injected inside the target block ─────────────
const GRPC_OVERRIDES = [
  "  pod 'BoringSSL-GRPC',  :modular_headers => false",
  "  pod 'gRPC-Core',       :modular_headers => false",
  "  pod 'gRPC-C++',        :modular_headers => false",
].join('\n');
const GRPC_MARKER = '# [withModularHeaders] gRPC overrides';

// ── Patches 3 & 4: injected before the closing `end` of post_install ─────────
// Uses installer.generated_projects (modern CocoaPods API, broader coverage).
const CXX_MARKER    = '# [withModularHeaders] C++17';
const BORING_MARKER = '# [withModularHeaders] BoringSSL-GRPC -GCC_WARN fix';

const CXX_SNIPPET = `
  ${CXX_MARKER}
  installer.generated_projects.each do |project|
    project.targets.each do |target|
      target.build_configurations.each do |cfg|
        cfg.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'
      end
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

      // ── 3 & 4. Inject before the closing `end` of the post_install block ─────
      // lastIndexOf('\nend') finds the `end` that closes `post_install do`.
      // Our snippets run after react_native_post_install so they're final.
      let snippets = '';
      if (!contents.includes(CXX_MARKER))    snippets += CXX_SNIPPET;
      if (!contents.includes(BORING_MARKER)) snippets += '\n' + BORING_SNIPPET;

      if (snippets) {
        const lastEnd = contents.lastIndexOf('\nend');
        if (lastEnd !== -1) {
          contents = contents.slice(0, lastEnd) + snippets + '\n' + contents.slice(lastEnd);
        }
      }

      fs.writeFileSync(podfilePath, contents, 'utf8');
      return config;
    },
  ]);
};

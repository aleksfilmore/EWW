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
 * 3. Per-target C++ standard — There's a fundamental conflict in this
 *    dependency set:
 *      • React Native 0.85 (Fabric / Hermes / codegen) requires C++20
 *        — uses `concept`, std::identity, std::bit_width. RN pods set
 *        this via pod_target_xcconfig.
 *      • Firebase iOS SDK 10.7's bundled abseil only defines
 *        `absl::make_unique` (as `using std::make_unique`) for
 *        C++14 / C++17. Under C++20 the conditional is omitted, so
 *        any Firestore C++ source that calls absl::make_unique fails
 *        with "no template named 'make_unique' in namespace 'absl'".
 *    So we set C++17 explicitly only on the Firebase/abseil/gRPC
 *    chain, and we DO NOT touch RN/Expo/Reanimated pods — their
 *    xcconfig sets C++20 and that's what we want them to use.
 *    CocoaPods build_settings only override xcconfig when set, so
 *    leaving them unset for RN targets preserves their C++20.
 *
 * 4. BoringSSL-GRPC -GCC_WARN_INHIBIT_ALL_WARNINGS flag — Apple Clang
 *    parses this as the -G flag, which is unsupported on arm64 targets.
 *    Strip it from per-file COMPILER_FLAGS in the BoringSSL-GRPC target.
 *
 * Injection strategy for (3) & (4):
 *   We find `post_install do |installer|` and record its indentation.
 *   We then find the FIRST line at that exact indent level that is just
 *   `end` — this is the block's closing end, regardless of whether
 *   post_install is nested inside a target block or at the file's top
 *   level, and regardless of how react_native_post_install is called
 *   (single-line or multi-line with indented arguments).
 *   Snippets are injected immediately before the closing end so they
 *   run AFTER react_native_post_install (ensuring our settings are not
 *   overridden by it).
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

// ── Patches 3 & 4 ─────────────────────────────────────────────────────────────
const CXX_MARKER    = '# [withModularHeaders] C++17 for Firebase/abseil/gRPC chain only';
const BORING_MARKER = '# [withModularHeaders] BoringSSL-GRPC -GCC_WARN fix';

// We target only the Firebase iOS SDK 10.7 dependency chain. RN/Expo/
// Reanimated pods set C++20 in their podspec and we don't touch them.
const CXX_SNIPPET = `
  ${CXX_MARKER}
  cxx17_prefixes = ['abseil', 'BoringSSL', 'gRPC', 'Firebase', 'leveldb-library', 'nanopb']
  installer.pods_project.targets.each do |target|
    next unless cxx17_prefixes.any? { |p| target.name.start_with?(p) }
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

/**
 * Find the character position right before the closing `end` of the
 * post_install block, so we can insert our snippets there.
 *
 * Strategy: locate `post_install do |installer|`, note its leading
 * indentation, then scan forward for the FIRST line whose only content
 * at that indent level is `end` — that is the block-closing end.
 *
 * This is format-agnostic: works whether post_install is nested inside
 * the target block (indent = '  ') or at the file top-level (indent = '').
 * It also doesn't care how react_native_post_install is called.
 *
 * Returns the character index at which to insert, or -1 if not found.
 */
function findPostInstallInsertPoint(contents) {
  // Match `post_install do |installer|` with any leading whitespace
  // and any variable name (|installer|, |inst|, etc.)
  const postInstallRe = /^([ \t]*)post_install do \|[^|]*\|[ \t]*$/m;
  const match = postInstallRe.exec(contents);
  if (!match) return -1;

  const indent = match[1];                  // e.g. '' or '  '
  const blockStart = match.index + match[0].length; // char after the matched line

  // Build a regex that matches a line whose entire content is `{indent}end`
  // We use a RegExp because indent may be an empty string.
  const closingEndRe = new RegExp(
    '(\\n' + escapeRegex(indent) + 'end[ \\t]*(?:\\n|$))',
    // No 'm' flag — we search in the slice after blockStart
  );

  const afterBlock = contents.slice(blockStart);
  const endMatch = closingEndRe.exec(afterBlock);
  if (!endMatch) return -1;

  // endMatch.index is the position of the \n before `end`.
  // We want to insert right BEFORE that \n (i.e. on the last line of the
  // block's body), so our snippets are inside the block.
  return blockStart + endMatch.index + 1; // +1 to step past the \n → insert at start of 'end' line?
  // Actually: insert AT the \n so our text goes between body and `end`.
  // i.e. return blockStart + endMatch.index + 1 inserts before the `end` line.
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

      // ── 3 & 4. Inject before the closing `end` of the post_install block ─────
      let snippets = '';
      if (!contents.includes(CXX_MARKER))    snippets += CXX_SNIPPET;
      if (!contents.includes(BORING_MARKER)) snippets += '\n' + BORING_SNIPPET;

      if (snippets) {
        const insertPos = findPostInstallInsertPoint(contents);
        if (insertPos !== -1) {
          contents =
            contents.slice(0, insertPos) +
            snippets + '\n' +
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
            contents = contents.slice(0, pos) + snippets + '\n' + contents.slice(pos);
          }
        }
      }

      fs.writeFileSync(podfilePath, contents, 'utf8');
      return config;
    },
  ]);
};

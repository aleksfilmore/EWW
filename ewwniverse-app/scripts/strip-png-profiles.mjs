/**
 * strip-png-profiles.mjs
 *
 * Strips embedded ICC color profiles from all PNG files under assets/.
 * AAPT2 (Android resource packager) chokes on PNGs with non-sRGB color
 * profiles (wide-gamut, AdobeRGB, P3, etc.), causing "file failed to
 * compile" errors during mergeReleaseResources.
 *
 * sharp re-encodes each PNG as sRGB without an embedded profile.
 * Visually identical on standard device displays.
 *
 * Usage:  node scripts/strip-png-profiles.mjs
 */

import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

async function* walkPngs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkPngs(full);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      yield full;
    }
  }
}

let fixed = 0;
let skipped = 0;
let errors = 0;

for await (const file of walkPngs(ASSETS_DIR)) {
  try {
    const img = sharp(file);
    const meta = await img.metadata();

    // Re-encode: strip embedded profile, convert to sRGB
    // sharp automatically applies the profile during decode then removes it on encode
    // NOT calling .withMetadata() → sharp strips all embedded metadata
    // (including ICC color profiles) by default during re-encode.
    // The ICC transform is applied internally during decode, so colors
    // are preserved as sRGB — the embedded chunk is just removed.
    const buf = await img
      .png({ compressionLevel: 6 })
      .toBuffer();

    const original = await fs.readFile(file);
    if (buf.length !== original.length || !buf.equals(original)) {
      await fs.writeFile(file, buf);
      console.log(`✓ stripped: ${path.relative(ASSETS_DIR, file)}  (${meta.icc ? 'had ICC' : 'reencoded'})`);
      fixed++;
    } else {
      skipped++;
    }
  } catch (err) {
    console.error(`✗ error: ${path.relative(ASSETS_DIR, file)} — ${err.message}`);
    errors++;
  }
}

console.log(`\nDone. Fixed: ${fixed}  Unchanged: ${skipped}  Errors: ${errors}`);

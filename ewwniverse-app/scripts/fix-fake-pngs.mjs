/**
 * fix-fake-pngs.mjs
 *
 * Some asset files have a .png extension but contain JPEG data (FFD8FF header).
 * Android's AAPT2 correctly rejects them with "file failed to compile" because
 * they are not valid PNG files.
 *
 * This script finds every such file and re-encodes it as a real PNG.
 * Colors are preserved. File sizes will increase (JPEG→PNG) but the build
 * will succeed and all image references in the code remain unchanged.
 *
 * Usage:  node scripts/fix-fake-pngs.mjs
 */

import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);

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

async function isJpegData(filePath) {
  const fd = await fs.open(filePath, 'r');
  const buf = Buffer.alloc(3);
  await fd.read(buf, 0, 3, 0);
  await fd.close();
  return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

let converted = 0;
let skipped = 0;
let errors = 0;

for await (const file of walkPngs(ASSETS_DIR)) {
  try {
    if (!(await isJpegData(file))) {
      skipped++;
      continue;
    }

    const relPath = path.relative(ASSETS_DIR, file);

    // Read into memory first — sharp can have issues with OneDrive-synced
    // file paths on Windows. Passing a Buffer avoids the path open issue.
    const inputBuf = await fs.readFile(file);
    const pngBuf = await sharp(inputBuf)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    await fs.writeFile(file, pngBuf);
    const kb = (pngBuf.length / 1024).toFixed(0);
    console.log(`✓ converted: ${relPath}  (${kb} KB)`);
    converted++;
  } catch (err) {
    const relPath = path.relative(ASSETS_DIR, file);
    console.error(`✗ error: ${relPath} — ${err.message}`);
    errors++;
  }
}

console.log(`\nDone. Converted: ${converted}  Already PNG: ${skipped}  Errors: ${errors}`);
if (errors > 0) process.exit(1);

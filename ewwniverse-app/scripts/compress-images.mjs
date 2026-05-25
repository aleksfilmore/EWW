/**
 * compress-images.mjs
 *
 * One-time script to compress ALL oversized images in the assets/ folder.
 *
 * Two categories handled separately:
 *
 *   1. Creature photos (dinosaurs/ + earth/ + special/): JPEG at 900×900px, quality 82
 *      These are photographic images displayed full-width on mobile.
 *      Expected: 265MB → ~30MB
 *
 *   2. UI illustrations (root assets/ PNGs): PNG, resized to 1200px max
 *      These are illustrated transparent PNGs used as UI elements — jars, badges,
 *      icons, stamps, etc. They are displayed at 20–400px on screen but stored
 *      at 1000-2000px. Lossless PNG optimisation + sensible resize is safe.
 *      Expected: ~70MB → ~8MB
 *
 * Originals are backed up to assets/_originals/ before being overwritten.
 * Run ONCE before the next full EAS build. Check visuals after running.
 *
 * Usage:
 *   npm install --save-dev sharp   (one-time)
 *   node scripts/compress-images.mjs
 */

import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');

let sharp;
try {
  const require = createRequire(import.meta.url);
  sharp = require('sharp');
} catch {
  console.error('\n❌  sharp not installed. Run:\n\n    npm install --save-dev sharp\n');
  process.exit(1);
}

const ORIGINALS_DIR = path.join(ROOT, 'assets', '_originals');

// ── Config per directory ───────────────────────────────────────────────────────

const JOBS = [
  // Photo images: JPEG creatures. Display size up to ~full screen width.
  {
    dir:     path.join(ROOT, 'assets', 'creatures', 'dinosaurs'),
    maxSize: 900,
    quality: 82,
    label:   'Dinosaur photos',
  },
  {
    dir:     path.join(ROOT, 'assets', 'creatures', 'earth'),
    maxSize: 900,
    quality: 82,
    label:   'Earth photos',
  },
  {
    dir:     path.join(ROOT, 'assets', 'creatures', 'special'),
    maxSize: 900,
    quality: 82,
    label:   'Special specimen photos',
  },
  // UI illustration PNGs: jars, badges, stamps, icons. Keep as PNG (transparency).
  // Max 1200px — safe for @3x displays up to 400px logical width.
  {
    dir:     path.join(ROOT, 'assets', 'creatures'),
    maxSize: 900,
    quality: 82,
    label:   'Creature illustration PNGs (CC)',
    shallow: true,   // don't recurse into subdirectories
  },
  {
    dir:         path.join(ROOT, 'assets'),
    maxSize:     1200,
    quality:     90,
    label:       'UI illustrations (root assets)',
    shallow:     true,
    skipPatterns: [
      // These must stay full-resolution (Android adaptive icon, splash)
      /^icon\.png$/,
      /^splash\.png$/,
      /^splash-icon\.png$/,
      /^android-icon/,
      /^favicon\.png$/,
    ],
  },
];

// ── Core compress function ─────────────────────────────────────────────────────

async function compressFile(src, backupBase, maxSize, quality) {
  // Mirror path under _originals/
  const rel    = path.relative(path.join(ROOT, 'assets'), src);
  const backup = path.join(backupBase, rel);
  await fs.mkdir(path.dirname(backup), { recursive: true });

  // Skip if already compressed (backup already exists)
  try {
    await fs.access(backup);
    return { skipped: true };
  } catch { /* proceed */ }

  const statBefore = await fs.stat(src);
  await fs.copyFile(src, backup);

  const ext    = path.extname(src).toLowerCase();
  const isJpeg = ext === '.jpg' || ext === '.jpeg';

  // Get current dimensions
  const meta = await sharp(src).metadata();
  const { width = 0, height = 0 } = meta;

  // Skip if already within target size AND under 200KB — already optimised
  if (Math.max(width, height) <= maxSize && statBefore.size < 200 * 1024) {
    // Remove the backup we just made — file doesn't need touching
    await fs.unlink(backup);
    return { skipped: true };
  }

  await sharp(src)
    .resize(maxSize, maxSize, {
      fit:                'inside',
      withoutEnlargement: true,
    })
    .toFormat(isJpeg ? 'jpeg' : 'png', {
      quality,                  // JPEG quality (ignored for PNG)
      compressionLevel: 9,      // PNG compression (ignored for JPEG)
      adaptiveFiltering: true,  // PNG only
    })
    .toFile(src + '.tmp');

  await fs.rename(src + '.tmp', src);
  const statAfter = await fs.stat(src);

  return {
    skipped:    false,
    before:     statBefore.size,
    after:      statAfter.size,
    name:       path.basename(src),
    reduction:  ((1 - statAfter.size / statBefore.size) * 100).toFixed(0),
  };
}

async function processDir(job) {
  const { dir, maxSize, quality, label, shallow = false, skipPatterns = [] } = job;
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    console.log(`  ⚠️  Directory not found: ${path.relative(ROOT, dir)}`);
    return { savedBytes: 0, processed: 0 };
  }

  const images = entries.filter((e) => {
    if (!e.isFile()) return false;
    if (!/\.(jpe?g|png)$/i.test(e.name)) return false;
    if (shallow && !e.isFile()) return false;
    if (skipPatterns.some((p) => p.test(e.name))) return false;
    return true;
  });

  if (images.length === 0) {
    console.log(`  (no images to process)\n`);
    return { savedBytes: 0, processed: 0 };
  }

  let savedBytes = 0;
  let processed  = 0;
  let skipped    = 0;

  for (const entry of images) {
    const src = path.join(dir, entry.name);
    const result = await compressFile(src, ORIGINALS_DIR, maxSize, quality);

    if (result.skipped) {
      skipped++;
      continue;
    }

    processed++;
    savedBytes += result.before - result.after;
    console.log(
      `  ✓  ${result.name.padEnd(55)}` +
      `${(result.before  / 1024).toFixed(0).padStart(6)}KB → ` +
      `${(result.after   / 1024).toFixed(0).padStart(5)}KB  (-${result.reduction}%)`,
    );
  }

  if (skipped > 0) console.log(`  ⏩  ${skipped} files skipped (already small / already compressed)`);

  return { savedBytes, processed };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🗜️   EWW-niverse image compressor\n');
  console.log(`  Originals backed up to assets/_originals/`);
  console.log(`  Run this script ONCE before your next eas build\n`);

  await fs.mkdir(ORIGINALS_DIR, { recursive: true });

  let totalSaved = 0;
  let totalFiles = 0;

  for (const job of JOBS) {
    console.log(`\n📁  ${job.label}  (${path.relative(ROOT, job.dir)}/)`);
    console.log(`    Max: ${job.maxSize}px · Quality: ${job.quality}\n`);
    const { savedBytes, processed } = await processDir(job);
    totalSaved += savedBytes;
    totalFiles += processed;
    if (processed > 0 && savedBytes > 0) {
      console.log(`\n    📦  Saved ${(savedBytes / 1024 / 1024).toFixed(1)}MB in this group`);
    }
  }

  console.log('\n' + '─'.repeat(70));
  console.log(`✅  Done.`);
  console.log(`    Compressed: ${totalFiles} files`);
  console.log(`    Total saved: ~${(totalSaved / 1024 / 1024).toFixed(0)}MB`);
  console.log(`    Originals:  assets/_originals/ (gitignored, easignored)\n`);
  console.log(`    Check a few images in Expo Go / simulator before committing.\n`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

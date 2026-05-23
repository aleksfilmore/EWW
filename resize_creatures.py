"""
Resize all creature PNGs to 600×600 PNG (transparent background preserved),
copy to ewwniverse-app/assets/creatures/ with the creature ID as filename.

Mapping: JSON title → PNG filename (case-insensitive, normalized hyphens)
"""
import json, os, re, shutil
from pathlib import Path
from PIL import Image

SRC_DIR   = Path(r"C:\Users\iamal\OneDrive\Documents\GitHub\EWW\creepy creatures")
DST_DIR   = Path(r"C:\Users\iamal\OneDrive\Documents\GitHub\EWW\ewwniverse-app\assets\creatures")
JSON_FILE = Path(r"C:\Users\iamal\OneDrive\Documents\GitHub\EWW\ewwniverse-app\data\creepy-creatures.json")
TARGET_PX = 600   # longest side
QUALITY   = 90    # PNG doesn't use quality, but kept for reference

DST_DIR.mkdir(parents=True, exist_ok=True)

def normalize(s: str) -> str:
    """Lowercase, replace Unicode hyphens and dashes with ASCII, strip parens."""
    s = s.lower()
    s = re.sub(r'[‐-―−﹘﹣－]', '-', s)  # Unicode hyphens → -
    s = re.sub(r'[().]', '', s)          # strip parens, dots
    s = re.sub(r'\s+', ' ', s).strip()   # normalise whitespace
    return s

# Build lookup: normalized_title → Path
src_files = {normalize(p.stem): p for p in SRC_DIR.glob("*.png")}

# Load creatures
with open(JSON_FILE, encoding='utf-8') as f:
    creatures = json.load(f)

ok, miss = [], []

for c in creatures:
    cid   = c["id"]
    title = c["title"]
    key   = normalize(title)

    if key not in src_files:
        # Try stripping trailing 'fish', common suffix mismatches
        miss.append((cid, title, key))
        continue

    src = src_files[key]
    dst = DST_DIR / f"{cid}.png"

    img = Image.open(src)

    # Resize: fit within TARGET_PX×TARGET_PX, keep aspect ratio
    img.thumbnail((TARGET_PX, TARGET_PX), Image.LANCZOS)

    # Ensure RGBA so transparency is preserved
    if img.mode not in ("RGBA", "RGB"):
        img = img.convert("RGBA")

    img.save(dst, "PNG", optimize=True)
    ok.append(cid)
    print(f"  OK  {cid}  ({img.size[0]}x{img.size[1]})")

print(f"\n{'='*60}")
print(f"Done: {len(ok)} / {len(creatures)}")

if miss:
    print(f"\nMISSED ({len(miss)}) — manual mapping needed:")
    # Show what normalized keys ARE available for debugging
    avail = sorted(src_files.keys())
    for cid, title, key in miss:
        close = [a for a in avail if key[:6] in a or a[:6] in key]
        print(f"  XX  {cid}  |  title='{title}'  |  key='{key}'")
        if close:
            print(f"       candidates: {close[:3]}")

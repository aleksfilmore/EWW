"""Generate assets/creatures/index.ts with static require() for all 75 creature PNGs."""
import json
from pathlib import Path

JSON_FILE = Path(r"C:\Users\iamal\OneDrive\Documents\GitHub\EWW\ewwniverse-app\data\creepy-creatures.json")
OUT_FILE  = Path(r"C:\Users\iamal\OneDrive\Documents\GitHub\EWW\ewwniverse-app\assets\creatures\index.ts")

with open(JSON_FILE, encoding='utf-8') as f:
    creatures = json.load(f)

lines = [
    "/**",
    " * Static require map for all Creepy Creatures PNGs.",
    " * Generated — do not edit by hand.",
    " * Metro bundler requires explicit require() calls per asset.",
    " */",
    "import { ImageSourcePropType } from 'react-native';",
    "",
    "export const CREATURE_IMAGES: Record<string, ImageSourcePropType> = {",
]

for c in creatures:
    cid = c["id"]
    lines.append(f"  '{cid}': require('./{cid}.png'),")

lines += ["};", ""]

OUT_FILE.write_text("\n".join(lines), encoding='utf-8')
print(f"Written {len(creatures)} entries to {OUT_FILE}")

/**
 * Special Specimens — app-exclusive collection layer.
 *
 * These creatures exist ONLY in the EWW-niverse app. They are not in any
 * printed book. Earned through Contamination Events triggered during quizzes.
 *
 * Data sourced from special-specimens.json — 15 real curated specimens across
 * all three book realms (Creepy Creatures, Creepy Dinosaurs, Creepy Earth).
 */

export type SpecialRarity = 'common' | 'uncommon' | 'epic';
export type SpecialUnlockSource =
  | 'contamination'
  | 'set'
  | 'mission'
  | 'streak'
  | 'stage';

export interface SpecialSpecimen {
  id:             string;
  title:          string;
  realm:          string;
  gross_fact:     string;
  eww_meter:      60 | 80 | 100;
  rarity:         SpecialRarity;
  tier_required:  'free' | 'paid';
  unlock_source:  SpecialUnlockSource | SpecialUnlockSource[];
}

export const SPECIAL_SPECIMENS: SpecialSpecimen[] = [
  {
    id:            'special-hairworm-puppet',
    title:         'Hairworm Puppet',
    realm:         'Creepy Creatures',
    gross_fact:    'Hairworms grow inside crickets, then seem to push them toward water. Once the insect jumps in, the worm slips out of its body like a living shoelace escaping its host.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-jewel-wasp-zombie-roach',
    title:         'Jewel Wasp Zombie Roach',
    realm:         'Creepy Creatures',
    gross_fact:    'This wasp stings a cockroach in the brain, then leads it by the antenna like a pet. After that, the roach becomes a living nursery for the wasp\'s baby.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-sacculina-crab-hijacker',
    title:         'Sacculina Crab Hijacker',
    realm:         'Creepy Creatures',
    gross_fact:    'Sacculina starts as a tiny barnacle, then grows roots through a crab\'s body and hijacks its behavior. The crab protects the parasite\'s young as if they were its own eggs.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-broodsac-snail-zombie',
    title:         'Broodsac Snail Zombie',
    realm:         'Creepy Creatures',
    gross_fact:    'A parasite crawls into a snail\'s eye stalks and makes them pulse with bright stripes. Birds mistake them for juicy caterpillars, eat them, and spread the parasite again.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-guinea-worm-exit',
    title:         'Guinea Worm Exit',
    realm:         'Creepy Creatures',
    gross_fact:    'Guinea worms can grow inside the body, then emerge slowly through a burning blister in the skin. The worm may take days to come out, turning one tiny wound into a nightmare exit door.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-masiakasaurus',
    title:         'Masiakasaurus',
    realm:         'Creepy Dinosaurs',
    gross_fact:    'Masiakasaurus had front teeth that pointed forward instead of straight down, giving its mouth a jagged hook-like shape. Its bite looked wrong, as if the teeth were trying to escape its face.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-pegomastax',
    title:         'Pegomastax',
    realm:         'Creepy Dinosaurs',
    gross_fact:    'Pegomastax was tiny, bristly, and had strange fangs in its beak-like mouth. It looked like a prehistoric goblin chicken with teeth where no polite bird should have them.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-kosmoceratops',
    title:         'Kosmoceratops',
    realm:         'Creepy Dinosaurs',
    gross_fact:    'Kosmoceratops had one of the most crowded skulls ever found, with horns and hooks curling across its face and frill. Its head looked less like armor and more like a bone crown gone insane.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-mononykus',
    title:         'Mononykus',
    realm:         'Creepy Dinosaurs',
    gross_fact:    'Mononykus had tiny arms ending in one large claw each. It may have used them to rip into insect nests, making it a feathered little dinosaur with built-in can openers.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-halszkaraptor',
    title:         'Halszkaraptor',
    realm:         'Creepy Dinosaurs',
    gross_fact:    'Halszkaraptor mixed raptor traits with a long neck, flipper-like arms, and a water-hunting body. It looked like a bird, a swimmer, and a predator stitched into one strange fossil.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-brinicle-death-finger',
    title:         'Brinicle Death Finger',
    realm:         'Creepy Earth',
    gross_fact:    'A brinicle is an underwater icicle that sinks from sea ice and freezes the seafloor as it moves. Small creatures caught in its path can be trapped in ice where they stand.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-snottite-cave',
    title:         'Snottite Cave',
    realm:         'Creepy Earth',
    gross_fact:    'In some toxic caves, slimy colonies called snottites hang from the ceiling like mucus. They drip acid strong enough to irritate skin and eat through rock over time.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-door-to-hell-crater',
    title:         'Door to Hell Crater',
    realm:         'Creepy Earth',
    gross_fact:    'A giant gas crater in Turkmenistan has burned for decades, glowing at night like a hole opened in the planet. The flames come from natural gas feeding the fire below.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-underwater-brine-lake',
    title:         'Underwater Brine Lake',
    realm:         'Creepy Earth',
    gross_fact:    'Some parts of the ocean floor contain extra-salty brine pools that sit like lakes underwater. Small animals that enter can be poisoned or preserved in the heavy, toxic water.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
  {
    id:            'special-movile-cave',
    title:         'Movile Cave',
    realm:         'Creepy Earth',
    gross_fact:    'Movile Cave was sealed away for millions of years and has air rich in toxic gases. Its strange ecosystem survives on chemical energy, with pale creatures living in permanent darkness.',
    eww_meter:     100,
    rarity:        'common',
    tier_required: 'free',
    unlock_source: 'contamination',
  },
];

/** All Common rarity specimens (available to free tier via contamination). */
export const COMMON_SPECIMENS = SPECIAL_SPECIMENS.filter(
  (s) => s.rarity === 'common',
);

/** Returns a random unowned Common specimen, or null if all are owned. */
export function pickRandomUnownedCommon(
  ownedIds: string[],
): SpecialSpecimen | null {
  const owned = new Set(ownedIds);
  const pool  = COMMON_SPECIMENS.filter((s) => !owned.has(s.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

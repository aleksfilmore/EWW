/**
 * Special Specimens — app-exclusive collection layer.
 *
 * These creatures exist ONLY in the EWW-niverse app. They are not in any
 * printed book. Earned through gameplay: Contamination Events, Specimen Set
 * completion, Lab Missions, streak milestones, and Stage 5.
 *
 * This file is the Common rarity pool (~15 specimens) — available to both
 * free and paid tiers. Uncommon + Epic ship in v1.1.
 */

export type SpecialRarity = 'common' | 'uncommon' | 'epic';
export type SpecialUnlockSource =
  | 'contamination'
  | 'set'
  | 'mission'
  | 'streak'
  | 'stage';

export interface SpecialSpecimen {
  id: string;
  name: string;
  gross_fact: string;         // ≤200 chars
  eww_meter: 60 | 80 | 100;
  rarity: SpecialRarity;
  unlock_source: SpecialUnlockSource | SpecialUnlockSource[];
}

export const SPECIAL_SPECIMENS: SpecialSpecimen[] = [
  {
    id:           'special-slime-beetle',
    name:         'Slime Beetle',
    gross_fact:   'Produces mucus thick enough to suffocate prey. The slime never fully dries and can survive temperatures from -20°C to 80°C.',
    eww_meter:    80,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-lab-mold',
    name:         "Dr. Icky's Lab Mold",
    gross_fact:   'Found only inside Dr. Icky\'s laboratory. Releases a smell so powerful that researchers must wear gas masks within 10 metres.',
    eww_meter:    60,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-gut-crawler',
    name:         'Gut Crawler',
    gross_fact:   'Can live inside intestines for decades. Adults grow up to 10 metres long and weigh as much as a small dog.',
    eww_meter:    80,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-drain-ghost',
    name:         'Drain Ghost',
    gross_fact:   'Breeds exclusively in bathroom drain slime. Its wings are made of compressed bacteria from the water directly below.',
    eww_meter:    60,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-lash-mite',
    name:         'Lash Mite',
    gross_fact:   'Lives on human eyelashes. Most adults are hosting hundreds right now. Lays eggs inside hair follicles while you sleep.',
    eww_meter:    80,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-sewer-slug',
    name:         'Sewer Slug',
    gross_fact:   'Has no eyes or skin pigment — evolved entirely underground. Feeds exclusively on decomposing material in pipe biofilm.',
    eww_meter:    60,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-snot-crystal',
    name:         'Snot Crystal',
    gross_fact:   'Discovered living inside nasal mucus. Multiplies during a cold and feeds on bacteria trapped in the mucus around it.',
    eww_meter:    60,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-gum-worm',
    name:         'Gum Worm',
    gross_fact:   'Found living between teeth and gum tissue. Feeds on dental plaque and blood that slowly seeps from gums overnight.',
    eww_meter:    80,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-wound-fly',
    name:         'Wound Fly',
    gross_fact:   'Lays eggs inside open wounds. Larvae hatch and eat infected tissue from the inside — occasionally used in hospital maggot therapy.',
    eww_meter:    100,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-bile-grub',
    name:         'Bile Grub',
    gross_fact:   'Found only inside bile ducts of large mammals. Its entire body is permanently stained yellow from a lifetime swimming in bile.',
    eww_meter:    80,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-sub-skin-grub',
    name:         'Sub-Skin Grub',
    gross_fact:   'Burrows under human skin to feed on tissue from the inside. Can be felt moving. Full removal requires up to 3 weeks.',
    eww_meter:    100,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-nasal-bot',
    name:         'Nasal Bot',
    gross_fact:   'Lays larvae inside the nasal passages of large mammals. The larvae feed on mucus membranes before emerging through the nostril.',
    eww_meter:    100,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-cyst-mold',
    name:         'Cyst Mold',
    gross_fact:   'Discovered growing inside human cysts. Releases an enzyme that smells like decomposing dairy. Grows faster in warm conditions.',
    eww_meter:    80,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-feeding-leech',
    name:         'Feeding Leech',
    gross_fact:   'Can triple its body weight in one feeding session. Some species attach undetected for years, feeding slowly in the dark.',
    eww_meter:    60,
    rarity:       'common',
    unlock_source: 'contamination',
  },
  {
    id:           'special-contamination-mite',
    name:         'Contamination Mite',
    gross_fact:   'Only exists in contaminated lab environments. Was first described in Dr. Icky\'s notes as a theoretical creature. Then it appeared.',
    eww_meter:    80,
    rarity:       'common',
    unlock_source: 'contamination',
  },
];

/** Returns all Common rarity specimens (available to free tier). */
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

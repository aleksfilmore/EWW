/** EWW-niverse game constants — matches spec v2 */

export const SCAN_REFRESH_MS = 12 * 60 * 60 * 1000; // 12 hours in ms

export const SCAN_FREE_AMOUNT = {
  free: 1,
  paid: 2,
} as const;

export const QUIZ_SCAN_REWARDS = {
  free: { 5: 3, 4: 2, 3: 1 } as Record<number, number>,
  paid: { 5: 6, 4: 4, 3: 2 } as Record<number, number>,
};

// Scans awarded the first time a creature quiz is mastered (all 3 correct)
// Deliberately modest to preserve scan economy — mastery is its own reward
export const MASTERY_QUIZ_SCANS = {
  free: 2,
  paid: 2,
} as const;

export const CONTAMINATION_STREAK = 3; // correct answers in a row without hint

/**
 * Mastery milestones for Slime Surge unlocks.
 * Index = contamination_count (number of surges already fired).
 * Value = mastered_count threshold that triggers the next surge.
 * 15 entries → 15 special specimens, paced over ~2–3 weeks of play.
 */
export const MASTERY_MILESTONES: number[] = [
  1, 4, 8, 13, 19, 26, 33, 41, 49, 57, 62, 66, 70, 73, 75,
];

export const STREAK_REWARD_DAY = 7;

export const FREE_MAX_SPECIAL_SPECIMENS = 5;

export const FREE_STAGE_CAP: 2 = 2;

export const STAGE_LABELS = {
  1: 'Kinda Curious',
  2: 'Properly Revolted',
  3: 'Super Slimy',
  4: 'Biologically Alarmed',
  5: 'Full Dr. Icky',
} as const;

// Stage thresholds based on classified count.
// Scaled for paid tier (234 total specimens) so Stage 5 is a genuine achievement.
// Free users (75 specimens) are hard-capped at Stage 2 via FREE_STAGE_CAP regardless.
export const STAGE_THRESHOLDS = {
  1: 0,
  2: 15,   // ~6% of paid library — quick early win
  3: 50,   // ~21%
  4: 120,  // ~51%
  5: 200,  // ~85% — reserved for dedicated collectors
} as const;

export const DAILY_SPECIMEN_SCAN_MULTIPLIER = 2; // 2x scans if classified within 24h

// Daily mission scan rewards (granted once per day per mission)
export const DAILY_MISSION_REWARDS = {
  classify3:   2,  // classify 3 specimens → +2 scans
  quiz5answers: 1, // answer 5 quiz questions → +1 scan
  findRare:    3,  // classify a rare specimen (eww ≥ 80) → +3 scans
} as const;

export const BOOKS = [
  {
    id: 'creepy-creatures' as const,
    label: 'CREATURES',
    tier: 'free' as const,
    count: 75,
  },
  {
    id: 'creepy-dinosaurs' as const,
    label: 'DINOSAURS',
    tier: 'paid' as const,
    count: 80,
  },
  {
    id: 'creepy-earth' as const,
    label: 'EARTH',
    tier: 'paid' as const,
    count: 79,
  },
] as const;

export const PAYWALL_PRICE = '€3.99';
export const REVENUECAT_ENTITLEMENT = 'full_lab_pass';
export const REVENUECAT_PRODUCT_ID = 'eww_full_lab_pass';

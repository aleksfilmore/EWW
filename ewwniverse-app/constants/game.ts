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
export const MASTERY_QUIZ_SCANS = {
  free: 4,
  paid: 5,
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

export const STAGE_THRESHOLDS = {
  1: 0,
  2: 10,   // classified count
  3: 25,
  4: 50,
  5: 75,
} as const;

export const DAILY_SPECIMEN_SCAN_MULTIPLIER = 2; // 2x scans if classified within 24h

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

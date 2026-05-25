export type EwwStage = 1 | 2 | 3 | 4 | 5;

export interface UnlockedSpecialSpecimen {
  unlocked_at: number;          // unix timestamp ms
  source: string;               // 'contamination' | 'set' | 'mission' | 'streak' | 'stage'
}

export interface UserProfile {
  uid: string;
  codename: string;
  eww_stage: EwwStage;
  is_paid: boolean;
  scan_balance: number;
  scan_next_refresh: number;       // unix timestamp ms
  streak_days: number;
  streak_last_day: string | null;  // ISO date string "2026-05-23"
  contamination_count: number;
  mastered_count: number;
  classified_count: number;
  fastest_quiz_seconds: number | null;
  daily_specimen_last_claimed: string | null;
  /** ID of the most recently classified creature (drives home screen hero card) */
  last_classified_creature_id: string | null;
  /** ID of the most recently unlocked special specimen — shown on home card until next scan */
  last_unlocked_specimen_id: string | null;
  /** Map of special specimen id → unlock info */
  special_specimens: Record<string, UnlockedSpecialSpecimen>;
  created_at: number;

  // ── Daily mission tracking ─────────────────────────────────────────────────
  /** ISO date string of last daily reset, e.g. "2026-05-25" */
  daily_missions_reset: string | null;
  /** How many creatures classified today */
  daily_classified_today: number;
  /** How many quiz questions answered today */
  daily_quiz_answers_today: number;
  /** Whether a rare specimen (eww ≥ 80) was classified today */
  daily_rare_found: boolean;
}

export interface QuizResult {
  session_id: string;
  quiz_type: 'gross-fact' | 'ewwmeter-ranking' | 'specimen-match';
  score: number;         // 0–5
  total: number;         // 5 or 8
  scans_earned: number;
  contamination_triggered: boolean;
  duration_seconds: number;
  completed_at: number;
}

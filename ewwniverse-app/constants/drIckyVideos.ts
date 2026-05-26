/**
 * Dr. Icky video source map — bundled locally in assets/videos/.
 *
 * All videos are included in the app binary via Metro's static require().
 * Metro resolves these at build time, so every path must be a string literal.
 *
 * Event pools:
 *   WRONG        → wrong answer in quiz
 *   CLASSIFY     → any creature classified (EWW < 80)
 *   RARE         → rare specimen (80 ≤ EWW < 100)
 *   LEGENDARY    → perfect EWW 100 specimen
 *   SPECIAL      → Slime Surge / special specimen unlock
 *   DAILY        → first open of the day
 *   MASTERED     → creature quiz completed successfully
 *   QUIZ_FAIL    → creature quiz failed
 *   ANSWER_QUIZ  → shown on quiz intro screen
 */

// ── Raw source map (local bundled files) ─────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DR_ICKY_SOURCES: Record<string, any> = {
  classify_basic:            require('../assets/videos/classify_basic.mp4'),
  classify_becoming_useful:  require('../assets/videos/classify_becoming_useful.mp4'),
  classify_creepy_long:      require('../assets/videos/classify_creepy_long.mp4'),
  classify_creepy_medium:    require('../assets/videos/classify_creepy_medium.mp4'),
  classify_creepy_short:     require('../assets/videos/classify_creepy_short.mp4'),
  classify_dangerous:        require('../assets/videos/classify_dangerous.mp4'),
  classify_harmless:         require('../assets/videos/classify_harmless.mp4'),
  classify_leave:            require('../assets/videos/classify_leave.mp4'),
  classify_perfect:          require('../assets/videos/classify_perfect.mp4'),
  classify_smell_official:   require('../assets/videos/classify_smell_official.mp4'),
  classify_wash_hands_long:  require('../assets/videos/classify_wash_hands_long.mp4'),
  classify_wash_hands_short: require('../assets/videos/classify_wash_hands_short.mp4'),
  classify:                  require('../assets/videos/classify.mp4'),
  daily_about_disgusting:    require('../assets/videos/daily_about_disgusting.mp4'),
  daily_discovery:           require('../assets/videos/daily_discovery.mp4'),
  daily_find_slimy:          require('../assets/videos/daily_find_slimy.mp4'),
  daily_order_slimy:         require('../assets/videos/daily_order_slimy.mp4'),
  daily_recruits:            require('../assets/videos/daily_recruits.mp4'),
  rare_elite:                require('../assets/videos/rare_elite.mp4'),
  rare_remarkable:           require('../assets/videos/rare_remarkable.mp4'),
  rare_top_tier:             require('../assets/videos/rare_top_tier.mp4'),
  slime_delicate:            require('../assets/videos/slime_delicate.mp4'),
  slime_jar_thinking:        require('../assets/videos/slime_jar_thinking.mp4'),
  special_acquired_long:     require('../assets/videos/special_acquired_long.mp4'),
  special_acquired_short:    require('../assets/videos/special_acquired_short.mp4'),
  wrong_comeback:            require('../assets/videos/wrong_comeback.mp4'),
  wrong_disappointed:        require('../assets/videos/wrong_disappointed.mp4'),
  wrong_jar:                 require('../assets/videos/wrong_jar.mp4'),
  wrong_wrong:               require('../assets/videos/wrong_wrong.mp4'),
  // New videos
  welcome:                   require('../assets/videos/welcome.mp4'),
  use_scans:                 require('../assets/videos/use-scans.mp4'),
  answer_quiz:               require('../assets/videos/answer-quiz.mp4'),
  try_again:                 require('../assets/videos/try-again.mp4'),
  try_again_immediately:     require('../assets/videos/try-again-immediately.mp4'),
  better_luck_next_time:     require('../assets/videos/better-luck-next-time.mp4'),
  mastered_specimen_a:       require('../assets/videos/mastered-specimen-a.mp4'),
  mastered_specimen_b:       require('../assets/videos/mastered-specimen-b.mp4'),
  mastered_specimen_c:       require('../assets/videos/mastered-specimen-c.mp4'),
};

// ── Event → candidate video keys ─────────────────────────────────────────────

export type DrIckyEvent =
  | 'wrong_answer'
  | 'classify'
  | 'classify_rare'
  | 'classify_legendary'
  | 'slime_surge'
  | 'daily_return'
  | 'mastered'
  | 'quiz_fail'
  | 'answer_quiz';

const EVENT_POOLS: Record<DrIckyEvent, string[]> = {
  wrong_answer: [
    'wrong_disappointed',
    'wrong_wrong',
    'wrong_jar',
    'wrong_comeback',
  ],
  classify: [
    'classify_basic',
    'classify_becoming_useful',
    'classify_creepy_short',
    'classify_creepy_medium',
    'classify_harmless',
    'classify_smell_official',
    'classify_wash_hands_short',
    'classify_leave',
    'classify_dangerous',
    'classify',
  ],
  classify_rare: [
    'rare_elite',
    'rare_remarkable',
    'rare_top_tier',
    'classify_creepy_long',
    'classify_wash_hands_long',
  ],
  classify_legendary: [
    'classify_perfect',
    'rare_elite',
    'rare_top_tier',
    'classify_creepy_long',
  ],
  slime_surge: [
    'special_acquired_short',
    'special_acquired_long',
    'slime_jar_thinking',
    'slime_delicate',
  ],
  daily_return: [
    'daily_find_slimy',
    'daily_order_slimy',
    'daily_recruits',
    'daily_about_disgusting',
    'daily_discovery',
  ],
  mastered: [
    'mastered_specimen_a',
    'mastered_specimen_b',
    'mastered_specimen_c',
  ],
  quiz_fail: [
    'try_again',
    'try_again_immediately',
    'better_luck_next_time',
  ],
  answer_quiz: [
    'answer_quiz',
  ],
};

// ── Special specimen video map ────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SPECIAL_SPECIMEN_SOURCES: Record<string, any> = {
  'special-hairworm-puppet':         require('../assets/videos/hairworm.mp4'),
  'special-jewel-wasp-zombie-roach': require('../assets/videos/jewel-wasp.mp4'),
  'special-sacculina-crab-hijacker': require('../assets/videos/sacculina-crab.mp4'),
  'special-broodsac-snail-zombie':   require('../assets/videos/broodsac snail zombie.mp4'),
  'special-guinea-worm-exit':        require('../assets/videos/guinea-worm.mp4'),
  'special-masiakasaurus':           require('../assets/videos/masiakasaurus.mp4'),
  'special-pegomastax':              require('../assets/videos/pegomastax.mp4'),
  'special-kosmoceratops':           require('../assets/videos/kosmoceratops.mp4'),
  'special-mononykus':               require('../assets/videos/mononykus.mp4'),
  'special-halszkaraptor':           require('../assets/videos/halszkaraptor.mp4'),
  'special-brinicle-death-finger':   require('../assets/videos/brinicle.mp4'),
  'special-snottite-cave':           require('../assets/videos/slimy-snottites.mp4'),
  'special-door-to-hell-crater':     require('../assets/videos/road-to-hell.mp4'),
  'special-underwater-brine-lake':   require('../assets/videos/brine-pools.mp4'),
  'special-movile-cave':             require('../assets/videos/movile-cave.mp4'),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function drIckySourceForSpecimen(id: string): any {
  return SPECIAL_SPECIMEN_SOURCES[id] ?? DR_ICKY_SOURCES['special_acquired_short'];
}

// ── Helper: non-repeating random pick per event ───────────────────────────────
// Tracks the last-used key per event so the same video is never played twice in
// a row (for pools with more than 1 video). Rotates through all options before
// repeating any single one using a per-event shuffled queue.

const _queues: Partial<Record<DrIckyEvent, string[]>> = {};

function getQueue(event: DrIckyEvent): string[] {
  const pool = EVENT_POOLS[event];
  if (!_queues[event] || _queues[event]!.length === 0) {
    // Shuffle a fresh copy of the pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    _queues[event] = shuffled;
  }
  return _queues[event]!;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function drIckySourceForEvent(event: DrIckyEvent): any {
  const queue = getQueue(event);
  const key   = queue.shift()!;
  return DR_ICKY_SOURCES[key];
}

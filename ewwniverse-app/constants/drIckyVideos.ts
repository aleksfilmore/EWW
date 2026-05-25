/**
 * Dr. Icky video source map.
 *
 * ALL require() calls must be static string literals — Metro resolves them at
 * bundle time and cannot handle dynamic paths. Add new videos here only.
 *
 * Event buckets:
 *   WRONG        → wrong answer in quiz
 *   CLASSIFY     → any creature classified (EWW < 80)
 *   RARE         → rare specimen (80 ≤ EWW < 100)
 *   LEGENDARY    → perfect EWW 100 specimen
 *   SPECIAL      → Slime Surge / special specimen unlock
 *   DAILY        → first open of the day
 */

// ── Raw source map (Metro static requires) ────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DR_ICKY_SOURCES: Record<string, any> = {
  classify_basic:        require('../assets/dr-icky/classify_basic.mp4'),
  classify_becoming_useful: require('../assets/dr-icky/classify_becoming_useful.mp4'),
  classify_creepy_long:  require('../assets/dr-icky/classify_creepy_long.mp4'),
  classify_creepy_medium:require('../assets/dr-icky/classify_creepy_medium.mp4'),
  classify_creepy_short: require('../assets/dr-icky/classify_creepy_short.mp4'),
  classify_dangerous:    require('../assets/dr-icky/classify_dangerous.mp4'),
  classify_harmless:     require('../assets/dr-icky/classify_harmless.mp4'),
  classify_leave:        require('../assets/dr-icky/classify_leave.mp4'),
  classify_perfect:      require('../assets/dr-icky/classify_perfect.mp4'),
  classify_smell_official:require('../assets/dr-icky/classify_smell_official.mp4'),
  classify_wash_hands_long:  require('../assets/dr-icky/classify_wash_hands_long.mp4'),
  classify_wash_hands_short: require('../assets/dr-icky/classify_wash_hands_short.mp4'),
  daily_about_disgusting:require('../assets/dr-icky/daily_about_disgusting.mp4'),
  daily_discovery:       require('../assets/dr-icky/daily_discovery.mp4'),
  daily_find_slimy:      require('../assets/dr-icky/daily_find_slimy.mp4'),
  daily_order_slimy:     require('../assets/dr-icky/daily_order_slimy.mp4'),
  daily_recruits:        require('../assets/dr-icky/daily_recruits.mp4'),
  rare_elite:            require('../assets/dr-icky/rare_elite.mp4'),
  rare_remarkable:       require('../assets/dr-icky/rare_remarkable.mp4'),
  rare_top_tier:         require('../assets/dr-icky/rare_top_tier.mp4'),
  slime_delicate:        require('../assets/dr-icky/slime_delicate.mp4'),
  slime_jar_thinking:    require('../assets/dr-icky/slime_jar_thinking.mp4'),
  special_acquired_long: require('../assets/dr-icky/special_acquired_long.mp4'),
  special_acquired_short:require('../assets/dr-icky/special_acquired_short.mp4'),
  wrong_comeback:        require('../assets/dr-icky/wrong_comeback.mp4'),
  wrong_disappointed:    require('../assets/dr-icky/wrong_disappointed.mp4'),
  wrong_jar:             require('../assets/dr-icky/wrong_jar.mp4'),
  wrong_wrong:           require('../assets/dr-icky/wrong_wrong.mp4'),
};

// ── Event → candidate video keys ─────────────────────────────────────────────

export type DrIckyEvent =
  | 'wrong_answer'
  | 'classify'
  | 'classify_rare'
  | 'classify_legendary'
  | 'slime_surge'
  | 'daily_return';

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
};

// ── Helper: pick a random source for an event ─────────────────────────────────

function pick(keys: string[]): ReturnType<typeof require> {
  const key = keys[Math.floor(Math.random() * keys.length)];
  return DR_ICKY_SOURCES[key];
}

export function drIckySourceForEvent(event: DrIckyEvent): ReturnType<typeof require> {
  return pick(EVENT_POOLS[event]);
}

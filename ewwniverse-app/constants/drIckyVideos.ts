/**
 * Dr. Icky video source map — streamed from Firebase Storage.
 *
 * Videos are NOT bundled in the app binary. They are fetched on-demand
 * from Firebase Storage to keep the APK small.
 *
 * URL format:
 *   https://firebasestorage.googleapis.com/v0/b/{BUCKET}/o/{PATH}?alt=media
 *
 * Event buckets:
 *   WRONG        → wrong answer in quiz
 *   CLASSIFY     → any creature classified (EWW < 80)
 *   RARE         → rare specimen (80 ≤ EWW < 100)
 *   LEGENDARY    → perfect EWW 100 specimen
 *   SPECIAL      → Slime Surge / special specimen unlock
 *   DAILY        → first open of the day
 */

const BUCKET = 'ewwniverse-dev.firebasestorage.app';
// Videos uploaded to bucket root (no subfolder)
const BASE    = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/`;

function uri(filename: string): { uri: string } {
  return { uri: `${BASE}${encodeURIComponent(filename)}?alt=media` };
}

// ── Raw source map (Firebase Storage URIs) ────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DR_ICKY_SOURCES: Record<string, any> = {
  classify_basic:            uri('classify_basic.mp4'),
  classify_becoming_useful:  uri('classify_becoming_useful.mp4'),
  classify_creepy_long:      uri('classify_creepy_long.mp4'),
  classify_creepy_medium:    uri('classify_creepy_medium.mp4'),
  classify_creepy_short:     uri('classify_creepy_short.mp4'),
  classify_dangerous:        uri('classify_dangerous.mp4'),
  classify_harmless:         uri('classify_harmless.mp4'),
  classify_leave:            uri('classify_leave.mp4'),
  classify_perfect:          uri('classify_perfect.mp4'),
  classify_smell_official:   uri('classify_smell_official.mp4'),
  classify_wash_hands_long:  uri('classify_wash_hands_long.mp4'),
  classify_wash_hands_short: uri('classify_wash_hands_short.mp4'),
  daily_about_disgusting:    uri('daily_about_disgusting.mp4'),
  daily_discovery:           uri('daily_discovery.mp4'),
  daily_find_slimy:          uri('daily_find_slimy.mp4'),
  daily_order_slimy:         uri('daily_order_slimy.mp4'),
  daily_recruits:            uri('daily_recruits.mp4'),
  rare_elite:                uri('rare_elite.mp4'),
  rare_remarkable:           uri('rare_remarkable.mp4'),
  rare_top_tier:             uri('rare_top_tier.mp4'),
  slime_delicate:            uri('slime_delicate.mp4'),
  slime_jar_thinking:        uri('slime_jar_thinking.mp4'),
  special_acquired_long:     uri('special_acquired_long.mp4'),
  special_acquired_short:    uri('special_acquired_short.mp4'),
  wrong_comeback:            uri('wrong_comeback.mp4'),
  wrong_disappointed:        uri('wrong_disappointed.mp4'),
  wrong_jar:                 uri('wrong_jar.mp4'),
  wrong_wrong:               uri('wrong_wrong.mp4'),
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

// ── Special specimen video map ────────────────────────────────────────────────
// One video per specimen ID — plays on unlock AND when viewing past unlocks.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SPECIAL_SPECIMEN_SOURCES: Record<string, any> = {
  'special-hairworm-puppet':         uri('hairworm.mp4'),
  'special-jewel-wasp-zombie-roach': uri('jewel-wasp.mp4'),
  'special-sacculina-crab-hijacker': uri('sacculina-crab.mp4'),
  'special-broodsac-snail-zombie':   uri('broodsac snail zombie.mp4'),
  'special-guinea-worm-exit':        uri('guinea-worm.mp4'),
  'special-masiakasaurus':           uri('masiakasaurus.mp4'),
  'special-pegomastax':              uri('pegomastax.mp4'),
  'special-kosmoceratops':           uri('kosmoceratops.mp4'),
  'special-mononykus':               uri('mononykus.mp4'),
  'special-halszkaraptor':           uri('halszkaraptor.mp4'),
  'special-brinicle-death-finger':   uri('brinicle.mp4'),
  'special-snottite-cave':           uri('slimy-snottites.mp4'),
  'special-door-to-hell-crater':     uri('road-to-hell.mp4'),
  'special-underwater-brine-lake':   uri('brine-pools.mp4'),
  'special-movile-cave':             uri('movile-cave.mp4'),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function drIckySourceForSpecimen(id: string): any {
  return SPECIAL_SPECIMEN_SOURCES[id] ?? DR_ICKY_SOURCES['special_acquired_short'];
}

// ── Helper: pick a random source for an event ─────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pick(keys: string[]): any {
  const key = keys[Math.floor(Math.random() * keys.length)];
  return DR_ICKY_SOURCES[key];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function drIckySourceForEvent(event: DrIckyEvent): any {
  return pick(EVENT_POOLS[event]);
}

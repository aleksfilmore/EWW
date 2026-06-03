/**
 * Responsive scaling helpers — phone-first, tablet-aware.
 *
 * The app was designed for phones (every size is derived from `Dimensions`).
 * On iPad we want the content to *scale up* rather than stretch a phone layout:
 *   • text / single-column / hero content lives in a centred, readable column,
 *   • grids use the full width with more columns,
 *   • typography & spacing get a modest bump.
 *
 * Portrait-only + `requireFullScreen` (see app.json) means these values are
 * stable for the app's lifetime, so we read Dimensions once at module load like
 * the rest of the codebase.
 */
import { Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const SCREEN_W = WIDTH;
export const SCREEN_H = HEIGHT;

/** iPad / large tablet — shortest side ≥ 600dp (iPad mini ≈ 744). */
export const IS_TABLET = Math.min(WIDTH, HEIGHT) >= 600;

/**
 * Centred content column width for text, single-column and hero content.
 * Capped on tablet so lore paragraphs and hero art stay readable instead of
 * spanning the whole iPad. On phones this is just the full screen width.
 */
export const CONTENT_MAX_W = 700;
export const CONTENT_W = IS_TABLET ? Math.min(WIDTH, CONTENT_MAX_W) : WIDTH;

/** Left/right inset that centres a CONTENT_W column inside the full screen. */
export const CONTENT_INSET = Math.max(0, (WIDTH - CONTENT_W) / 2);

/**
 * Style fragment to centre a content column on tablet. Spread into a
 * contentContainerStyle / wrapper style:  `{ ...centeredColumn }`.
 */
export const centeredColumn = IS_TABLET
  ? { width: CONTENT_W, alignSelf: 'center' as const }
  : {};

/** Modest typography up-scale on tablet (not 1:1 with screen width). */
const FONT_FACTOR = IS_TABLET ? 1.18 : 1;
/** Scale a font size for the current device. */
export const fs = (size: number) => Math.round(size * FONT_FACTOR);

/** Modest spacing up-scale on tablet. */
const SPACE_FACTOR = IS_TABLET ? 1.25 : 1;
export const sp = (size: number) => Math.round(size * SPACE_FACTOR);

/**
 * Number of grid columns for the current device. Keeps card size close to the
 * phone design by targeting the same per-card width across the full screen.
 *
 * @param phoneCols   columns used on phone
 * @param phoneRefW   reference phone width the phone design assumed (default 390)
 */
export const gridCols = (phoneCols: number, phoneRefW = 390) => {
  if (!IS_TABLET) return phoneCols;
  const targetCard = phoneRefW / phoneCols;
  return Math.max(phoneCols, Math.round(WIDTH / targetCard));
};

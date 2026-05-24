/**
 * Audio service — wraps expo-audio for sound effects.
 *
 * All playback is fire-and-forget and fails silently.
 * Each call creates a fresh player so overlapping sounds work correctly.
 *
 * Ambient tracks (amb_home, amb_lab, amb_launch) are handled separately
 * via a single looping player — swap on route change.
 */
import { createAudioPlayer } from 'expo-audio';

// ─── SFX key type ─────────────────────────────────────────────────────────
export type SfxKey =
  | 'sfx_access_granted'
  | 'sfx_answer_tap'
  | 'sfx_card_tap'
  | 'sfx_contamination'
  | 'sfx_correct'
  | 'sfx_declassify'
  | 'sfx_detail_open'
  | 'sfx_locked'
  | 'sfx_meter_100'
  | 'sfx_meter_60'
  | 'sfx_meter_80'
  | 'sfx_pass_unlock'
  | 'sfx_question'
  | 'sfx_quiz_complete'
  | 'sfx_scroll'
  | 'sfx_stage_up'
  | 'sfx_tab'
  | 'sfx_transmission'
  | 'sfx_unlock'
  | 'sfx_wrong';

export type AmbKey = 'amb_home' | 'amb_lab' | 'amb_launch';

// ─── Static require map (Metro needs literals) ─────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SFX_SOURCES: Record<SfxKey, any> = {
  sfx_access_granted: require('../assets/audio/sfx_access_granted.mp3'),
  sfx_answer_tap:     require('../assets/audio/sfx_answer_tap.mp3'),
  sfx_card_tap:       require('../assets/audio/sfx_card_tap.mp3'),
  sfx_contamination:  require('../assets/audio/sfx_contamination.mp3'),
  sfx_correct:        require('../assets/audio/sfx_correct.mp3'),
  sfx_declassify:     require('../assets/audio/sfx_declassify.mp3'),
  sfx_detail_open:    require('../assets/audio/sfx_detail_open.mp3'),
  sfx_locked:         require('../assets/audio/sfx_locked.mp3'),
  sfx_meter_100:      require('../assets/audio/sfx_meter_100.mp3'),
  sfx_meter_60:       require('../assets/audio/sfx_meter_60.mp3'),
  sfx_meter_80:       require('../assets/audio/sfx_meter_80.mp3'),
  sfx_pass_unlock:    require('../assets/audio/sfx_pass_unlock.mp3'),
  sfx_question:       require('../assets/audio/sfx_question.mp3'),
  sfx_quiz_complete:  require('../assets/audio/sfx_quiz_complete.mp3'),
  sfx_scroll:         require('../assets/audio/sfx_scroll.mp3'),
  sfx_stage_up:       require('../assets/audio/sfx_stage_up.mp3'),
  sfx_tab:            require('../assets/audio/sfx_tab.mp3'),
  sfx_transmission:   require('../assets/audio/sfx_transmission.mp3'),
  sfx_unlock:         require('../assets/audio/sfx_unlock.mp3'),
  sfx_wrong:          require('../assets/audio/sfx_wrong.mp3'),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AMB_SOURCES: Record<AmbKey, any> = {
  amb_home:   require('../assets/audio/amb_home.mp3'),
  amb_lab:    require('../assets/audio/amb_lab.mp3'),
  amb_launch: require('../assets/audio/amb_launch.mp3'),
};

// ─── Global mute ──────────────────────────────────────────────────────────
let _muted = false;

export function setMuted(muted: boolean) { _muted = muted; }
export function isMuted() { return _muted; }

// ─── SFX playback ─────────────────────────────────────────────────────────
/**
 * Play a sound effect. Non-blocking — creates a fresh player each call
 * so multiple sounds can overlap. Fails silently on any error.
 */
export function playSfx(key: SfxKey): void {
  if (_muted) return;
  try {
    const player = createAudioPlayer(SFX_SOURCES[key]);
    player.play();
    // Release resources after 15s (generous ceiling for any SFX)
    setTimeout(() => {
      try { player.remove(); } catch {}
    }, 15_000);
  } catch {
    // Audio is non-critical — never crash the app over a missing sound
  }
}

// ─── EWW-meter SFX helper ─────────────────────────────────────────────────
/** Play the appropriate EWW-meter sting for a given meter value. */
export function playMeterSfx(ewwMeter: number): void {
  if (ewwMeter >= 100) return playSfx('sfx_meter_100');
  if (ewwMeter >= 80)  return playSfx('sfx_meter_80');
  playSfx('sfx_meter_60');
}

// ─── Ambient player (singleton) ───────────────────────────────────────────
let _ambPlayer: ReturnType<typeof createAudioPlayer> | null = null;
let _currentAmb: AmbKey | null = null;

/**
 * Start an ambient track, looping. Swaps seamlessly if a different track is
 * requested. Passing null stops ambient audio.
 */
export function setAmbient(key: AmbKey | null): void {
  if (_muted && key !== null) return;
  try {
    // Already playing the right track — do nothing
    if (key !== null && _currentAmb === key && _ambPlayer) return;

    // Stop and dispose existing player
    if (_ambPlayer) {
      try { _ambPlayer.pause(); _ambPlayer.remove(); } catch {}
      _ambPlayer = null;
      _currentAmb = null;
    }

    if (key === null) return;

    _ambPlayer = createAudioPlayer(AMB_SOURCES[key]);
    _ambPlayer.loop = true;
    _ambPlayer.volume = 0.35;
    _ambPlayer.play();
    _currentAmb = key;
  } catch {}
}

/** Stop ambient audio. */
export function stopAmbient(): void {
  setAmbient(null);
}

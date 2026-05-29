/**
 * DrIckyOverlay — slides up from the bottom when Dr. Icky has something to say.
 *
 * Plays a short video clip, auto-dismisses when it ends, and can be tapped to skip.
 * Mounted globally in app/_layout.tsx so it works on any screen.
 *
 * The inner DrIckyPlayer is keyed by the video source so each trigger gets a
 * fresh player (expo-video players don't re-seek cleanly on hot-swap).
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Asset } from 'expo-asset';
import { useEventListener } from 'expo';
import { useGameStore } from '@/store/gameStore';
import { Colors, Radius, FontFamily } from '@/constants/design';
import { IS_TABLET, CONTENT_W, fs } from '@/constants/responsive';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Video panel width — full width on phone, capped & centred on tablet so the
// portrait Dr. Icky clip isn't surrounded by huge black bars.
const VIDEO_W = IS_TABLET ? Math.min(SCREEN_W, CONTENT_W) : SCREEN_W;

// ── Root wrapper — watches store, renders player keyed to trigger timestamp ───
export function DrIckyOverlay() {
  const drIckySource    = useGameStore((s) => s.drIckySource);
  const drIckyTriggerTs = useGameStore((s) => s.drIckyLastShownAt);

  if (!drIckySource) return null;

  // Key by timestamp so every trigger (even same video twice) gets a fresh player.
  return <DrIckyPlayer key={drIckyTriggerTs} source={drIckySource} />;
}

// ── Debug HUD ─────────────────────────────────────────────────────────────────
// Flip to `true`, ship via `eas update`, and a small overlay on the Dr. Icky
// panel shows the player's live status, the resolved URI scheme (file:// = good
// local playback, https:// = still streaming from the CDN), current/total time,
// and any error message. Set back to `false` before a real release.
const DRICKY_DEBUG = false;

// Hard cap: never let the overlay stay on screen longer than this, even if the
// clip stalls and neither playToEnd nor the stall watchdog fires. Clips are ≤10s.
const MAX_VISIBLE_MS = 14_000;
// Stall watchdog: if playback time stops advancing for this long, treat the clip
// as finished and dismiss (covers a frozen/stalled player that never emits end).
const STALL_TIMEOUT_MS = 3_000;

// ── Player — one instance per video trigger ───────────────────────────────────
function DrIckyPlayer({ source }: { source: unknown }) {
  const dismiss = useGameStore((s) => s.dismissDrIcky);
  const slideY  = useRef(new Animated.Value(SCREEN_H)).current;
  const dismissedRef    = useRef(false);
  const lastTimeRef     = useRef(0);
  const lastProgressRef = useRef(Date.now());

  // Debug HUD state (only ever updated when DRICKY_DEBUG is on)
  const [dbg, setDbg] = useState({ status: 'idle', scheme: '—', err: '', t: 0, dur: 0 });

  // Create the player WITHOUT a source — we load it from the local file below.
  // Passing the require()'d module directly lets expo-asset hand expo-video the
  // remote (EAS Update CDN) `uri` instead of the embedded file, so iOS ends up
  // *streaming* a "bundled" clip and stalls a couple seconds in. Resolving the
  // asset to its localUri first guarantees true local playback.
  const player = useVideoPlayer(null, (p) => {
    p.audioMixingMode = 'mixWithOthers';
    p.timeUpdateEventInterval = 0.5;  // enable timeUpdate events for the watchdog
  });

  // Resolve the bundled asset to a local file:// path, then load & play it.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const asset = Asset.fromModule(source as number);
        await asset.downloadAsync();                 // instant for embedded assets
        if (cancelled) return;
        const uri = asset.localUri ?? asset.uri;     // prefer the local file
        if (DRICKY_DEBUG) setDbg((d) => ({ ...d, scheme: uri.split(':')[0] }));
        await player.replaceAsync({ uri });          // async load (off UI thread)
        if (cancelled) return;
        lastProgressRef.current = Date.now();        // start the stall clock now
        player.play();
      } catch {
        // If the clip can't be loaded, don't leave the overlay stuck.
        handleDismiss();
      }
    })();
    return () => { cancelled = true; };
  }, [source, player]);  // eslint-disable-line react-hooks/exhaustive-deps

  // Slide-up animation on mount
  useEffect(() => {
    Animated.spring(slideY, {
      toValue:         0,
      friction:        7,
      tension:         60,
      useNativeDriver: true,
    }).start();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // ── Safety nets so the overlay can never get permanently stuck ───────────────
  // 1. Stall watchdog — dismiss if currentTime stops advancing while "playing".
  // 2. Absolute cap — dismiss after MAX_VISIBLE_MS no matter what.
  useEffect(() => {
    const stall = setInterval(() => {
      const t = player.currentTime ?? 0;
      if (DRICKY_DEBUG) {
        setDbg((d) => ({ ...d, t, dur: player.duration ?? 0 }));
      }
      if (t > lastTimeRef.current + 0.05) {
        lastTimeRef.current     = t;
        lastProgressRef.current = Date.now();
      } else if (
        player.playing &&
        Date.now() - lastProgressRef.current > STALL_TIMEOUT_MS
      ) {
        handleDismiss();
      }
    }, 1_000);
    const cap = setTimeout(handleDismiss, MAX_VISIBLE_MS);
    return () => { clearInterval(stall); clearTimeout(cap); };
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Dismiss when video finishes
  useEventListener(player, 'playToEnd', handleDismiss);

  // Debug: track status transitions and any error message
  useEventListener(player, 'statusChange', ({ status, error }) => {
    if (DRICKY_DEBUG) {
      setDbg((d) => ({ ...d, status, err: error?.message ?? d.err }));
    }
  });

  function handleDismiss() {
    if (dismissedRef.current) return;   // idempotent — many paths can call this
    dismissedRef.current = true;
    Animated.timing(slideY, {
      toValue:         SCREEN_H,
      duration:        260,
      useNativeDriver: true,
    }).start(() => dismiss());
  }

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideY }] }]}
    >
      {/* Video */}
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls={false}
      />

      {/* Debug HUD — only rendered when DRICKY_DEBUG is on */}
      {DRICKY_DEBUG && (
        <View style={styles.debugHud} pointerEvents="none">
          <Text style={styles.debugText}>
            {dbg.status} · {dbg.scheme} · {dbg.t.toFixed(1)}/{dbg.dur.toFixed(1)}s
          </Text>
          {!!dbg.err && (
            <Text style={[styles.debugText, styles.debugErr]} numberOfLines={2}>
              ⚠ {dbg.err}
            </Text>
          )}
        </View>
      )}

      {/* Skip tap target — covers the whole overlay */}
      <TouchableOpacity
        style={styles.skipArea}
        onPress={handleDismiss}
        activeOpacity={1}
      >
        <View style={styles.skipPill}>
          <Text style={styles.skipText}>TAP TO SKIP</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const VIDEO_H  = IS_TABLET
  ? Math.min(Math.round(SCREEN_H * 0.5), 620)
  : Math.round(SCREEN_H * 0.52);

const styles = StyleSheet.create({
  container: {
    position:       'absolute',
    left:            0,
    right:           0,
    bottom:          0,
    height:          VIDEO_H,
    backgroundColor: '#060D06',
    borderTopLeftRadius:  Radius.xl,
    borderTopRightRadius: Radius.xl,
    borderTopWidth:  2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor:     `${Colors.eww.green}55`,
    overflow:        'hidden',
    zIndex:          998,
    // Shadow above
    shadowColor:     Colors.eww.green,
    shadowOffset:    { width: 0, height: -4 },
    shadowOpacity:   0.35,
    shadowRadius:    14,
    elevation:       20,
  },
  video: {
    width:     VIDEO_W,
    height:    VIDEO_H,
    alignSelf: 'center',
  },
  debugHud: {
    position:          'absolute',
    top:               8,
    left:              8,
    right:             8,
    backgroundColor:   'rgba(0,0,0,0.7)',
    borderRadius:      Radius.sm,
    paddingHorizontal: 8,
    paddingVertical:   4,
  },
  debugText: {
    color:        '#7AE838',
    fontSize:     11,
    fontFamily:   FontFamily.boogaloo,
    letterSpacing: 0.5,
  },
  debugErr: {
    color:     '#FF8C00',
    marginTop: 2,
  },
  skipArea: {
    position:       'absolute',
    left:            0,
    right:           0,
    top:             0,
    bottom:          0,
    alignItems:      'center',
    justifyContent:  'flex-end',
    paddingBottom:   12,
  },
  skipPill: {
    backgroundColor:   'rgba(0,0,0,0.55)',
    borderRadius:      Radius.full,
    paddingHorizontal: 14,
    paddingVertical:   4,
    borderWidth:       1,
    borderColor:       'rgba(255,255,255,0.15)',
  },
  skipText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      fs(12),
    color:         'rgba(255,255,255,0.55)',
    letterSpacing: 1.5,
  },
});

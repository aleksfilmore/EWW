/**
 * DrIckyOverlay — slides up from the bottom when Dr. Icky has something to say.
 *
 * Plays a short video clip, auto-dismisses when it ends, and can be tapped to skip.
 * Mounted globally in app/_layout.tsx so it works on any screen.
 *
 * The inner DrIckyPlayer is keyed by the video source so each trigger gets a
 * fresh player (expo-video players don't re-seek cleanly on hot-swap).
 */
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEventListener } from 'expo';
import { useGameStore } from '@/store/gameStore';
import { Colors, Radius, FontFamily } from '@/constants/design';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// ── Root wrapper — watches store, renders player keyed to source ──────────────
export function DrIckyOverlay() {
  const drIckySource = useGameStore((s) => s.drIckySource);

  if (!drIckySource) return null;

  return <DrIckyPlayer key={String(drIckySource)} source={drIckySource} />;
}

// ── Player — one instance per video trigger ───────────────────────────────────
function DrIckyPlayer({ source }: { source: unknown }) {
  const dismiss = useGameStore((s) => s.dismissDrIcky);
  const slideY  = useRef(new Animated.Value(SCREEN_H)).current;

  // Create and auto-play the video
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const player = useVideoPlayer(source as any, (p) => {
    p.play();
  });

  // Slide-up animation on mount
  useEffect(() => {
    Animated.spring(slideY, {
      toValue:         0,
      friction:        7,
      tension:         60,
      useNativeDriver: true,
    }).start();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Dismiss when video finishes
  useEventListener(player, 'playToEnd', handleDismiss);

  function handleDismiss() {
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

const VIDEO_H  = Math.round(SCREEN_H * 0.52);

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
    width:  SCREEN_W,
    height: VIDEO_H,
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
    fontSize:      12,
    color:         'rgba(255,255,255,0.55)',
    letterSpacing: 1.5,
  },
});

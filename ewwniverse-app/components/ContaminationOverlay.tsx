/**
 * ContaminationOverlay — full-screen green flash when a Contamination Event fires.
 *
 * Renders on top of everything via position:absolute + zIndex:999.
 * Auto-dismisses after ~2s. Uses React Native's built-in Animated (not Reanimated).
 *
 * Trigger: useGameStore contaminationActive === true
 * Dismiss: sets contaminationActive back to false after animation completes.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useGameStore } from '@/store/gameStore';
import { Colors, FontFamily } from '@/constants/design';
import { SPECIAL_SPECIMENS } from '@/data/special-specimens';

export function ContaminationOverlay() {
  const contaminationActive    = useGameStore((s) => s.contaminationActive);
  const lastUnlockedSpecimenId = useGameStore((s) => s.lastUnlockedSpecimenId);
  const dismiss                = useGameStore((s) => s.dismissContaminationEvent);

  const unlockedSpecimen = lastUnlockedSpecimenId
    ? SPECIAL_SPECIMENS.find((s) => s.id === lastUnlockedSpecimenId) ?? null
    : null;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!contaminationActive) {
      opacity.setValue(0);
      return;
    }

    const seq = Animated.sequence([
      // Snap in fast
      Animated.timing(opacity, {
        toValue:         0.92,
        duration:        120,
        useNativeDriver: true,
      }),
      // Hold
      Animated.delay(1200),
      // Fade out
      Animated.timing(opacity, {
        toValue:         0,
        duration:        500,
        useNativeDriver: true,
      }),
    ]);

    seq.start(({ finished }) => {
      if (finished) dismiss();
    });

    return () => {
      seq.stop();
      opacity.setValue(0);
    };
  }, [contaminationActive]);   // eslint-disable-line react-hooks/exhaustive-deps

  if (!contaminationActive) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]} pointerEvents="none">
      <Text style={styles.biohazard}>☣</Text>
      <Text style={styles.title}>CONTAMINATION{'\n'}EVENT</Text>
      <Text style={styles.divider}>────────────</Text>
      <Text style={styles.sub}>SLIME SURGE TRIGGERED</Text>
      {unlockedSpecimen ? (
        <>
          <Text style={styles.specimenLabel}>NEW SPECIMEN ACQUIRED</Text>
          <Text style={styles.specimenName}>{unlockedSpecimen.name.toUpperCase()}</Text>
        </>
      ) : (
        <Text style={styles.body}>
          A Contaminated Specimen{'\n'}has been added to your collection
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 80, 10, 0.88)',
    zIndex:          999,
    alignItems:      'center',
    justifyContent:  'center',
    gap:             8,
  },
  biohazard: {
    fontSize:  72,
    color:     Colors.eww.green,
    lineHeight: 78,
  },
  title: {
    fontFamily:    FontFamily.creepster,
    fontSize:      48,
    color:         Colors.eww.green,
    letterSpacing: 3,
    textAlign:     'center',
    lineHeight:    52,
    textShadowColor:  '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  divider: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   16,
    color:      `${Colors.eww.green}80`,
  },
  sub: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      18,
    color:         'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    textAlign:     'center',
  },
  body: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   16,
    color:      'rgba(255,255,255,0.55)',
    textAlign:  'center',
    lineHeight: 22,
    marginTop:  4,
  },
  specimenLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         'rgba(255,255,255,0.6)',
    letterSpacing: 2,
    textAlign:     'center',
    marginTop:     8,
  },
  specimenName: {
    fontFamily:    FontFamily.creepster,
    fontSize:      28,
    color:         Colors.eww.green,
    letterSpacing: 2,
    textAlign:     'center',
    lineHeight:    32,
    textShadowColor:  '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

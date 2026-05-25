/**
 * ContaminationOverlay — full-screen SLIME SURGE celebration when the event fires.
 *
 * Renders on top of everything via position:absolute + zIndex:999.
 * Auto-dismisses after ~2.5s. Uses React Native's built-in Animated.
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
  const scale   = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    if (!contaminationActive) {
      opacity.setValue(0);
      scale.setValue(0.88);
      return;
    }

    const seq = Animated.sequence([
      // Pop in with scale
      Animated.parallel([
        Animated.timing(opacity, {
          toValue:         1,
          duration:        160,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue:         1,
          friction:        6,
          tension:         80,
          useNativeDriver: true,
        }),
      ]),
      // Hold
      Animated.delay(1600),
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
      scale.setValue(0.88);
    };
  }, [contaminationActive]);   // eslint-disable-line react-hooks/exhaustive-deps

  if (!contaminationActive) return null;

  return (
    <Animated.View
      style={[styles.overlay, { opacity }]}
      pointerEvents="none"
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Text style={styles.biohazard}>☣</Text>
        <Text style={styles.title}>SLIME SURGE!</Text>
        <Text style={styles.divider}>————————————</Text>

        {unlockedSpecimen ? (
          <>
            <Text style={styles.newSpecimenLabel}>NEW SPECIMEN UNLOCKED</Text>
            <Text style={styles.specimenName}>{unlockedSpecimen.title.toUpperCase()}</Text>
            <Text style={styles.body}>Check REWARDS to see your new specimen</Text>
          </>
        ) : (
          <>
            <Text style={styles.sub}>A CONTAMINATED SPECIMEN</Text>
            <Text style={styles.body}>has been added to your collection</Text>
          </>
        )}

        <Text style={styles.checkRewards}>TAP REWARDS TO COLLECT  ›</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position:        'absolute',
    left:            0,
    right:           0,
    top:             0,
    bottom:          0,
    backgroundColor: 'rgba(6, 30, 6, 0.92)',
    zIndex:          999,
    alignItems:      'center',
    justifyContent:  'center',
  },
  card: {
    alignItems:   'center',
    gap:          10,
    paddingHorizontal: 32,
  },
  biohazard: {
    fontSize:  80,
    color:     Colors.eww.green,
    lineHeight: 86,
    textShadowColor:  Colors.eww.green,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  title: {
    fontFamily:    FontFamily.creepster,
    fontSize:      52,
    color:         Colors.eww.green,
    letterSpacing: 3,
    textAlign:     'center',
    lineHeight:    56,
    textShadowColor:  Colors.eww.green,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  divider: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      `${Colors.eww.green}66`,
  },
  newSpecimenLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         Colors.eww.amber,
    letterSpacing: 2.5,
    textAlign:     'center',
    marginTop:     4,
  },
  specimenName: {
    fontFamily:    FontFamily.creepster,
    fontSize:      32,
    color:         Colors.text.primary,
    letterSpacing: 2,
    textAlign:     'center',
    lineHeight:    36,
    textShadowColor:  '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  sub: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      17,
    color:         Colors.eww.amber,
    letterSpacing: 1.5,
    textAlign:     'center',
  },
  body: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      'rgba(255,255,255,0.65)',
    textAlign:  'center',
    lineHeight: 22,
    marginTop:  2,
  },
  checkRewards: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         Colors.text.lime,
    letterSpacing: 1,
    textAlign:     'center',
    marginTop:     14,
    opacity:       0.8,
  },
});

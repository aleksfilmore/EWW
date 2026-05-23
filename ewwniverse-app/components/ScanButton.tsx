/**
 * ScanButton — the primary CTA on the Lab HQ screen.
 * Large pulsing button. Disabled when no scans available.
 */
import React, { useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Colors, Spacing, Radius } from '@/constants/design';

interface Props {
  scanBalance: number;
  onPress: () => void;
}

export function ScanButton({ scanBalance, onPress }: Props) {
  const hasScans = scanBalance > 0;
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (hasScans) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.04, { duration: 900, easing: Easing.inOut(Easing.sin) }),
          withTiming(1.0, { duration: 900, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
      );
    } else {
      pulseScale.value = withTiming(1);
    }
  }, [hasScans]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={animStyle}>
        <TouchableOpacity
          style={[styles.btn, !hasScans && styles.btnDisabled]}
          onPress={hasScans ? onPress : undefined}
          activeOpacity={0.8}
        >
          <Text style={styles.scanEmoji}>🔬</Text>
          <Text style={styles.label}>
            {hasScans ? 'USE SCAN' : 'NO SCANS LEFT'}
          </Text>
          <Text style={styles.balance}>
            {scanBalance} scan{scanBalance !== 1 ? 's' : ''} available
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.lg,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.eww.green,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    alignItems: 'center',
    shadowColor: Colors.eww.green,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
    minWidth: 220,
  },
  btnDisabled: {
    backgroundColor: Colors.bg.elevated,
    shadowOpacity: 0,
    elevation: 0,
  },
  scanEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  balance: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.55)',
    marginTop: 4,
  },
});

/**
 * EWW-meter arc — animated semi-circle gauge.
 * Uses react-native-svg for the arc geometry.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { EwwMeter } from '@/types/creature';
import { ewwMeterColor, Colors, FontFamily } from '@/constants/design';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  value: EwwMeter;
  size?: number;
  animated?: boolean;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export function EwwMeterArc({ value, size = 140, animated = true }: Props) {
  const color = ewwMeterColor(value);
  const padding = 10;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - padding * 2) / 2;
  const strokeW = 10;

  // Arc spans -130° to +130° (260° total sweep, centered at top)
  const START_ANGLE = -130;
  const END_ANGLE = 130;
  const TOTAL_SWEEP = END_ANGLE - START_ANGLE;

  // Target fill ratio (60% → 0.6, 80% → 0.8, 100% → 1.0)
  const fillRatio = value / 100;
  const targetEndAngle = START_ANGLE + TOTAL_SWEEP * fillRatio;

  const progress = useSharedValue(animated ? 0 : fillRatio);

  useEffect(() => {
    if (animated) {
      progress.value = withTiming(fillRatio, {
        duration: 900,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [value, animated]);

  const bgPath = arcPath(cx, cy, r, START_ANGLE, END_ANGLE);

  const animatedProps = useAnimatedProps(() => {
    const currentEnd = START_ANGLE + TOTAL_SWEEP * progress.value;
    return {
      d: arcPath(cx, cy, r, START_ANGLE, currentEnd),
    };
  });

  const label = `${value}%`;
  const sublabel = value === 100 ? 'MAX EWW' : value === 80 ? 'GROSS' : 'KINDA EWW';

  return (
    <View style={styles.wrapper}>
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background track — dark tan on parchment */}
        <Path
          d={bgPath}
          stroke={`${Colors.eww.tan}80`}
          strokeWidth={strokeW}
          fill="none"
          strokeLinecap="round"
        />
        {/* Animated fill */}
        <AnimatedPath
          animatedProps={animatedProps}
          stroke={color}
          strokeWidth={strokeW}
          fill="none"
          strokeLinecap="round"
        />
        {/* Center dot */}
        <Circle cx={cx} cy={cy} r={4} fill={color} />
      </Svg>
      {/* Center label */}
      <View style={styles.labelContainer}>
        <Text style={[styles.value, { color }]}>{label}</Text>
        <Text style={styles.sublabel}>{sublabel}</Text>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  value: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 26,
    fontWeight: '700',
  },
  sublabel: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.eww.barkLight,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});

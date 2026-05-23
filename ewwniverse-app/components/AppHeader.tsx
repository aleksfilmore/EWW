/**
 * AppHeader — the branded top bar for every tab screen.
 *
 * Layout:
 *   [⚙]   EWW         [✦ NNN]
 *        -NIVERSE
 *
 * EWW in Creepster green with dark outline.
 * -NIVERSE in Boogaloo white/light.
 * Points badge in purple, right-aligned.
 */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Path, Ellipse, Rect } from 'react-native-svg';
import { Colors, FontFamily, Spacing } from '@/constants/design';
import { useUserStore } from '@/store/userStore';

// Simple organic slime drip — 10 teardrop blobs hanging from a green bar
function SlimeDrip({ width = 400 }: { width?: number }) {
  const drips = [
    { cx: 28,  h: 18, rx: 7  },
    { cx: 70,  h: 12, rx: 5  },
    { cx: 110, h: 22, rx: 8  },
    { cx: 155, h: 14, rx: 6  },
    { cx: 195, h: 20, rx: 9  },
    { cx: 240, h: 10, rx: 5  },
    { cx: 280, h: 24, rx: 7  },
    { cx: 318, h: 16, rx: 6  },
    { cx: 355, h: 20, rx: 8  },
    { cx: 388, h: 12, rx: 5  },
  ];
  const barH = 5;
  const viewH = barH + 26;

  return (
    <Svg
      width="100%"
      height={viewH}
      viewBox={`0 0 ${width} ${viewH}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Solid green bar */}
      <Rect x={0} y={0} width={width} height={barH} fill={Colors.eww.green} />
      {/* Drip blobs */}
      {drips.map((d, i) => (
        <Ellipse
          key={i}
          cx={d.cx}
          cy={barH + d.h / 2 - 2}
          rx={d.rx}
          ry={d.h / 2}
          fill={Colors.eww.green}
        />
      ))}
    </Svg>
  );
}

export function AppHeader() {
  const profile = useUserStore((s) => s.profile);
  // Simple EWW-points: 10 per classified + 25 per mastered
  const points =
    (profile?.classified_count ?? 0) * 10 +
    (profile?.mastered_count ?? 0) * 25;

  return (
    <View style={styles.wrapper}>
      {/* Bar */}
      <View style={styles.bar}>
        {/* Left: gear */}
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Text style={styles.gearText}>⚙</Text>
        </TouchableOpacity>

        {/* Centre: logo */}
        <View style={styles.logoBlock}>
          <Text style={styles.ewwText}>EWW</Text>
          <Text style={styles.niverseText}>-NIVERSE</Text>
        </View>

        {/* Right: points */}
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>✦ {points}</Text>
        </View>
      </View>

      {/* Slime drip */}
      <SlimeDrip />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.bg.DEFAULT,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: 6,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.eww.amber + '30',
    borderWidth: 1,
    borderColor: Colors.eww.amber + '60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearText: {
    fontSize: 18,
    color: Colors.eww.amber,
  },
  logoBlock: {
    flex: 1,
    alignItems: 'center',
  },
  ewwText: {
    fontFamily: FontFamily.creepster,
    fontSize: 34,
    color: Colors.eww.green,
    lineHeight: 34,
    // Simulate the dark-green text stroke from the website
    textShadowColor: Colors.eww.forest,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 0,
    letterSpacing: 2,
  },
  niverseText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 16,
    color: 'rgba(255,255,255,0.70)',
    letterSpacing: 3,
    marginTop: -6,
  },
  pointsBadge: {
    backgroundColor: Colors.eww.purple,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: Colors.eww.purpleDark,
    minWidth: 64,
    alignItems: 'center',
  },
  pointsText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

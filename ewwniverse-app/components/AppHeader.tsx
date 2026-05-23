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
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors, FontFamily, Spacing } from '@/constants/design';
import { useUserStore } from '@/store/userStore';


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
      <Image
        source={require('../assets/slime-drip.png')}
        style={styles.slimeDrip}
        resizeMode="stretch"
      />
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
  slimeDrip: {
    width: '100%',
    height: 40,
  },
});

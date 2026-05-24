/**
 * AppHeader — branded top bar for every tab screen.
 *
 * Parchment background so the logo sits naturally on a cream surface.
 * The slime drip below transitions parchment → dark lab background.
 */
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors, FontFamily, Spacing } from '@/constants/design';
import { useUserStore } from '@/store/userStore';

export function AppHeader() {
  const profile = useUserStore((s) => s.profile);
  const points =
    (profile?.classified_count ?? 0) * 10 +
    (profile?.mastered_count ?? 0) * 25;

  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {/* Left: gear */}
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Text style={styles.gearText}>⚙</Text>
        </TouchableOpacity>

        {/* Centre: logo illustration */}
        <Image
          source={require('../assets/logo-header.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Right: points */}
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>✦ {points}</Text>
        </View>
      </View>

      {/* Slime drip — transitions parchment bar into the dark lab */}
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
    backgroundColor: Colors.bg.parchment,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingTop: 4,
    paddingBottom: 2,
    backgroundColor: Colors.bg.parchment,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.eww.forest}18`,
    borderWidth: 1,
    borderColor: `${Colors.eww.forest}30`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearText: {
    fontSize: 18,
    color: Colors.eww.bark,
  },
  logo: {
    flex: 1,
    height: 72,
    marginHorizontal: 4,
  },
  pointsBadge: {
    backgroundColor: Colors.eww.purple,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: Colors.eww.purpleDark,
    minWidth: 60,
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

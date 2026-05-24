/**
 * AppHeader — branded top bar.
 *
 * Scans badge (left) | EWW-NIVERSE logo (centre) | Streak badge (right)
 * Uses the illustrated assets from the mockup.
 */
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontFamily } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';

export function AppHeader() {
  const profile = useUserStore((s) => s.profile);
  const scans  = profile?.scan_balance ?? 0;
  const streak = profile?.streak_days  ?? 0;

  return (
    <View style={styles.wrapper}>
      {/* Scans badge */}
      <View style={styles.badge}>
        <Image source={Assets.badgeScans} style={styles.badgeImg} resizeMode="contain" />
        <View style={styles.badgeOverlay}>
          <Text style={styles.badgeValue}>{scans}</Text>
          <Text style={styles.badgeLabel}>SCANS</Text>
        </View>
      </View>

      {/* Centre: full illustrated logo */}
      <Image source={Assets.logoMain} style={styles.logo} resizeMode="contain" />

      {/* Streak badge */}
      <View style={styles.badge}>
        <Image source={Assets.badgeStreak} style={styles.badgeImg} resizeMode="contain" />
        <View style={styles.badgeOverlay}>
          <Text style={styles.badgeValue}>{streak}</Text>
          <Text style={styles.badgeLabel}>DAY STREAK</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 4,
    backgroundColor: 'transparent',
  },

  // Illustrated badge frame + text overlay
  badge: {
    width: 80,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    alignItems: 'center',
  },
  badgeValue: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 18,
    color: '#fff',
    fontWeight: '800',
    lineHeight: 20,
  },
  badgeLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 9,
    color: 'rgba(255,255,255,0.80)',
    letterSpacing: 0.8,
    lineHeight: 11,
  },

  // Centre logo
  logo: {
    flex: 1,
    height: 80,
  },
});

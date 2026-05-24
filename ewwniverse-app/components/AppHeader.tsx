/**
 * AppHeader — branded top bar.
 *
 * Scans counter (left) | EWW-NIVERSE logo (centre) | Streak counter (right)
 *
 * Badge frames are styled Views, not image illustrations, so there's
 * zero risk of illustration bleed on Android.
 */
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, FontFamily, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';

export function AppHeader() {
  const profile = useUserStore((s) => s.profile);
  const scans   = profile?.scan_balance ?? 0;
  const streak  = profile?.streak_days  ?? 0;

  return (
    <View style={styles.wrapper}>
      {/* Scans counter */}
      <View style={[styles.badge, styles.badgeScans]}>
        <Text style={styles.badgeValue}>{scans}</Text>
        <Text style={styles.badgeLabel}>SCANS</Text>
      </View>

      {/* Centre: illustrated logo */}
      <Image source={Assets.logoMain} style={styles.logo} resizeMode="contain" />

      {/* Streak counter */}
      <View style={[styles.badge, styles.badgeStreak]}>
        <Text style={styles.badgeValue}>{streak}</Text>
        <Text style={styles.badgeLabel}>DAY STREAK</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 12,
    paddingTop:        8,
    paddingBottom:     4,
    backgroundColor:   'transparent',
  },

  badge: {
    width:          74,
    height:         54,
    borderRadius:   Radius.lg,
    borderWidth:    1.5,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            1,
  },
  badgeScans: {
    backgroundColor: `${Colors.eww.green}18`,
    borderColor:     `${Colors.eww.green}55`,
  },
  badgeStreak: {
    backgroundColor: `${Colors.eww.amber}18`,
    borderColor:     `${Colors.eww.amber}55`,
  },

  badgeValue: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   22,
    color:      '#fff',
    lineHeight: 24,
  },
  badgeLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      9,
    color:         'rgba(255,255,255,0.65)',
    letterSpacing: 0.4,
    lineHeight:    11,
    textAlign:     'center',
  },

  logo: {
    flex:   1,
    height: 72,
  },
});

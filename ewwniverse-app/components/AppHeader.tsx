/**
 * AppHeader — branded top bar.
 *
 * Scans badge (left) | EWW-NIVERSE logo (centre) | Streak badge (right)
 *
 * Badge overlay is position:absolute so the text sits INSIDE the illustrated
 * frame, not below it. zIndex:2 guarantees it stays on top of the image.
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
        {/* Overlay is absolute so it floats ON the badge frame */}
        <View style={styles.badgeOverlay}>
          <Text style={styles.badgeValue}>{scans}</Text>
          <Text style={styles.badgeLabel}>SCANS</Text>
        </View>
      </View>

      {/* Centre: illustrated logo */}
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
    flexDirection:  'row',
    alignItems:     'center',
    paddingHorizontal: 8,
    paddingTop:     6,
    paddingBottom:  4,
    backgroundColor: 'transparent',
  },

  // Badge: fixed box so absoluteFill works correctly
  badge: {
    width:    90,
    height:   72,
  },
  badgeImg: {
    position: 'absolute',
    top:      0,
    left:     0,
    right:    0,
    bottom:   0,
  },
  // Overlay is absolute so it renders ON TOP of the image frame
  badgeOverlay: {
    position:       'absolute',
    top:            0,
    left:           0,
    right:          0,
    bottom:         0,
    alignItems:     'center',
    justifyContent: 'center',
    zIndex:         2,
  },
  badgeValue: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   22,
    color:      '#fff',
    fontWeight: '800',
    lineHeight: 24,
  },
  badgeLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    color:         'rgba(255,255,255,0.85)',
    letterSpacing: 0.8,
    lineHeight:    13,
  },

  // Centre logo
  logo: {
    flex:   1,
    height: 80,
  },
});

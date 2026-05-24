/**
 * DailySpecimenCard — home screen hero card.
 *
 * Layout:
 *   "TODAY'S GROSS CHALLENGE" label row
 *   Large jar illustration centred (jar-mystery with ??? or jar-classified + creature)
 *   Creature name (or ???)
 *   Fact preview (classified) / tease text (locked)
 *   Full-width CTA button
 *
 * The jar is the main attraction on the home screen — large and centred.
 */
import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { Creature } from '@/types/creature';
import { CREATURE_IMAGES } from '@/constants/creatureImages';
import { getDailyCreature } from '@/utils/daily';

const { width: SCREEN_W } = Dimensions.get('window');
const JAR_W = Math.min(SCREEN_W * 0.55, 220);   // large centred jar

interface Props {
  lastClaimed: string | null;
  isPaid: boolean;
}

export function DailySpecimenCard({ lastClaimed, isPaid }: Props) {
  const today       = new Date().toISOString().slice(0, 10);
  const claimed     = lastClaimed === today;
  const creature    = useMemo(() => getDailyCreature(), []);
  const creatureImg = CREATURE_IMAGES[creature.id];

  return (
    <TouchableOpacity
      onPress={() => router.push(`/creature/${creature.id}`)}
      activeOpacity={0.88}
      style={[styles.card, claimed && styles.cardClaimed]}
    >
      {/* ── Label row ──────────────────────────────────────────────── */}
      <View style={styles.labelRow}>
        <View style={styles.labelBadge}>
          <Text style={styles.labelText}>TODAY'S GROSS CHALLENGE</Text>
        </View>
        {!claimed ? (
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>2× SCANS</Text>
          </View>
        ) : (
          <View style={styles.claimedBadge}>
            <Text style={styles.claimedBadgeText}>DONE ✓</Text>
          </View>
        )}
      </View>

      {/* ── Hero jar — the main attraction ─────────────────────────── */}
      <View style={styles.jarHero}>
        {/* Jar frame fills the hero area */}
        <Image
          source={claimed ? Assets.jarClassified : Assets.jarMystery}
          style={styles.jarImg}
          resizeMode="contain"
        />

        {/* Creature inside jar (classified state only) */}
        {claimed && creatureImg && (
          <Image
            source={creatureImg}
            style={styles.creatureInJar}
            resizeMode="contain"
          />
        )}
      </View>

      {/* ── Creature name ───────────────────────────────────────────── */}
      <Text style={styles.creatureName}>
        {claimed ? creature.title.toUpperCase() : '???'}
      </Text>

      {/* ── Fact / tease text ───────────────────────────────────────── */}
      {claimed ? (
        <Text style={styles.factPreview} numberOfLines={3}>
          {creature.gross_fact}
        </Text>
      ) : (
        <Text style={styles.mysteryText}>
          Classify this specimen to reveal its gross secret
        </Text>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <View style={[styles.cta, claimed && styles.ctaClaimed]}>
        <Text style={[styles.ctaText, claimed && styles.ctaTextClaimed]}>
          {claimed ? 'VIEW SPECIMEN FILE  ›' : 'CLASSIFY NOW  ›'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     2.5,
    borderColor:     Colors.eww.green,
    padding:         Spacing.md,
    gap:             10,
    alignItems:      'center',
    shadowColor:     Colors.eww.green,
    shadowOffset:    { width: 0, height: 6 },
    shadowOpacity:   0.35,
    shadowRadius:    12,
    elevation:       8,
  },
  cardClaimed: {
    borderColor:   Colors.border.subtle,
    shadowOpacity: 0,
    elevation:     2,
  },

  // ── Label row ────────────────────────────────────────────────────────────
  labelRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    width:          '100%',
  },
  labelBadge: {
    backgroundColor: `${Colors.eww.green}22`,
    borderRadius:    Radius.full,
    borderWidth:     1,
    borderColor:     Colors.border.green,
    paddingHorizontal: 10,
    paddingVertical:   4,
  },
  labelText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.lime,
    letterSpacing: 1.2,
  },
  rewardBadge: {
    backgroundColor: Colors.eww.amber,
    borderRadius:    Radius.full,
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderWidth:       1.5,
    borderColor:       '#A06010',
  },
  rewardText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         '#2A1600',
    letterSpacing: 0.5,
  },
  claimedBadge: {
    backgroundColor: Colors.border.subtle,
    borderRadius:    Radius.full,
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderWidth:       1,
    borderColor:       Colors.border.subtle,
  },
  claimedBadgeText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.muted,
    letterSpacing: 0.5,
  },

  // ── Hero jar ──────────────────────────────────────────────────────────────
  jarHero: {
    width:            JAR_W,
    height:           JAR_W * 1.15,
    alignItems:       'center',
    justifyContent:   'center',
    position:         'relative',
  },
  jarImg: {
    position: 'absolute',
    top:      0,
    left:     0,
    right:    0,
    bottom:   0,
  },
  creatureInJar: {
    position:  'absolute',
    width:     JAR_W * 0.58,
    height:    JAR_W * 0.58,
    top:       '20%',
    alignSelf: 'center',
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  creatureName: {
    fontFamily:    FontFamily.creepster,
    fontSize:      24,
    color:         Colors.text.primary,
    letterSpacing: 1,
    textAlign:     'center',
    lineHeight:    28,
  },
  factPreview: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.secondary,
    lineHeight: 22,
    textAlign:  'center',
    paddingHorizontal: 4,
  },
  mysteryText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.muted,
    textAlign:  'center',
    lineHeight: 22,
  },

  // ── CTA ──────────────────────────────────────────────────────────────────
  cta: {
    width:           '100%',
    backgroundColor: Colors.eww.green,
    borderRadius:    Radius.md,
    paddingVertical: 14,
    alignItems:      'center',
  },
  ctaClaimed: {
    backgroundColor: Colors.bg.elevated,
  },
  ctaText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         '#000',
    letterSpacing: 1.2,
  },
  ctaTextClaimed: {
    color: Colors.text.secondary,
  },
});

/**
 * DailySpecimenCard — home screen hero card.
 *
 * Priority logic:
 *   1. If the user has classified at least one creature, show their LAST
 *      classified specimen as the featured card (it updates on every scan).
 *   2. If nothing has been classified yet, fall back to today's Daily
 *      Specimen so the card is never empty.
 *
 * The daily-bonus 2× scan mechanic is independent and is handled by
 * `creature/[id].tsx` when classifying the daily creature.
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
import { CREATURE_IMAGES } from '@/constants/creatureImages';
import { getDailyCreature } from '@/utils/daily';
import { getCreatureById } from '@/data/index';

const { width: SCREEN_W } = Dimensions.get('window');
// Large enough to be the focal point; capped so it doesn't dominate on tablets.
const JAR_W = Math.min(SCREEN_W * 0.70, 260);

interface Props {
  lastClaimed: string | null;
  isPaid: boolean;
  lastClassifiedId: string | null;
}

export function DailySpecimenCard({ lastClaimed, isPaid, lastClassifiedId }: Props) {
  const today   = new Date().toISOString().slice(0, 10);
  const claimed = lastClaimed === today;

  // If the user has scanned anything, show their latest find.
  // Otherwise fall back to today's daily creature.
  const lastClassifiedCreature = useMemo(() => {
    if (!lastClassifiedId) return null;
    return getCreatureById(lastClassifiedId) ?? null;
  }, [lastClassifiedId]);

  const dailyCreature = useMemo(() => getDailyCreature(), []);

  const isShowingLastClassified = !!lastClassifiedCreature;
  const creature     = lastClassifiedCreature ?? dailyCreature;
  const creatureImg  = CREATURE_IMAGES[creature.id];

  // Whether to render the full classified view (name + image + fact)
  // vs the mystery "???" teaser.
  const showClassified = isShowingLastClassified || claimed;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/creature/${creature.id}`)}
      activeOpacity={0.88}
      style={[styles.card, showClassified && styles.cardClassified]}
    >
      {/* ── Label row ──────────────────────────────────────────────── */}
      <View style={styles.labelRow}>
        <View style={[styles.labelBadge, isShowingLastClassified && styles.labelBadgeClassified]}>
          <Text style={[styles.labelText, isShowingLastClassified && styles.labelTextClassified]}>
            {isShowingLastClassified ? 'LAST SPECIMEN CLASSIFIED' : "TODAY'S GROSS CHALLENGE"}
          </Text>
        </View>

        {!isShowingLastClassified && (
          !claimed ? (
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>2× SCANS</Text>
            </View>
          ) : (
            <View style={styles.claimedBadge}>
              <Text style={styles.claimedBadgeText}>DONE ✓</Text>
            </View>
          )
        )}
      </View>

      {/* ── Hero jar — the main attraction ─────────────────────────── */}
      <View style={styles.jarHero}>
        {/* Jar frame — clipped to container on Android */}
        <Image
          source={showClassified ? Assets.jarClassified : Assets.jarMystery}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
        />

        {/* Creature image inside jar */}
        {showClassified && creatureImg && (
          <Image
            source={creatureImg}
            style={styles.creatureInJar}
            resizeMode="contain"
          />
        )}
      </View>

      {/* ── Creature name ───────────────────────────────────────────── */}
      <Text style={styles.creatureName}>
        {showClassified ? creature.title.toUpperCase() : '???'}
      </Text>

      {/* ── Fact / tease text ───────────────────────────────────────── */}
      {showClassified ? (
        <Text style={styles.factPreview} numberOfLines={3}>
          {creature.gross_fact}
        </Text>
      ) : (
        <Text style={styles.mysteryText}>
          Classify this specimen to reveal its gross secret
        </Text>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <View style={[styles.cta, showClassified && styles.ctaClassified]}>
        <Text style={[styles.ctaText, showClassified && styles.ctaTextClassified]}>
          {showClassified ? 'VIEW SPECIMEN FILE  ›' : 'CLASSIFY NOW  ›'}
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
  cardClassified: {
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
    backgroundColor:   `${Colors.eww.green}22`,
    borderRadius:      Radius.full,
    borderWidth:       1,
    borderColor:       Colors.border.green,
    paddingHorizontal: 10,
    paddingVertical:   4,
  },
  labelBadgeClassified: {
    backgroundColor: `${Colors.eww.purple}22`,
    borderColor:     Colors.border.DEFAULT,
  },
  labelText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.lime,
    letterSpacing: 1.2,
  },
  labelTextClassified: {
    color: Colors.text.purple,
  },
  rewardBadge: {
    backgroundColor:   Colors.eww.amber,
    borderRadius:      Radius.full,
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
    backgroundColor:   Colors.border.subtle,
    borderRadius:      Radius.full,
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
    width:    JAR_W,
    height:   JAR_W * 1.15,
    overflow: 'hidden',     // clip any bleed on Android
    alignItems:     'center',
    justifyContent: 'center',
  },
  creatureInJar: {
    position:  'absolute',
    width:     JAR_W * 0.65,
    height:    JAR_W * 0.65,
    top:       '18%',
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
    fontFamily:        FontFamily.boogaloo,
    fontSize:          15,
    color:             Colors.text.secondary,
    lineHeight:        22,
    textAlign:         'center',
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
  ctaClassified: {
    backgroundColor: Colors.bg.elevated,
  },
  ctaText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         '#000',
    letterSpacing: 1.2,
  },
  ctaTextClassified: {
    color: Colors.text.secondary,
  },
});

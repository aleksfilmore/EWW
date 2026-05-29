/**
 * DailySpecimenCard — home screen hero card.
 *
 * Priority logic:
 *   1. If the user has classified a creature since opening the app, show that
 *      creature (lastClassifiedId). Clears any pending special specimen.
 *   2. If a special specimen was unlocked via contamination event and no scan
 *      has happened since, show that specimen with a SLIME SURGE badge.
 *   3. Fall back to today's Daily Specimen (mystery jar) so the card is never empty.
 *
 * Classified state  → full-width 1:1 creature image (no jar wrapper).
 * Special specimen  → full-width 1:1 specimen image with green contamination styling.
 * Mystery state     → jar illustration at explicit pixel dimensions so it
 *                     cannot bleed outside its container on Android.
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
import { SPECIAL_SPECIMENS } from '@/data/special-specimens';
import { useUserStore } from '@/store/userStore';
import { IS_TABLET, CONTENT_W } from '@/constants/responsive';

// Cap width on tablet so the card matches the centred content column.
const { width: RAW_SCREEN_W } = Dimensions.get('window');
const SCREEN_W = IS_TABLET ? Math.min(RAW_SCREEN_W, CONTENT_W) : RAW_SCREEN_W;

// Full creature image occupies card inner width.
// Outer scroll padding: 16 each side (32 total).
// Card internal padding: Spacing.md (16) each side (32 total).
// Available: SCREEN_W − 64.
const IMG_SIZE = SCREEN_W - 64;

// Mystery jar rendered at fixed pixel dimensions — NEVER absoluteFill.
const JAR_W = Math.min(SCREEN_W * 0.52, 190);
const JAR_H = Math.round(JAR_W * 1.15);

interface Props {
  lastClaimed: string | null;
  isPaid: boolean;
  lastClassifiedId: string | null;
  lastUnlockedSpecimenId: string | null;
}

export function DailySpecimenCard({
  lastClaimed,
  isPaid,
  lastClassifiedId,
  lastUnlockedSpecimenId,
}: Props) {
  const clearLastUnlockedSpecimen = useUserStore((s) => s.clearLastUnlockedSpecimen);
  const today   = new Date().toISOString().slice(0, 10);
  const claimed = lastClaimed === today;

  const lastClassifiedCreature = useMemo(() => {
    if (!lastClassifiedId) return null;
    return getCreatureById(lastClassifiedId) ?? null;
  }, [lastClassifiedId]);

  const lastUnlockedSpecimen = useMemo(() => {
    if (!lastUnlockedSpecimenId) return null;
    return SPECIAL_SPECIMENS.find((s) => s.id === lastUnlockedSpecimenId) ?? null;
  }, [lastUnlockedSpecimenId]);

  const dailyCreature = useMemo(() => getDailyCreature(), []);

  // Priority 1: special specimen from Slime Surge (most exciting — show it first)
  // Priority 2: last classified creature
  // Priority 3: today's mystery daily specimen
  const isShowingSpecialSpecimen = !!lastUnlockedSpecimen;
  const isShowingLastClassified  = !isShowingSpecialSpecimen && !!lastClassifiedCreature;

  // The creature or specimen to display (matches priority above)
  const displayItem = lastUnlockedSpecimen ?? lastClassifiedCreature ?? dailyCreature;
  const creatureImg = CREATURE_IMAGES[displayItem.id];

  // Classified view: show full creature image with stamp
  const showClassified = isShowingLastClassified || isShowingSpecialSpecimen || claimed;

  // Label and badge text
  const labelText = isShowingSpecialSpecimen
    ? 'SLIME SURGE SPECIMEN'
    : isShowingLastClassified
    ? 'LAST SPECIMEN CLASSIFIED'
    : "TODAY'S GROSS CHALLENGE";

  const labelIsGreen = isShowingSpecialSpecimen;
  const labelIsClassified = isShowingLastClassified;

  // CTA destination
  const handlePress = () => {
    if (isShowingSpecialSpecimen) {
      // Clear the pinned special specimen so regular flow resumes after user visits Rewards
      clearLastUnlockedSpecimen();
      router.push('/(tabs)/recruit-file');
    } else {
      router.push(`/creature/${displayItem.id}`);
    }
  };

  const ctaText = isShowingSpecialSpecimen
    ? 'VIEW IN REWARDS  ›'
    : showClassified
    ? 'VIEW SPECIMEN FILE  ›'
    : 'CLASSIFY NOW  ›';

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.88}
      style={[
        styles.card,
        showClassified && !isShowingSpecialSpecimen && styles.cardClassified,
        isShowingSpecialSpecimen && styles.cardSpecial,
      ]}
    >
      {/* ── Label row ──────────────────────────────────────────────── */}
      <View style={styles.labelRow}>
        <View style={[
          styles.labelBadge,
          labelIsClassified && styles.labelBadgeClassified,
          labelIsGreen && styles.labelBadgeGreen,
        ]}>
          <Text style={[
            styles.labelText,
            labelIsClassified && styles.labelTextClassified,
            labelIsGreen && styles.labelTextGreen,
          ]}>
            {labelText}
          </Text>
        </View>

        {!isShowingLastClassified && !isShowingSpecialSpecimen && (
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
        {isShowingSpecialSpecimen && (
          <View style={styles.slimeBadge}>
            <Text style={styles.slimeBadgeText}>☣ NEW</Text>
          </View>
        )}
      </View>

      {/* ── Classified / Special: full-size creature image ──────────── */}
      {showClassified && (
        <View style={[
          styles.creatureHero,
          isShowingSpecialSpecimen && styles.creatureHeroSpecial,
        ]}>
          {creatureImg ? (
            <>
              <Image
                source={creatureImg}
                style={styles.creatureHeroImg}
                resizeMode="contain"
              />
              {/* Classified stamp overlay */}
              {!isShowingSpecialSpecimen && (
                <Image
                  source={Assets.classifiedStamp}
                  style={styles.heroStamp}
                  resizeMode="contain"
                />
              )}
              {isShowingSpecialSpecimen && (
                <View style={styles.heroContaminationBadge}>
                  <Text style={styles.heroContaminationText}>☣</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.creatureHeroPlaceholder} />
          )}
        </View>
      )}

      {/* ── Mystery: jar at explicit pixel size (no absoluteFill) ─── */}
      {!showClassified && (
        <View style={styles.jarMysteryWrap}>
          {/* Fixed pixel dimensions — cannot bleed outside on Android */}
          <Image
            source={Assets.jarMystery}
            style={{ width: JAR_W, height: JAR_H }}
            resizeMode="contain"
          />
        </View>
      )}

      {/* ── Creature name ───────────────────────────────────────────── */}
      <Text
        style={[styles.creatureName, isShowingSpecialSpecimen && styles.creatureNameSpecial]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.72}
      >
        {showClassified ? displayItem.title.toUpperCase() : '???'}
      </Text>

      {/* ── Fact / tease text ───────────────────────────────────────── */}
      {showClassified ? (
        <Text style={styles.factPreview} numberOfLines={3}>
          {displayItem.gross_fact}
        </Text>
      ) : (
        <Text style={styles.mysteryText}>
          Classify this specimen to reveal its gross secret
        </Text>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <View style={[
        styles.cta,
        showClassified && !isShowingSpecialSpecimen && styles.ctaClassified,
        isShowingSpecialSpecimen && styles.ctaSpecial,
      ]}>
        <Text style={[
          styles.ctaText,
          showClassified && !isShowingSpecialSpecimen && styles.ctaTextClassified,
          isShowingSpecialSpecimen && styles.ctaTextSpecial,
        ]}>
          {ctaText}
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
  cardSpecial: {
    borderColor:   Colors.eww.green,
    shadowColor:   Colors.eww.green,
    shadowOpacity: 0.45,
    elevation:     10,
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
  labelBadgeGreen: {
    backgroundColor: `${Colors.eww.green}28`,
    borderColor:     Colors.eww.green,
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
  labelTextGreen: {
    color: Colors.text.lime,
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
  slimeBadge: {
    backgroundColor:   `${Colors.eww.green}25`,
    borderRadius:      Radius.full,
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderWidth:       1.5,
    borderColor:       Colors.eww.green,
  },
  slimeBadgeText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         Colors.text.lime,
    letterSpacing: 0.5,
  },

  // ── Classified: full-size creature image ─────────────────────────────────
  creatureHero: {
    width:           IMG_SIZE,
    height:          IMG_SIZE,
    borderRadius:    Radius.lg,
    overflow:        'hidden',
    backgroundColor: Colors.bg.elevated,
    borderWidth:     1,
    borderColor:     `${Colors.eww.purple}30`,
    alignItems:      'center',
    justifyContent:  'center',
  },
  creatureHeroSpecial: {
    borderColor:   `${Colors.eww.green}55`,
    borderWidth:   2,
  },
  creatureHeroImg: {
    width:  '100%',
    height: '100%',
  },
  heroStamp: {
    position: 'absolute',
    bottom:   8,
    right:    8,
    width:    IMG_SIZE * 0.26,
    height:   IMG_SIZE * 0.26,
  },
  heroContaminationBadge: {
    position:        'absolute',
    bottom:          10,
    right:           10,
    width:           48,
    height:          48,
    borderRadius:    24,
    backgroundColor: 'rgba(10,40,6,0.82)',
    alignItems:      'center',
    justifyContent:  'center',
  },
  heroContaminationText: {
    fontSize:  26,
    color:     Colors.eww.green,
  },
  creatureHeroPlaceholder: {
    width:            '100%',
    height:           '100%',
    backgroundColor:  Colors.bg.elevated,
  },

  // ── Mystery jar ───────────────────────────────────────────────────────────
  jarMysteryWrap: {
    alignItems:      'center',
    justifyContent:  'center',
    paddingVertical: 8,
  },

  // ── Text ─────────────────────────────────────────────────────────────────
  creatureName: {
    fontFamily:    FontFamily.creepster,
    fontSize:      24,
    color:         Colors.text.primary,
    letterSpacing: 1,
    textAlign:     'center',
    lineHeight:    28,
    width:         '100%',
  },
  creatureNameSpecial: {
    color: Colors.text.lime,
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
    backgroundColor: Colors.eww.green,
  },
  ctaSpecial: {
    backgroundColor: Colors.eww.green,
  },
  ctaText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         '#000',
    letterSpacing: 1.2,
  },
  ctaTextClassified: {
    color: '#000',
  },
  ctaTextSpecial: {
    color: '#000',
  },
});

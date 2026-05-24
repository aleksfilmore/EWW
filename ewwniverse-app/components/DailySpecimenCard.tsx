/**
 * DailySpecimenCard — hero home-screen card.
 *
 * Dark-purple lab aesthetic with jar mystery illustration.
 * Shows today's creature name + gross fact preview + CLASSIFY NOW CTA.
 */
import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { creepyCreatures } from '@/data/index';
import { Creature } from '@/types/creature';
import { CREATURE_IMAGES } from '@/constants/creatureImages';

interface Props {
  lastClaimed: string | null;
  isPaid: boolean;
}

function getDailyCreature(): Creature {
  const dayNum = Math.floor(Date.now() / 86_400_000);
  const pool   = creepyCreatures as Creature[];
  return pool[dayNum % pool.length];
}

export function DailySpecimenCard({ lastClaimed, isPaid }: Props) {
  const today    = new Date().toISOString().slice(0, 10);
  const claimed  = lastClaimed === today;
  const creature = useMemo(() => getDailyCreature(), []);
  const creatureImg = CREATURE_IMAGES[creature.id];

  return (
    <TouchableOpacity
      onPress={() => router.push(`/creature/${creature.id}`)}
      activeOpacity={0.88}
      style={[styles.card, claimed && styles.cardClaimed]}
    >
      {/* Top label row */}
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

      {/* Body: jar thumbnail + creature info */}
      <View style={styles.body}>
        <View style={styles.jarThumb}>
          <Image
            source={claimed ? Assets.jarClassified : Assets.jarMystery}
            style={StyleSheet.absoluteFill}
            resizeMode="contain"
          />
          {claimed && creatureImg && (
            <Image
              source={creatureImg}
              style={styles.thumbCreature}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.creatureName}>
            {claimed ? creature.title : '???'}
          </Text>
          {claimed ? (
            <Text style={styles.factPreview} numberOfLines={3}>
              {creature.gross_fact}
            </Text>
          ) : (
            <Text style={styles.mysteryText}>
              Classify to reveal this specimen
            </Text>
          )}
        </View>
      </View>

      {/* CTA button */}
      <View style={[styles.ctaRow, claimed && styles.ctaRowClaimed]}>
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
    gap:             12,
    shadowColor:     Colors.eww.green,
    shadowOffset:    { width: 0, height: 6 },
    shadowOpacity:   0.35,
    shadowRadius:    12,
    elevation:       8,
  },
  cardClaimed: {
    borderColor:  Colors.border.subtle,
    shadowOpacity: 0,
    elevation:     2,
  },

  labelRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
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
    fontSize:      11,
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
    fontSize:      12,
    color:         '#2A1600',
    letterSpacing: 0.5,
  },
  claimedBadge: {
    backgroundColor: `${Colors.border.subtle}`,
    borderRadius:    Radius.full,
    paddingHorizontal: 10,
    paddingVertical:   4,
    borderWidth:       1,
    borderColor:       Colors.border.subtle,
  },
  claimedBadgeText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 0.5,
  },

  body: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing.md,
  },

  jarThumb: {
    width:          72,
    height:         88,
    alignItems:     'center',
    justifyContent: 'center',
    position:       'relative',
    flexShrink:     0,
  },
  thumbCreature: {
    width:    38,
    height:   38,
    position: 'absolute',
    top:      '18%',
  },

  info: { flex: 1, gap: 5 },
  creatureName: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         Colors.text.primary,
    letterSpacing: 0.8,
    lineHeight:    25,
  },
  factPreview: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.text.secondary,
    lineHeight: 18,
  },
  mysteryText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.text.muted,
    fontStyle:  'italic',
  },

  ctaRow: {
    backgroundColor: Colors.eww.green,
    borderRadius:    Radius.md,
    paddingVertical: 12,
    alignItems:      'center',
  },
  ctaRowClaimed: {
    backgroundColor: Colors.bg.elevated,
  },
  ctaText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      20,
    color:         '#000',
    letterSpacing: 1.2,
  },
  ctaTextClaimed: {
    color: Colors.text.secondary,
  },
});

/**
 * DailySpecimenCard — hero card for the home screen.
 * Today's featured creature, prominently displayed.
 * Shows 2x scan reward badge if not yet classified today.
 */
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { creepyCreatures } from '@/data/index';
import { Creature } from '@/types/creature';

interface Props {
  lastClaimed: string | null;
  isPaid: boolean;
}

function getDailyCreature(isPaid: boolean): Creature {
  const dayNum = Math.floor(Date.now() / 86_400_000);
  const pool = creepyCreatures as Creature[];
  return pool[dayNum % pool.length];
}

export function DailySpecimenCard({ lastClaimed, isPaid }: Props) {
  const today    = new Date().toISOString().slice(0, 10);
  const claimed  = lastClaimed === today;
  const creature = useMemo(() => getDailyCreature(isPaid), [isPaid]);

  return (
    <TouchableOpacity
      onPress={() => router.push(`/creature/${creature.id}`)}
      activeOpacity={0.88}
      style={[styles.card, claimed && styles.cardClaimed]}
    >
      {/* Header row */}
      <View style={styles.headerRow}>
        <View style={styles.labelBadge}>
          <Text style={styles.labelText}>TODAY'S GROSS CHALLENGE</Text>
        </View>
        {!claimed && (
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>2× SCANS</Text>
          </View>
        )}
        {claimed && (
          <View style={styles.claimedBadge}>
            <Text style={styles.claimedBadgeText}>DONE ✓</Text>
          </View>
        )}
      </View>

      {/* Creature info */}
      <View style={styles.body}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>🦠</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.creatureName}>{creature.title}</Text>
          <Text style={styles.factPreview} numberOfLines={2}>
            {creature.gross_fact}
          </Text>
        </View>
      </View>

      {/* CTA */}
      <View style={[styles.ctaRow, claimed && styles.ctaRowClaimed]}>
        <Text style={[styles.ctaText, claimed && styles.ctaTextClaimed]}>
          {claimed ? 'VIEW SPECIMEN FILE' : 'CLASSIFY NOW'} ›
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bg.parchment,
    borderRadius: Radius.lg,
    borderWidth: 3,
    borderColor: Colors.eww.green,
    padding: 16,
    gap: 12,
    // Prominent shadow
    shadowColor: Colors.eww.greenDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.40,
    shadowRadius: 10,
    elevation: 8,
  },
  cardClaimed: {
    borderColor: Colors.eww.tan,
    shadowOpacity: 0,
    elevation: 2,
    opacity: 0.85,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelBadge: {
    backgroundColor: Colors.eww.forest,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  labelText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 11,
    color: Colors.eww.greenLight,
    letterSpacing: 1.2,
  },
  rewardBadge: {
    backgroundColor: Colors.eww.amber,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#A06010',
  },
  rewardText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: '#2A1600',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  claimedBadge: {
    backgroundColor: `${Colors.eww.tan}50`,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.eww.tan,
  },
  claimedBadgeText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 11,
    color: Colors.eww.barkLight,
    letterSpacing: 0.5,
  },

  body: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emojiContainer: {
    width: 64,
    height: 64,
    backgroundColor: `${Colors.eww.greenDark}20`,
    borderRadius: Radius.md,
    borderWidth: 2,
    borderColor: `${Colors.eww.green}50`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 36 },
  info: { flex: 1, gap: 4 },
  creatureName: {
    fontFamily: FontFamily.creepster,
    fontSize: 22,
    color: Colors.eww.forest,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  factPreview: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 14,
    color: Colors.eww.bark,
    lineHeight: 19,
  },

  ctaRow: {
    backgroundColor: Colors.eww.green,
    borderRadius: Radius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaRowClaimed: {
    backgroundColor: `${Colors.eww.tan}60`,
  },
  ctaText: {
    fontFamily: FontFamily.creepster,
    fontSize: 20,
    color: '#fff',
    letterSpacing: 1.2,
  },
  ctaTextClaimed: {
    color: Colors.eww.barkLight,
  },
});

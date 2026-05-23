/**
 * DailySpecimenCard — today's featured creature.
 * Shows 2x scan reward if classified within 24 hours.
 * Creature ID rotates server-side; until Firebase is up, uses a deterministic local rotation.
 */
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Colors, Spacing, Radius } from '@/constants/design';
import { creepyCreatures } from '@/data/index';
import { Creature } from '@/types/creature';

interface Props {
  lastClaimed: string | null;
  isPaid: boolean;
}

function getDailyCreature(isPaid: boolean): Creature {
  // Deterministic rotation by day number (until Cloud Functions take over)
  const dayNum = Math.floor(Date.now() / 86_400_000);
  const pool = creepyCreatures as Creature[]; // free tier: Creepy Creatures only
  return pool[dayNum % pool.length];
}

export function DailySpecimenCard({ lastClaimed, isPaid }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const claimed = lastClaimed === today;
  const creature = useMemo(() => getDailyCreature(isPaid), [isPaid]);

  return (
    <TouchableOpacity
      style={[styles.card, claimed && styles.cardClaimed]}
      onPress={() => router.push(`/creature/${creature.id}`)}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.labelRow}>
          <Text style={styles.dayLabel}>DAILY SPECIMEN</Text>
          {!claimed && (
            <View style={styles.bonusBadge}>
              <Text style={styles.bonusText}>2× SCANS</Text>
            </View>
          )}
        </View>
        {claimed && <Text style={styles.claimedText}>Classified today ✓</Text>}
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
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: `${Colors.eww.green}44`,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  cardClaimed: {
    borderColor: Colors.border.subtle,
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.eww.green,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  bonusBadge: {
    backgroundColor: `${Colors.eww.gold}33`,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.eww.gold,
  },
  bonusText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.eww.gold,
    letterSpacing: 0.5,
  },
  claimedText: {
    fontSize: 11,
    color: Colors.eww.green,
    fontWeight: '600',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emojiContainer: {
    width: 48,
    height: 48,
    backgroundColor: Colors.bg.elevated,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  creatureName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  factPreview: {
    fontSize: 12,
    color: Colors.text.muted,
    lineHeight: 16,
  },
  arrow: {
    fontSize: 18,
    color: Colors.eww.green,
    fontWeight: '700',
  },
});

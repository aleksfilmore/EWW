/**
 * DailySpecimenCard — today's featured creature.
 * Shows 2x scan reward if classified within 24 hours.
 * Creature ID rotates server-side; until Firebase is up, uses a deterministic local rotation.
 */
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { ParchmentCard } from '@/components/ParchmentCard';
import { SectionLabel } from '@/components/SectionLabel';
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
      onPress={() => router.push(`/creature/${creature.id}`)}
      activeOpacity={0.8}
      style={claimed ? { opacity: 0.72 } : undefined}
    >
      <ParchmentCard accentColor={claimed ? Colors.eww.tan : Colors.eww.green}>
        <SectionLabel
          label="DAILY SPECIMEN"
          action={claimed ? undefined : '2× SCANS'}
        />
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
          <Text style={styles.arrow}>›</Text>
        </View>
        {claimed && (
          <Text style={styles.claimedText}>Classified today ✓</Text>
        )}
      </ParchmentCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emojiContainer: {
    width: 48,
    height: 48,
    backgroundColor: `${Colors.eww.greenDark}22`,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: `${Colors.eww.green}40`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  creatureName: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 17,
    color: Colors.text.onParchment,
    marginBottom: 3,
  },
  factPreview: {
    fontSize: 12,
    color: Colors.text.onParchmentMuted,
    lineHeight: 16,
  },
  claimedText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.eww.greenDark,
    marginTop: 6,
    letterSpacing: 0.3,
  },
  arrow: {
    fontSize: 22,
    color: Colors.eww.greenDark,
    fontWeight: '700',
  },
});

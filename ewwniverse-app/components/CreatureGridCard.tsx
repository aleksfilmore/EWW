/**
 * CreatureGridCard — compact card for the collection grid.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Creature, ClassifiedState } from '@/types/creature';
import { Colors, Radius } from '@/constants/design';
import { ewwMeterColor } from '@/constants/design';
import { EwwMeter } from '@/types/creature';

interface Props {
  creature: Creature;
  state: ClassifiedState;
  size: number;
  onPress: () => void;
}

export function CreatureGridCard({ creature, state, size, onPress }: Props) {
  const isClassified = state === 'classified' || state === 'mastered';
  const ewwColor = ewwMeterColor(creature.eww_meter as EwwMeter);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.card,
        { width: size, height: size },
        isClassified && { borderColor: `${ewwColor}55` },
        state === 'mastered' && { borderColor: Colors.eww.gold },
      ]}
    >
      {/* EWW-meter dot */}
      <View style={[styles.ewwDot, { backgroundColor: ewwColor }]} />

      {/* State indicator */}
      {state === 'locked' ? (
        <View style={styles.lockedOverlay}>
          <Text style={styles.lockIcon}>🔒</Text>
        </View>
      ) : (
        <View style={styles.imageArea}>
          {/* Placeholder — swap for actual image when assets are linked */}
          <Text style={styles.placeholderEmoji}>🦠</Text>
        </View>
      )}

      {/* Title (only when classified) */}
      {isClassified && (
        <Text style={styles.title} numberOfLines={2}>
          {creature.title}
        </Text>
      )}

      {/* Mastered star */}
      {state === 'mastered' && (
        <View style={styles.masteredBadge}>
          <Text style={styles.masteredText}>★</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  ewwDot: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  lockedOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: { fontSize: 28, opacity: 0.3 },
  imageArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: { fontSize: 32 },
  title: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 12,
    marginTop: 4,
  },
  masteredBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.eww.gold,
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  masteredText: { fontSize: 9, color: '#000', fontWeight: '900' },
});

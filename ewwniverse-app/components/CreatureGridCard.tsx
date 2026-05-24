/**
 * CreatureGridCard — jar-frame grid cell matching the mockup.
 *
 * locked     → locked jar frame (dark, lock on lid, "???" text)
 * classified → classified jar frame with creature image inside
 * mastered   → classified jar frame + gold star badge
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Creature, ClassifiedState } from '@/types/creature';
import { Colors, Radius, FontFamily } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { CREATURE_IMAGES } from '@/constants/creatureImages';

interface Props {
  creature: Creature;
  state: ClassifiedState;
  size: number;
  onPress: () => void;
}

export function CreatureGridCard({ creature, state, size, onPress }: Props) {
  const isClassified = state === 'classified' || state === 'mastered';
  const creatureImg  = CREATURE_IMAGES[creature.id];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.cell, { width: size, height: size * 1.15 }]}
    >
      {/* Jar frame — fills the cell */}
      <Image
        source={isClassified ? Assets.jarClassified : Assets.jarLockedFrame}
        style={styles.jarFrame}
        resizeMode="contain"
      />

      {/* Creature image inside jar (classified / mastered only) */}
      {isClassified && creatureImg && (
        <Image
          source={creatureImg}
          style={[styles.creatureInJar, { width: size * 0.52, height: size * 0.52 }]}
          resizeMode="contain"
        />
      )}

      {/* Mastered star badge */}
      {state === 'mastered' && (
        <View style={styles.starBadge}>
          <Text style={styles.starText}>★</Text>
        </View>
      )}

      {/* Creature name (classified only) */}
      {isClassified && (
        <Text style={styles.name} numberOfLines={2}>
          {creature.title.toUpperCase()}
        </Text>
      )}

      {/* Mystery label (locked) */}
      {!isClassified && (
        <Text style={styles.mystery}>???</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  jarFrame: {
    width: '100%',
    flex: 1,
  },
  creatureInJar: {
    position: 'absolute',
    top: '18%',        // sits inside the jar body
    alignSelf: 'center',
  },
  starBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.eww.gold,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starText: {
    fontSize: 10,
    color: '#000',
    fontWeight: '900',
  },
  name: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 9,
    color: Colors.text.primary,
    textAlign: 'center',
    lineHeight: 11,
    letterSpacing: 0.3,
    marginTop: 2,
    paddingHorizontal: 2,
  },
  mystery: {
    position: 'absolute',
    bottom: '28%',
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.text.muted,
    letterSpacing: 2,
  },
});

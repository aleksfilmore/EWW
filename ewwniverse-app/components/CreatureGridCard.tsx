/**
 * CreatureGridCard — jar-frame grid cell matching the mockup.
 *
 * locked     → locked jar frame (dark, lock on lid, "???" text)
 * classified → classified jar frame + creature image inside clipped oval
 * mastered   → classified jar frame + creature image + gold star badge
 *
 * The jar-classified illustration already has the CLASSIFIED stamp embedded,
 * so we do NOT add a separate stamp overlay (that was causing the double stamp).
 *
 * Creature images are clipped to an oval to handle solid-background JPEGs
 * (dinosaurs, earth creatures) — they look correct inside the jar body.
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

  // Creature clip area: oval to match jar body, centered in jar
  // Lid is ~25% of height; body center is around 55% from top.
  // clipSize = 46% of width; top offset places it in the middle of the body.
  const clipSize  = Math.round(size * 0.46);

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

      {/* Creature inside jar — oval clip so solid-BG JPEGs look natural */}
      {isClassified && creatureImg && (
        <View
          style={[
            styles.creatureClip,
            {
              width:        clipSize,
              height:       clipSize,
              borderRadius: clipSize / 2,
              top:          Math.round(size * 0.29),
            },
          ]}
        >
          <Image
            source={creatureImg}
            style={styles.creatureImg}
            resizeMode="cover"
          />
        </View>
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
    alignItems:     'center',
    justifyContent: 'flex-start',
  },
  jarFrame: {
    width: '100%',
    flex:  1,
  },

  // Oval clipping container for creature image
  creatureClip: {
    position:  'absolute',
    alignSelf: 'center',
    overflow:  'hidden',
  },
  creatureImg: {
    width:  '100%',
    height: '100%',
  },

  starBadge: {
    position:        'absolute',
    top:             2,
    right:           2,
    backgroundColor: Colors.eww.gold,
    borderRadius:    10,
    width:           18,
    height:          18,
    alignItems:      'center',
    justifyContent:  'center',
  },
  starText: {
    fontSize:   10,
    color:      '#000',
    fontWeight: '900',
  },
  name: {
    fontFamily:        FontFamily.boogaloo,
    fontSize:          10,
    color:             Colors.text.primary,
    textAlign:         'center',
    lineHeight:        12,
    letterSpacing:     0.3,
    marginTop:         2,
    paddingHorizontal: 2,
  },
  mystery: {
    position:      'absolute',
    bottom:        '28%',
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.muted,
    letterSpacing: 2,
  },
});

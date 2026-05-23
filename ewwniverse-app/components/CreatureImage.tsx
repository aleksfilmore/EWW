/**
 * CreatureImage — shows the creature in its current classified state.
 * locked → placeholder silhouette
 * silhouette → greyed-out creature (reveal animation)
 * classified / mastered → full colour image
 *
 * Images are loaded from local assets (bundled with the app) for Creepy Creatures.
 * Cloudinary URLs will be used for Dinos + Earth once the CDN is set up.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Creature, ClassifiedState } from '@/types/creature';
import { Colors, Radius } from '@/constants/design';
import { ewwMeterColor } from '@/constants/design';
import { EwwMeter } from '@/types/creature';
import { CREATURE_IMAGES } from '@/assets/creatures/index';

interface Props {
  creature: Creature;
  state: ClassifiedState;
  size?: number;
}

/**
 * Maps a creature title to a local asset path.
 * Currently wires up Creepy Creatures from the local assets folder.
 * Dinos and Earth will use Cloudinary URLs.
 *
 * NOTE: require() must use string literals for Metro bundler to pick up assets.
 * Until we have all 75 images in /assets/creatures/, we use the placeholder.
 */
function getImageSource(creature: Creature, state: ClassifiedState) {
  if (state === 'locked') return null;
  // Bundled assets for Creepy Creatures; other books will use Cloudinary URLs
  return CREATURE_IMAGES[creature.id] ?? null;
}

export function CreatureImage({ creature, state, size = 200 }: Props) {
  const source = getImageSource(creature, state);
  const ewwColor = ewwMeterColor(creature.eww_meter as EwwMeter);
  const isClassified = state === 'classified' || state === 'mastered';

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size },
        isClassified && { borderColor: `${ewwColor}44` },
        state === 'mastered' && { borderColor: Colors.eww.gold },
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            { width: size - 16, height: size - 16 },
            state === 'silhouette' && styles.silhouette,
          ]}
          contentFit="contain"
          transition={600}
        />
      ) : (
        // Placeholder until images are bundled
        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>
            {state === 'locked' ? '?' : '🦠'}
          </Text>
          {state !== 'locked' && (
            <Text style={styles.placeholderName} numberOfLines={2}>
              {creature.title}
            </Text>
          )}
        </View>
      )}

      {state === 'mastered' && (
        <View style={styles.masteredBadge}>
          <Text style={styles.masteredText}>★</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
    backgroundColor: Colors.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    borderRadius: Radius.lg,
  },
  silhouette: {
    tintColor: Colors.bg.elevated,
    opacity: 0.6,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  placeholderEmoji: {
    fontSize: 60,
  },
  placeholderName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  masteredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.eww.gold,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  masteredText: { fontSize: 14, color: '#000', fontWeight: '900' },
});

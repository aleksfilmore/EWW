/**
 * Collection tab — creature grid.
 * Shows locked/silhouette/classified/mastered states.
 * Free tier: Creepy Creatures only. Paid: all books.
 */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { Colors, Spacing, Radius } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { BOOKS } from '@/constants/game';
import { creepyCreatures, creepyDinosaurs, creepyEarth } from '@/data/index';
import { Creature, Book } from '@/types/creature';
import { CreatureGridCard } from '@/components/CreatureGridCard';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_GAP = 10;
const COLS = 3;
const CARD_SIZE = (SCREEN_W - Spacing.md * 2 - CARD_GAP * (COLS - 1)) / COLS;

const BOOK_DATA: Record<Book, Creature[]> = {
  'creepy-creatures': creepyCreatures as Creature[],
  'creepy-dinosaurs': creepyDinosaurs as Creature[],
  'creepy-earth':     creepyEarth    as Creature[],
};

export default function Collection() {
  const profile = useUserStore((s) => s.profile);
  const creatures = useUserStore((s) => s.creatures);
  const [activeBook, setActiveBook] = useState<Book>('creepy-creatures');

  if (!profile) return null;

  const isPaid = profile.is_paid;
  const bookCreatures = BOOK_DATA[activeBook];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Collection</Text>
        <Text style={styles.sub}>
          {profile.classified_count} classified
        </Text>
      </View>

      {/* Book selector */}
      <View style={styles.bookTabs}>
        {BOOKS.map((b) => {
          const locked = b.tier === 'paid' && !isPaid;
          const active = activeBook === b.id;
          return (
            <TouchableOpacity
              key={b.id}
              onPress={() => {
                if (locked) {
                  router.push('/paywall');
                  return;
                }
                setActiveBook(b.id);
              }}
              style={[
                styles.bookTab,
                active && styles.bookTabActive,
                locked && styles.bookTabLocked,
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.bookTabLabel,
                  active && { color: Colors.eww.green },
                  locked && { color: Colors.text.disabled },
                ]}
                numberOfLines={1}
              >
                {locked ? '🔒 ' : ''}
                {b.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Grid */}
      <FlatList
        data={bookCreatures}
        keyExtractor={(item) => item.id}
        numColumns={COLS}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: CARD_GAP }}
        ItemSeparatorComponent={() => <View style={{ height: CARD_GAP }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const userCreature = creatures[item.id];
          const state = userCreature?.state ?? 'locked';
          return (
            <CreatureGridCard
              creature={item}
              state={state}
              size={CARD_SIZE}
              onPress={() => router.push(`/creature/${item.id}`)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  sub: {
    fontSize: 13,
    color: Colors.text.muted,
  },
  bookTabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: 8,
    marginBottom: Spacing.sm,
  },
  bookTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    backgroundColor: Colors.bg.card,
    alignItems: 'center',
  },
  bookTabActive: {
    borderColor: Colors.eww.green,
    backgroundColor: `${Colors.eww.green}15`,
  },
  bookTabLocked: {
    borderColor: Colors.border.subtle,
    opacity: 0.6,
  },
  bookTabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.text.secondary,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  grid: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
});

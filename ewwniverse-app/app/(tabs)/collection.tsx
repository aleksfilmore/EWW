/**
 * EXPLORE — Specimen Files grid.
 * Shows all creatures in a 3-column parchment grid.
 * Book selector pills match the website's category pill style.
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
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { BOOKS } from '@/constants/game';
import { creepyCreatures, creepyDinosaurs, creepyEarth } from '@/data/index';
import { Creature, Book } from '@/types/creature';
import { CreatureGridCard } from '@/components/CreatureGridCard';
import { AppHeader } from '@/components/AppHeader';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_GAP = 10;
const COLS = 3;
const CARD_SIZE = (SCREEN_W - Spacing.md * 2 - CARD_GAP * (COLS - 1)) / COLS;

const BOOK_DATA: Record<Book, Creature[]> = {
  'creepy-creatures': creepyCreatures as Creature[],
  'creepy-dinosaurs': creepyDinosaurs as Creature[],
  'creepy-earth':     creepyEarth    as Creature[],
};

export default function Explore() {
  const profile = useUserStore((s) => s.profile);
  const creatures = useUserStore((s) => s.creatures);
  const [activeBook, setActiveBook] = useState<Book>('creepy-creatures');

  if (!profile) return null;

  const isPaid = profile.is_paid;
  const bookCreatures = BOOK_DATA[activeBook];
  const total = bookCreatures.length;
  const found = bookCreatures.filter(
    (c) => (creatures[c.id]?.state ?? 'locked') !== 'locked'
  ).length;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppHeader />

      {/* Page title */}
      <View style={styles.titleBlock}>
        <Text style={styles.pageTitle}>SPECIMEN FILES</Text>
        <Text style={styles.pageSub}>COLLECT  •  STUDY  •  DISCOVER</Text>
      </View>

      {/* Book selector pills */}
      <View style={styles.bookTabs}>
        {BOOKS.map((b) => {
          const locked = b.tier === 'paid' && !isPaid;
          const active = activeBook === b.id;
          return (
            <TouchableOpacity
              key={b.id}
              onPress={() => {
                if (locked) { router.push('/paywall'); return; }
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
                  active && styles.bookTabLabelActive,
                  locked && styles.bookTabLabelLocked,
                ]}
                numberOfLines={1}
              >
                {locked ? '🔒 ' : ''}{b.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Progress summary pill */}
      <View style={styles.progressPill}>
        <Text style={styles.progressText}>
          {found} / {total} discovered
        </Text>
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
          const state = creatures[item.id]?.state ?? 'locked';
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

  titleBlock: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: `${Colors.eww.green}30`,
    marginHorizontal: Spacing.md,
    marginBottom: 10,
  },
  pageTitle: {
    fontFamily: FontFamily.creepster,
    fontSize: 30,
    color: Colors.bg.parchment,
    letterSpacing: 2,
    textShadowColor: Colors.eww.greenDark,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 0,
  },
  pageSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.eww.green,
    letterSpacing: 3,
    marginTop: 2,
  },

  bookTabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: 7,
    marginBottom: 8,
  },
  bookTab: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
    backgroundColor: Colors.bg.card,
    alignItems: 'center',
  },
  bookTabActive: {
    borderColor: Colors.eww.green,
    backgroundColor: `${Colors.eww.forest}CC`,
  },
  bookTabLocked: {
    opacity: 0.5,
  },
  bookTabLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 10,
    color: Colors.text.secondary,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  bookTabLabelActive: {
    color: Colors.eww.greenLight,
  },
  bookTabLabelLocked: {
    color: Colors.text.disabled,
  },

  progressPill: {
    alignSelf: 'center',
    backgroundColor: `${Colors.eww.amber}22`,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: `${Colors.eww.amber}50`,
    paddingHorizontal: 14,
    paddingVertical: 3,
    marginBottom: 10,
  },
  progressText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.eww.amber,
    letterSpacing: 0.5,
  },

  grid: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});

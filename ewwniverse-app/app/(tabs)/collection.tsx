/**
 * EXPLORE — Specimen Files grid.
 * Illustrated book tabs, jar-frame creature cards.
 */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { BOOKS } from '@/constants/game';
import { creepyCreatures, creepyDinosaurs, creepyEarth } from '@/data/index';
import { Creature, Book } from '@/types/creature';
import { CreatureGridCard } from '@/components/CreatureGridCard';
import { AppHeader } from '@/components/AppHeader';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_GAP  = 8;
const COLS      = 3;
const CARD_SIZE = (SCREEN_W - Spacing.md * 2 - CARD_GAP * (COLS - 1)) / COLS;

const BOOK_DATA: Record<Book, Creature[]> = {
  'creepy-creatures': creepyCreatures as Creature[],
  'creepy-dinosaurs': creepyDinosaurs as Creature[],
  'creepy-earth':     creepyEarth    as Creature[],
};

const BOOK_ICONS: Record<Book, ReturnType<typeof require>> = {
  'creepy-creatures': Assets.tabCreatures,
  'creepy-dinosaurs': Assets.tabDinosaurs,
  'creepy-earth':     Assets.tabEarth,
};

export default function Explore() {
  const profile  = useUserStore((s) => s.profile);
  const creatures = useUserStore((s) => s.creatures);
  const [activeBook, setActiveBook] = useState<Book>('creepy-creatures');

  if (!profile) return null;

  const isPaid       = profile.is_paid;
  const bookCreatures = BOOK_DATA[activeBook];
  const total = bookCreatures.length;
  const found = bookCreatures.filter(
    (c) => (creatures[c.id]?.state ?? 'locked') !== 'locked',
  ).length;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppHeader />

      {/* Page title */}
      <View style={styles.titleBlock}>
        <Text style={styles.pageTitle}>SPECIMEN FILES</Text>
        <Text style={styles.pageSub}>☣ EXPLORE · COLLECT · CLASSIFY ☣</Text>
      </View>

      {/* Book selector — illustrated icons */}
      <View style={styles.bookTabs}>
        {BOOKS.map((b) => {
          const locked = b.tier === 'paid' && !isPaid;
          const active = activeBook === b.id;
          const icon   = BOOK_ICONS[b.id as Book];
          return (
            <TouchableOpacity
              key={b.id}
              onPress={() => {
                if (locked) { router.push('/paywall'); return; }
                setActiveBook(b.id as Book);
              }}
              style={[
                styles.bookTab,
                active && styles.bookTabActive,
                locked && styles.bookTabLocked,
              ]}
              activeOpacity={0.75}
            >
              {!!icon && (
                <Image
                  source={icon as import('react-native').ImageSourcePropType}
                  style={styles.bookTabIcon}
                  resizeMode="contain"
                />
              )}
              <Text
                style={[
                  styles.bookTabLabel,
                  active && styles.bookTabLabelActive,
                  locked && styles.bookTabLabelLocked,
                ]}
                numberOfLines={2}
              >
                {locked ? '🔒 ' : ''}{b.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Progress pill */}
      <View style={styles.progressRow}>
        <View style={styles.progressPill}>
          <Text style={styles.progressText}>{found} / {total} CLASSIFIED</Text>
        </View>
        <View style={styles.scansPill}>
          <Text style={styles.scansText}>{profile.scan_balance} SCANS</Text>
        </View>
      </View>

      {/* Jar grid */}
      <FlatList
        data={bookCreatures}
        keyExtractor={(item) => item.id}
        numColumns={COLS}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: CARD_GAP }}
        ItemSeparatorComponent={() => <View style={{ height: CARD_GAP + 4 }} />}
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
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
    marginHorizontal: Spacing.md,
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: FontFamily.creepster,
    fontSize: 28,
    color: Colors.text.lime,
    letterSpacing: 2,
    textShadowColor: Colors.eww.greenDark,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 0,
  },
  pageSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 11,
    color: Colors.text.purple,
    letterSpacing: 2.5,
    marginTop: 2,
  },

  // Book tabs
  bookTabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: 6,
    marginBottom: 10,
  },
  bookTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
    backgroundColor: Colors.bg.card,
    alignItems: 'center',
    gap: 4,
  },
  bookTabActive: {
    borderColor: Colors.eww.purple,
    backgroundColor: `${Colors.eww.purple}22`,
  },
  bookTabLocked: {
    opacity: 0.45,
  },
  bookTabIcon: {
    width: 36,
    height: 36,
  },
  bookTabLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      15,
    color:         Colors.text.secondary,
    letterSpacing: 1,
    textAlign:     'center',
  },
  bookTabLabelActive: {
    color: Colors.text.lime,
  },
  bookTabLabelLocked: {
    color: Colors.text.disabled,
  },

  // Progress
  progressRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: 8,
    marginBottom: 10,
  },
  progressPill: {
    backgroundColor: `${Colors.eww.green}20`,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border.green,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  progressText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.text.lime,
    letterSpacing: 0.5,
  },
  scansPill: {
    backgroundColor: `${Colors.eww.purple}20`,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border.DEFAULT,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  scansText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.text.purple,
    letterSpacing: 0.5,
  },

  grid: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});

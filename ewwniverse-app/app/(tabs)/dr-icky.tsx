/**
 * DR. ICKY — The Lab's mad scientist.
 *
 * Backstory, interactive gross-fact generator, and lab atmosphere.
 * Tapping "HEAR DR. ICKY" plays a sound and cycles a new random
 * gross fact from the creature database.
 */
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { AppHeader } from '@/components/AppHeader';
import { ALL_CREATURES } from '@/data/index';
import { useGameStore } from '@/store/gameStore';
import { DrIckyEvent } from '@/constants/drIckyVideos';

// ── Backstory panels ──────────────────────────────────────────────────────────
const BACKSTORY_PANELS = [
  {
    heading: 'WHO IS DR. ICKY?',
    text: 'Dr. Icky is the EWW-niverse\'s head scientist, self-appointed keeper of gross facts, and the only person alive who thinks "delightfully disgusting" is a scientific classification. His lab coat has never been washed on purpose.',
  },
  {
    heading: 'THE MISSION',
    text: 'Dr. Icky has spent decades cataloguing the planet\'s most revolting creatures. He believes that understanding something gross is the first step to respecting it — and the second step is probably gagging.',
  },
  {
    heading: 'CLASSIFIED BY DR. ICKY',
    text: 'Every specimen in the EWW-niverse was personally inspected, sniffed, and documented by Dr. Icky and his team. He insists the work is scientific. His colleagues disagree.',
  },
];

// ── Pick a random gross fact ───────────────────────────────────────────────────
function getRandomFact(): { fact: string; creature: string } {
  const pool = ALL_CREATURES.filter((c) => c.gross_fact && c.gross_fact.length > 20);
  if (pool.length === 0) return { fact: 'No specimens classified yet.', creature: 'Unknown' };
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return { fact: picked.gross_fact, creature: picked.title };
}

// ── Lab notes (Dr. Icky quotes) ───────────────────────────────────────────────
const LAB_NOTES = [
  '"The slimier, the better. I have it tattooed on my elbow." — Dr. Icky',
  '"If it oozes, it earns a five-star classification in my lab." — Dr. Icky',
  '"Never trust a creature that doesn\'t leave a mess." — Dr. Icky',
  '"I did not become a scientist to study boring things. Exhibit A: everything in this lab." — Dr. Icky',
  '"A day without a gross fact is a day wasted. I have never wasted a day." — Dr. Icky',
];

// Quick-fire event buttons for the Dr. Icky tab
const QUICK_EVENTS: { label: string; event: DrIckyEvent; color: string }[] = [
  { label: 'CLASSIFY',         event: 'classify',          color: '#4ade80' },
  { label: 'RARE FIND',        event: 'classify_rare',     color: '#fbbf24' },
  { label: 'LEGENDARY',        event: 'classify_legendary',color: '#f87171' },
  { label: 'SLIME SURGE',      event: 'slime_surge',       color: '#a78bfa' },
  { label: 'WRONG ANSWER',     event: 'wrong_answer',      color: '#60a5fa' },
  { label: 'DAILY GREETING',   event: 'daily_return',      color: '#34d399' },
];

export default function DrIcky() {
  const [currentFact, setCurrentFact] = useState(getRandomFact);
  const [noteIdx, setNoteIdx]         = useState(0);
  const [factCount, setFactCount]     = useState(0);
  const triggerDrIcky                 = useGameStore((s) => s.triggerDrIcky);

  const handleHearDrIcky = useCallback(() => {
    // Trigger a random daily-return greeting (most generic / welcoming)
    triggerDrIcky('daily_return', true);
    setCurrentFact(getRandomFact());
    setFactCount((n) => n + 1);
    setNoteIdx((i) => (i + 1) % LAB_NOTES.length);
  }, [triggerDrIcky]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppHeader />

      {/* Page title */}
      <View style={styles.titleBlock}>
        <Text style={styles.pageTitle}>DR. ICKY</Text>
        <Text style={styles.pageSub}>☣ CHIEF SPECIMEN SCIENTIST ☣</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Identity card ──────────────────────────────────── */}
        <View style={styles.identityCard}>
          <View style={styles.identityBody}>
            <Text style={styles.identityTitle}>PROFESSOR IGNATIUS ICKY</Text>
            <Text style={styles.identityRole}>Head of Gross Classification</Text>
            <Text style={styles.identityRank}>EWW-niverse Labs, Est. Unknown</Text>
          </View>
          <View style={styles.identityBadge}>
            <Text style={styles.identityBadgeText}>☣</Text>
          </View>
        </View>

        {/* ── Backstory panels ─────────────────────────────── */}
        {BACKSTORY_PANELS.map((panel, idx) => (
          <View key={idx} style={styles.backstoryCard}>
            <Text style={styles.backstoryHeading}>{panel.heading}</Text>
            <Text style={styles.backstoryText}>{panel.text}</Text>
          </View>
        ))}

        {/* ── Trigger buttons ──────────────────────────────── */}
        <View style={styles.triggerSection}>
          <Text style={styles.triggerLabel}>PLAY DR. ICKY REACTIONS</Text>
          <Text style={styles.triggerSub}>Tap any event to see Dr. Icky's response</Text>
          <View style={styles.triggerGrid}>
            {QUICK_EVENTS.map((e) => (
              <TouchableOpacity
                key={e.event}
                style={[styles.triggerBtn, { borderColor: `${e.color}55`, backgroundColor: `${e.color}12` }]}
                onPress={() => triggerDrIcky(e.event, true)}
                activeOpacity={0.75}
              >
                <Text style={[styles.triggerBtnText, { color: e.color }]}>{e.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Gross fact generator ─────────────────────────── */}
        <View style={styles.factSection}>
          <Text style={styles.factSectionLabel}>LAB TRANSMISSION</Text>
          <Text style={styles.factSectionSub}>
            Dr. Icky has {factCount === 0 ? 'a' : 'another'} gross fact for you
          </Text>

          <View style={styles.factCard}>
            <Text style={styles.factCreature}>{currentFact.creature.toUpperCase()}</Text>
            <Text style={styles.factText}>{currentFact.fact}</Text>
          </View>

          <TouchableOpacity
            style={styles.hearBtn}
            onPress={handleHearDrIcky}
            activeOpacity={0.82}
          >
            <Image
              source={Assets.btnHearDrIcky}
              style={styles.hearBtnImg}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {factCount > 0 && (
            <Text style={styles.factCounter}>
              {factCount} transmission{factCount !== 1 ? 's' : ''} received
            </Text>
          )}
        </View>

        {/* ── Lab note ─────────────────────────────────────── */}
        <View style={styles.labNoteCard}>
          <Text style={styles.labNoteLabel}>LAB NOTES</Text>
          <Text style={styles.labNoteText}>{LAB_NOTES[noteIdx]}</Text>
        </View>

        {/* ── Classified count ─────────────────────────────── */}
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>SPECIMENS CATALOGUED BY DR. ICKY</Text>
          <Text style={styles.statsCount}>{ALL_CREATURES.length}</Text>
          <Text style={styles.statsSub}>across 3 books · more being discovered</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },

  titleBlock: {
    alignItems:        'center',
    paddingTop:        10,
    paddingBottom:     8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
    marginHorizontal:  Spacing.md,
    marginBottom:      8,
  },
  pageTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      32,
    color:         Colors.text.lime,
    letterSpacing: 2,
    textShadowColor:  Colors.eww.greenDark,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 0,
  },
  pageSub: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.purple,
    letterSpacing: 2.5,
    marginTop:     2,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.xxl,
    gap:               14,
  },

  // ── Identity card ────────────────────────────────────────────────────────
  identityCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.green}44`,
    padding:         Spacing.md,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
  },
  identityBody: { flex: 1, gap: 3 },
  identityTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      20,
    color:         Colors.text.primary,
    letterSpacing: 1,
  },
  identityRole: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         Colors.text.lime,
    letterSpacing: 0.3,
  },
  identityRank: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.text.muted,
    marginTop:  2,
  },
  identityBadge: {
    width:            64,
    height:           64,
    borderRadius:     32,
    backgroundColor:  `${Colors.eww.green}18`,
    borderWidth:      2,
    borderColor:      `${Colors.eww.green}55`,
    alignItems:       'center',
    justifyContent:   'center',
  },
  identityBadgeText: {
    fontSize:  32,
    color:     Colors.eww.green,
    lineHeight: 36,
  },

  // ── Backstory cards ──────────────────────────────────────────────────────
  backstoryCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.border.subtle,
    padding:         Spacing.md,
    gap:             8,
  },
  backstoryHeading: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
  },
  backstoryText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   16,
    color:      Colors.text.secondary,
    lineHeight: 24,
  },

  // ── Trigger buttons ──────────────────────────────────────────────────────
  triggerSection: { gap: 10 },
  triggerLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
  },
  triggerSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.secondary,
    marginTop:  -4,
  },
  triggerGrid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    gap:           8,
  },
  triggerBtn: {
    borderRadius:      Radius.full,
    borderWidth:       1.5,
    paddingHorizontal: 14,
    paddingVertical:   8,
  },
  triggerBtnText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    letterSpacing: 0.5,
  },

  // ── Gross fact generator ─────────────────────────────────────────────────
  factSection: {
    gap: 10,
  },
  factSectionLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
  },
  factSectionSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.secondary,
    marginTop:  -4,
  },
  factCard: {
    backgroundColor: `${Colors.eww.purple}14`,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.purple}44`,
    padding:         Spacing.md,
    gap:             8,
    minHeight:       100,
    justifyContent:  'center',
  },
  factCreature: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.purple,
    letterSpacing: 2,
  },
  factText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   18,
    color:      Colors.text.primary,
    lineHeight: 26,
  },
  hearBtn: {
    alignItems: 'center',
  },
  hearBtnImg: {
    width:  '100%',
    height: 72,
  },
  factCounter: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.muted,
    textAlign:     'center',
    letterSpacing: 0.5,
  },

  // ── Lab note ─────────────────────────────────────────────────────────────
  labNoteCard: {
    backgroundColor: `${Colors.eww.amber}10`,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     `${Colors.eww.amber}33`,
    borderStyle:     'dashed',
    padding:         Spacing.md,
    gap:             8,
  },
  labNoteLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    color:         Colors.eww.amber,
    letterSpacing: 2.5,
    opacity:       0.7,
  },
  labNoteText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.secondary,
    lineHeight: 22,
    fontStyle:  'italic',
  },

  // ── Stats card ────────────────────────────────────────────────────────────
  statsCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     Colors.border.subtle,
    padding:         Spacing.md,
    alignItems:      'center',
    gap:             4,
  },
  statsLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2,
    textAlign:     'center',
  },
  statsCount: {
    fontFamily:    FontFamily.creepster,
    fontSize:      56,
    color:         Colors.text.lime,
    letterSpacing: 2,
    lineHeight:    60,
  },
  statsSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.secondary,
    textAlign:  'center',
  },
});

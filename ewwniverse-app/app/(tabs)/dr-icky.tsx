/**
 * DR. ICKY — The Lab's mad scientist.
 *
 * Illustration-first layout: hero portrait, interactive gross-fact generator,
 * Dr. Icky reaction buttons, lab atmosphere.
 */
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { ALL_CREATURES } from '@/data/index';
import { useGameStore } from '@/store/gameStore';
import { DrIckyEvent } from '@/constants/drIckyVideos';

const { width: SCREEN_W } = Dimensions.get('window');

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
  '"I did not become a scientist to study boring things." — Dr. Icky',
  '"A day without a gross fact is a day wasted." — Dr. Icky',
];

// Quick-fire event buttons for testing Dr. Icky reactions
const QUICK_EVENTS: { label: string; event: DrIckyEvent; color: string }[] = [
  { label: 'CLASSIFY',       event: 'classify',           color: Colors.eww.green },
  { label: 'RARE FIND',      event: 'classify_rare',      color: '#fbbf24'         },
  { label: 'LEGENDARY',      event: 'classify_legendary', color: '#f87171'         },
  { label: 'SLIME SURGE',    event: 'slime_surge',        color: '#a78bfa'         },
  { label: 'WRONG ANSWER',   event: 'wrong_answer',       color: '#60a5fa'         },
  { label: 'DAILY GREETING', event: 'daily_return',       color: '#34d399'         },
];

export default function DrIcky() {
  const [currentFact, setCurrentFact] = useState(getRandomFact);
  const [noteIdx, setNoteIdx]         = useState(0);
  const [factCount, setFactCount]     = useState(0);
  const triggerDrIcky                 = useGameStore((s) => s.triggerDrIcky);

  const handleHearDrIcky = useCallback(() => {
    triggerDrIcky('daily_return', true);
    setCurrentFact(getRandomFact());
    setFactCount((n) => n + 1);
    setNoteIdx((i) => (i + 1) % LAB_NOTES.length);
  }, [triggerDrIcky]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero: full-bleed illustration ───────────────── */}
        <View style={styles.hero}>
          <View style={styles.heroGlow} />
          <Image
            source={Assets.drIckyPortrait}
            style={styles.heroImg}
            resizeMode="contain"
          />
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroTitle}>DR. ICKY</Text>
            <Text style={styles.heroSub}>☣ CHIEF SPECIMEN SCIENTIST ☣</Text>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>PROFESSOR IGNATIUS ICKY</Text>
            </View>
          </View>
        </View>

        {/* ── Gross fact generator ─────────────────────────── */}
        <View style={styles.factCard}>
          <View style={styles.factHeader}>
            <Text style={styles.factLabel}>LAB TRANSMISSION</Text>
            <Image
              source={Assets.drIckyJar}
              style={styles.factSideImg}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.factCreature}>{currentFact.creature.toUpperCase()}</Text>
          <Text style={styles.factText}>{currentFact.fact}</Text>

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

        {/* ── Dr. Icky reaction buttons ────────────────────── */}
        <View style={styles.triggerSection}>
          <View style={styles.triggerHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.triggerLabel}>PLAY DR. ICKY REACTIONS</Text>
              <Text style={styles.triggerSub}>Tap any event to see his response</Text>
            </View>
            <Image
              source={Assets.drIckyWarning}
              style={styles.triggerSideImg}
              resizeMode="contain"
            />
          </View>
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

        {/* ── Who is Dr. Icky ──────────────────────────────── */}
        <View style={styles.bioCard}>
          <View style={styles.bioRow}>
            <Image
              source={Assets.drIckyCelebrating}
              style={styles.bioImg}
              resizeMode="contain"
            />
            <View style={styles.bioText}>
              <Text style={styles.bioHeading}>WHO IS DR. ICKY?</Text>
              <Text style={styles.bioBody}>
                {'Head scientist of the EWW-niverse. Self-appointed keeper of gross facts. His lab coat has never been washed — on purpose.'}
              </Text>
            </View>
          </View>
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

const HERO_H = Math.round(SCREEN_W * 0.72);

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  content: { paddingBottom: Spacing.xxl, gap: 14 },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    width:             SCREEN_W,
    height:            HERO_H,
    backgroundColor:   `${Colors.eww.green}0C`,
    borderBottomWidth: 2,
    borderBottomColor: `${Colors.eww.green}30`,
    alignItems:        'center',
    justifyContent:    'flex-end',
    overflow:          'hidden',
  },
  heroGlow: {
    position:        'absolute',
    top:             -60,
    left:            SCREEN_W * 0.1,
    width:           SCREEN_W * 0.8,
    height:          SCREEN_W * 0.8,
    borderRadius:    SCREEN_W * 0.4,
    backgroundColor: `${Colors.eww.green}14`,
  },
  heroImg: {
    position: 'absolute',
    left:     -SCREEN_W * 0.04,
    bottom:   0,
    width:    SCREEN_W * 0.7,
    height:   HERO_H * 0.95,
  },
  heroTextBlock: {
    position:   'absolute',
    right:      Spacing.md,
    top:        Spacing.md,
    alignItems: 'flex-end',
    gap:        6,
  },
  heroTitle: {
    fontFamily:       FontFamily.creepster,
    fontSize:         44,
    color:            Colors.text.lime,
    letterSpacing:    3,
    textShadowColor:  Colors.eww.greenDark,
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 0,
  },
  heroSub: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    color:         Colors.text.muted,
    letterSpacing: 2,
    textAlign:     'right',
  },
  heroBadge: {
    backgroundColor:   `${Colors.eww.green}22`,
    borderRadius:      Radius.full,
    borderWidth:       1,
    borderColor:       Colors.eww.green,
    paddingHorizontal: 10,
    paddingVertical:   4,
  },
  heroBadgeText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.lime,
    letterSpacing: 0.5,
  },

  // ── Fact card ─────────────────────────────────────────────────────────────
  factCard: {
    backgroundColor:  `${Colors.eww.purple}14`,
    borderRadius:     Radius.lg,
    borderWidth:      1.5,
    borderColor:      `${Colors.eww.purple}44`,
    marginHorizontal: Spacing.md,
    padding:          Spacing.md,
    gap:              8,
  },
  factHeader: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
  },
  factLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
  },
  factSideImg: {
    width:    56,
    height:   56,
    marginTop: -8,
    marginRight: -4,
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
    minHeight:  80,
  },
  hearBtn:    { alignItems: 'center' },
  hearBtnImg: { width: '100%', height: 72 },
  factCounter: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.muted,
    textAlign:     'center',
    letterSpacing: 0.5,
  },

  // ── Lab note ──────────────────────────────────────────────────────────────
  labNoteCard: {
    backgroundColor:  `${Colors.eww.amber}10`,
    borderRadius:     Radius.lg,
    borderWidth:      1,
    borderColor:      `${Colors.eww.amber}33`,
    borderStyle:      'dashed',
    marginHorizontal: Spacing.md,
    padding:          Spacing.md,
    gap:              8,
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

  // ── Trigger buttons ───────────────────────────────────────────────────────
  triggerSection: {
    marginHorizontal: Spacing.md,
    gap:              10,
  },
  triggerHeaderRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
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
    marginTop:  2,
  },
  triggerSideImg: {
    width:  72,
    height: 72,
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

  // ── Bio card ──────────────────────────────────────────────────────────────
  bioCard: {
    backgroundColor:  Colors.bg.card,
    borderRadius:     Radius.lg,
    borderWidth:      1,
    borderColor:      `${Colors.eww.green}33`,
    marginHorizontal: Spacing.md,
    padding:          Spacing.md,
  },
  bioRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           12,
  },
  bioImg: {
    width:    88,
    height:   88,
    flexShrink: 0,
  },
  bioText:   { flex: 1, gap: 6 },
  bioHeading: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
  },
  bioBody: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.secondary,
    lineHeight: 22,
  },

  // ── Stats card ────────────────────────────────────────────────────────────
  statsCard: {
    backgroundColor:  `${Colors.eww.green}0E`,
    borderRadius:     Radius.lg,
    borderWidth:      1.5,
    borderColor:      `${Colors.eww.green}33`,
    marginHorizontal: Spacing.md,
    padding:          Spacing.md,
    alignItems:       'center',
    gap:              4,
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

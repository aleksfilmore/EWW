/**
 * Creature detail screen.
 *
 * large jar frame → creature inside → CLASSIFIED stamp overlay
 * EWW-meter bar, radar icon, gross fact, illustrated action buttons
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius, ewwMeterColor } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { getCreatureById } from '@/data/index';
import { EwwMeter } from '@/types/creature';
import { CREATURE_IMAGES } from '@/constants/creatureImages';

const { width: SCREEN_W } = Dimensions.get('window');
const JAR_SIZE = Math.min(SCREEN_W * 0.72, 300);

export default function CreatureDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile        = useUserStore((s) => s.profile);
  const creatures      = useUserStore((s) => s.creatures);
  const consumeScan    = useUserStore((s) => s.consumeScan);
  const setCreatureState = useUserStore((s) => s.setCreatureState);

  const creature = getCreatureById(id ?? '');

  if (!creature || !profile) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backLabel}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>Specimen not found.</Text>
      </SafeAreaView>
    );
  }

  const userCreature   = creatures[creature.id];
  const state          = userCreature?.state ?? 'locked';
  const isClassified   = state === 'classified' || state === 'mastered';
  const isMastered     = state === 'mastered';
  const creatureImg    = CREATURE_IMAGES[creature.id];
  const ewwColor       = ewwMeterColor(creature.eww_meter as EwwMeter);
  const fillPct        = creature.eww_meter;            // 60 | 80 | 100

  function handleClassify() {
    if (isClassified) return;
    if (state === 'locked') {
      const success = consumeScan();
      if (!success) {
        Alert.alert(
          'No scans available',
          'Play the Lab Quiz to earn more scans, or wait for your next free scan.',
          [
            { text: 'Play Quiz', onPress: () => router.push('/quiz') },
            { text: 'OK' },
          ],
        );
        return;
      }
      setCreatureState(creature.id, 'silhouette');
      setTimeout(() => setCreatureState(creature.id, 'classified'), 1200);
    }
  }

  function handleMaster() {
    if (!isClassified) return;
    Alert.alert('Master this specimen', 'Play a quiz round featuring this creature to earn mastery.', [
      { text: 'Start Quiz', onPress: () => router.push('/quiz') },
      { text: 'Later' },
    ]);
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Back */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backLabel}>← BACK</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Large jar + creature ──────────────────────────────── */}
        <View style={[styles.jarWrap, { width: JAR_SIZE, height: JAR_SIZE * 1.1 }]}>
          {/* Jar frame */}
          <Image
            source={Assets.jarLarge}
            style={StyleSheet.absoluteFill}
            resizeMode="contain"
          />

          {/* Creature image inside jar */}
          {isClassified && creatureImg && (
            <Image
              source={creatureImg}
              style={[
                styles.creatureInJar,
                {
                  width:  JAR_SIZE * 0.52,
                  height: JAR_SIZE * 0.52,
                  opacity: state === 'silhouette' ? 0.3 : 1,
                },
              ]}
              resizeMode="contain"
            />
          )}

          {/* Locked placeholder */}
          {!isClassified && (
            <Text style={styles.jarLockText}>?</Text>
          )}

          {/* CLASSIFIED stamp overlay */}
          {isClassified && (
            <Image
              source={Assets.classifiedStamp}
              style={styles.stamp}
              resizeMode="contain"
            />
          )}

          {/* Mastered star badge */}
          {isMastered && (
            <View style={styles.masteredBadge}>
              <Text style={styles.masteredStar}>★</Text>
            </View>
          )}

          {/* Tags */}
          {isClassified && creature.realm === 'RARE' && (
            <Image source={Assets.tagRare} style={styles.tagBadge} resizeMode="contain" />
          )}
        </View>

        {/* ── Name + realm ─────────────────────────────────────── */}
        <Text style={styles.title}>
          {isClassified ? creature.title.toUpperCase() : '???'}
        </Text>
        {creature.realm && (
          <Text style={[styles.realm, { color: ewwColor }]}>
            {creature.realm.toUpperCase()}
          </Text>
        )}

        {/* ── EWW-meter bar ─────────────────────────────────────── */}
        <View style={styles.meterBlock}>
          <View style={styles.meterRow}>
            <Text style={styles.meterLabel}>EWW-METER</Text>
            <Text style={[styles.meterScore, { color: ewwColor }]}>{fillPct}/100</Text>
          </View>
          <View style={styles.meterTrack}>
            <View
              style={[
                styles.meterFill,
                {
                  width: `${fillPct}%`,
                  backgroundColor: ewwColor,
                },
              ]}
            />
            {/* Glow end cap */}
            <View
              style={[
                styles.meterCap,
                { left: `${fillPct}%`, backgroundColor: ewwColor },
              ]}
            />
          </View>
        </View>

        {/* ── Gross fact ───────────────────────────────────────── */}
        {isClassified ? (
          <View style={[styles.factCard, { borderColor: `${ewwColor}44` }]}>
            <View style={styles.factHeader}>
              <Image source={Assets.iconRadar} style={styles.factIcon} resizeMode="contain" />
              <Text style={styles.factLabel}>GROSS FACT</Text>
            </View>
            <Text style={styles.factText}>{creature.gross_fact}</Text>
          </View>
        ) : (
          <View style={styles.lockedCard}>
            <Image source={Assets.iconLock} style={styles.lockIcon} resizeMode="contain" />
            <Text style={styles.lockedTitle}>LOCKED</Text>
            <Text style={styles.lockedSub}>Classify this specimen to unlock gross facts</Text>
          </View>
        )}

        {/* ── Classify CTA ─────────────────────────────────────── */}
        {!isClassified && (
          <TouchableOpacity
            style={styles.classifyBtn}
            onPress={handleClassify}
            activeOpacity={0.8}
          >
            <Text style={styles.classifyBtnLabel}>CLASSIFY SPECIMEN</Text>
            <Text style={styles.classifyBtnSub}>
              {profile.scan_balance > 0
                ? `Uses 1 scan  ·  ${profile.scan_balance} remaining`
                : 'No scans — play quiz to earn more'}
            </Text>
          </TouchableOpacity>
        )}

        {/* ── Action buttons (classified) ───────────────────────── */}
        {isClassified && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleMaster}
              activeOpacity={0.8}
            >
              <Image
                source={Assets.btnMaster}
                style={styles.actionBtnImg}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              activeOpacity={0.8}
            >
              <Image
                source={Assets.btnHearDrIcky}
                style={styles.actionBtnImg}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/(tabs)/recruit-file')}
              activeOpacity={0.8}
            >
              <Image
                source={Assets.btnAddToSet}
                style={styles.actionBtnImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Quiz prompt (classified, not mastered) */}
        {isClassified && !isMastered && (
          <TouchableOpacity
            style={styles.quizNudge}
            onPress={() => router.push('/quiz')}
            activeOpacity={0.8}
          >
            <Text style={styles.quizNudgeText}>
              ☣ Play Lab Quiz to master this specimen ›
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:       { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  errorText:  { color: Colors.text.muted, fontSize: 16, textAlign: 'center', marginTop: 60 },

  backBtn:    { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  backLabel: {
    fontFamily:  FontFamily.boogaloo,
    fontSize:    14,
    color:       Colors.text.lime,
    letterSpacing: 1,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.xxl,
    alignItems:        'center',
    gap:               16,
  },

  // ── Jar ───────────────────────────────────────────────────────────────────
  jarWrap: {
    alignItems:      'center',
    justifyContent:  'center',
    position:        'relative',
  },
  creatureInJar: {
    position:  'absolute',
    top:       '20%',
    alignSelf: 'center',
  },
  jarLockText: {
    position:   'absolute',
    fontFamily: FontFamily.creepster,
    fontSize:   72,
    color:      Colors.text.disabled,
    letterSpacing: 4,
  },
  stamp: {
    position: 'absolute',
    bottom:   '8%',
    right:    '4%',
    width:    JAR_SIZE * 0.42,
    height:   JAR_SIZE * 0.42,
    opacity:  0.90,
  },
  masteredBadge: {
    position:        'absolute',
    top:             8,
    right:           8,
    backgroundColor: Colors.eww.gold,
    borderRadius:    16,
    width:           32,
    height:          32,
    alignItems:      'center',
    justifyContent:  'center',
  },
  masteredStar: { fontSize: 18, color: '#000', fontWeight: '900' },
  tagBadge: {
    position: 'absolute',
    top:      8,
    left:     8,
    width:    48,
    height:   24,
  },

  // ── Name / realm ─────────────────────────────────────────────────────────
  title: {
    fontFamily:   FontFamily.creepster,
    fontSize:     30,
    color:        Colors.text.primary,
    textAlign:    'center',
    letterSpacing: 1.5,
    textShadowColor:  Colors.eww.purple,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  realm: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    letterSpacing: 2.5,
    marginTop:     -8,
  },

  // ── EWW-meter bar ────────────────────────────────────────────────────────
  meterBlock: {
    width: '100%',
    gap:   6,
  },
  meterRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
  meterLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2,
  },
  meterScore: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    letterSpacing: 0.5,
  },
  meterTrack: {
    width:           '100%',
    height:          12,
    backgroundColor: Colors.bg.elevated,
    borderRadius:    Radius.full,
    overflow:        'hidden',
    position:        'relative',
  },
  meterFill: {
    position:     'absolute',
    left:         0,
    top:          0,
    bottom:       0,
    borderRadius: Radius.full,
    opacity:      0.9,
  },
  meterCap: {
    position:     'absolute',
    top:          2,
    bottom:       2,
    width:        8,
    borderRadius: 4,
    marginLeft:   -4,
    opacity:      1,
  },

  // ── Gross fact card ──────────────────────────────────────────────────────
  factCard: {
    width:           '100%',
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    padding:         Spacing.md,
    gap:             10,
  },
  factHeader: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  factIcon: { width: 22, height: 22 },
  factLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2,
  },
  factText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   17,
    color:      Colors.text.primary,
    lineHeight: 24,
  },

  // ── Locked card ──────────────────────────────────────────────────────────
  lockedCard: {
    width:           '100%',
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1,
    borderColor:     Colors.border.subtle,
    padding:         Spacing.lg,
    alignItems:      'center',
    gap:             8,
  },
  lockIcon:     { width: 32, height: 32, opacity: 0.5 },
  lockedTitle: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         Colors.text.disabled,
    letterSpacing: 2,
  },
  lockedSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.text.disabled,
    textAlign:  'center',
    lineHeight: 18,
  },

  // ── Classify button ──────────────────────────────────────────────────────
  classifyBtn: {
    width:           '100%',
    backgroundColor: Colors.eww.green,
    borderRadius:    Radius.lg,
    paddingVertical: 16,
    alignItems:      'center',
    gap:             3,
    shadowColor:     Colors.eww.greenDark,
    shadowOffset:    { width: 0, height: 5 },
    shadowOpacity:   0.5,
    shadowRadius:    8,
    elevation:       8,
  },
  classifyBtnLabel: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         '#000',
    letterSpacing: 1.5,
  },
  classifyBtnSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   12,
    color:      'rgba(0,0,0,0.55)',
    letterSpacing: 0.3,
  },

  // ── Action buttons ───────────────────────────────────────────────────────
  actionRow: {
    flexDirection:  'row',
    width:          '100%',
    gap:            10,
  },
  actionBtn: {
    flex:       1,
    alignItems: 'center',
  },
  actionBtnImg: {
    width:  '100%',
    height: 70,
  },

  // ── Quiz nudge ───────────────────────────────────────────────────────────
  quizNudge: { paddingVertical: 8 },
  quizNudgeText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.text.purple,
    letterSpacing: 0.3,
  },
});

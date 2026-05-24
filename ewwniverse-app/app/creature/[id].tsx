/**
 * Creature detail screen.
 *
 * large jar frame → creature inside (bigger, dark halo behind it) →
 * CLASSIFIED stamp → EWW-meter bar → radar gross fact →
 * illustrated action buttons → post-classify "BACK TO LAB" state
 */
import React, { useState } from 'react';
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
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius, ewwMeterColor } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { getCreatureById } from '@/data/index';
import { EwwMeter } from '@/types/creature';
import { CREATURE_IMAGES } from '@/constants/creatureImages';
import { isDailySpecimen, todayString } from '@/utils/daily';
import { playSfx, playMeterSfx } from '@/services/audio';
import { ConfirmModal } from '@/components/ConfirmModal';

const { width: SCREEN_W } = Dimensions.get('window');

// Full-width hero image for classified/silhouette state.
// Content has paddingHorizontal: 16 on each side → available width = SCREEN_W − 32.
const HERO_SIZE = SCREEN_W - 32;

// Locked-state mystery jar rendered at fixed pixel dimensions so it cannot
// overflow its container on Android (no absoluteFill).
const LOCKED_JAR_H = Math.min(SCREEN_W * 0.65, 260);
const LOCKED_JAR_W = Math.round(LOCKED_JAR_H * 0.91);

export default function CreatureDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile            = useUserStore((s) => s.profile);
  const creatures          = useUserStore((s) => s.creatures);
  const consumeScan        = useUserStore((s) => s.consumeScan);
  const setCreatureState   = useUserStore((s) => s.setCreatureState);
  const addScans           = useUserStore((s) => s.addScans);
  const claimDailySpecimen = useUserStore((s) => s.claimDailySpecimen);

  // Tracks the brief "JUST CLASSIFIED" celebration state (+bonus scan info)
  const [justClassified, setJustClassified] = useState(false);
  const [dailyBonusEarned, setDailyBonusEarned] = useState(false);
  // Which confirm modal is open: null = none, 'noScans' = out-of-scans, 'master' = master prompt
  const [modalType, setModalType] = useState<'noScans' | 'master' | null>(null);

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

  const userCreature  = creatures[creature.id];
  const state         = userCreature?.state ?? 'locked';
  const isClassified  = state === 'classified' || state === 'mastered';
  const isMastered    = state === 'mastered';
  const isSilhouette  = state === 'silhouette';
  const creatureImg   = CREATURE_IMAGES[creature.id];
  const ewwColor      = ewwMeterColor(creature.eww_meter as EwwMeter);
  const fillPct       = creature.eww_meter;

  function handleClassify() {
    if (!creature) return;   // type guard for TS (should never hit — checked above)
    if (isClassified) return;
    if (state === 'locked') {
      const success = consumeScan();
      if (!success) {
        playSfx('sfx_locked');
        setModalType('noScans');
        return;
      }
      setCreatureState(creature.id, 'silhouette');
      setTimeout(() => {
        setCreatureState(creature.id, 'classified');
        playSfx('sfx_access_granted');
        playMeterSfx(creature.eww_meter);
        setJustClassified(true);

        // Daily Specimen bonus — 2× scans if this is today's featured creature
        // and it hasn't been claimed already today.
        const today = todayString();
        if (
          isDailySpecimen(creature.id) &&
          profile?.daily_specimen_last_claimed !== today
        ) {
          claimDailySpecimen();   // stamps today's date so bonus fires only once
          addScans(2);            // the 2× bonus scans
          setDailyBonusEarned(true);
        }
      }, 1200);
    }
  }

  function handleMaster() {
    if (!isClassified) return;
    setModalType('master');
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* ── Modals ─────────────────────────────────────────────────── */}
      <ConfirmModal
        visible={modalType === 'noScans'}
        title="NO SCANS LEFT"
        message="Play the Lab Quiz to earn more scans, or wait for your next free scan."
        primaryLabel="PLAY QUIZ"
        onPrimary={() => { setModalType(null); router.push('/quiz'); }}
        dismissLabel="LATER"
        onDismiss={() => setModalType(null)}
      />
      <ConfirmModal
        visible={modalType === 'master'}
        title="MASTER THIS SPECIMEN"
        message="Play a quiz round featuring this creature to earn mastery and unlock bonus facts."
        primaryLabel="START QUIZ"
        onPrimary={() => { setModalType(null); router.push('/quiz'); }}
        dismissLabel="LATER"
        onDismiss={() => setModalType(null)}
      />

      {/* Back */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backLabel}>← BACK</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero area ────────────────────────────────────────────── */}

        {/* Classified / silhouette: full-width 1:1 creature image */}
        {(isClassified || isSilhouette) && (
          <View style={[styles.heroWrap, isSilhouette && styles.heroWrapSilhouette]}>
            {creatureImg && (
              <Image
                source={creatureImg}
                style={[styles.heroImage, { opacity: isSilhouette ? 0.18 : 1 }]}
                resizeMode="contain"
              />
            )}
            {/* CLASSIFIED stamp */}
            {isClassified && (
              <Image
                source={Assets.classifiedStamp}
                style={styles.heroStamp}
                resizeMode="contain"
              />
            )}
            {/* Mastered star */}
            {isMastered && (
              <View style={styles.masteredBadge}>
                <Text style={styles.masteredStar}>★</Text>
              </View>
            )}
          </View>
        )}

        {/* Locked: mystery jar at fixed pixel dimensions (no absoluteFill) */}
        {!isClassified && !isSilhouette && (
          <View style={styles.lockedJarWrap}>
            <Image
              source={Assets.jarLarge}
              style={{ width: LOCKED_JAR_W, height: LOCKED_JAR_H }}
              resizeMode="contain"
            />
            {/* ? overlaid in centre of jar */}
            <Text style={styles.jarLockText}>?</Text>
          </View>
        )}

        {/* ── Post-classify celebration ───────────────────────────── */}
        {justClassified && (
          <TouchableOpacity
            style={styles.classifiedBanner}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Text style={styles.classifiedBannerTitle}>☣ CLASSIFIED! ☣</Text>
            {dailyBonusEarned && (
              <Text style={styles.classifiedBannerBonus}>
                +2 BONUS SCANS — Daily Specimen!
              </Text>
            )}
            <Text style={styles.classifiedBannerSub}>
              Tap here to return to Lab ›
            </Text>
          </TouchableOpacity>
        )}

        {/* ── Name + realm ─────────────────────────────────────────── */}
        <Text style={styles.title}>
          {isClassified ? creature.title.toUpperCase() : '???'}
        </Text>
        {creature.realm && (
          <Text style={[styles.realm, { color: ewwColor }]}>
            {creature.realm.toUpperCase()}
          </Text>
        )}

        {/* ── EWW-meter bar ─────────────────────────────────────────── */}
        <View style={styles.meterBlock}>
          <View style={styles.meterRow}>
            <Text style={styles.meterLabel}>EWW-METER</Text>
            <Text style={[styles.meterScore, { color: ewwColor }]}>{fillPct}/100</Text>
          </View>
          <View style={styles.meterTrack}>
            <View style={[styles.meterFill, { width: `${fillPct}%`, backgroundColor: ewwColor }]} />
          </View>
        </View>

        {/* ── Gross fact ────────────────────────────────────────────── */}
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
            <Text style={styles.lockedSub}>
              Classify this specimen to unlock gross facts
            </Text>
          </View>
        )}

        {/* ── Classify CTA ──────────────────────────────────────────── */}
        {!isClassified && !isSilhouette && (
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

        {/* ── Classifying animation placeholder ─────────────────────── */}
        {isSilhouette && (
          <View style={styles.classifyingBanner}>
            <Text style={styles.classifyingText}>CLASSIFYING...</Text>
          </View>
        )}

        {/* ── Action buttons (classified) ───────────────────────────── */}
        {isClassified && (
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleMaster} activeOpacity={0.8}>
              <Image source={Assets.btnMaster} style={styles.actionBtnImg} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/(tabs)/recruit-file')}
              activeOpacity={0.8}
            >
              <Image source={Assets.btnAddToSet} style={styles.actionBtnImg} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        )}

        {/* Quiz nudge */}
        {isClassified && !isMastered && (
          <TouchableOpacity style={styles.quizNudge} onPress={() => router.push('/quiz')} activeOpacity={0.8}>
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
  root:      { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  errorText: { color: Colors.text.muted, fontSize: 17, textAlign: 'center', marginTop: 60 },

  backBtn:   { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  backLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      16,
    color:         Colors.text.lime,
    letterSpacing: 1,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.xxl,
    alignItems:        'center',
    gap:               16,
  },

  // ── Hero (classified / silhouette) ─────────────────────────────────────────
  // Full-width square — creature fills this. overflow:hidden clips the image
  // (safe here because the image has explicit 100% dimensions, not absoluteFill).
  heroWrap: {
    width:           HERO_SIZE,
    height:          HERO_SIZE,
    borderRadius:    Radius.xl,
    overflow:        'hidden',
    backgroundColor: Colors.bg.elevated,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.green}44`,
    alignItems:      'center',
    justifyContent:  'center',
  },
  heroWrapSilhouette: {
    borderColor: `${Colors.eww.purple}30`,
  },
  heroImage: {
    width:  '100%',
    height: '100%',
  },
  heroStamp: {
    position: 'absolute',
    bottom:   12,
    right:    12,
    width:    HERO_SIZE * 0.26,
    height:   HERO_SIZE * 0.26,
    opacity:  0.92,
  },
  masteredBadge: {
    position:        'absolute',
    top:             10,
    right:           10,
    backgroundColor: Colors.eww.gold,
    borderRadius:    16,
    width:           34,
    height:          34,
    alignItems:      'center',
    justifyContent:  'center',
  },
  masteredStar: { fontSize: 19, color: '#000', fontWeight: '900' },

  // ── Locked jar ─────────────────────────────────────────────────────────────
  // The Image has explicit pixel dimensions (LOCKED_JAR_W × LOCKED_JAR_H) so
  // the View sizes to the image. The ? text is absolute, centred within it.
  lockedJarWrap: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  jarLockText: {
    position:      'absolute',
    fontFamily:    FontFamily.creepster,
    fontSize:      80,
    color:         Colors.text.disabled,
    letterSpacing: 4,
  },

  // ── Post-classify banner ────────────────────────────────────────────────────
  classifiedBanner: {
    width:           '100%',
    backgroundColor: `${Colors.eww.green}22`,
    borderRadius:    Radius.lg,
    borderWidth:     2,
    borderColor:     Colors.eww.green,
    paddingVertical: 14,
    alignItems:      'center',
    gap:             4,
  },
  classifiedBannerTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      26,
    color:         Colors.text.lime,
    letterSpacing: 2,
  },
  classifiedBannerBonus: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         Colors.eww.amber,
    letterSpacing: 0.5,
  },
  classifiedBannerSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.secondary,
  },

  // ── Name / realm ───────────────────────────────────────────────────────────
  title: {
    fontFamily:       FontFamily.creepster,
    fontSize:         32,
    color:            Colors.text.primary,
    textAlign:        'center',
    letterSpacing:    1.5,
    textShadowColor:  Colors.eww.purple,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  realm: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    letterSpacing: 2.5,
    marginTop:     -8,
  },

  // ── EWW-meter bar ──────────────────────────────────────────────────────────
  meterBlock: { width: '100%', gap: 7 },
  meterRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
  meterLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.muted,
    letterSpacing: 2,
  },
  meterScore: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    letterSpacing: 0.5,
  },
  meterTrack: {
    width:           '100%',
    height:          14,
    backgroundColor: Colors.bg.elevated,
    borderRadius:    Radius.full,
    overflow:        'hidden',
  },
  meterFill: {
    position:     'absolute',
    left:         0,
    top:          0,
    bottom:       0,
    borderRadius: Radius.full,
    opacity:      0.9,
  },

  // ── Gross fact ─────────────────────────────────────────────────────────────
  factCard: {
    width:           '100%',
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    padding:         Spacing.md,
    gap:             10,
  },
  factHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  factIcon:   { width: 24, height: 24 },
  factLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.muted,
    letterSpacing: 2,
  },
  factText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   19,
    color:      Colors.text.primary,
    lineHeight: 27,
  },

  // ── Locked card ───────────────────────────────────────────────────────────
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
  lockIcon:   { width: 32, height: 32, opacity: 0.5 },
  lockedTitle: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         Colors.text.disabled,
    letterSpacing: 2,
  },
  lockedSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.disabled,
    textAlign:  'center',
    lineHeight: 22,
  },

  // ── Classify button ───────────────────────────────────────────────────────
  classifyBtn: {
    width:             '100%',
    backgroundColor:   Colors.eww.green,
    borderRadius:      Radius.lg,
    paddingVertical:   18,
    alignItems:        'center',
    gap:               4,
    shadowColor:       Colors.eww.greenDark,
    shadowOffset:      { width: 0, height: 5 },
    shadowOpacity:     0.5,
    shadowRadius:      8,
    elevation:         8,
  },
  classifyBtnLabel: {
    fontFamily:    FontFamily.creepster,
    fontSize:      24,
    color:         '#000',
    letterSpacing: 1.5,
  },
  classifyBtnSub: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         'rgba(0,0,0,0.55)',
    letterSpacing: 0.3,
  },

  // ── Classifying state ────────────────────────────────────────────────────
  classifyingBanner: {
    width:           '100%',
    backgroundColor: `${Colors.eww.amber}22`,
    borderRadius:    Radius.lg,
    paddingVertical: 18,
    alignItems:      'center',
    borderWidth:     1,
    borderColor:     `${Colors.eww.amber}66`,
  },
  classifyingText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         Colors.eww.amber,
    letterSpacing: 2,
  },

  // ── Action buttons ────────────────────────────────────────────────────────
  actionRow: { flexDirection: 'row', width: '100%', gap: 12 },
  actionBtn:    { flex: 1, alignItems: 'center' },
  actionBtnImg: { width: '100%', height: 84 },

  // ── Quiz nudge ────────────────────────────────────────────────────────────
  quizNudge:     { paddingVertical: 8 },
  quizNudgeText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         Colors.text.purple,
    letterSpacing: 0.3,
  },
});

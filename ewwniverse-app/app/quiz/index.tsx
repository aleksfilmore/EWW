/**
 * Creature Mastery Quiz
 *
 * Launched from the creature detail screen with ?id=<creature_id>.
 * Flow:
 *   intro → 3 questions → mastered (all correct) | failed (any wrong)
 *
 * Economics:
 *   - First time mastering a creature: award MASTERY_QUIZ_SCANS, set state → 'mastered'
 *   - Repeat attempts: no scan reward, unlimited retries
 */
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';
import { getCreatureById, getCreatureQuiz } from '@/data/index';
import { CREATURE_IMAGES } from '@/constants/creatureImages';
import { MASTERY_QUIZ_SCANS, MASTERY_MILESTONES } from '@/constants/game';
import { pickRandomUnownedCommon } from '@/data/special-specimens';
import { playSfx } from '@/services/audio';
import { IS_TABLET, CONTENT_W, centeredColumn } from '@/constants/responsive';

// Cap layout width on tablet so the quiz forms a centred, readable column.
const { width: RAW_SCREEN_W } = Dimensions.get('window');
const SCREEN_W = IS_TABLET ? Math.min(RAW_SCREEN_W, CONTENT_W) : RAW_SCREEN_W;

type Phase = 'intro' | 'question' | 'mastered' | 'failed';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const profile                  = useUserStore((s) => s.profile);
  const creatures                = useUserStore((s) => s.creatures);
  const addScans                  = useUserStore((s) => s.addScans);
  const setCreatureState          = useUserStore((s) => s.setCreatureState);
  const incrementDailyQuizAnswer  = useUserStore((s) => s.incrementDailyQuizAnswer);
  const unlockSpecialSpecimen     = useUserStore((s) => s.unlockSpecialSpecimen);
  const triggerContamination      = useUserStore((s) => s.triggerContamination);
  const triggerDrIcky             = useGameStore((s) => s.triggerDrIcky);
  const triggerContaminationEvent = useGameStore((s) => s.triggerContaminationEvent);

  const creature    = id ? getCreatureById(id) : undefined;
  const quizEntry   = id ? getCreatureQuiz(id) : undefined;
  const creatureImg = id ? CREATURE_IMAGES[id] : undefined;

  // Pre-shuffle question options once per session
  const shuffledQuestions = useMemo(() => {
    if (!quizEntry) return [];
    return quizEntry.questions.map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
  }, [quizEntry]);

  const [phase,               setPhase]               = useState<Phase>('intro');
  const [currentIdx,          setCurrentIdx]          = useState(0);
  const [selected,            setSelected]            = useState<string | null>(null);
  const [answered,            setAnswered]            = useState(false);
  const [scansEarned,         setScansEarned]         = useState(0);
  const [slimeSurgeTriggered, setSlimeSurgeTriggered] = useState(false);

  const alreadyMastered = creatures[id ?? '']?.state === 'mastered';

  // Play a sound cue each time a new question is shown
  useEffect(() => {
    if (phase === 'question') {
      playSfx('sfx_question');
    }
  }, [phase, currentIdx]);

  const handleStartQuiz = useCallback(() => {
    setPhase('question');
    setCurrentIdx(0);
    setSelected(null);
    setAnswered(false);
  }, []);

  const handleSelect = useCallback((option: string) => {
    if (answered) return;
    playSfx('sfx_answer_tap');
    setSelected(option);
  }, [answered]);

  const handleSubmit = useCallback(() => {
    if (!selected || answered || !quizEntry) return;
    setAnswered(true);

    const q = shuffledQuestions[currentIdx];
    const isCorrect = selected === q.correct_answer;

    incrementDailyQuizAnswer();

    if (isCorrect) {
      playSfx('sfx_correct');
    } else {
      playSfx('sfx_wrong');
      // Do NOT trigger wrong_answer video here — quiz_fail fires in the timeout below
    }

    setTimeout(() => {
      if (!isCorrect) {
        // Any wrong answer → fail immediately; quiz_fail video plays once
        triggerDrIcky('quiz_fail', true);
        setPhase('failed');
        return;
      }

      const nextIdx = currentIdx + 1;
      if (nextIdx >= shuffledQuestions.length) {
        // All 3 correct → mastered
        playSfx('sfx_quiz_complete');

        let didSurge = false;

        if (!alreadyMastered) {
          setCreatureState(id!, 'mastered');
          const earned = profile?.is_paid
            ? MASTERY_QUIZ_SCANS.paid
            : MASTERY_QUIZ_SCANS.free;
          addScans(earned);
          setScansEarned(earned);

          // Read fresh profile after state update to get accurate counts
          const fresh          = useUserStore.getState().profile;
          const newMastered    = fresh?.mastered_count ?? 0;
          const surgeIdx       = fresh?.contamination_count ?? 0;

          if (
            surgeIdx < MASTERY_MILESTONES.length &&
            newMastered >= MASTERY_MILESTONES[surgeIdx]
          ) {
            const ownedIds = Object.keys(fresh?.special_specimens ?? {});
            const specimen = pickRandomUnownedCommon(ownedIds);
            if (specimen) {
              unlockSpecialSpecimen(specimen.id, 'contamination');
              triggerContamination(specimen.id);
              triggerContaminationEvent(specimen.id);
              playSfx('sfx_contamination');
              setSlimeSurgeTriggered(true);
              didSurge = true;
            }
          }
        }

        if (!didSurge) {
          triggerDrIcky('mastered', true);
        }
        setPhase('mastered');
      } else {
        setCurrentIdx(nextIdx);
        setSelected(null);
        setAnswered(false);
      }
    }, 1200);
  }, [selected, answered, currentIdx, shuffledQuestions, quizEntry, alreadyMastered, id, profile, incrementDailyQuizAnswer, unlockSpecialSpecimen, triggerContamination, triggerContaminationEvent]);

  const handleRetry = useCallback(() => {
    setPhase('intro');
    setCurrentIdx(0);
    setSelected(null);
    setAnswered(false);
  }, []);

  if (!creature || !quizEntry || !profile) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backLabel}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>Quiz data not found for this specimen.</Text>
      </SafeAreaView>
    );
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backLabel}>← BACK</Text>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.introContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Creature image */}
          {creatureImg && (
            <Image
              source={creatureImg}
              style={styles.introCreatureImg}
              resizeMode="contain"
            />
          )}

          <Text style={styles.introCreatureName}>{creature.title.toUpperCase()}</Text>

          <View style={styles.introLabel}>
            <Text style={styles.introLabelText}>DR. ICKY'S FILE</Text>
          </View>

          <View style={styles.introTextCard}>
            <Text style={styles.introText}>{quizEntry.master_text}</Text>
          </View>

          <View style={styles.introHint}>
            <Text style={styles.introHintText}>
              Read carefully. The quiz is based on this file.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.startBtn}
            onPress={handleStartQuiz}
            activeOpacity={0.85}
          >
            <Text style={styles.startBtnText}>START QUIZ</Text>
            <Text style={styles.startBtnSub}>3 questions · all must be correct</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── MASTERED ──────────────────────────────────────────────────────────────
  if (phase === 'mastered') {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.resultScreen}>
          {creatureImg && (
            <Image source={creatureImg} style={styles.resultCreatureImg} resizeMode="contain" />
          )}

          <Text style={styles.masteredTitle}>SPECIMEN MASTERED</Text>
          <Text style={styles.masteredSubtitle}>{quizEntry.mastered_success_text}</Text>

          {scansEarned > 0 && (
            <View style={styles.rewardBadge}>
              <Image source={Assets.iconSlimeCoin} style={styles.slimeCoinIcon} resizeMode="contain" />
              <Text style={styles.rewardText}>+{scansEarned} SCANS EARNED</Text>
            </View>
          )}

          {slimeSurgeTriggered && (
            <View style={styles.surgeBadge}>
              <Text style={styles.surgeText}>☣  SLIME SURGE UNLOCKED</Text>
            </View>
          )}

          {alreadyMastered && scansEarned === 0 && (
            <Text style={styles.noReward}>Already mastered — no scan bonus this time</Text>
          )}

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Text style={styles.doneBtnText}>BACK TO SPECIMEN</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── FAILED ────────────────────────────────────────────────────────────────
  if (phase === 'failed') {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.resultScreen}>
          <Text style={styles.failTitle}>WRONG ANSWER</Text>
          <Text style={styles.failSubtitle}>{quizEntry.retry_text}</Text>

          <TouchableOpacity
            style={styles.retryBtn}
            onPress={handleRetry}
            activeOpacity={0.85}
          >
            <Text style={styles.retryBtnText}>TRY AGAIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backLinkBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backLinkText}>Back to specimen ›</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── QUESTION ──────────────────────────────────────────────────────────────
  const q = shuffledQuestions[currentIdx];

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerCreature}>{creature.title.toUpperCase()}</Text>
        <Text style={styles.headerProgress}>
          {currentIdx + 1} / {shuffledQuestions.length}
        </Text>
      </View>

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {shuffledQuestions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < currentIdx   && styles.dotDone,
              i === currentIdx && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Body — centred to a readable column on tablet */}
      <View style={styles.quizBody}>
      {/* Question — fixed card, not scrollable */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{q.question}</Text>
      </View>

      {/* Options — flex to fill remaining space */}
      <View style={styles.optionsList}>
        {q.options.map((option, optIdx) => {
          const isCorrect  = option === q.correct_answer;
          const isSelected = option === selected;

          // Distinct accent color per option index for a kid-friendly look
          const OPTION_COLORS = [
            Colors.eww.amber,   // 0
            Colors.eww.green,   // 1
            Colors.eww.coral,   // 2
            Colors.eww.purple,  // 3
          ];
          const accentColor = OPTION_COLORS[optIdx % OPTION_COLORS.length];

          const borderColor: string =
            answered && isCorrect   ? Colors.eww.green  :
            answered && isSelected  ? Colors.eww.coral  :
            isSelected              ? accentColor       :
            `${accentColor}55`;

          const bgColor: string =
            answered && isCorrect   ? `${Colors.eww.green}25`  :
            answered && isSelected  ? `${Colors.eww.coral}25`  :
            isSelected              ? `${accentColor}22`       :
            `${accentColor}0D`;

          const textColor: string =
            answered && isCorrect   ? Colors.eww.green :
            answered && isSelected  ? Colors.eww.coral :
            isSelected              ? accentColor      :
            Colors.text.primary;

          return (
            <TouchableOpacity
              key={option}
              style={[styles.optionBtn, { borderColor, backgroundColor: bgColor }]}
              onPress={() => handleSelect(option)}
              activeOpacity={0.75}
              disabled={answered}
            >
              <Text style={[styles.optionText, { color: textColor }]}>
                {option}
              </Text>
              {answered && isCorrect  && <Text style={styles.feedbackMark}>✓</Text>}
              {answered && isSelected && !isCorrect && <Text style={styles.feedbackWrong}>✗</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Submit */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!selected || answered}
        activeOpacity={0.8}
        style={[styles.submitWrap, (!selected || answered) && styles.submitDisabled]}
      >
        <Image
          source={Assets.btnSubmitAnswer}
          style={styles.submitImg}
          resizeMode="contain"
        />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  quizBody: { flex: 1, width: '100%', ...centeredColumn },

  backBtn: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  backLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      16,
    color:         Colors.text.lime,
    letterSpacing: 1,
  },
  errorText: {
    color:     Colors.text.muted,
    fontSize:  17,
    textAlign: 'center',
    marginTop: 60,
    fontFamily: FontFamily.boogaloo,
  },

  // ── Intro ─────────────────────────────────────────────────────────────────
  introContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.xxl,
    alignItems:        'center',
    gap:               16,
    ...centeredColumn,
  },
  introCreatureImg: {
    width:  SCREEN_W * 0.55,
    height: SCREEN_W * 0.55,
  },
  introCreatureName: {
    fontFamily:    FontFamily.creepster,
    fontSize:      26,
    color:         Colors.text.primary,
    letterSpacing: 1.5,
    textAlign:     'center',
  },
  introLabel: {
    backgroundColor:   `${Colors.eww.purple}22`,
    borderRadius:      Radius.full,
    borderWidth:       1,
    borderColor:       `${Colors.eww.purple}55`,
    paddingHorizontal: 14,
    paddingVertical:   5,
  },
  introLabelText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.purple,
    letterSpacing: 2,
  },
  introTextCard: {
    width:           '100%',
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     Colors.border.DEFAULT,
    padding:         Spacing.md,
  },
  introText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   18,
    color:      Colors.text.primary,
    lineHeight: 26,
  },
  introHint: {
    alignItems: 'center',
  },
  introHintText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         Colors.text.muted,
    letterSpacing: 0.3,
    textAlign:     'center',
  },
  startBtn: {
    width:           '100%',
    backgroundColor: Colors.eww.green,
    borderRadius:    Radius.lg,
    paddingVertical: 18,
    alignItems:      'center',
    gap:             4,
    shadowColor:     Colors.eww.greenDark,
    shadowOffset:    { width: 0, height: 5 },
    shadowOpacity:   0.5,
    shadowRadius:    8,
    elevation:       8,
  },
  startBtnText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      24,
    color:         '#000',
    letterSpacing: 1.5,
  },
  startBtnSub: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         'rgba(0,0,0,0.55)',
    letterSpacing: 0.3,
  },

  // ── Header (question phase) ───────────────────────────────────────────────
  header: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop:        8,
    paddingBottom:     4,
  },
  closeBtn: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   22,
    color:      Colors.text.muted,
  },
  headerCreature: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      15,
    color:         Colors.text.secondary,
    letterSpacing: 1,
    flex:          1,
    textAlign:     'center',
    marginHorizontal: 8,
  },
  headerProgress: {
    fontFamily:    FontFamily.creepster,
    fontSize:      18,
    color:         Colors.eww.amber,
    letterSpacing: 0.5,
    minWidth:      36,
    textAlign:     'right',
  },

  // ── Progress dots ─────────────────────────────────────────────────────────
  dotsRow: {
    flexDirection:  'row',
    justifyContent: 'center',
    gap:            10,
    marginBottom:   10,
    marginTop:      4,
  },
  dot: {
    width:           14,
    height:          14,
    borderRadius:    7,
    backgroundColor: Colors.bg.elevated,
  },
  dotDone: { backgroundColor: Colors.eww.green },
  dotActive: {
    backgroundColor: Colors.eww.amber,
    transform:       [{ scale: 1.3 }],
  },

  // ── Question ──────────────────────────────────────────────────────────────
  questionCard: {
    backgroundColor:   Colors.bg.elevated,
    borderRadius:      Radius.lg,
    borderWidth:       2,
    borderColor:       `${Colors.eww.amber}55`,
    padding:           Spacing.md,
    marginHorizontal:  Spacing.md,
    marginBottom:      12,
  },
  questionText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   26,
    color:      Colors.text.primary,
    lineHeight: 34,
  },

  // ── Options ───────────────────────────────────────────────────────────────
  optionsList: {
    flex:              1,
    gap:               10,
    paddingHorizontal: Spacing.md,
    justifyContent:    'center',
  },
  optionBtn: {
    width:          '100%',
    borderRadius:   Radius.md,
    borderWidth:    2,
    paddingVertical:  14,
    paddingHorizontal: Spacing.md,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            8,
  },
  optionText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   20,
    flex:       1,
    lineHeight: 26,
  },
  feedbackMark:  { fontSize: 22, color: Colors.eww.green, fontWeight: '900' },
  feedbackWrong: { fontSize: 22, color: Colors.eww.coral, fontWeight: '900' },

  // ── Submit ────────────────────────────────────────────────────────────────
  submitWrap: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.sm,
    alignItems:        'center',
  },
  submitDisabled: { opacity: 0.35 },
  submitImg: { width: '100%', height: 72 },

  // ── Result screens ────────────────────────────────────────────────────────
  resultScreen: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    padding:        Spacing.xl,
    gap:            14,
    ...centeredColumn,
  },
  resultCreatureImg: {
    width:        SCREEN_W * 0.5,
    height:       SCREEN_W * 0.5,
    marginBottom: 8,
  },
  masteredTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      36,
    color:         Colors.text.lime,
    letterSpacing: 2,
    textAlign:     'center',
  },
  masteredSubtitle: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   17,
    color:      Colors.text.secondary,
    textAlign:  'center',
    lineHeight: 24,
  },
  rewardBadge: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               8,
    backgroundColor:   `${Colors.eww.gold}22`,
    borderRadius:      Radius.full,
    borderWidth:       1.5,
    borderColor:       Colors.eww.gold,
    paddingHorizontal: 18,
    paddingVertical:   10,
    marginTop:         4,
  },
  slimeCoinIcon: { width: 22, height: 22 },
  rewardText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      18,
    color:         Colors.eww.gold,
    letterSpacing: 1,
  },
  surgeBadge: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   `${Colors.eww.green}22`,
    borderRadius:      Radius.full,
    borderWidth:       1.5,
    borderColor:       `${Colors.eww.green}66`,
    paddingHorizontal: 18,
    paddingVertical:   10,
    marginTop:         4,
  },
  surgeText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      17,
    color:         Colors.text.lime,
    letterSpacing: 1,
  },
  noReward: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.text.muted,
    textAlign:  'center',
  },
  doneBtn: {
    backgroundColor:   Colors.eww.green,
    borderRadius:      Radius.full,
    paddingVertical:   16,
    paddingHorizontal: 40,
    marginTop:         Spacing.md,
  },
  doneBtnText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      20,
    color:         '#000',
    letterSpacing: 1.5,
  },
  failTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      36,
    color:         Colors.eww.coral,
    letterSpacing: 2,
    textAlign:     'center',
  },
  failSubtitle: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   17,
    color:      Colors.text.secondary,
    textAlign:  'center',
    lineHeight: 24,
  },
  retryBtn: {
    backgroundColor:   Colors.eww.amber,
    borderRadius:      Radius.full,
    paddingVertical:   16,
    paddingHorizontal: 40,
    marginTop:         Spacing.md,
  },
  retryBtnText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      20,
    color:         '#000',
    letterSpacing: 1.5,
  },
  backLinkBtn: { paddingVertical: 10 },
  backLinkText: {
    fontFamily:         FontFamily.boogaloo,
    fontSize:           14,
    color:              Colors.text.muted,
    textDecorationLine: 'underline',
  },
});

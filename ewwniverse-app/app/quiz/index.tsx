/**
 * LAB QUIZ — Gross Fact → Name.
 *
 * badgeLabQuiz header, illustrated answer cards with creature jars,
 * progress dots + live streak, SUBMIT ANSWER illustrated button.
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';
import { creepyCreatures } from '@/data/index';
import { Creature } from '@/types/creature';
import { CREATURE_IMAGES } from '@/constants/creatureImages';
import {
  CONTAMINATION_STREAK,
  QUIZ_SCAN_REWARDS,
} from '@/constants/game';
import { pickRandomUnownedCommon } from '@/data/special-specimens';
import { playSfx } from '@/services/audio';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_W     = (SCREEN_W - Spacing.md * 2 - 8) / 2;   // 2-col grid card width
const OPTION_JAR = CARD_W - 20;                             // subtract card padding

const QUESTIONS_PER_SESSION = 5;

interface Question {
  fact: string;
  correctId: string;
  options: Creature[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(creatures: Creature[], count: number): Question[] {
  const pool = shuffle(creatures);
  const questions: Question[] = [];
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    const correct = pool[i];
    const distractors = shuffle(pool.filter((c) => c.id !== correct.id)).slice(0, 3);
    const options = shuffle([correct, ...distractors]);
    questions.push({ fact: correct.gross_fact, correctId: correct.id, options });
  }
  return questions;
}

export default function QuizScreen() {
  const profile              = useUserStore((s) => s.profile);
  const addScans                 = useUserStore((s) => s.addScans);
  const unlockSpecialSpecimen    = useUserStore((s) => s.unlockSpecialSpecimen);
  const getOwnedSpecialIds       = useUserStore((s) => s.getOwnedSpecialIds);
  const recordCorrect            = useGameStore((s) => s.recordCorrectAnswer);
  const recordWrong              = useGameStore((s) => s.recordWrongAnswer);
  const quizStreak               = useGameStore((s) => s.quizStreak);
  const triggerContamination     = useGameStore((s) => s.triggerContaminationEvent);
  const resetQuizSession         = useGameStore((s) => s.resetQuizSession);
  const userTriggerContamination = useUserStore((s) => s.triggerContamination);

  const [questions] = useState<Question[]>(() =>
    buildQuestions(creepyCreatures as Creature[], QUESTIONS_PER_SESSION),
  );
  const [currentIdx,  setCurrentIdx]  = useState(0);
  const [score,       setScore]       = useState(0);
  const [selected,    setSelected]    = useState<string | null>(null);
  const [answered,    setAnswered]    = useState(false);   // after submit
  const [sessionDone, setSessionDone] = useState(false);
  const [finalScore,  setFinalScore]  = useState(0);

  const q = questions[currentIdx];

  // Step 1: player taps an option
  const handleSelect = useCallback(
    (id: string) => {
      if (answered) return;
      playSfx('sfx_answer_tap');
      setSelected(id);
    },
    [answered],
  );

  // Step 2: player taps SUBMIT ANSWER
  const handleSubmit = useCallback(() => {
    if (!selected || answered) return;
    setAnswered(true);

    const isCorrect = selected === q.correctId;
    if (isCorrect) {
      playSfx('sfx_correct');
      setScore((s) => s + 1);
      recordCorrect();
      // Contamination Event fires when the streak threshold is hit
      if (quizStreak + 1 >= CONTAMINATION_STREAK) {
        playSfx('sfx_contamination');
        // Pick a random unowned Common specimen to drop
        const ownedIds = getOwnedSpecialIds();
        const dropped  = pickRandomUnownedCommon(ownedIds);
        if (dropped) {
          unlockSpecialSpecimen(dropped.id, 'contamination');
        }
        triggerContamination(dropped?.id ?? null);
        userTriggerContamination();
      }
    } else {
      playSfx('sfx_wrong');
      recordWrong();
    }

    // Advance to next question after delay
    setTimeout(() => {
      if (currentIdx + 1 >= QUESTIONS_PER_SESSION) {
        const final = isCorrect ? score + 1 : score;
        setFinalScore(final);
        playSfx('sfx_quiz_complete');
        setSessionDone(true);
        const rewardTable = profile?.is_paid
          ? QUIZ_SCAN_REWARDS.paid
          : QUIZ_SCAN_REWARDS.free;
        const earned = rewardTable[final] ?? 0;
        if (earned > 0) addScans(earned);
      } else {
        setCurrentIdx((i) => i + 1);
        setSelected(null);
        setAnswered(false);
      }
    }, 1400);
  }, [selected, answered, q, currentIdx, score, quizStreak, profile]);

  if (!profile) return null;

  // ── Results screen ────────────────────────────────────────────────────────
  if (sessionDone) {
    const rewardTable  = profile.is_paid ? QUIZ_SCAN_REWARDS.paid : QUIZ_SCAN_REWARDS.free;
    const scansEarned  = rewardTable[finalScore] ?? 0;
    const grade        = finalScore >= 4 ? '🧬' : finalScore >= 3 ? '🔬' : '🦠';

    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.resultScreen}>
          <Image source={Assets.badgeLabQuiz} style={styles.resultBadge} resizeMode="contain" />
          <Text style={styles.resultEmoji}>{grade}</Text>
          <Text style={styles.resultScore}>{finalScore} / {QUESTIONS_PER_SESSION}</Text>
          <Text style={styles.resultLabel}>CORRECT</Text>

          {scansEarned > 0 ? (
            <View style={styles.rewardBadge}>
              <Image source={Assets.iconSlimeCoin} style={styles.slimeCoinIcon} resizeMode="contain" />
              <Text style={styles.rewardText}>+{scansEarned} SCANS EARNED</Text>
            </View>
          ) : (
            <Text style={styles.noReward}>Score 3+ to earn scans next time</Text>
          )}

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => { resetQuizSession(); router.back(); }}
          >
            <Text style={styles.doneBtnText}>BACK TO LAB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => { resetQuizSession(); router.replace('/quiz'); }}
          >
            <Text style={styles.retryBtnText}>Play again ›</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Active quiz ───────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>

        <Image source={Assets.badgeLabQuiz} style={styles.headerBadge} resizeMode="contain" />

        <View style={styles.streakChip}>
          <Text style={styles.streakText}>🔥 {quizStreak}</Text>
        </View>
      </View>

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < currentIdx  && styles.dotDone,
              i === currentIdx && styles.dotActive,
            ]}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Question type icon + prompt */}
        <View style={styles.questionBlock}>
          <View style={styles.questionTypeRow}>
            <Image source={Assets.quizIconFact} style={styles.questionTypeIcon} resizeMode="contain" />
            <Text style={styles.questionType}>IDENTIFY THE SPECIMEN</Text>
          </View>
          <Text style={styles.questionPrompt}>Which creature does this describe?</Text>
          <View style={styles.factCard}>
            <Text style={styles.factText}>{q.fact}</Text>
          </View>
        </View>

        {/* 4-up answer grid */}
        <View style={styles.optionsGrid}>
          {q.options.map((opt) => {
            const isCorrect  = opt.id === q.correctId;
            const isSelected = opt.id === selected;
            const creatureImg = CREATURE_IMAGES[opt.id];

            // Colour states after submit
            const borderColor: string =
              answered && isCorrect   ? Colors.eww.green  :
              answered && isSelected  ? Colors.eww.coral  :
              isSelected              ? Colors.eww.purple  :
              Colors.border.subtle;

            const bgColor: string =
              answered && isCorrect   ? `${Colors.eww.green}18`  :
              answered && isSelected  ? `${Colors.eww.coral}18`  :
              isSelected              ? `${Colors.eww.purple}18`  :
              Colors.bg.card;

            return (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.optionCard,
                  { borderColor, backgroundColor: bgColor },
                ]}
                onPress={() => handleSelect(opt.id)}
                activeOpacity={0.75}
                disabled={answered}
              >
                {/* Mini jar with creature */}
                <View style={[styles.optionJarWrap, { width: OPTION_JAR, height: OPTION_JAR }]}>
                  <Image
                    source={isSelected || (answered && isCorrect)
                      ? Assets.jarClassified
                      : Assets.jarLockedFrame}
                    style={StyleSheet.absoluteFill}
                    resizeMode="contain"
                  />
                  {creatureImg ? (
                    <Image
                      source={creatureImg}
                      style={[
                        styles.optionCreatureImg,
                        { width: OPTION_JAR * 0.50, height: OPTION_JAR * 0.50 },
                        !isSelected && !answered && styles.silhouette,
                      ]}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.optionPlaceholder}>🦠</Text>
                  )}
                </View>

                {/* Name + feedback */}
                <Text style={[
                  styles.optionName,
                  answered && isCorrect  && styles.optionNameCorrect,
                  answered && isSelected && !isCorrect && styles.optionNameWrong,
                ]}>
                  {opt.title}
                </Text>
                {answered && isCorrect  && <Text style={styles.feedbackMark}>✓</Text>}
                {answered && isSelected && !isCorrect && <Text style={styles.feedbackWrong}>✗</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SUBMIT ANSWER button */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },

  // ── Header ───────────────────────────────────────────────────────────────
  header: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop:        8,
    paddingBottom:     4,
  },
  closeBtn: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   20,
    color:      Colors.text.muted,
  },
  headerBadge: {
    height: 44,
    width:  140,
  },
  streakChip: {
    backgroundColor: `${Colors.eww.amber}22`,
    borderRadius:    Radius.full,
    paddingHorizontal: 10,
    paddingVertical:   5,
    borderWidth:       1,
    borderColor:       `${Colors.eww.amber}44`,
  },
  streakText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.eww.amber,
  },

  // ── Progress dots ─────────────────────────────────────────────────────────
  dotsRow: {
    flexDirection:  'row',
    justifyContent: 'center',
    gap:            8,
    marginBottom:   10,
    marginTop:      4,
  },
  dot: {
    width:           12,
    height:          12,
    borderRadius:    6,
    backgroundColor: Colors.bg.elevated,
  },
  dotDone: {
    backgroundColor: Colors.eww.green,
  },
  dotActive: {
    backgroundColor: Colors.eww.amber,
    transform:       [{ scale: 1.25 }],
  },

  // ── Content ───────────────────────────────────────────────────────────────
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.xxl,
    gap:               16,
  },

  questionBlock: { gap: 8 },
  questionTypeRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           6,
  },
  questionTypeIcon: { width: 20, height: 20 },
  questionType: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    color:         Colors.text.purple,
    letterSpacing: 2,
  },
  questionPrompt: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      16,
    color:         Colors.text.muted,
    letterSpacing: 0.3,
  },
  factCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     Colors.border.DEFAULT,
    padding:         Spacing.md,
  },
  factText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   20,
    color:      Colors.text.primary,
    lineHeight: 28,
  },

  // ── Options grid ──────────────────────────────────────────────────────────
  optionsGrid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    gap:           8,
  },
  optionCard: {
    width:           CARD_W,
    borderRadius:    Radius.md,
    borderWidth:     1.5,
    padding:         10,
    alignItems:      'center',
    gap:             6,
  },
  optionJarWrap: {
    alignItems:     'center',
    justifyContent: 'center',
    position:       'relative',
  },
  optionCreatureImg: {
    position:  'absolute',
    top:       '18%',
    alignSelf: 'center',
  },
  silhouette: {
    tintColor: Colors.bg.elevated,
    opacity:   0.35,
  },
  optionPlaceholder: {
    fontSize: 30,
  },
  optionName: {
    fontFamily:  FontFamily.boogaloo,
    fontSize:    15,
    color:       Colors.text.secondary,
    textAlign:   'center',
    lineHeight:  20,
    letterSpacing: 0.2,
  },
  optionNameCorrect: { color: Colors.eww.green },
  optionNameWrong:   { color: Colors.eww.coral },
  feedbackMark: { fontSize: 18, color: Colors.eww.green, fontWeight: '900' },
  feedbackWrong: { fontSize: 18, color: Colors.eww.coral, fontWeight: '900' },

  // ── Submit button ─────────────────────────────────────────────────────────
  submitWrap: {
    width:      '100%',
    alignItems: 'center',
  },
  submitDisabled: { opacity: 0.35 },
  submitImg: {
    width:  '100%',
    height: 64,
  },

  // ── Results ───────────────────────────────────────────────────────────────
  resultScreen: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    padding:        Spacing.xl,
    gap:            12,
  },
  resultBadge: {
    width:        200,
    height:       80,
    marginBottom: 8,
  },
  resultEmoji: { fontSize: 72 },
  resultScore: {
    fontFamily:    FontFamily.creepster,
    fontSize:      80,
    color:         Colors.text.lime,
    letterSpacing: 2,
    lineHeight:    82,
  },
  resultLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         Colors.text.muted,
    letterSpacing: 3,
  },
  rewardBadge: {
    flexDirection:   'row',
    alignItems:      'center',
    gap:             8,
    backgroundColor: `${Colors.eww.gold}22`,
    borderRadius:    Radius.full,
    borderWidth:     1.5,
    borderColor:     Colors.eww.gold,
    paddingHorizontal: 18,
    paddingVertical:   10,
    marginTop:         8,
  },
  slimeCoinIcon: { width: 22, height: 22 },
  rewardText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      18,
    color:         Colors.eww.gold,
    letterSpacing: 1,
  },
  noReward: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.text.muted,
  },
  doneBtn: {
    backgroundColor: Colors.eww.green,
    borderRadius:    Radius.full,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop:       Spacing.md,
  },
  doneBtnText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      20,
    color:         '#000',
    letterSpacing: 1.5,
  },
  retryBtn:    { paddingVertical: 10 },
  retryBtnText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.muted,
    textDecorationLine: 'underline',
  },
});

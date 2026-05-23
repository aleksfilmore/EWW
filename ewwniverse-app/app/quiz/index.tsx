/**
 * Quiz screen — Gross Fact → Name (Type 1, free tier).
 * Shows gross fact, three creature silhouette choices.
 * Correct answers earn scans. 3 correct in a row triggers Contamination Event.
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, Radius } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';
import { creepyCreatures } from '@/data/index';
import { Creature } from '@/types/creature';
import {
  CONTAMINATION_STREAK,
  QUIZ_SCAN_REWARDS,
} from '@/constants/game';

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
    const distractors = shuffle(pool.filter((c) => c.id !== correct.id)).slice(0, 2);
    const options = shuffle([correct, ...distractors]);
    questions.push({
      fact: correct.gross_fact,
      correctId: correct.id,
      options,
    });
  }
  return questions;
}

export default function QuizScreen() {
  const profile = useUserStore((s) => s.profile);
  const addScans = useUserStore((s) => s.addScans);
  const recordCorrect = useGameStore((s) => s.recordCorrectAnswer);
  const recordWrong = useGameStore((s) => s.recordWrongAnswer);
  const quizStreak = useGameStore((s) => s.quizStreak);
  const triggerContamination = useGameStore((s) => s.triggerContaminationEvent);
  const resetQuizSession = useGameStore((s) => s.resetQuizSession);
  const userTriggerContamination = useUserStore((s) => s.triggerContamination);

  const [questions] = useState<Question[]>(() =>
    buildQuestions(creepyCreatures as Creature[], QUESTIONS_PER_SESSION),
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const q = questions[currentIdx];

  const handleSelect = useCallback(
    (id: string) => {
      if (selected !== null) return;
      setSelected(id);

      const isCorrect = id === q.correctId;
      if (isCorrect) {
        setScore((s) => s + 1);
        recordCorrect();
        // Check contamination trigger (after increment)
        if (quizStreak + 1 >= CONTAMINATION_STREAK) {
          triggerContamination();
          userTriggerContamination();
        }
      } else {
        recordWrong();
      }

      // Advance after short delay
      setTimeout(() => {
        if (currentIdx + 1 >= QUESTIONS_PER_SESSION) {
          const final = isCorrect ? score + 1 : score;
          setFinalScore(final);
          setSessionDone(true);
          // Award scans
          const rewardTable = profile?.is_paid
            ? QUIZ_SCAN_REWARDS.paid
            : QUIZ_SCAN_REWARDS.free;
          const earned = rewardTable[final] ?? 0;
          if (earned > 0) addScans(earned);
        } else {
          setCurrentIdx((i) => i + 1);
          setSelected(null);
        }
      }, 1200);
    },
    [selected, q, currentIdx, score, quizStreak, profile],
  );

  if (!profile) return null;

  if (sessionDone) {
    const rewardTable = profile.is_paid
      ? QUIZ_SCAN_REWARDS.paid
      : QUIZ_SCAN_REWARDS.free;
    const scansEarned = rewardTable[finalScore] ?? 0;

    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <View style={styles.resultScreen}>
          <Text style={styles.resultEmoji}>
            {finalScore >= 4 ? '🧬' : finalScore >= 3 ? '🔬' : '🦠'}
          </Text>
          <Text style={styles.resultScore}>
            {finalScore} / {QUESTIONS_PER_SESSION}
          </Text>
          <Text style={styles.resultLabel}>correct</Text>
          {scansEarned > 0 ? (
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>+{scansEarned} scans earned!</Text>
            </View>
          ) : (
            <Text style={styles.noReward}>Score 3+ to earn scans</Text>
          )}
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => {
              resetQuizSession();
              router.back();
            }}
          >
            <Text style={styles.doneBtnText}>Back to Lab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              resetQuizSession();
              router.replace('/quiz');
            }}
            style={styles.retryBtn}
          >
            <Text style={styles.retryBtnText}>Play again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLabel}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.progress}>
          {currentIdx + 1} / {QUESTIONS_PER_SESSION}
        </Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 {quizStreak}</Text>
        </View>
      </View>

      {/* Score dots */}
      <View style={styles.scoreDots}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < currentIdx && {
                backgroundColor: Colors.eww.green,
              },
              i === currentIdx && {
                backgroundColor: Colors.eww.amber,
                transform: [{ scale: 1.2 }],
              },
            ]}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Fact card */}
        <View style={styles.factCard}>
          <Text style={styles.factPrompt}>Which creature does this describe?</Text>
          <Text style={styles.factText}>{q.fact}</Text>
        </View>

        {/* Options */}
        <View style={styles.options}>
          {q.options.map((opt) => {
            const isCorrect = opt.id === q.correctId;
            const isSelected = opt.id === selected;
            const optBg: string = selected !== null && isCorrect
              ? `${Colors.eww.green}22`
              : selected !== null && isSelected
              ? `${Colors.eww.coral}22`
              : Colors.bg.card;
            const optBorder: string = selected !== null && isCorrect
              ? Colors.eww.green
              : selected !== null && isSelected
              ? Colors.eww.coral
              : Colors.border.subtle;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.option, { backgroundColor: optBg, borderColor: optBorder }]}
                onPress={() => handleSelect(opt.id)}
                activeOpacity={0.7}
                disabled={selected !== null}
              >
                <Text style={styles.optionEmoji}>🦠</Text>
                <Text style={styles.optionName}>{opt.title}</Text>
                {selected !== null && isCorrect && (
                  <Text style={styles.correctMark}>✓</Text>
                )}
                {selected !== null && isSelected && !isCorrect && (
                  <Text style={styles.wrongMark}>✗</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backLabel: { fontSize: 18, color: Colors.text.muted, fontWeight: '700' },
  progress: { fontSize: 14, color: Colors.text.secondary, fontWeight: '600' },
  streakBadge: {
    backgroundColor: `${Colors.eww.amber}22`,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: { fontSize: 13, fontWeight: '700', color: Colors.eww.amber },

  scoreDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.bg.elevated,
  },

  content: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },

  factCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.DEFAULT,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  factPrompt: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.eww.green,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  factText: {
    fontSize: 17,
    color: Colors.text.primary,
    lineHeight: 26,
    fontWeight: '500',
  },

  options: { gap: Spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    borderWidth: 1.5,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  optionEmoji: { fontSize: 28 },
  optionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  correctMark: { fontSize: 18, color: Colors.eww.green, fontWeight: '900' },
  wrongMark: { fontSize: 18, color: Colors.eww.coral, fontWeight: '900' },

  // Result screen
  resultScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  resultEmoji: { fontSize: 80 },
  resultScore: { fontSize: 72, fontWeight: '900', color: Colors.eww.green },
  resultLabel: { fontSize: 16, color: Colors.text.muted, textTransform: 'uppercase', letterSpacing: 2 },
  rewardBadge: {
    backgroundColor: `${Colors.eww.gold}22`,
    borderRadius: Radius.full,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.eww.gold,
    marginTop: Spacing.sm,
  },
  rewardText: { fontSize: 16, fontWeight: '800', color: Colors.eww.gold },
  noReward: { fontSize: 13, color: Colors.text.muted, marginTop: Spacing.sm },
  doneBtn: {
    backgroundColor: Colors.eww.green,
    borderRadius: Radius.full,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: Spacing.lg,
  },
  doneBtnText: { fontSize: 16, fontWeight: '800', color: '#000' },
  retryBtn: { paddingVertical: 12 },
  retryBtnText: { fontSize: 14, color: Colors.text.muted, textDecorationLine: 'underline' },
});

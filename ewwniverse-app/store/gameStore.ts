/**
 * Game session state — quiz, contamination events, daily specimen.
 * Ephemeral (not persisted to Firestore yet — will be wired when Firebase is set up).
 */
import { create } from 'zustand';

interface GameState {
  // Quiz session
  quizStreak: number;              // correct answers in a row (resets on wrong or hint)
  quizHintUsed: boolean;
  lastContaminationAt: number | null;

  // Contamination event
  contaminationActive: boolean;

  // Daily specimen
  dailySpecimenId: string | null;

  // Actions
  recordCorrectAnswer: () => void;
  recordWrongAnswer: () => void;
  useHint: () => void;
  resetQuizSession: () => void;
  triggerContaminationEvent: () => void;
  dismissContaminationEvent: () => void;
  setDailySpecimen: (id: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  quizStreak: 0,
  quizHintUsed: false,
  lastContaminationAt: null,
  contaminationActive: false,
  dailySpecimenId: null,

  recordCorrectAnswer: () => {
    const streak = get().quizStreak + 1;
    set({ quizStreak: streak });
  },

  recordWrongAnswer: () => {
    set({ quizStreak: 0 });
  },

  useHint: () => {
    set({ quizHintUsed: true, quizStreak: 0 });
  },

  resetQuizSession: () => {
    set({ quizStreak: 0, quizHintUsed: false });
  },

  triggerContaminationEvent: () => {
    set({ contaminationActive: true, lastContaminationAt: Date.now() });
  },

  dismissContaminationEvent: () => {
    set({ contaminationActive: false });
  },

  setDailySpecimen: (id) => {
    set({ dailySpecimenId: id });
  },
}));

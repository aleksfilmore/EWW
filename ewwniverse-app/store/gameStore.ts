/**
 * Game session state — quiz, contamination events, daily specimen.
 * Ephemeral (not persisted to Firestore yet — will be wired when Firebase is set up).
 */
import { create } from 'zustand';
import { drIckySourceForEvent, DrIckyEvent } from '@/constants/drIckyVideos';

interface GameState {
  // Quiz session
  quizStreak: number;              // correct answers in a row (resets on wrong or hint)
  quizHintUsed: boolean;
  lastContaminationAt: number | null;

  // Contamination event
  contaminationActive: boolean;
  /** The Special Specimen unlocked by the most recent contamination event */
  lastUnlockedSpecimenId: string | null;

  // Daily specimen
  dailySpecimenId: string | null;

  // Dr. Icky video reactions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drIckySource: any | null;         // require() video source to play, null = hidden
  drIckyLastShownAt: number;        // ms timestamp — enforces per-event cooldown

  // Actions
  recordCorrectAnswer: () => void;
  recordWrongAnswer: () => void;
  useHint: () => void;
  resetQuizSession: () => void;
  /** Pass the id of the specimen that was unlocked (or null if pool exhausted) */
  triggerContaminationEvent: (specimenId: string | null) => void;
  dismissContaminationEvent: () => void;
  setDailySpecimen: (id: string) => void;
  /** Show Dr. Icky for the given event. Respects cooldown for non-critical events. */
  triggerDrIcky: (event: DrIckyEvent, force?: boolean) => void;
  dismissDrIcky: () => void;
}

// Minimum ms between non-forced Dr. Icky popups (prevents spam)
const DR_ICKY_COOLDOWN_MS = 4_000;

export const useGameStore = create<GameState>((set, get) => ({
  quizStreak: 0,
  quizHintUsed: false,
  lastContaminationAt: null,
  contaminationActive: false,
  lastUnlockedSpecimenId: null,
  dailySpecimenId: null,
  drIckySource: null,
  drIckyLastShownAt: 0,

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

  triggerContaminationEvent: (specimenId) => {
    set({
      contaminationActive:    true,
      lastContaminationAt:    Date.now(),
      lastUnlockedSpecimenId: specimenId,
    });
    // Dr. Icky appears after the slime surge overlay clears (~2.3s)
    setTimeout(() => {
      get().triggerDrIcky('slime_surge', true);
    }, 2_400);
  },

  dismissContaminationEvent: () => {
    set({ contaminationActive: false });
  },

  setDailySpecimen: (id) => {
    set({ dailySpecimenId: id });
  },

  triggerDrIcky: (event, force = false) => {
    const now = Date.now();
    // Respect cooldown unless forced (wrong_answer is always forced)
    if (!force && now - get().drIckyLastShownAt < DR_ICKY_COOLDOWN_MS) return;
    // For classify events, add some randomness so it doesn't fire every time
    if (event === 'classify' && Math.random() > 0.60) return;
    const source = drIckySourceForEvent(event);
    set({ drIckySource: source, drIckyLastShownAt: now });
  },

  dismissDrIcky: () => {
    set({ drIckySource: null });
  },
}));

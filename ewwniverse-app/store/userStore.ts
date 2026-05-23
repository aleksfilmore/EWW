import { create } from 'zustand';
import { UserProfile, EwwStage } from '@/types/user';
import { UserCreature, ClassifiedState } from '@/types/creature';
import {
  SCAN_REFRESH_MS,
  SCAN_FREE_AMOUNT,
  STAGE_THRESHOLDS,
  FREE_STAGE_CAP,
} from '@/constants/game';

interface UserState {
  profile: UserProfile | null;
  creatures: Record<string, UserCreature>;  // creature_id → state
  isHydrated: boolean;

  // Actions
  initUser: (uid: string) => void;
  setCreatureState: (id: string, state: ClassifiedState) => void;
  addScans: (amount: number) => void;
  consumeScan: () => boolean;           // returns false if no scans available
  refreshScanIfDue: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  triggerContamination: () => void;
  setPaid: (paid: boolean) => void;
  updateStage: () => void;
  claimDailySpecimen: () => void;
}

function makeDefaultProfile(uid: string): UserProfile {
  return {
    uid,
    codename: `Recruit_${uid.slice(-4).toUpperCase()}`,
    eww_stage: 1,
    is_paid: false,
    scan_balance: 3,  // starter scans
    scan_next_refresh: Date.now() + SCAN_REFRESH_MS,
    streak_days: 0,
    streak_last_day: null,
    contamination_count: 0,
    mastered_count: 0,
    classified_count: 0,
    fastest_quiz_seconds: null,
    daily_specimen_last_claimed: null,
    created_at: Date.now(),
  };
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  creatures: {},
  isHydrated: false,

  initUser: (uid) => {
    const existing = get().profile;
    if (existing?.uid === uid) return;
    set({ profile: makeDefaultProfile(uid), creatures: {}, isHydrated: true });
  },

  setCreatureState: (id, state) => {
    const profile = get().profile;
    if (!profile) return;
    const prev = get().creatures[id];
    const now = Date.now();
    const update: UserCreature = {
      creature_id: id,
      state,
      quiz_correct_count: prev?.quiz_correct_count ?? 0,
      classified_at: state === 'classified' || state === 'mastered'
        ? (prev?.classified_at ?? now)
        : undefined,
      mastered_at: state === 'mastered' ? now : undefined,
    };
    const classified_count = Object.values({ ...get().creatures, [id]: update })
      .filter((c) => c.state === 'classified' || c.state === 'mastered').length;
    const mastered_count = Object.values({ ...get().creatures, [id]: update })
      .filter((c) => c.state === 'mastered').length;
    set((s) => ({
      creatures: { ...s.creatures, [id]: update },
      profile: s.profile
        ? { ...s.profile, classified_count, mastered_count }
        : s.profile,
    }));
    get().updateStage();
  },

  addScans: (amount) =>
    set((s) => ({
      profile: s.profile
        ? { ...s.profile, scan_balance: s.profile.scan_balance + amount }
        : s.profile,
    })),

  consumeScan: () => {
    const balance = get().profile?.scan_balance ?? 0;
    if (balance <= 0) return false;
    set((s) => ({
      profile: s.profile
        ? { ...s.profile, scan_balance: s.profile.scan_balance - 1 }
        : s.profile,
    }));
    return true;
  },

  refreshScanIfDue: () => {
    const profile = get().profile;
    if (!profile) return;
    if (Date.now() >= profile.scan_next_refresh) {
      const earned = profile.is_paid
        ? SCAN_FREE_AMOUNT.paid
        : SCAN_FREE_AMOUNT.free;
      set((s) => ({
        profile: s.profile
          ? {
              ...s.profile,
              scan_balance: s.profile.scan_balance + earned,
              scan_next_refresh: Date.now() + SCAN_REFRESH_MS,
            }
          : s.profile,
      }));
    }
  },

  incrementStreak: () => {
    const today = new Date().toISOString().slice(0, 10);
    const profile = get().profile;
    if (!profile) return;
    if (profile.streak_last_day === today) return; // already counted
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const isConsecutive = profile.streak_last_day === yesterday;
    set((s) => ({
      profile: s.profile
        ? {
            ...s.profile,
            streak_days: isConsecutive ? s.profile.streak_days + 1 : 1,
            streak_last_day: today,
          }
        : s.profile,
    }));
  },

  resetStreak: () =>
    set((s) => ({
      profile: s.profile
        ? { ...s.profile, streak_days: 0, streak_last_day: null }
        : s.profile,
    })),

  triggerContamination: () =>
    set((s) => ({
      profile: s.profile
        ? { ...s.profile, contamination_count: s.profile.contamination_count + 1 }
        : s.profile,
    })),

  setPaid: (paid) =>
    set((s) => ({
      profile: s.profile ? { ...s.profile, is_paid: paid } : s.profile,
    })),

  updateStage: () => {
    const { profile } = get();
    if (!profile) return;
    const classified = profile.classified_count;
    let newStage: EwwStage = 1;
    if (classified >= STAGE_THRESHOLDS[5]) newStage = 5;
    else if (classified >= STAGE_THRESHOLDS[4]) newStage = 4;
    else if (classified >= STAGE_THRESHOLDS[3]) newStage = 3;
    else if (classified >= STAGE_THRESHOLDS[2]) newStage = 2;
    // Cap free tier at stage 2
    if (!profile.is_paid && newStage > FREE_STAGE_CAP) newStage = FREE_STAGE_CAP;
    if (newStage !== profile.eww_stage) {
      set((s) => ({
        profile: s.profile ? { ...s.profile, eww_stage: newStage } : s.profile,
      }));
    }
  },

  claimDailySpecimen: () => {
    const today = new Date().toISOString().slice(0, 10);
    set((s) => ({
      profile: s.profile
        ? { ...s.profile, daily_specimen_last_claimed: today }
        : s.profile,
    }));
  },
}));

import { create } from 'zustand';
import { UserProfile, EwwStage } from '@/types/user';
import { UserCreature, ClassifiedState } from '@/types/creature';
import {
  SCAN_REFRESH_MS,
  SCAN_FREE_AMOUNT,
  STAGE_THRESHOLDS,
  FREE_STAGE_CAP,
  STREAK_REWARD_DAY,
} from '@/constants/game';
import { playSfx } from '@/services/audio';
import { getCreatureById } from '@/data/index';

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
  triggerContamination: (specimenId?: string | null) => void;
  setPaid: (paid: boolean) => void;
  updateStage: () => void;
  claimDailySpecimen: () => void;
  unlockSpecialSpecimen: (id: string, source: string) => void;
  getOwnedSpecialIds: () => string[];
  incrementDailyQuizAnswer: () => void;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function makeDefaultProfile(uid: string): UserProfile {
  return {
    uid,
    codename: `Recruit_${uid.slice(-4).toUpperCase()}`,
    eww_stage: 1,
    is_paid: false,
    scan_balance: 10, // generous first-session start
    scan_next_refresh: Date.now() + SCAN_REFRESH_MS,
    streak_days: 0,
    streak_last_day: null,
    contamination_count: 0,
    mastered_count: 0,
    classified_count: 0,
    fastest_quiz_seconds: null,
    daily_specimen_last_claimed: null,
    last_classified_creature_id: null,
    last_unlocked_specimen_id: null,
    special_specimens: {},
    created_at: Date.now(),
    daily_missions_reset: null,
    daily_classified_today: 0,
    daily_quiz_answers_today: 0,
    daily_rare_found: false,
  };
}

/** Returns daily-reset patch if today is a new day, else null. */
function dailyResetPatch(profile: UserProfile): Partial<UserProfile> | null {
  const today = todayIso();
  if (profile.daily_missions_reset === today) return null;
  return {
    daily_missions_reset:    today,
    daily_classified_today:  0,
    daily_quiz_answers_today: 0,
    daily_rare_found:        false,
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

    // Only credit a new classification (not re-classifying or silhouette intermediary)
    const wasAlreadyClassified =
      prev?.state === 'classified' || prev?.state === 'mastered';
    const isNowClassified = state === 'classified' || state === 'mastered';
    const isNewClassification = isNowClassified && !wasAlreadyClassified;

    const update: UserCreature = {
      creature_id: id,
      state,
      quiz_correct_count: prev?.quiz_correct_count ?? 0,
      classified_at: isNowClassified
        ? (prev?.classified_at ?? now)
        : undefined,
      mastered_at: state === 'mastered' ? now : undefined,
    };
    const classified_count = Object.values({ ...get().creatures, [id]: update })
      .filter((c) => c.state === 'classified' || c.state === 'mastered').length;
    const mastered_count = Object.values({ ...get().creatures, [id]: update })
      .filter((c) => c.state === 'mastered').length;

    // Check if this is a rare specimen (eww_meter ≥ 80) for the daily mission
    const creatureData  = isNewClassification ? getCreatureById(id) : undefined;
    const isRare        = (creatureData?.eww_meter ?? 0) >= 80;

    set((s) => {
      if (!s.profile) return { creatures: { ...s.creatures, [id]: update } };
      const resetPatch = dailyResetPatch(s.profile) ?? {};
      const base = { ...s.profile, ...resetPatch };
      return {
        creatures: { ...s.creatures, [id]: update },
        profile: {
          ...base,
          classified_count,
          mastered_count,
          ...(isNowClassified ? {
            last_classified_creature_id: id,
            // last_unlocked_specimen_id is NOT cleared here — the Slime Surge
            // specimen stays pinned on the home card until the user visits Rewards.
          } : {}),
          // Increment daily counters only on fresh classification
          ...(isNewClassification ? {
            daily_classified_today: (base.daily_classified_today ?? 0) + 1,
            ...(isRare ? { daily_rare_found: true } : {}),
          } : {}),
        },
      };
    });
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
    if (profile.streak_last_day === today) return; // already counted today

    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const isConsecutive = profile.streak_last_day === yesterday;
    const newStreak = isConsecutive ? profile.streak_days + 1 : 1;

    set((s) => ({
      profile: s.profile
        ? { ...s.profile, streak_days: newStreak, streak_last_day: today }
        : s.profile,
    }));

    // 7-day streak milestone reward — free tier: +1 scan
    if (newStreak % STREAK_REWARD_DAY === 0) {
      get().addScans(1);
    }
  },

  resetStreak: () =>
    set((s) => ({
      profile: s.profile
        ? { ...s.profile, streak_days: 0, streak_last_day: null }
        : s.profile,
    })),

  triggerContamination: (specimenId?: string | null) =>
    set((s) => ({
      profile: s.profile
        ? {
            ...s.profile,
            contamination_count:    s.profile.contamination_count + 1,
            last_unlocked_specimen_id: specimenId ?? s.profile.last_unlocked_specimen_id,
          }
        : s.profile,
    })),

  setPaid: (paid) => {
    if (paid) playSfx('sfx_pass_unlock');
    set((s) => ({
      profile: s.profile ? { ...s.profile, is_paid: paid } : s.profile,
    }));
  },

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
      playSfx('sfx_stage_up');
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

  unlockSpecialSpecimen: (id, source) => {
    // Idempotent — don't re-unlock something already owned
    const existing = get().profile?.special_specimens ?? {};
    if (existing[id]) return;
    set((s) => ({
      profile: s.profile
        ? {
            ...s.profile,
            special_specimens: {
              ...s.profile.special_specimens,
              [id]: { unlocked_at: Date.now(), source },
            },
          }
        : s.profile,
    }));
  },

  getOwnedSpecialIds: () => {
    return Object.keys(get().profile?.special_specimens ?? {});
  },

  incrementDailyQuizAnswer: () => {
    set((s) => {
      if (!s.profile) return s;
      const resetPatch = dailyResetPatch(s.profile) ?? {};
      const base = { ...s.profile, ...resetPatch };
      return {
        profile: {
          ...base,
          daily_quiz_answers_today: (base.daily_quiz_answers_today ?? 0) + 1,
        },
      };
    });
  },
}));

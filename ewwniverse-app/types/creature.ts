export type Book = 'creepy-creatures' | 'creepy-dinosaurs' | 'creepy-earth';
export type EwwMeter = 60 | 80 | 100;
export type Rarity = 'common' | 'uncommon' | 'epic';
export type UnlockSource =
  | 'contamination'
  | 'set'
  | 'mission'
  | 'streak'
  | 'stage';

export interface Creature {
  id: string;
  title: string;
  gross_fact: string;
  eww_meter: EwwMeter;
  book: Book;
  realm?: string;
  /** local asset require() or Cloudinary URL */
  image?: string;
}

export interface SpecialSpecimen {
  id: string;
  name: string;
  gross_fact: string;
  bonus_fact: string;
  eww_meter: EwwMeter;
  rarity: Rarity;
  image_id: string;
  unlock_source: UnlockSource;
  unlock_metadata?: Record<string, unknown>;
  tier_required: 'free' | 'paid';
}

export type ClassifiedState = 'locked' | 'silhouette' | 'classified' | 'mastered';

export interface UserCreature {
  creature_id: string;
  state: ClassifiedState;
  classified_at?: number;
  mastered_at?: number;
  quiz_correct_count: number;
}

export interface SpecimenSet {
  id: string;
  name: string;
  creature_ids: string[];
  reward_specimen_id: string;
  tier_required: 'free' | 'paid';
  book: Book;
}

export type MissionObjectiveType = 'classify_count' | 'streak' | 'master_count';
export type RewardType = 'scans' | 'specimen';

export interface MissionTemplate {
  id: string;
  title: string;
  description: string;
  objective_type: MissionObjectiveType;
  target: number;
  reward_type: RewardType;
  reward_amount: number;
  tier_required: 'free' | 'paid';
}

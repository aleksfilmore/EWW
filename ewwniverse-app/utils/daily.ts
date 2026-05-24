/**
 * Daily Specimen utilities — shared between DailySpecimenCard and creature detail.
 * The daily creature is determined by day number mod pool length, so it's
 * deterministic on both client and server without a network round-trip.
 */
import { creepyCreatures } from '@/data/index';
import { Creature } from '@/types/creature';

/** Returns the creature that is today's Daily Specimen. */
export function getDailyCreature(): Creature {
  const dayNum = Math.floor(Date.now() / 86_400_000);
  const pool   = creepyCreatures as Creature[];
  return pool[dayNum % pool.length];
}

/** Returns today's date string in YYYY-MM-DD format (UTC). */
export function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Returns true if the given creature is today's Daily Specimen. */
export function isDailySpecimen(creatureId: string): boolean {
  return getDailyCreature().id === creatureId;
}

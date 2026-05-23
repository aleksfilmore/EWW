import { Creature } from '@/types/creature';

import creepyCreatures from './creepy-creatures.json';
import creepyDinosaurs from './creepy-dinosaurs.json';
import creepyEarth from './creepy-earth.json';

export const ALL_CREATURES: Creature[] = [
  ...(creepyCreatures as Creature[]),
  ...(creepyDinosaurs as Creature[]),
  ...(creepyEarth as Creature[]),
];

export const CREATURES_BY_BOOK = {
  'creepy-creatures': creepyCreatures as Creature[],
  'creepy-dinosaurs': creepyDinosaurs as Creature[],
  'creepy-earth':     creepyEarth    as Creature[],
};

export function getCreatureById(id: string): Creature | undefined {
  return ALL_CREATURES.find((c) => c.id === id);
}

export { creepyCreatures, creepyDinosaurs, creepyEarth };

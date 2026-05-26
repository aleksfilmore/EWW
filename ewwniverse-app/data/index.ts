import { Creature } from '@/types/creature';

import creepyCreatures from './creepy-creatures.json';
import creepyDinosaurs from './creepy-dinosaurs.json';
import creepyEarth from './creepy-earth.json';
import creatureQuizRaw from './creature-quiz.json';
import earthQuizRaw    from './earth-quiz.json';

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

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

export interface CreatureQuizEntry {
  master_text: string;
  mastered_success_text: string;
  retry_text: string;
  questions: QuizQuestion[];
}

export const CREATURE_QUIZ: Record<string, CreatureQuizEntry> = {
  ...(creatureQuizRaw as Record<string, CreatureQuizEntry>),
  ...(earthQuizRaw    as Record<string, CreatureQuizEntry>),
};

export function getCreatureQuiz(id: string): CreatureQuizEntry | undefined {
  return CREATURE_QUIZ[id];
}

export { creepyCreatures, creepyDinosaurs, creepyEarth };

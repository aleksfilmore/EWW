export type EwwMeter = 60 | 80 | 100;

export interface Creature {
  name: string;
  ewwMeter: EwwMeter;
  grossFact: string; // populate from eww_niverse_creepy_creatures_75.xlsx
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverFile: string;
  amazonUrl: string;
  imageType: "png" | "jpg";
}

export interface SpecimenPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: "specimen-of-the-week" | "field-report" | "reader-submission";
  readTime: number;
  creatureName: string; // matches filename in /images/creatures/
}

export function creatureImagePath(name: string): string {
  return `/images/creatures/${encodeURIComponent(name)}.png`;
}

export function bookCoverPath(file: string): string {
  return `/images/book-covers/${encodeURIComponent(file)}`;
}

// All 75 Creepy Creatures — gross facts need populating from the Excel source
export const creatures: Creature[] = [
  { name: "Zombie Ant Fungus", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Tongue-Eating Louse", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Botfly Larva", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Guinea Worm", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Brain Worm", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Candiru Fish", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Horsehair Worm", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Maggot of the Flesh Fly", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Hagfish", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Parasitic Barnacle", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Tongue Worm", ewwMeter: 100, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Lamprey", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Hammerhead Worm", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Goblin Shark", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Sea Cucumber", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Bristle Worm", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Surinam Toad", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Velvet Worm", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Rat-Tailed Maggot", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Giant Isopod", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Sea Devil Anglerfish", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Kissing Bug", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Vampire Fish (Payara)", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Tiger Leech", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Horse Botfly", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Goliath Tigerfish", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Black Swallower", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Deep Sea Lizardfish", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Black Dragonfish", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Terrible Claw Lobster", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Harlequin Toad", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Hypnotic Stargazer Worm", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Flesh Fly", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Musk Ox Parasite Fly", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Saddleback Caterpillar", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Hag Moth Caterpillar", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Spiny Oak Slug Caterpillar", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Zombie Snail", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Zombie Starfish", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Immortal Jellyfish", ewwMeter: 80, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Sea Spider", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Goliath Birdeater", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Africanized Honeybee", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Asian Giant Hornet", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Assassin Bug", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Australian Funnel Web Spider", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Aye-Aye", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Bat-Eating Centipede", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Blue Dragon Sea Slug", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Blue-Ringed Octopus", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Bombardier Beetle", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Bullet ant", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Cassowary", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Cone Snail", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Deathstalker Scorpion", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Electric Eel", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Eyeless Spider", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Flying Snake", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Gharial", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Hooded Pitohui", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Inland Taipan", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Japanese Spider Crab", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Komodo Dragon", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Mouth Brooding Fish", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Nose-Horned Viper", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Peacock Mantis Shrimp", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Pistol Shrimp", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Poison Dart Frog", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Red Paper Wasp", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Scaly-Foot Snail", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Stargazer Fish", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Stink Bug", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Stonefish", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Tsetse Fly", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
  { name: "Vampire Bat", ewwMeter: 60, grossFact: "TODO: populate from eww_niverse_creepy_creatures_75.xlsx" },
];

export const books: Book[] = [
  {
    id: "creepy-creatures",
    title: "Creepy Creatures",
    description: "75 of nature's most revolting animals. Spiders, parasites, venomous insects, and things that should not exist.",
    coverFile: "Creepy Creatures book cover.png",
    amazonUrl: "https://www.amazon.com/dp/B0FGDKTNGX",
    imageType: "png",
  },
  {
    id: "creepy-earth",
    title: "Creepy Earth",
    description: "The planet is weirder than you think. Boiling lakes, carnivorous plants, and rocks that move by themselves.",
    coverFile: "Creepy Earth book cover.png",
    amazonUrl: "https://www.amazon.com/dp/B0G4RGJ4Q7",
    imageType: "jpg",
  },
  {
    id: "creepy-dinosaurs",
    title: "Creepy Dinosaurs",
    description: "Not the dinosaurs from the movies. The actual disgusting, terrifying, stranger-than-fiction ones.",
    coverFile: "Creepy Dinosaurs book cover.png",
    amazonUrl: "https://www.amazon.com/dp/B0FKY1K94X",
    imageType: "jpg",
  },
  {
    id: "creepy-deep-sea",
    title: "Creepy Deep Sea",
    description: "95% of the ocean is unexplored. The 5% we have seen is already more than enough.",
    coverFile: "Creepy Deep Sea book cover.png",
    amazonUrl: "https://www.amazon.com/dp/B0GYLW9TPD",
    imageType: "jpg",
  },
  {
    id: "creepy-skeletons",
    title: "Creepy Skeletons",
    description: "Bones, exoskeletons, and the strange architecture of things that were once alive.",
    coverFile: "Creepy Skeletons book cover.png",
    amazonUrl: "https://www.amazon.com/dp/B0GXHNSWFC",
    imageType: "png",
  },
  {
    id: "creepy-tiny-world",
    title: "Creepy Tiny World",
    description: "The microscopic universe on your skin, in your water, and in the air you're breathing right now.",
    coverFile: "Creepy Tiny World book cover.png",
    amazonUrl: "https://www.amazon.com/dp/B0H25MRM53",
    imageType: "jpg",
  },
];

export const specimenPosts: SpecimenPost[] = [
  {
    slug: "zombie-ant-fungus",
    title: "The Fungus That Turns Ants Into Zombies",
    date: "2026-05-15",
    excerpt: "Ophiocordyceps unilateralis doesn't just kill ants. It hijacks their brains first, walks them to a specific leaf at a specific height, and then — and only then — detonates.",
    category: "specimen-of-the-week",
    readTime: 4,
    creatureName: "Zombie Ant Fungus",
  },
  {
    slug: "tongue-eating-louse",
    title: "Field Report: A Creature That Replaces Your Tongue",
    date: "2026-05-08",
    excerpt: "Dr. Icky files a report from the Gulf of California. The Cymothoa exigua enters through the gills, severs the tongue, and installs itself as a replacement. The fish keeps eating. It pays rent in blood.",
    category: "field-report",
    readTime: 3,
    creatureName: "Tongue-Eating Louse",
  },
  {
    slug: "hagfish-slime",
    title: "Why the Hagfish Is the Grossest Fish That Is Not Actually a Fish",
    date: "2026-05-01",
    excerpt: "In 0.4 seconds, one hagfish produces enough slime to fill a bucket. Scientists have measured this. Some of them regret it.",
    category: "specimen-of-the-week",
    readTime: 5,
    creatureName: "Hagfish",
  },
];

export const ewwMeterLabels: Record<EwwMeter, { label: string; color: string; bg: string }> = {
  60: { label: "Kinda Revolting", color: "#854F0B", bg: "#FAEEDA" },
  80: { label: "Super Slimy", color: "#993C1D", bg: "#FAECE7" },
  100: { label: "Total Barf!", color: "#A32D2D", bg: "#FCEBEB" },
};

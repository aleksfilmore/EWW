export type EwwMeter = 60 | 80 | 100;
export type Rarity = "COMMON" | "UNCOMMON" | "RARE" | "EPIC";

export interface Creature {
  name: string;
  ewwMeter: EwwMeter;
  grossFact: string;
  ewwFactor: 1 | 2 | 3 | 4 | 5;   // overall disgust rating (dots)
  yuckLevel: 1 | 2 | 3 | 4 | 5;   // visual grossness (dots)
  rarity: Rarity;
}

export const rarityColors: Record<Rarity, { bg: string; text: string }> = {
  COMMON:   { bg: "#5DB84A", text: "#fff" },
  UNCOMMON: { bg: "#854F0B", text: "#fff" },
  RARE:     { bg: "#185FA5", text: "#fff" },
  EPIC:     { bg: "#6B3FD4", text: "#fff" },
};

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

// All 75 Creepy Creatures — EWW meters and facts sourced from eww_niverse_creepy_creatures_75.xlsx
export const creatures: Creature[] = [
  // ── EWW 100 — Total Barf (36 creatures) ─────────────────────────
  { name: "Zombie Ant Fungus",          ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "EPIC",     grossFact: "This fungus takes over an ant's behavior, makes it climb, bite down, and die where spores can spread." },
  { name: "Tongue-Eating Louse",        ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "EPIC",     grossFact: "It attaches to a fish's tongue, destroys it, then sits in its place and feeds on blood and mucus." },
  { name: "Botfly Larva",               ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "Some botfly larvae grow under mammal skin, breathing through a tiny hole until they are ready to crawl out." },
  { name: "Guinea Worm",                ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "This parasite grows inside the body, then slowly emerges through the skin, sometimes over several painful days." },
  { name: "Brain Worm",                 ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "RARE",     grossFact: "The brain worm can wander through an animal's nervous system, confusing movement and causing strange behavior." },
  { name: "Horsehair Worm",             ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "This parasite grows inside insects, then can drive them toward water so the worm can escape and breed." },
  { name: "Maggot of the Flesh Fly",    ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "UNCOMMON", grossFact: "These larvae can appear in decaying meat or wounds and start feeding fast because some flesh flies birth them alive." },
  { name: "Hagfish",                    ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "When grabbed, it floods the attacker with slime that can clog gills and turn water into goo." },
  { name: "Parasitic Barnacle",         ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "RARE",     grossFact: "Some parasitic barnacles invade crabs and can control their bodies, making them care for barnacle young." },
  { name: "Tongue Worm",                ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "RARE",     grossFact: "This parasite can live in the airways of reptiles and mammals, using hooks to hold on inside the host." },
  { name: "Lamprey",                    ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "It clamps onto fish with a round toothy mouth, rasping a hole and feeding on blood and body fluids." },
  { name: "Hammerhead Worm",            ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "If cut into pieces, some hammerhead worms can regrow into more worms, making them creepy garden survivors." },
  { name: "Goblin Shark",               ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "Its jaws shoot forward from its face to snatch prey, making it look like the shark has a spring-loaded mouth." },
  { name: "Sea Cucumber",               ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "When threatened, some sea cucumbers shoot sticky guts or toxic threads from their bodies to distract attackers." },
  { name: "Surinam Toad",               ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "Babies grow in pockets on the mother's back, then pop out as tiny toads from her skin." },
  { name: "Sea Devil Anglerfish",       ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "The tiny male can fuse to the huge female, sharing her bloodstream while she keeps his body attached." },
  { name: "Kissing Bug",                ewwMeter: 100, ewwFactor: 5, yuckLevel: 3, rarity: "UNCOMMON", grossFact: "It feeds on blood near the face while animals sleep, and some carry a parasite that can cause Chagas disease." },
  { name: "Tiger Leech",                ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "It slices skin with tiny jaws and drinks blood while its saliva helps keep the wound flowing." },
  { name: "Horse Botfly",               ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "Its eggs hatch after being licked by a horse, and the larvae live inside the horse's stomach before leaving in dung." },
  { name: "Goliath Tigerfish",          ewwMeter: 100, ewwFactor: 5, yuckLevel: 5, rarity: "RARE",     grossFact: "Its giant teeth lock together like knives, and it can rip into fish in fast African rivers." },
  { name: "Zombie Snail",               ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "RARE",     grossFact: "A parasite makes the snail's eyestalks pulse like caterpillars, luring birds that continue the parasite's life cycle." },
  { name: "Africanized Honeybee",       ewwMeter: 100, ewwFactor: 5, yuckLevel: 3, rarity: "UNCOMMON", grossFact: "When a hive feels threatened, hundreds can chase an intruder for a long distance, stinging in waves until the danger is gone." },
  { name: "Asian Giant Hornet",         ewwMeter: 100, ewwFactor: 5, yuckLevel: 3, rarity: "RARE",     grossFact: "Its jaws can snip honeybees apart, and a small squad can wipe out a hive before carrying larvae home as food." },
  { name: "Australian Funnel Web Spider", ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "Its fangs can punch through soft shoes, and its venom attacks nerves fast, making it one of Australia's most feared spiders." },
  { name: "Bat-Eating Centipede",       ewwMeter: 100, ewwFactor: 5, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "This giant centipede climbs cave ceilings, grabs bats from above, and hangs there while feeding on them." },
  { name: "Blue-Ringed Octopus",        ewwMeter: 100, ewwFactor: 5, yuckLevel: 3, rarity: "RARE",     grossFact: "Tiny and beautiful, it flashes blue rings when alarmed and carries venom strong enough to paralyze prey in minutes." },
  { name: "Bullet ant",                 ewwMeter: 100, ewwFactor: 5, yuckLevel: 2, rarity: "UNCOMMON", grossFact: "Its sting is famous for pain so intense people compare it to being shot by a bullet." },
  { name: "Cassowary",                  ewwMeter: 100, ewwFactor: 5, yuckLevel: 2, rarity: "RARE",     grossFact: "This huge bird has a dagger-like claw on each foot and can kick hard enough to seriously injure a predator." },
  { name: "Cone Snail",                 ewwMeter: 100, ewwFactor: 5, yuckLevel: 2, rarity: "RARE",     grossFact: "It fires a tiny venom harpoon into prey, and some species carry venom powerful enough to stop a fish almost instantly." },
  { name: "Deathstalker Scorpion",      ewwMeter: 100, ewwFactor: 5, yuckLevel: 3, rarity: "RARE",     grossFact: "Its sting packs a dangerous nerve toxin, and its glowing body looks extra creepy under ultraviolet light." },
  { name: "Electric Eel",               ewwMeter: 100, ewwFactor: 5, yuckLevel: 3, rarity: "UNCOMMON", grossFact: "It can release powerful electric shocks to stun fish, scare predators, and sense the muddy water around it." },
  { name: "Inland Taipan",              ewwMeter: 100, ewwFactor: 5, yuckLevel: 2, rarity: "RARE",     grossFact: "Often called the most venomous snake, it carries venom adapted to quickly overpower small mammals." },
  { name: "Komodo Dragon",              ewwMeter: 100, ewwFactor: 5, yuckLevel: 3, rarity: "RARE",     grossFact: "Its bite can tear flesh, and its saliva contains bacteria and venom-like compounds that help weaken prey." },
  { name: "Poison Dart Frog",           ewwMeter: 100, ewwFactor: 5, yuckLevel: 2, rarity: "UNCOMMON", grossFact: "Some species carry skin toxins so strong that predators learn to avoid their bright warning colors." },
  { name: "Stonefish",                  ewwMeter: 100, ewwFactor: 5, yuckLevel: 3, rarity: "RARE",     grossFact: "It looks like a rock, but its back spines can inject extremely painful venom if stepped on." },
  { name: "Tsetse Fly",                 ewwMeter: 100, ewwFactor: 5, yuckLevel: 2, rarity: "UNCOMMON", grossFact: "Its bite can spread sleeping sickness parasites, which move through the blood and can affect the brain." },
  // ── EWW 80 — Super Slimy (33 creatures) ─────────────────────────
  { name: "Assassin Bug",               ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "COMMON",   grossFact: "It stabs prey with a sharp beak, injects digestive fluid, then drinks the liquefied insides like a bug smoothie." },
  { name: "Aye-Aye",                    ewwMeter: 80,  ewwFactor: 4, yuckLevel: 2, rarity: "RARE",     grossFact: "It taps trees with a long bony finger, hears hollow tunnels, then hooks out grubs like snacks from a wooden vending machine." },
  { name: "Black Dragonfish",           ewwMeter: 80,  ewwFactor: 4, yuckLevel: 5, rarity: "RARE",     grossFact: "Females have needle teeth and their own red light, letting them glow-hunt in deep water where many prey cannot see red." },
  { name: "Black Swallower",            ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "RARE",     grossFact: "It can gulp down fish bigger than itself, stretching its stomach like a living balloon in the dark sea." },
  { name: "Blue Dragon Sea Slug",       ewwMeter: 80,  ewwFactor: 4, yuckLevel: 2, rarity: "UNCOMMON", grossFact: "It steals stinging cells from venomous jellyfish and stores them in its own body for defense." },
  { name: "Bombardier Beetle",          ewwMeter: 80,  ewwFactor: 4, yuckLevel: 2, rarity: "COMMON",   grossFact: "When attacked, it blasts a boiling chemical spray from its rear with a popping sound." },
  { name: "Bristle Worm",               ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "COMMON",   grossFact: "Its body is covered in tiny brittle hairs that can snap into skin and sting like fiberglass splinters." },
  { name: "Candiru Fish",               ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "RARE",     grossFact: "This tiny Amazon catfish is surrounded by scary legends because it can follow chemical traces in water to find hosts." },
  { name: "Deep Sea Lizardfish",        ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "RARE",     grossFact: "It waits on the seafloor with huge jaws and needle teeth, snapping up prey in the black deep sea." },
  { name: "Eyeless Spider",             ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "RARE",     grossFact: "This cave spider lost its eyes over time, hunting in total darkness by touch and vibration." },
  { name: "Flesh Fly",                  ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "COMMON",   grossFact: "Some flesh flies give birth to live maggots instead of laying eggs, so the larvae can start feeding immediately." },
  { name: "Gharial",                    ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "RARE",     grossFact: "Its long narrow jaws are lined with many sharp teeth, perfect for snapping fish from fast rivers." },
  { name: "Giant Isopod",               ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "This deep-sea cousin of a woodlouse can curl up like armor and survive long stretches with almost no food." },
  { name: "Goliath Birdeater",          ewwMeter: 80,  ewwFactor: 4, yuckLevel: 5, rarity: "UNCOMMON", grossFact: "This huge tarantula can rub hairs from its body that irritate skin and eyes, then hide while attackers itch." },
  { name: "Hag Moth Caterpillar",       ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "Its fuzzy arms hide venomous spines that can cause a painful sting if touched." },
  { name: "Hooded Pitohui",             ewwMeter: 80,  ewwFactor: 4, yuckLevel: 2, rarity: "RARE",     grossFact: "This bird carries poison in its skin and feathers, likely borrowed from toxic beetles it eats." },
  { name: "Hypnotic Stargazer Worm",    ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "RARE",     grossFact: "It hides in sand with only its head exposed, waiting to grab small sea creatures that drift too close." },
  { name: "Immortal Jellyfish",         ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "EPIC",     grossFact: "When badly stressed, it can reverse into an earlier life stage, almost like hitting a jellyfish reset button." },
  { name: "Japanese Spider Crab",       ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "Its legs can span wider than a tall adult, making it look like a giant walking sea skeleton." },
  { name: "Musk Ox Parasite Fly",       ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "UNCOMMON", grossFact: "Its larvae live inside musk oxen as internal parasites, feeding safely while the host carries them around." },
  { name: "Nose-Horned Viper",          ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "UNCOMMON", grossFact: "This viper has a small horn on its snout and venom used to subdue prey before swallowing it whole." },
  { name: "Peacock Mantis Shrimp",      ewwMeter: 80,  ewwFactor: 4, yuckLevel: 2, rarity: "UNCOMMON", grossFact: "It punches with a club so fast the water flashes with tiny shock bubbles that can crack shells." },
  { name: "Pistol Shrimp",              ewwMeter: 80,  ewwFactor: 4, yuckLevel: 2, rarity: "COMMON",   grossFact: "It snaps one claw so fast it creates a shockwave bubble loud enough to stun prey." },
  { name: "Rat-Tailed Maggot",          ewwMeter: 80,  ewwFactor: 4, yuckLevel: 5, rarity: "COMMON",   grossFact: "It breathes through a long tube like a snorkel while wriggling in dirty, low-oxygen water." },
  { name: "Red Paper Wasp",             ewwMeter: 80,  ewwFactor: 4, yuckLevel: 2, rarity: "COMMON",   grossFact: "It builds papery nests from chewed wood and can deliver repeated stings when the colony is disturbed." },
  { name: "Saddleback Caterpillar",     ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "Its cute green saddle hides venomous spines that can sting with sharp burning pain." },
  { name: "Sea Spider",                 ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "UNCOMMON", grossFact: "Some sea spiders are so thin their organs extend into their legs because there is little room in the body." },
  { name: "Spiny Oak Slug Caterpillar", ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "Its bright spines can inject irritating venom, turning a curious touch into instant regret." },
  { name: "Stargazer Fish",             ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "It hides buried in sand with eyes on top, then lunges upward to grab prey passing overhead." },
  { name: "Vampire Bat",                ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "COMMON",   grossFact: "It makes a tiny cut, laps blood, and uses saliva chemicals that keep the wound from clotting quickly." },
  { name: "Vampire Fish (Payara)",      ewwMeter: 80,  ewwFactor: 4, yuckLevel: 4, rarity: "UNCOMMON", grossFact: "Its lower fangs can grow so long they fit into special holes in the upper jaw when the mouth closes." },
  { name: "Velvet Worm",                ewwMeter: 80,  ewwFactor: 4, yuckLevel: 3, rarity: "RARE",     grossFact: "It fires sticky slime from nozzles on its head, trapping prey before biting into it." },
  { name: "Zombie Starfish",            ewwMeter: 80,  ewwFactor: 4, yuckLevel: 5, rarity: "UNCOMMON", grossFact: "Some starfish can lose an arm to danger, and the crawling piece may help distract predators while the body escapes." },
  // ── EWW 60 — Kinda Revolting (6 creatures) ───────────────────────
  { name: "Flying Snake",               ewwMeter: 60,  ewwFactor: 3, yuckLevel: 3, rarity: "UNCOMMON", grossFact: "It flattens its body into a ribbon shape and glides between trees, steering through the air without wings." },
  { name: "Harlequin Toad",             ewwMeter: 60,  ewwFactor: 2, yuckLevel: 3, rarity: "RARE",     grossFact: "Many harlequin toads have skin toxins and bright warning colors that say: eating me is a terrible idea." },
  { name: "Mouth Brooding Fish",        ewwMeter: 60,  ewwFactor: 2, yuckLevel: 3, rarity: "COMMON",   grossFact: "Some parents protect eggs or babies inside their mouths, going without normal feeding while the young hide there." },
  { name: "Scaly-Foot Snail",           ewwMeter: 60,  ewwFactor: 3, yuckLevel: 3, rarity: "EPIC",     grossFact: "This deep-sea snail grows iron-rich scales on its foot, like a tiny armored knight near volcanic vents." },
  { name: "Stink Bug",                  ewwMeter: 60,  ewwFactor: 2, yuckLevel: 2, rarity: "COMMON",   grossFact: "When bothered, it releases a foul-smelling chemical cloud that makes predators spit it out." },
  { name: "Terrible Claw Lobster",      ewwMeter: 60,  ewwFactor: 2, yuckLevel: 4, rarity: "RARE",     grossFact: "Its long spiny claws look oversized for its body, built for grabbing prey in the deep sea." },
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

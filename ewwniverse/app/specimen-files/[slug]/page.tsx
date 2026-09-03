import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { specimenPosts, ewwMeterLabels, creatureImagePath } from "@/lib/data";
import GrossReveal from "@/components/GrossReveal";
import AppStoreButton from "@/components/AppStoreButton";

/* ─── Article content ──────────────────────────────────────────────── */

interface QuickStat {
  label: string;
  value: string;
}

interface Section {
  heading: string;
  icon: string; // emoji — keeps it light, no extra assets needed
  body: React.ReactNode;
  callout?: {
    type: "science" | "danger" | "weird";
    text: string;
  };
}

interface ArticleData {
  slug: string;
  creatureName: string;
  ewwMeter: 60 | 80 | 100;
  seoDescription: string;
  seoKeywords: string;
  classification: string; // Latin name
  quickStats: QuickStat[];
  intro: React.ReactNode;
  sections: Section[];
  grossFactHighlight: string;
  drIckyVerdict: string;
}

const articles: Record<string, ArticleData> = {
  "surinam-toad-birth": {
    slug: "surinam-toad-birth",
    creatureName: "Surinam Toad",
    ewwMeter: 100,
    seoDescription:
      "The Surinam toad grows its young in skin on the mother's back, where toadlets emerge weeks later. Real gross science for kids.",
    seoKeywords:
      "Surinam toad, Pipa pipa, toad gives birth through back, frog eggs in skin, weird amphibians, gross animal facts for kids",
    classification: "Pipa pipa",
    quickStats: [
      { label: "Type", value: "Aquatic frog" },
      { label: "Lives", value: "Amazon basin, South America" },
      { label: "Eggs on her back", value: "Up to ~100" },
      { label: "Skips", value: "The tadpole stage entirely" },
    ],
    intro: (
      <>
        <p>
          Most frogs lay eggs in water, the eggs hatch into tadpoles, and the tadpoles slowly grow legs.
          The Surinam toad skips all of that. Its babies grow <em>inside the skin of their mother&apos;s back</em> —
          and then climb out of it.
        </p>
        <p>
          It is flat, it has no tongue, and it carries its children like a living honeycomb. Nature did not
          have to do this. It did it anyway.
        </p>
      </>
    ),
    sections: [
      {
        heading: "A frog built like a soggy leaf",
        icon: "🍃",
        body: (
          <>
            <p>
              The Surinam toad looks less like an animal and more like something that fell off a tree and got
              wet. Its body is almost completely flat and brown, which makes it nearly invisible against the
              muddy bottom of slow Amazon rivers.
            </p>
            <p>
              It has no tongue to catch food. Instead, the tips of its fingers end in tiny star-shaped points
              that feel around in the murky water. When they touch something edible, the toad lunges and
              vacuums it in.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "Its star-tipped fingers are sensors, not claws. The Surinam toad basically tastes the water with its hands.",
        },
      },
      {
        heading: "The underwater somersault",
        icon: "🤸",
        body: (
          <>
            <p>
              When it is time to breed, a pair performs a slow series of underwater somersaults. Each time they
              loop through the water, the female releases a few eggs and the male presses them onto her back as
              they tumble.
            </p>
            <p>
              By the end of the dance, dozens of sticky eggs are stuck across the mother&apos;s back in neat rows.
              And then something strange starts to happen to her skin.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "The whole egg-placing dance is done in the water, upside down and right-side up, over and over — sometimes for hours.",
        },
      },
      {
        heading: "Skin like a honeycomb",
        icon: "🍯",
        body: (
          <>
            <p>
              Over the next day, the mother&apos;s back swells and grows up and around each egg until they sink
              in completely. Each egg ends up sealed inside its own little pocket of skin, like a living bubble
              wrap of babies.
            </p>
            <p>
              For the next three to four months, the young grow in those pockets — egg, then embryo, then a
              proper little toad — fed and protected inside their mother&apos;s back the entire time. No pond.
              No tadpoles swimming around. Just skin.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "There is no free-swimming tadpole stage at all. The babies go from egg to fully formed toad without ever leaving her back.",
        },
      },
      {
        heading: "The eruption",
        icon: "💥",
        body: (
          <>
            <p>
              When they are ready, the toadlets push the lids off their pockets and haul themselves out of their
              mother&apos;s back — sometimes dozens of them, wriggling free within minutes of each other. Fully
              formed, miniature, and immediately on their own.
            </p>
            <p>
              Afterwards, the mother often sheds the used layer of skin, leaving her back smooth again — ready,
              eventually, to do the whole thing over.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "Videos of the toadlets emerging are famously hard to watch. The science word for fear of clustered holes — trypophobia — gets a real workout here.",
        },
      },
    ],
    grossFactHighlight:
      "Dozens of fully formed baby toads erupt out of holes in their mother's back, all at once. They grew there — sealed inside her skin — with no pond and no tadpole stage.",
    drIckyVerdict:
      "I have watched this footage 41 times. I have not enjoyed it once. And yet — no pond, no tadpoles, the babies just walk out of mum. That is brilliant, efficient, and deeply, profoundly upsetting. Full marks.",
  },
  "zombie-ant-fungus": {
    slug: "zombie-ant-fungus",
    creatureName: "Zombie Ant Fungus",
    ewwMeter: 100,
    seoDescription:
      "A fungus hijacks carpenter ants, controls their behavior, and uses their final climb to spread spores. Real gross science for kids.",
    seoKeywords:
      "zombie ant fungus, Ophiocordyceps unilateralis, zombie ants, mind-controlling fungi, parasitic fungus, weird animals for kids",
    classification: "Ophiocordyceps unilateralis",
    quickStats: [
      { label: "Type", value: "Parasitic Fungus" },
      { label: "Target", value: "Carpenter ants" },
      { label: "Location", value: "Tropical forests worldwide" },
      { label: "On Earth for", value: "48 million years" },
    ],
    intro: (
      <>
        <p>
          Most parasites just eat their hosts or hitch a ride on them. This one is different.
          Ophiocordyceps unilateralis takes over an ant&apos;s entire body, walks it to a
          specific location chosen by the fungus, forces it to bite down on a leaf and lock
          its jaw permanently — and only then does it kill the ant and explode out of its head.
        </p>
        <p>
          It is, by any reasonable measure, one of the most alarming things in nature.
        </p>
      </>
    ),
    sections: [
      {
        heading: "How it gets inside",
        icon: "🕳️",
        body: (
          <>
            <p>
              Fungal spores sit on the forest floor waiting for an ant to walk over them.
              When one does, the spores stick to the ant&apos;s exoskeleton and drill through
              it using enzymes — like tiny biological drills. Once inside, the fungus starts
              spreading through the ant&apos;s body.
            </p>
            <p>
              The ant has no idea. It keeps working. The colony has no idea either. Everything
              looks completely normal. For a while.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "The fungus spreads through muscle fibers, not through the brain. It controls the ant's body while leaving the brain intact.",
        },
      },
      {
        heading: "The takeover",
        icon: "🧠",
        body: (
          <>
            <p>
              After 4 to 10 days, the ant starts acting strange. It leaves its normal path.
              It stumbles. Then, it climbs.
            </p>
            <p>
              The fungus guides the infected ant to a precise spot: 25 centimetres above the
              forest floor, on the north side of a plant, where temperature and humidity are
              exactly right for the fungus to grow. The ant doesn&apos;t choose this location.
              The fungus does.
            </p>
            <p>
              At solar noon — the moment of maximum sunlight — the ant bites down on a leaf
              vein and locks its jaw. The fungus destroys the jaw muscles to make the grip
              permanent. The ant cannot let go. Then it dies.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "25cm above the floor. North side. Solar noon. The fungus programmes the exact location, height, and time of death.",
        },
      },
      {
        heading: "The eruption",
        icon: "💥",
        body: (
          <>
            <p>
              A stalk grows out of the dead ant&apos;s head over the following days. At the
              tip of the stalk is a capsule packed with spores. When the capsule bursts, spores
              rain down onto the forest floor below.
            </p>
            <p>
              Where they wait for the next ant.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "Fossil evidence of the exact same bite-mark pattern has been found in leaves 48 million years old. This fungus was doing this before most mammals existed.",
        },
      },
      {
        heading: "The brain question",
        icon: "🔬",
        body: (
          <>
            <p>
              For years, scientists called this &ldquo;mind control.&rdquo; The 2017 version
              of the truth is weirder. The fungus doesn&apos;t actually enter the ant&apos;s
              brain at all.
            </p>
            <p>
              It surrounds the brain cells without going in. It takes over the muscles directly,
              through chemical signals that bypass the brain. The ant&apos;s brain is structurally
              intact the whole time. Its body just isn&apos;t listening to it anymore.
            </p>
          </>
        ),
      },
    ],
    grossFactHighlight:
      "The fungus destroys the ant's jaw muscles to lock the bite permanently. The grip physically cannot be released. Not by the ant. Not by anyone.",
    drIckyVerdict:
      "Forty-eight million years. Whatever lived in those ancient tropical forests was already being zombified by this exact fungus. It was old before the dinosaurs went extinct. Think about that.",
  },

  "tongue-eating-louse": {
    slug: "tongue-eating-louse",
    creatureName: "Tongue-Eating Louse",
    ewwMeter: 100,
    seoDescription:
      "Cymothoa exigua enters a fish through its gills, replaces its tongue, and feeds there. Discover the real science behind the horror.",
    seoKeywords:
      "tongue-eating louse, Cymothoa exigua, parasitic isopod, fish parasite, gross animals for kids, weird ocean creatures",
    classification: "Cymothoa exigua",
    quickStats: [
      { label: "Type", value: "Parasitic isopod" },
      { label: "Target", value: "Snappers, other fish" },
      { label: "Location", value: "Gulf of California, Pacific" },
      { label: "Size (female)", value: "Up to 3cm" },
    ],
    intro: (
      <>
        <p>
          Cymothoa exigua is the only known parasite in all of recorded biology that replaces
          a host organ with its own body and then performs that organ&apos;s function.
        </p>
        <p>
          It enters through the gills. It severs the tongue. It installs itself where the tongue
          used to be. The fish keeps eating. The louse takes a cut of every meal.
        </p>
      </>
    ),
    sections: [
      {
        heading: "Enters through the gills",
        icon: "🐟",
        body: (
          <>
            <p>
              Juvenile Cymothoa exigua are male. They enter a fish through the gills as tiny,
              swimming larvae. Once inside, they make their way to the mouth.
            </p>
            <p>
              If there is already a female inside, the male stays male and attaches to the
              gills nearby. If there is no female, the male transforms into a female. The process
              takes a few weeks. It is permanent.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "The louse changes sex based on whether a female is already present. It reads the situation and adapts.",
        },
      },
      {
        heading: "The severing",
        icon: "✂️",
        body: (
          <>
            <p>
              Once the female is established in the mouth, she uses her front claws to grip
              the tongue and cut off its blood supply. Over time, the tongue shrinks and falls
              off. The louse then attaches directly to the tongue muscles using her back legs.
            </p>
            <p>
              She is now the tongue. The fish uses her to hold food and swallow, exactly as
              it used its original tongue. She moves when the fish&apos;s mouth muscles move.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "This is the only case in nature of a parasite replacing a host organ and performing that organ's job.",
        },
      },
      {
        heading: "The arrangement",
        icon: "🍽️",
        body: (
          <>
            <p>
              The louse feeds on the fish&apos;s blood and mucus. Some research suggests she
              also takes a portion of whatever food passes through the mouth. The fish survives —
              sometimes for years — with this arrangement running.
            </p>
            <p>
              When the female reproduces, her larvae are released into the water. Some of those
              larvae will find gills of their own.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "Cymothoa exigua has been found in at least 8 species of fish. One was found inside a fish bought at a UK supermarket in 2005.",
        },
      },
    ],
    grossFactHighlight:
      "The louse attaches at the base of the severed tongue stub using her back legs. She moves when the fish moves its mouth. She IS the tongue.",
    drIckyVerdict:
      "One confirmed case of a parasite replacing an organ and performing its job. One. Documented. In the scientific record. The fish just keeps eating. It doesn't know. It cannot know.",
  },

  "hagfish-slime": {
    slug: "hagfish-slime",
    creatureName: "Hagfish",
    ewwMeter: 100,
    seoDescription:
      "Hagfish are jawless animals that can flood water with slime in seconds. Discover the gross science behind their strange defense.",
    seoKeywords:
      "hagfish, hagfish slime, weird deep sea creatures, Myxini, gross science for kids, ocean animals facts",
    classification: "Myxini (class)",
    quickStats: [
      { label: "Type", value: "Not actually a fish" },
      { label: "Location", value: "Deep sea, worldwide" },
      { label: "On Earth for", value: "300 million years" },
      { label: "Slime output", value: "20 litres from a small blob" },
    ],
    intro: (
      <>
        <p>
          The hagfish is 300 million years old. It has no jaw, no vertebral column, no eyes
          that form images, and no stomach. When a predator attacks it, it releases a dense,
          expanding slime that can clog a shark&apos;s gills in under half a second.
        </p>
        <p>
          Scientists have measured the slime volume. Some of them regret it.
        </p>
      </>
    ),
    sections: [
      {
        heading: "Not a fish",
        icon: "❓",
        body: (
          <>
            <p>
              Hagfish belong to the class Myxini. They have no jaw, no paired fins, no true
              spine, and no scales. Calling them a fish is roughly like calling a jellyfish
              a fish — technically wrong, just confusing.
            </p>
            <p>
              They have four hearts. No stomach — food goes from mouth to gut with nothing in
              between. And they can absorb nutrients directly through their skin, which means
              they are, in a measurable sense, eating whatever water they are submerged in.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "The hagfish lineage has remained essentially unchanged since the Carboniferous period — before dinosaurs, before most things that currently exist.",
        },
      },
      {
        heading: "The slime",
        icon: "🟢",
        body: (
          <>
            <p>
              Glands running along both sides of the hagfish&apos;s body contain coiled protein
              threads and mucin proteins in a compact, compressed state. When released into
              seawater, the threads uncoil — up to 15 centimetres each — and the mucins swell
              to bind everything into a gel.
            </p>
            <p>
              The expansion ratio is roughly 10,000 to 1. A small initial volume becomes
              approximately 20 litres of slime. It takes under half a second. Sharks have been
              filmed abandoning attacks because the slime clogged their gills before they
              could bite.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "The slime threads have been compared to spider silk in terms of tensile strength. Scientists at University of Guelph are studying them for sustainable fibre production.",
        },
      },
      {
        heading: "How it removes the slime from itself",
        icon: "🪢",
        body: (
          <>
            <p>
              After producing slime, the hagfish is covered in it. To clean itself, it ties
              its own body into a knot — literally — and slides the knot from head to tail,
              scraping the slime off. This takes approximately one second.
            </p>
            <p>
              It uses the same knot to feed. When eating inside a dead whale carcass, it braces
              itself against the inside walls using a body knot, bites a piece of tissue,
              then pulls the piece free by straightening the knot.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "A hagfish can survive for over 30 weeks without food — partly because it absorbs nutrients directly through its skin from the water around it.",
        },
      },
    ],
    grossFactHighlight:
      "A small amount of expelled material expands 10,000 times into 20 litres of fibre-reinforced slime gel in under half a second. The threads inside are structurally similar to spider silk.",
    drIckyVerdict:
      "300 million years. Before the first dinosaur. Before the first mammal. Before most things currently on this planet. The hagfish was already doing this. It did not need to evolve further. It was already perfect.",
  },

  "candiru-fish-legend": {
    slug: "candiru-fish-legend",
    creatureName: "Candiru Fish",
    ewwMeter: 80,
    seoDescription:
      "The candiru is a translucent Amazon catfish that feeds on other fish. Separate the real facts from scary stories in Dr. Icky's field report.",
    seoKeywords:
      "candiru fish, vampire catfish, amazon river monsters, candiru legend, weird fish, gross animals for kids",
    classification: "Vandellia cirrhosa",
    quickStats: [
      { label: "Type", value: "Parasitic catfish" },
      { label: "Lives", value: "Amazon basin, South America" },
      { label: "Size", value: "2 to 3 centimetres long" },
      { label: "Diet", value: "Blood" },
    ],
    intro: (
      <>
        <p>
          The candiru is a tiny, practically invisible catfish that makes its living by swimming into the gills of larger fish, locking itself in place, and drinking their blood.
        </p>
        <p>
          But its biological reality is often overshadowed by a famous, terrifying legend about what happens when humans swim in its river.
        </p>
      </>
    ),
    sections: [
      {
        heading: "The Gill Invader",
        icon: "🩸",
        body: (
          <>
            <p>
              Candiru are so small and translucent that they are nearly invisible in the murky waters of the Amazon. They don't hunt normally. Instead, they track the chemical trails of ammonia that other fish release from their gills while breathing.
            </p>
            <p>
              When a candiru finds a host, it swims straight into the gill cavity, which is dark, warm, and full of blood-rich tissue.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "The candiru is the only vertebrate known to parasitize another vertebrate by entering its body cavities to feed on its blood.",
        },
      },
      {
        heading: "The Barbed Grip",
        icon: "🪝",
        body: (
          <>
            <p>
              Once inside a tight space, the candiru has to make sure it doesn't get washed out. It does this by deploying a set of backwards-facing spines that open like an umbrella.
            </p>
            <p>
              These spines dig into the host's tissue, locking the candiru firmly in place. Then, it uses its needle-like teeth to bite an artery and feast. The whole meal takes only a few minutes before the candiru drops off and sinks back to the river bottom to digest.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "Because the spines point backwards, pulling on the fish only makes them dig deeper. The only way out is for the candiru to let go.",
        },
      },
      {
        heading: "The Legend",
        icon: "😱",
        body: (
          <>
            <p>
              The candiru is most famous for a horrific legend: that it mistakes human urine for fish gills and swims up human urethras. Stories claim that once inside, it locks its spines, requiring painful surgery to remove.
            </p>
            <p>
              While there is one documented medical case from 1997, many scientists are skeptical that it happens often, or even that candiru are actually attracted to urine. However, the fear alone is enough to keep many people out of the water.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "True or not, the candiru has earned a reputation as the one fish locals fear more than piranhas.",
        },
      },
    ],
    grossFactHighlight:
      "Once inside a gill or cavity, the candiru deploys backwards-facing umbrella-like spines to lock itself in place. Pulling it out physically only drives the spikes deeper into the flesh.",
    drIckyVerdict:
      "Whether the human stories are completely true or mostly myth, a translucent vampire catfish that lodges itself in gills with backwards spikes is a verified biological nightmare.",
  },

  "zombie-snail-eyestalks": {
    slug: "zombie-snail-eyestalks",
    creatureName: "Zombie Snail",
    ewwMeter: 100,
    seoDescription:
      "A parasite takes over a snail and turns its eyestalks into pulsing tubes that trick birds. Learn the real gross science.",
    seoKeywords:
      "zombie snail, Leucochloridium paradoxum, parasitic flatworm, mind control parasite, weird animals for kids, gross science",
    classification: "Leucochloridium paradoxum",
    quickStats: [
      { label: "Type", value: "Parasitic flatworm" },
      { label: "Host", value: "Amber snails" },
      { label: "Location", value: "Europe and North America" },
      { label: "Disguise", value: "Pulsing caterpillar" },
    ],
    intro: (
      <>
        <p>
          Some parasites hide. Leucochloridium paradoxum puts on a brightly colored, pulsating light show. But it does this using the body of a snail.
        </p>
        <p>
          This flatworm invades a snail, takes over its brain, and transforms its eyestalks into swollen, banded, thrashing tubes that look exactly like caterpillars. And then it waits for a bird.
        </p>
      </>
    ),
    sections: [
      {
        heading: "The Invasion",
        icon: "🐌",
        body: (
          <>
            <p>
              The nightmare begins on the forest floor. A snail eats bird droppings that happen to contain the microscopic eggs of the flatworm. Once inside the snail's digestive system, the eggs hatch.
            </p>
            <p>
              The flatworms grow and form a massive network of tubes throughout the snail's body. As they mature, they pack hundreds of themselves into a special sac called a broodsac.
            </p>
          </>
        ),
      },
      {
        heading: "The Caterpillar Disguise",
        icon: "🐛",
        body: (
          <>
            <p>
              The broodsac grows so large that it pushes its way into the snail's translucent eyestalks, stretching them out. The sac is banded with bright green, brown, and white stripes.
            </p>
            <p>
              Inside the eyestalks, the sac begins to rapidly pulse and twitch. To a hungry bird looking down from above, the snail's eyestalk no longer looks like part of a snail — it looks exactly like a juicy, wriggling caterpillar.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "The parasite only pulses when it senses daylight. In the dark, it stops moving to save energy, knowing birds only hunt by sight during the day.",
        },
      },
      {
        heading: "The Mind Control",
        icon: "🧠",
        body: (
          <>
            <p>
              Having a great disguise isn't enough if the snail stays hidden in the dark, damp places it usually prefers. So the parasite alters the snail's behavior.
            </p>
            <p>
              It somehow rewires the snail's brain, forcing it to crawl out into the open, climb up high onto exposed leaves, and sit perfectly still in the bright sunlight — effectively serving itself up on a silver platter.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "When a bird swoops down, it usually bites off just the swollen eyestalk. The snail survives, regenerates its eyestalk, and can actually be infected again.",
        },
      },
      {
        heading: "The Final Stage",
        icon: "🐦",
        body: (
          <>
            <p>
              Once the bird eats the "caterpillar", the flatworms safely reach their final destination: the bird's gut. There, they finally become adults, reproduce, and lay eggs.
            </p>
            <p>
              The eggs are pooped out onto leaves by the bird, waiting for another unsuspecting snail to come along and eat them.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "This multi-host lifecycle is common in parasites, but Leucochloridium is unique in its spectacular, visual method of moving from snail to bird.",
        },
      },
    ],
    grossFactHighlight:
      "The snail's eyestalks are physically stretched to their limit, filled with the swollen, pulsating bodies of the flatworms moving in a hypnotic rhythm to attract predators.",
    drIckyVerdict:
      "Mind control, radical body modification, and a brightly colored light show, all designed specifically to get eaten by a bird. Nature is ruthless, and this worm is an artist of disgust.",
  },

  "guinea-worm-extraction": {
    slug: "guinea-worm-extraction",
    creatureName: "Guinea Worm",
    ewwMeter: 100,
    seoDescription:
      "The Guinea worm grows up to a meter long inside the human body before slowly emerging through a blister in the skin. Real gross science for kids.",
    seoKeywords:
      "guinea worm, Dracunculus medinensis, parasitic worms, gross parasites, weird medical science, gross animals for kids",
    classification: "Dracunculus medinensis",
    quickStats: [
      { label: "Type", value: "Parasitic nematode" },
      { label: "Host", value: "Humans and dogs" },
      { label: "Length", value: "Up to 80 cm" },
      { label: "Emergence", value: "Takes weeks" },
    ],
    intro: (
      <>
        <p>
          The Guinea worm doesn&apos;t just live inside its host. It grows inside the body for a year until the female—which can be nearly a meter long—decides it is time to leave.
        </p>
        <p>
          It creates a painful blister on the skin and slowly, agonizingly, pushes its way out. You cannot just pull it out quickly. It has to be wound out over days.
        </p>
      </>
    ),
    sections: [
      {
        heading: "The Silent Year",
        icon: "💧",
        body: (
          <>
            <p>
              The lifecycle begins when a person drinks water contaminated with tiny water fleas that carry Guinea worm larvae. Once inside the stomach, the fleas die, but the larvae survive.
            </p>
            <p>
              They bore through the stomach wall and move into the body cavity. For a whole year, the host has no idea they are there. The worms mate, the males die, and the females grow to the size of a long piece of spaghetti.
            </p>
          </>
        ),
      },
      {
        heading: "The Blister",
        icon: "🔥",
        body: (
          <>
            <p>
              When a female is ready to release her eggs, she travels down the body, usually to the lower leg or foot. She secretes an acid-like substance that creates a burning, painful blister on the skin.
            </p>
            <p>
              The burning sensation is intentional. It drives the person to find water to cool the wound. As soon as the blister touches water, it bursts, and the worm releases millions of eggs into the water to start the cycle again.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "The pain is so intense that the disease gets its name, Dracunculiasis, from a Latin phrase meaning 'affliction with little dragons.'",
        },
      },
      {
        heading: "The Extraction",
        icon: "🥢",
        body: (
          <>
            <p>
              There is no medicine to kill the worm and no vaccine. The only way to remove it is the same way it has been done for thousands of years: wrapping the emerging worm around a small stick.
            </p>
            <p>
              The worm must be pulled out incredibly slowly, usually just a few centimeters a day. If you pull too hard and it snaps inside the body, the remaining piece can cause a massive, life-threatening infection.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "Global health efforts have reduced Guinea worm cases from 3.5 million in 1986 to just a handful today. It is on the brink of being completely eradicated.",
        },
      },
    ],
    grossFactHighlight:
      "The extraction process can take weeks of slowly winding a meter-long live worm out of your foot on a wooden stick.",
    drIckyVerdict:
      "A meter-long noodle of pure misery that you have to slowly wind out of your own leg. Fortunately, human science is close to making this worm extinct. Good riddance.",
  },

  "assassin-bug-smoothie": {
    slug: "assassin-bug-smoothie",
    creatureName: "Assassin Bug",
    ewwMeter: 80,
    seoDescription:
      "The Assassin Bug stabs its prey, injects digestive juices to liquefy their insides, and drinks them like a bug smoothie. Gross science facts for kids.",
    seoKeywords:
      "assassin bug, true bugs, predatory insects, bug smoothie, weird insects, gross animals for kids",
    classification: "Reduviidae (family)",
    quickStats: [
      { label: "Type", value: "Predatory insect" },
      { label: "Weapon", value: "Curved stabbing beak" },
      { label: "Diet", value: "Other insects" },
      { label: "Location", value: "Worldwide" },
    ],
    intro: (
      <>
        <p>
          Most predators have teeth, claws, or crushing jaws. The Assassin Bug comes equipped with a hypodermic needle folded under its face.
        </p>
        <p>
          It doesn&apos;t chew its food. It stabs it, melts the insides with potent digestive enzymes, and drinks the liquefied remains. 
        </p>
      </>
    ),
    sections: [
      {
        heading: "The Deadly Beak",
        icon: "🗡️",
        body: (
          <>
            <p>
              The assassin bug belongs to a group of insects known as "true bugs," which are characterized by piercing and sucking mouthparts called a rostrum.
            </p>
            <p>
              When hunting, the bug slowly stalks its prey. When it gets close, it flicks its beak forward and drives it violently into the victim&apos;s body. The bite is immediate and paralyzing.
            </p>
          </>
        ),
      },
      {
        heading: "The Bug Smoothie",
        icon: "🥤",
        body: (
          <>
            <p>
              Once the beak is securely lodged in the prey, the assassin bug pumps in toxic saliva. This venom not only paralyzes the victim but contains enzymes that immediately start breaking down tissues.
            </p>
            <p>
              The inside of the prey turns to mush. The assassin bug then uses its beak like a straw to suck out all the nutritious, liquefied guts, leaving behind nothing but a dry, empty exoskeleton.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "Some larger species of assassin bugs will bite humans in self-defense. The bite is incredibly painful due to those tissue-melting enzymes.",
        },
      },
      {
        heading: "The Macabre Camouflage",
        icon: "🎒",
        body: (
          <>
            <p>
              While all assassin bugs are ruthless, one type—the masked hunter—takes it a step further. After sucking a bug dry, it glues the empty corpse of its victim onto its back.
            </p>
            <p>
              Over time, it builds a massive pile of dead ants, flies, and beetles that it wears like a backpack. This gruesome armor acts as camouflage to hide it from spiders and birds.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "Some wear the empty corpses of up to 20 ants stacked on their backs to mask their scent from other hunting ants.",
        },
      },
    ],
    grossFactHighlight:
      "Certain species of assassin bugs stick the empty, hollowed-out corpses of their prey onto their backs to wear as armor and camouflage.",
    drIckyVerdict:
      "Drinking your enemies is already hardcore. Wearing their empty shells as a backpack to sneak up on more enemies? That's just showing off.",
  },

  "goblin-shark-jaws": {
    slug: "goblin-shark-jaws",
    creatureName: "Goblin Shark",
    ewwMeter: 100,
    seoDescription:
      "The Goblin Shark lives in the deep sea and can detach its jaws, shooting them forward to snatch prey. Weird ocean science for kids.",
    seoKeywords:
      "goblin shark, Mitsukurina owstoni, deep sea sharks, weird ocean creatures, gross science, creepy sharks",
    classification: "Mitsukurina owstoni",
    quickStats: [
      { label: "Type", value: "Deep-sea shark" },
      { label: "Location", value: "Deep oceans worldwide" },
      { label: "Snout", value: "Long and blade-like" },
      { label: "Jaws", value: "Slingshot action" },
    ],
    intro: (
      <>
        <p>
          In the crushing darkness of the deep sea, the goblin shark drifts like a pale ghost. It has a long, flattened snout that looks like a sword jutting out of its forehead.
        </p>
        <p>
          But its nose isn&apos;t the scary part. When a fish swims too close, the goblin shark&apos;s entire jaw detaches from its skull and shoots forward to grab it.
        </p>
      </>
    ),
    sections: [
      {
        heading: "The Shovel Snout",
        icon: "📡",
        body: (
          <>
            <p>
              The deep sea is completely dark, so the goblin shark doesn't rely on sight. Its enormous, flattened snout is packed with special pores called ampullae of Lorenzini.
            </p>
            <p>
              These pores act like a metal detector, but instead of metal, they detect the tiny electrical signals made by the muscles of other fish. The shark swings its snout back and forth over the sand, sweeping for hidden prey.
            </p>
          </>
        ),
      },
      {
        heading: "The Slingshot Jaws",
        icon: "🚀",
        body: (
          <>
            <p>
              When the shark detects a crab or fish, it doesn't need to swim fast to catch it. Instead, it engages a mechanism unique among sharks.
            </p>
            <p>
              Its jaws are attached to its skull by elastic ligaments. When it opens its mouth, the tension releases, and the entire jaw rapidly catapults forward out of its face. The jaws snap shut on the prey, then retract back into the head.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "The jaw shoots forward at over 3 meters per second. The whole extension and retraction takes a fraction of a second.",
        },
      },
      {
        heading: "Nail-like Teeth",
        icon: "🦷",
        body: (
          <>
            <p>
              The goblin shark doesn&apos;t have the triangular, serrated teeth of a great white shark. Instead, its mouth is full of long, thin, curved needles.
            </p>
            <p>
              These teeth aren&apos;t made for cutting; they are made for snagging. In the deep sea, food is scarce and often slippery, like squid. Once those needle teeth pierce a soft body, escape is impossible.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "Because of its pinkish-grey color and flabby body, Japanese fishermen originally called it tenguzame—named after a mythical goblin with a long nose.",
        },
      },
    ],
    grossFactHighlight:
      "Its jaws are held by elastic ligaments. When it strikes, the jaws catapult forward out of its head, moving fast enough to snatch a fish before it can react.",
    drIckyVerdict:
      "A face only a mother could love, and even then, she probably jumps out of the way when the jaws shoot out. Absolute deep-sea perfection.",
  },

  "blue-ringed-octopus-venom": {
    slug: "blue-ringed-octopus-venom",
    creatureName: "Blue-Ringed Octopus",
    ewwMeter: 100,
    seoDescription:
      "The blue-ringed octopus flashes brilliant blue rings as a warning, then can deliver tetrodotoxin through a tiny bite. Real venom science for kids.",
    seoKeywords:
      "blue-ringed octopus, Hapalochlaena, tetrodotoxin, venomous octopus, blue rings warning, gross science for kids",
    classification: "Hapalochlaena spp.",
    quickStats: [
      { label: "Type", value: "Venomous cephalopod" },
      { label: "Lives", value: "Indo-Pacific reefs and tide pools" },
      { label: "Warning", value: "Flashing blue rings" },
      { label: "Venom", value: "Tetrodotoxin saliva" },
    ],
    intro: (
      <>
        <p>
          The blue-ringed octopus looks like something a tide pool invented to trick curious hands. It is small,
          soft, and decorated with bright blue rings that seem almost too pretty to be a warning label.
        </p>
        <p>
          That is exactly what they are. When those rings flash, the octopus is not showing off. It is saying:
          this tiny body is carrying one of the nastiest nerve toxins in the ocean.
        </p>
      </>
    ),
    sections: [
      {
        heading: "The prettiest stop sign",
        icon: "💍",
        body: (
          <>
            <p>
              Blue-ringed octopuses spend much of their time tucked into cracks, shells, coral rubble, and rocky
              seafloor hideouts. Most of the time, they would rather stay hidden than start trouble.
            </p>
            <p>
              If a predator gets too close, the disguise changes. The octopus flashes bright blue patterns across
              its body and arms, turning itself into a living warning sign. In nature, bright colors often mean
              one thing: do not test me.
            </p>
          </>
        ),
        callout: {
          type: "weird",
          text: "The blue rings are not just paint. Special light-reflecting skin cells help make them shine when the octopus puts on its warning display.",
        },
      },
      {
        heading: "The bacteria in the bite",
        icon: "🧫",
        body: (
          <>
            <p>
              The really alarming part is hiding in the salivary glands. Blue-ringed octopuses carry bacteria
              that produce tetrodotoxin, the same kind of nerve toxin made famous by pufferfish.
            </p>
            <p>
              Tetrodotoxin blocks nerve signals. Muscles stop getting the messages they need to move. That is
              useful when the octopus wants a crab or shrimp to stop fighting. It is a terrible surprise for
              anything that grabs the octopus.
            </p>
          </>
        ),
        callout: {
          type: "danger",
          text: "The bite can be tiny and almost painless, which is the worst possible style for a bite that can cause paralysis.",
        },
      },
      {
        heading: "Paralysis, not poison slime",
        icon: "🫁",
        body: (
          <>
            <p>
              This is venom, not magic goo. The octopus has to deliver it with a bite. Once tetrodotoxin is in
              the body, it can interfere with the muscles used for breathing while the victim may still be awake
              and aware.
            </p>
            <p>
              There is no special antidote for tetrodotoxin. Doctors keep the person breathing until the toxin
              wears off. Dr. Icky&apos;s official field rule is therefore simple: admire the blue rings from far away,
              and never pick one up.
            </p>
          </>
        ),
        callout: {
          type: "science",
          text: "The danger comes from blocked nerve messages, not from the octopus being aggressive. Most bites happen when people handle or harass one.",
        },
      },
      {
        heading: "How it eats armored snacks",
        icon: "🦀",
        body: (
          <>
            <p>
              A blue-ringed octopus hunts small crabs, shrimp, and fish. It pounces, wraps the prey in its arms,
              and uses its hard beak to punch through shells or soft tissue.
            </p>
            <p>
              Then the venom does the quiet work. The prey stops moving, the octopus gets dinner, and the ocean
              receives another reminder that small does not mean harmless.
            </p>
          </>
        ),
      },
    ],
    grossFactHighlight:
      "A blue-ringed octopus bite can be so small and painless that a person may not notice the bite itself before the nerve toxin starts causing numbness and paralysis.",
    drIckyVerdict:
      "Beautiful warning lights, bacteria-made venom, and a bite that barely announces itself. It is the ocean's tiniest flashing 'absolutely do not touch' sign. Total Barf, with excellent branding.",
  },
};

/* ─── Helpers ──────────────────────────────────────────────────────── */

function getCategoryLabel(category: string): string {
  switch (category) {
    case "specimen-of-the-week": return "Specimen of the Week";
    case "field-report": return "Field Report";
    case "reader-submission": return "Reader Submission";
    default: return category;
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

const calloutStyles = {
  science: {
    border: "#185FA5",
    bg: "#EEF4FB",
    labelColor: "#185FA5",
    label: "Science bit",
    icon: "🔬",
  },
  danger: {
    border: "#A32D2D",
    bg: "#FCEBEB",
    labelColor: "#A32D2D",
    label: "Danger",
    icon: "⚠️",
  },
  weird: {
    border: "#854F0B",
    bg: "#FAEEDA",
    labelColor: "#854F0B",
    label: "Weird detail",
    icon: "🤨",
  },
};

/* ─── Static params ────────────────────────────────────────────────── */

export function generateStaticParams() {
  return specimenPosts.map((p) => ({ slug: p.slug }));
}

/* ─── SEO metadata ─────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = specimenPosts.find((p) => p.slug === slug);
  const article = articles[slug];
  if (!post || !article) return {};

  return {
    title: slug === "hagfish-slime" ? "Hagfish: Gross Slime, Weird Facts" : post.title,
    description: article.seoDescription,
    keywords: article.seoKeywords,
    openGraph: {
      title: post.title,
      description: article.seoDescription,
      type: "article",
      url: `/specimen-files/${slug}`,
      publishedTime: post.date,
      images: [{ url: creatureImagePath(article.creatureName) }],
    },
    alternates: { canonical: `/specimen-files/${slug}` },
  };
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default async function SpecimenPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = specimenPosts.find((p) => p.slug === slug);
  const article = articles[slug];
  if (!post || !article) notFound();

  const ewwConfig = ewwMeterLabels[article.ewwMeter];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: article.seoDescription,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: getCategoryLabel(post.category),
    keywords: article.seoKeywords,
    wordCount: post.readTime * 200,
    author: { "@type": "Person", name: "Dr. Icky" },
    publisher: {
      "@type": "Organization",
      name: "EWW-niverse",
      url: "https://ewwniverse.com",
      logo: { "@type": "ImageObject", url: "https://ewwniverse.com/images/ui/logo-main.png" },
    },
    image: `https://ewwniverse.com${creatureImagePath(article.creatureName)}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://ewwniverse.com/specimen-files/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CLASSIFIED HEADER ──────────────────────────────────────── */}
      <section className="dark-section relative overflow-hidden py-16" style={{ backgroundColor: "#080808" }}>
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url(/images/ui/slime%20splat.png)",
            backgroundSize: "140px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#5DB84A] mb-6">
            <Link href="/specimen-files" className="hover:text-white transition-colors">
              Specimen Files
            </Link>
            <span className="text-[#5DB84A]">/</span>
            <span className="text-[#8A9E86] truncate">{post.title}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              {/* Classification tags */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#5DB84A] text-white px-3 py-1 rounded-full">
                  {getCategoryLabel(post.category)}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ color: ewwConfig.color, backgroundColor: ewwConfig.bg }}
                >
                  EWW {article.ewwMeter} — {ewwConfig.label}
                </span>
                <span className="text-[10px] font-mono text-[#5DB84A] bg-[#0D2007] px-3 py-1 rounded-full">
                  {article.classification}
                </span>
              </div>

              <h1
                className="text-4xl md:text-6xl leading-tight mb-4"
                style={{ color: "#F4EED8" }}
              >
                {post.title}
              </h1>

              <p className="text-[#8A9E86] leading-relaxed max-w-lg mb-6">{post.excerpt}</p>

              <div className="flex items-center gap-3 text-xs text-[#5DB84A]">
                <span>By Dr. Icky</span>
                <span>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* EWW meter + creature image */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={`/images/ui/EWW-meter%20${article.ewwMeter}%25.webp`}
                alt={`EWW meter ${article.ewwMeter}%`}
                className="illustration w-28 object-contain"
                style={{ mixBlendMode: "normal" }}
              />
              {article.ewwMeter === 100 && (
                <img
                  src="/images/ui/Total%20Barf%20sticker.webp"
                  alt="Total Barf!"
                  className="illustration w-20 object-contain"
                  style={{ mixBlendMode: "normal" }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIMEN VISUAL ────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_240px]">
            {/* Quick stats */}
            <div className="flex flex-col gap-4">
              <div className="mb-1 flex items-center gap-3">
                <span className="rounded border border-[var(--color-danger)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-danger)]">
                  Classified
                </span>
                <h2 className="text-lg text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>
                  Specimen classification
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {article.quickStats.map((stat) => (
                  <div key={stat.label} className="lab-panel p-3">
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-mute)]">{stat.label}</p>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="prose-eww mt-4">{article.intro}</div>
            </div>

            {/* Creature image */}
            <div className="flex flex-col items-center gap-3">
              <div className="lab-panel relative flex aspect-square w-full items-center justify-center overflow-hidden p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={creatureImagePath(article.creatureName)}
                  alt={article.creatureName}
                  className="relative z-10 h-full w-full object-contain"
                />
              </div>
              <p className="text-center text-xs italic text-[var(--color-ink-mute)]">{article.creatureName}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ───────────────────────────────────────────── */}
      <section className="bg-[var(--color-lab-void)] py-14">
        <div className="mx-auto max-w-3xl px-4">
          {/* Gross fact reveal — interactive */}
          <GrossReveal fact={article.grossFactHighlight} />

          {article.sections.map((section, i) => (
            <div key={section.heading} className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-xs font-bold text-black" style={{ backgroundColor: "var(--color-neon)" }}>
                  {i + 1}
                </div>
                <span className="mr-1 text-xl" aria-hidden="true">{section.icon}</span>
                <h2 className="text-xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>{section.heading}</h2>
              </div>

              <div className="prose-eww mb-5">{section.body}</div>

              {section.callout && (() => {
                const style = calloutStyles[section.callout.type];
                return (
                  <div className="flex items-start gap-3 rounded-xl border-l-4 p-4" style={{ borderColor: style.border, backgroundColor: style.bg }}>
                    <span className="mt-0.5 flex-shrink-0 text-base" aria-hidden="true">{style.icon}</span>
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: style.labelColor }}>{style.label}</p>
                      <p className="text-sm leading-relaxed text-[#3D2B1F]">{section.callout.text}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
      </section>

      {/* ── DR. ICKY'S VERDICT ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-14">
        <div className="lab-haze pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <div className="relative w-28 flex-shrink-0">
              <div className="absolute inset-0 -z-10 rounded-2xl blur-xl" style={{ background: "radial-gradient(circle, rgba(141,231,28,0.35), transparent 70%)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dr-icky-real/dr-icky-avatar.webp"
                alt="Dr. Icky"
                className="w-28 rounded-2xl object-cover"
                style={{ border: "1px solid var(--color-lab-line-bright)" }}
              />
            </div>
            <div>
              <p className="lab-label mb-3 text-[var(--color-neon)]">Dr. Icky&apos;s verdict</p>
              <p className="text-xl leading-relaxed text-[var(--color-ink)]">&ldquo;{article.drIckyVerdict}&rdquo;</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-lab-void)] py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[var(--color-lab-line-bright)] bg-[var(--color-lab-panel)] p-7 sm:flex-row">
            <div>
              <p className="lab-label mb-2 text-[var(--color-neon)]">Classify it yourself</p>
              <h3 className="text-2xl text-[var(--color-ink)]" style={{ fontFamily: "var(--font-boogaloo), cursive" }}>234 specimens are waiting</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-ink-dim)]">
                Scan this specimen, survive the quiz, and master it in the free app — then hunt the other 233.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col gap-3">
              <AppStoreButton size="md" />
              <Link href="/books" className="rounded-full border border-[var(--color-lab-line-bright)] px-6 py-3 text-center text-sm font-bold uppercase tracking-wide text-[var(--color-ink)] transition-colors hover:border-[var(--color-neon)] hover:text-[var(--color-neon)]">
                See the books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="border-t border-[var(--color-lab-line)] bg-[var(--color-lab-void)] py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
          <Link href="/specimen-files" className="flex items-center gap-1.5 text-sm text-[var(--color-ink-mute)] transition-colors hover:text-[var(--color-neon)]">
            <span aria-hidden="true">&#8592;</span> All Specimen Files
          </Link>
        </div>
      </section>
    </>
  );
}

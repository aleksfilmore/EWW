import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { specimenPosts, ewwMeterLabels, creatureImagePath } from "@/lib/data";
import GrossReveal from "@/components/GrossReveal";

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
  "zombie-ant-fungus": {
    slug: "zombie-ant-fungus",
    creatureName: "Zombie Ant Fungus",
    ewwMeter: 100,
    seoDescription:
      "The Ophiocordyceps unilateralis fungus hijacks carpenter ants, controls their brains, and forces them to die in the exact spot the fungus needs to reproduce. Full gross science for kids.",
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
      "Cymothoa exigua enters through a fish's gills, severs its tongue, and replaces it with its own body. The fish keeps eating. The louse takes a cut. Full gross science for kids.",
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
      "The hagfish is not a fish. It's 300 million years old, has no jaw, and can fill a bucket with slime in under half a second. Here's the full gross science breakdown for kids.",
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
    title: post.title,
    description: article.seoDescription,
    keywords: article.seoKeywords,
    openGraph: {
      title: post.title,
      description: article.seoDescription,
      type: "article",
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
    "@type": "Article",
    headline: post.title,
    description: article.seoDescription,
    datePublished: post.date,
    author: { "@type": "Person", name: "Dr. Icky" },
    publisher: { "@type": "Organization", name: "EWW-niverse", url: "https://ewwniverse.com" },
    image: `https://ewwniverse.com${creatureImagePath(article.creatureName)}`,
    mainEntityOfPage: `https://ewwniverse.com/specimen-files/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CLASSIFIED HEADER ──────────────────────────────────────── */}
      <section className="dark-section bg-[#1A3D0E] relative overflow-hidden py-16">
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
                className="text-3xl md:text-5xl text-[#F7F2E4] leading-tight mb-4"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
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
                src={`/images/ui/EWW-meter%20${article.ewwMeter}%25.png`}
                alt={`EWW meter ${article.ewwMeter}%`}
                className="illustration w-28 object-contain"
                style={{ mixBlendMode: "normal" }}
              />
              {article.ewwMeter === 100 && (
                <img
                  src="/images/ui/Total%20Barf%20sticker.png"
                  alt="Total Barf!"
                  className="illustration w-20 object-contain"
                  style={{ mixBlendMode: "normal" }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Slime drip */}
      <div className="relative h-10 bg-[#F7F2E4] overflow-hidden">
        <img
          src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full illustration"
          style={{ height: "40px", objectFit: "cover", objectPosition: "top", mixBlendMode: "multiply" }}
        />
      </div>

      {/* ── SPECIMEN VISUAL ────────────────────────────────────────── */}
      <section
        className="bg-[#F7F2E4] py-10 relative"
        style={{
          backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start">
            {/* Quick stats */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="/images/ui/Classified%20stamp.png"
                  alt="Classified"
                  className="illustration w-10 h-10 object-contain"
                />
                <h2
                  className="text-lg text-[#1A3D0E]"
                  style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                >
                  Specimen Classification
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {article.quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[#C8B89A] bg-[#FDFAF3] p-3"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6652] mb-0.5">
                      {stat.label}
                    </p>
                    <p
                      className="text-sm text-[#1A3D0E] font-semibold"
                      style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Intro text */}
              <div className="prose-eww mt-4">{article.intro}</div>
            </div>

            {/* Creature image — big */}
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-2xl border-2 border-[#C8B89A] bg-[#EDE5CE] overflow-hidden p-6 w-full aspect-square flex items-center justify-center relative">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)",
                    backgroundSize: "cover",
                  }}
                />
                <img
                  src={creatureImagePath(article.creatureName)}
                  alt={article.creatureName}
                  className="relative z-10 illustration w-full h-full object-contain"
                />
              </div>
              <p className="text-xs text-center text-[#7A6652] italic">{article.creatureName}</p>
              <img
                src="/images/ui/Do%20Not%20Lick%20stamp.png"
                alt="Do not lick"
                className="illustration w-16 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hazard tape divider */}
      <div className="w-full overflow-hidden h-8 relative">
        <img
          src="/images/ui/Hazard%20tape%20strip%2C%20text-free.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover illustration"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* ── ARTICLE BODY ───────────────────────────────────────────── */}
      <section className="bg-[#FDFAF3] py-14">
        <div className="max-w-3xl mx-auto px-4">

          {/* Gross fact reveal — interactive */}
          <GrossReveal fact={article.grossFactHighlight} />

          {/* Sections */}
          {article.sections.map((section, i) => (
            <div key={section.heading} className="mb-12">
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#1A3D0E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-xl mr-1" aria-hidden="true">{section.icon}</span>
                <h2
                  className="text-xl text-[#1A3D0E]"
                  style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                >
                  {section.heading}
                </h2>
              </div>

              {/* Body */}
              <div className="prose-eww mb-5">{section.body}</div>

              {/* Callout box */}
              {section.callout && (() => {
                const style = calloutStyles[section.callout.type];
                return (
                  <div
                    className="rounded-xl border-l-4 p-4 flex gap-3 items-start"
                    style={{ borderColor: style.border, backgroundColor: style.bg }}
                  >
                    <span className="text-base flex-shrink-0 mt-0.5" aria-hidden="true">
                      {style.icon}
                    </span>
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{ color: style.labelColor }}
                      >
                        {style.label}
                      </p>
                      <p className="text-sm text-[#3D2B1F] leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Thin slime divider between sections (not after last) */}
              {i < article.sections.length - 1 && (
                <div className="mt-10 w-full overflow-hidden h-4">
                  <img
                    src="/images/ui/Thin%20slime%20divider%20line.png"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover illustration"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Evidence tape divider */}
      <div className="w-full overflow-hidden h-8 relative">
        <img
          src="/images/ui/Evidence%20tape%20strip%2C%20text-free.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover illustration"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* ── DR. ICKY'S VERDICT ─────────────────────────────────────── */}
      <section className="dark-section bg-[#1A3D0E] py-14 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url(/images/ui/slime%20splat.png)",
            backgroundSize: "120px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <img
                src="/images/dr-icky/Dr.%20Icky%20holding%20a%20clipboard.png"
                alt="Dr. Icky"
                className="illustration-character w-28 object-contain"
              />
              <img
                src="/images/ui/Dr.%20Icky%20Approved%20badge.png"
                alt="Dr. Icky Approved"
                className="illustration w-16 object-contain"
                style={{ mixBlendMode: "normal" }}
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#5DB84A] mb-3">
                Dr. Icky&apos;s Verdict
              </p>
              <p
                className="text-xl text-[#F7F2E4] leading-relaxed"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                &ldquo;{article.drIckyVerdict}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#EDE5CE] py-12 border-t border-[#C8B89A]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
                There are 74 more
              </p>
              <h3
                className="text-2xl text-[#1A3D0E] mb-3"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                The full Creepy Creatures catalog
              </h3>
              <p className="text-sm text-[#7A6652] max-w-md leading-relaxed">
                75 creatures. Every fact verified and revolting. In print and as an app.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link
                href="/books"
                className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors text-center"
              >
                See the books
              </Link>
              <Link
                href="/app"
                className="border border-[#C8B89A] hover:border-[#5DB84A] text-[#3D2B1F] font-semibold px-6 py-3 rounded-full text-sm transition-colors bg-[#F7F2E4] text-center"
              >
                The app
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="bg-[#F7F2E4] py-8 border-t border-[#C8B89A]">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link
            href="/specimen-files"
            className="text-sm text-[#7A6652] hover:text-[#5DB84A] transition-colors flex items-center gap-1.5"
          >
            <span aria-hidden="true">&#8592;</span> All Specimen Files
          </Link>
          <img
            src="/images/ui/Junior%20Grossologist%20badge.png"
            alt="Junior Grossologist"
            className="illustration w-12 object-contain"
          />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { specimenPosts, ewwMeterLabels } from "@/lib/data";

/* ─── Article content ──────────────────────────────────────────────── */

interface Section {
  heading: string;
  body: React.ReactNode;
}

interface ArticleData {
  slug: string;
  creatureName: string;
  creatureImage: string;
  ewwMeter: 60 | 80 | 100;
  seoDescription: string;
  seoKeywords: string;
  intro: React.ReactNode;
  sections: Section[];
  drIckyNote: string;
  grossFactHighlight: string;
}

const articles: Record<string, ArticleData> = {
  "zombie-ant-fungus": {
    slug: "zombie-ant-fungus",
    creatureName: "Zombie Ant Fungus",
    creatureImage: "/images/creatures/Zombie%20Ant%20Fungus.png",
    ewwMeter: 100,
    seoDescription:
      "The Ophiocordyceps unilateralis fungus hijacks carpenter ants, controls their brains, and forces them to die in the exact spot the fungus needs to reproduce. Learn the full gross science behind zombie ants.",
    seoKeywords:
      "zombie ant fungus, Ophiocordyceps unilateralis, zombie ants, mind-controlling fungi, parasitic fungus, weird animals for kids",
    intro: (
      <>
        <p>
          Ophiocordyceps unilateralis does not simply kill carpenter ants. It takes over their bodies
          first, walks them to a precise location, forces a death grip onto a leaf vein, and then
          — only then — kills the ant and erupts from its head to spread its spores.
        </p>
        <p>
          The entire process is timed, targeted, and terrifyingly specific. This is not random
          infection. This is a parasite running a program.
        </p>
      </>
    ),
    sections: [
      {
        heading: "How the infection begins",
        body: (
          <>
            <p>
              Carpenter ants pick up fungal spores from the forest floor. The spores stick to the
              ant&apos;s exoskeleton and drill through it using enzymes. Once inside, the fungus
              begins to spread through the ant&apos;s body cavity, consuming soft tissue and
              multiplying.
            </p>
            <p>
              The fungus does not immediately attack the brain. Instead, it wraps around and between
              muscle fibers throughout the ant&apos;s body, releasing chemicals that gradually hijack
              the ant&apos;s motor control. The ant appears healthy. It keeps working. The colony does
              not know anything is wrong.
            </p>
          </>
        ),
      },
      {
        heading: "The program kicks in",
        body: (
          <>
            <p>
              About four to ten days after infection, the ant&apos;s behavior changes. It leaves its
              normal foraging path, begins moving erratically, and loses coordination. Then it climbs.
            </p>
            <p>
              The fungus guides the ant to a very specific target. Studies have found that infected
              ants consistently end up on the north side of plants, around 25 centimeters above the
              forest floor — precisely where temperature and humidity are optimal for fungal growth.
              The ants do not choose this location. The fungus does.
            </p>
            <p>
              At solar noon — the point of maximum sunlight — the infected ant bites down on a leaf
              vein with a force strong enough to lock its mandibles. The ant cannot let go. Muscle
              fibers in its jaw are destroyed by the fungus to keep the grip permanent. The ant dies
              locked in place, and the fungus finishes its work.
            </p>
          </>
        ),
      },
      {
        heading: "The eruption",
        body: (
          <>
            <p>
              Over the following days, a stalk grows out of the back of the dead ant&apos;s head.
              This stalk carries a capsule packed with spores. When the capsule ruptures, it
              releases spores that rain down onto the forest floor below, ready to infect the next
              ant that walks across them.
            </p>
            <p>
              Healthy ants in the colony recognize infected individuals and carry them far from
              the nest before the eruption happens. This behavior has been observed enough times
              that scientists believe the ants can detect the early chemical signals of infection.
              The colony has evolved a response. The fungus has continued anyway, for at least
              48 million years — fossil evidence of the distinctive bite marks on leaves was found
              in specimens that old.
            </p>
          </>
        ),
      },
      {
        heading: "The brain question",
        body: (
          <>
            <p>
              For years, this fungus was described as &ldquo;mind-controlling.&rdquo; The accurate
              version is stranger. Research from Penn State published in 2017 found that the fungus
              does not actually invade the ant&apos;s brain cells at all. It surrounds them,
              infiltrates the rest of the body, and controls behavior through chemical signals
              that bypass the brain entirely.
            </p>
            <p>
              The ant&apos;s brain remains structurally intact. Its body is being operated by
              something else. The distinction matters because it means the ant is not being
              &ldquo;controlled&rdquo; — its muscles are being directly manipulated while its
              brain watches, unable to override.
            </p>
          </>
        ),
      },
    ],
    grossFactHighlight:
      "The fungus locks the ant's jaw so hard that muscle fibers are destroyed in the process. The grip cannot be released. Not even by the ant.",
    drIckyNote:
      "Forty-eight million years. The fossil record shows leaf bite marks matching the zombie-ant signature going back that far. Whatever lived back then was already doing this.",
  },

  "tongue-eating-louse": {
    slug: "tongue-eating-louse",
    creatureName: "Tongue-Eating Louse",
    creatureImage: "/images/creatures/Tongue-Eating%20Louse.png",
    ewwMeter: 100,
    seoDescription:
      "Cymothoa exigua enters through a fish's gills, severs its tongue, and replaces it — living inside the fish's mouth for years. Full gross science breakdown for curious kids.",
    seoKeywords:
      "tongue-eating louse, Cymothoa exigua, parasitic isopod, fish parasite, gross animals for kids, weird ocean creatures",
    intro: (
      <>
        <p>
          Cymothoa exigua enters through a fish&apos;s gills as a juvenile. It severs the fish&apos;s
          tongue using its front claws, attaches itself to the tongue stub, and from that point
          forward functions as the fish&apos;s tongue. The fish keeps eating. The louse takes a cut
          of every meal.
        </p>
        <p>
          This is the only known case in nature of a parasite functionally replacing a host organ.
        </p>
      </>
    ),
    sections: [
      {
        heading: "Entry and transformation",
        body: (
          <>
            <p>
              Cymothoa exigua starts life as a male. Juvenile males enter fish through the gills
              and make their way to the mouth. If they find a female already present, they stay
              male and attach to the gills nearby. If no female is present, the male transforms
              into a female — the process takes a few weeks and is irreversible.
            </p>
            <p>
              This sex change is driven by the absence of a female, not by any instruction from
              the host. The louse reads the environment and adapts. The fish has no say in any
              of this.
            </p>
          </>
        ),
      },
      {
        heading: "The severing",
        body: (
          <>
            <p>
              Once the female is established in the fish&apos;s mouth, she uses her front claws
              to grip the tongue and restrict the blood supply. Over time, the tongue atrophies
              and detaches. The louse then attaches directly to the muscles at the tongue&apos;s
              base using her rear legs.
            </p>
            <p>
              She is now the tongue. The fish uses her exactly as it would use its original tongue
              — to hold food, manipulate prey, swallow. The louse moves with the fish&apos;s mouth
              muscles. From the outside, the fish appears to function normally.
            </p>
          </>
        ),
      },
      {
        heading: "What the louse eats",
        body: (
          <>
            <p>
              The louse feeds on the fish&apos;s blood and mucus. Some research suggests she
              also takes a share of food that passes through the mouth, though this is harder
              to measure precisely. The fish&apos;s growth rate is somewhat reduced, and the
              louse adds significant weight to the host — but the fish survives, sometimes for
              years, hosting this arrangement.
            </p>
            <p>
              The female can live inside the fish for most of her adult life. When she reproduces,
              the larvae are released into the water. Some of them will find gills of their own.
            </p>
          </>
        ),
      },
      {
        heading: "Known hosts and range",
        body: (
          <>
            <p>
              Cymothoa exigua has been documented in at least eight species of fish, most commonly
              in the Gulf of California and the Pacific coast of Mexico. The rose snapper is among
              the most frequently affected. It has also been found in fish along European coastlines,
              and one case was reported in a fish purchased from a UK supermarket in 2005.
            </p>
            <p>
              It is harmless to humans. It cannot attach to a human tongue, cannot survive outside
              a fish host, and poses no health risk beyond, by most accounts, being deeply unsettling
              to find in your dinner.
            </p>
          </>
        ),
      },
    ],
    grossFactHighlight:
      "The louse attaches at the base of the severed tongue stub using her rear legs. She moves when the fish&apos;s mouth muscles move. She is the tongue.",
    drIckyNote:
      "This is the only known parasite in recorded biology that replaces a host organ with its own body and performs that organ's function. One case. Documented. Verified.",
  },

  "hagfish-slime": {
    slug: "hagfish-slime",
    creatureName: "Hagfish",
    creatureImage: "/images/creatures/Hagfish.png",
    ewwMeter: 100,
    seoDescription:
      "The hagfish is not a fish. It has no jaw, no vertebrae, and no eyes that work. When threatened, it releases enough slime to fill a bucket in under half a second. Here is how it works.",
    seoKeywords:
      "hagfish, hagfish slime, gross fish facts, weird deep sea creatures, Myxini, gross science for kids, ocean animals",
    intro: (
      <>
        <p>
          The hagfish is approximately 300 million years old as a lineage. It has no jaw, no
          vertebral column, and eyes that cannot form images. When a predator attacks, it releases
          a slime so dense and so fast that a large shark has been documented abandoning the attack
          to prevent its own gills from clogging.
        </p>
        <p>
          Scientists have measured this. One hagfish, in under half a second, can produce enough
          slime to fill a standard bucket. Some of them have regretted measuring it.
        </p>
      </>
    ),
    sections: [
      {
        heading: "What the hagfish actually is",
        body: (
          <>
            <p>
              Hagfish are not fish in the biological sense. They belong to the class Myxini —
              jawless, scaleless, without paired fins, and without a true vertebral column.
              They are more accurately described as very old, very strange, soft-bodied chordates
              that have remained essentially unchanged since the Carboniferous period.
            </p>
            <p>
              They have four hearts. They have no stomach — food passes from a simple mouth directly
              through a straight gut. They can survive without eating for months by absorbing
              nutrients directly through their skin, which is highly permeable and picks up
              dissolved organics from whatever they are buried in.
            </p>
          </>
        ),
      },
      {
        heading: "The slime",
        body: (
          <>
            <p>
              Hagfish slime is produced in glands that run along both sides of the body. When
              stressed, the hagfish releases small packages of coiled protein threads and mucin
              proteins simultaneously. On contact with seawater, the threads uncoil almost
              instantly — some measure up to 15 centimeters long — and the mucins swell to bind
              everything together into a gel.
            </p>
            <p>
              The resulting material is not mucus in the conventional sense. It is a fiber-reinforced
              hydrogel — the threads give it structural integrity that ordinary mucus does not have.
              Scientists at the University of Guelph have studied the material seriously as a model
              for sustainable fiber production, because the protein threads have tensile properties
              comparable to spider silk.
            </p>
            <p>
              A hagfish can produce the equivalent of 20 liters of slime from a small initial volume
              of expelled material. The expansion ratio is roughly 10,000 to 1.
            </p>
          </>
        ),
      },
      {
        heading: "How the hagfish removes the slime from itself",
        body: (
          <>
            <p>
              After producing slime, the hagfish is covered in it. To remove it, the hagfish ties
              itself into a knot — literally — and slides the knot along its body from head to tail,
              scraping the slime off. The knot-tying takes approximately one second. The process is
              efficient, repeatable, and has been filmed in detail.
            </p>
            <p>
              Hagfish use the same knotting behavior to gain leverage when feeding inside a carcass.
              They enter a dead whale or large fish, bite off a piece of tissue, then brace themselves
              against the carcass interior using a body knot to pull the piece free. They can feed
              from the inside of a carcass for days.
            </p>
          </>
        ),
      },
      {
        heading: "Surviving without food",
        body: (
          <>
            <p>
              In laboratory conditions, hagfish have survived for over 30 weeks without food.
              During this time they continue to produce slime when disturbed, continue to maintain
              normal behavior, and show no measurable physical decline until very late in the
              starvation period.
            </p>
            <p>
              This is partly explained by their extremely low metabolic rate and partly by the
              nutrient absorption through their skin. They are, in some measurable sense, eating
              the water around them — pulling dissolved organic molecules directly into their bodies.
            </p>
            <p>
              Deep sea conditions mean food is unpredictable and rare. The hagfish evolved to treat
              meals as events, not routines.
            </p>
          </>
        ),
      },
    ],
    grossFactHighlight:
      "A hagfish can expand a small volume of expelled material into 20 liters of fiber-reinforced gel in under half a second. The threads inside are compared to spider silk.",
    drIckyNote:
      "300 million years without significant change. Before dinosaurs. Before mammals. Before most things that currently exist. The hagfish was already doing exactly this.",
  },
};

/* ─── Helpers ──────────────────────────────────────────────────────── */

function getCategoryLabel(category: string): string {
  switch (category) {
    case "specimen-of-the-week":
      return "Specimen of the Week";
    case "field-report":
      return "Field Report";
    case "reader-submission":
      return "Reader Submission";
    default:
      return category;
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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
      images: [{ url: article.creatureImage }],
    },
    alternates: {
      canonical: `/specimen-files/${slug}`,
    },
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

  // Article JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: article.seoDescription,
    datePublished: post.date,
    author: { "@type": "Person", name: "Dr. Icky" },
    publisher: {
      "@type": "Organization",
      name: "EWW-niverse",
      url: "https://ewwniverse.com",
    },
    image: `https://ewwniverse.com${article.creatureImage}`,
    mainEntityOfPage: `https://ewwniverse.com/specimen-files/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[#F7F2E4] border-b border-[#C8B89A] py-14">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#7A6652] mb-6">
            <Link href="/specimen-files" className="hover:text-[#5DB84A] transition-colors">
              Specimen Files
            </Link>
            <span>/</span>
            <span className="text-[#3D2B1F] truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Text */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-[#1A3D0E] px-2.5 py-0.5 rounded-full">
                  {getCategoryLabel(post.category)}
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ color: ewwConfig.color, backgroundColor: ewwConfig.bg }}
                >
                  EWW {article.ewwMeter} — {ewwConfig.label}
                </span>
              </div>

              <h1
                className="text-3xl md:text-4xl text-[#1A3D0E] mb-4 leading-tight"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                {post.title}
              </h1>

              <p className="text-[#7A6652] text-sm leading-relaxed mb-6 max-w-xl">{post.excerpt}</p>

              <div className="flex items-center gap-4 text-xs text-[#7A6652]">
                <span>By Dr. Icky</span>
                <span>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Creature image */}
            <div className="flex-shrink-0 w-48 md:w-56">
              <div className="rounded-2xl border border-[#C8B89A] bg-[#EDE5CE] overflow-hidden aspect-square flex items-center justify-center p-4">
                <img
                  src={article.creatureImage}
                  alt={article.creatureName}
                  className="w-full h-full object-contain illustration"
                />
              </div>
              <p className="text-center text-xs text-[#7A6652] mt-2 italic">{article.creatureName}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-[#FDFAF3] py-14">
        <div className="max-w-2xl mx-auto px-4">
          {/* Intro */}
          <div className="prose-eww mb-10">{article.intro}</div>

          {/* Gross fact highlight */}
          <div
            className="rounded-xl border-l-4 border-[#A32D2D] bg-[#FCEBEB] px-5 py-4 mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#A32D2D] mb-1">
              Gross Fact
            </p>
            <p className="text-sm text-[#3D2B1F] leading-relaxed">{article.grossFactHighlight}</p>
          </div>

          {/* Sections */}
          {article.sections.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2
                className="text-xl text-[#1A3D0E] mb-4"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                {section.heading}
              </h2>
              <div className="prose-eww">{section.body}</div>
            </div>
          ))}

          {/* Dr. Icky note */}
          <div className="rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-5 flex gap-4 items-start mt-12">
            <img
              src="/images/dr-icky/Dr.%20Icky%20holding%20a%20clipboard.png"
              alt="Dr. Icky"
              className="illustration-character w-14 flex-shrink-0 object-contain"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-1">
                Dr. Icky&apos;s Note
              </p>
              <p className="text-sm text-[#3D2B1F] leading-relaxed">{article.drIckyNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Books + App */}
      <section className="bg-[#EDE5CE] py-12 border-t border-[#C8B89A]">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
            There are 74 more
          </p>
          <h3
            className="text-2xl text-[#1A3D0E] mb-4"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            The full Creepy Creatures catalog
          </h3>
          <p className="text-sm text-[#7A6652] max-w-lg leading-relaxed mb-6">
            75 creatures. Every fact verified. Zombie ants, tongue-eating parasites, slime machines,
            and things that should not biologically be allowed to exist. Available in print and as
            an app.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/books"
              className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            >
              See the books
            </Link>
            <Link
              href="/app"
              className="border border-[#C8B89A] hover:border-[#5DB84A] text-[#3D2B1F] font-semibold px-5 py-2.5 rounded-full text-sm transition-colors bg-[#F7F2E4]"
            >
              The app
            </Link>
          </div>
        </div>
      </section>

      {/* Back to specimen files */}
      <section className="bg-[#F7F2E4] py-8 border-t border-[#C8B89A]">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/specimen-files"
            className="text-sm text-[#7A6652] hover:text-[#5DB84A] transition-colors flex items-center gap-1.5"
          >
            <span aria-hidden="true">&#8592;</span> All Specimen Files
          </Link>
        </div>
      </section>
    </>
  );
}

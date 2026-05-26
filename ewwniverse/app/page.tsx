import Link from "next/link";
import { books, creatures, specimenPosts, creatureImagePath } from "@/lib/data";
import BookCard from "@/components/BookCard";
import CreatureCard from "@/components/CreatureCard";
import EmailSignupForm from "@/components/EmailSignupForm";
import HeroSection from "@/components/HeroSection";

const featuredCreatures = creatures.filter((c) => c.ewwMeter === 100).slice(0, 8);

const categoryLabels: Record<string, string> = {
  "specimen-of-the-week": "Specimen of the Week",
  "field-report": "Field Report",
  "reader-submission": "Reader Submission",
};

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* ── THREE PILLARS ─────────────────────────────────────────────── */}
      <section className="bg-[#1A3D0E] py-8 border-y-2 border-[#5DB84A]/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "/images/ui/petri%20dish.png", color: "#5DB84A", bg: "#0D2007", label: "Gross Facts", desc: "Mind-blowing facts that are actually true (and totally gross)." },
              { icon: "/images/ui/magnifying%20glass.png", color: "#D48B1A", bg: "#1A1206", label: "Creepy Creatures", desc: "Meet the weirdest animals on Earth and beyond." },
              { icon: "/images/ui/microscope.png", color: "#6B3FD4", bg: "#110823", label: "Lab Missions", desc: "Experiments, codes, and slimey challenges." },
            ].map((p) => (
              <div key={p.label}
                className="flex items-center gap-4 rounded-2xl border px-5 py-4"
                style={{ borderColor: p.color + "40", backgroundColor: p.bg }}>
                <img src={p.icon} alt="" aria-hidden="true"
                  className="w-10 h-10 object-contain flex-shrink-0"
                  style={{ mixBlendMode: "normal" }} />
                <div>
                  <p className="font-creepster text-base mb-0.5"
                    style={{ color: p.color, fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>
                    {p.label}
                  </p>
                  <p className="text-sm text-[#8A9E86] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIPE ──────────────────────────────────────────────── */}
      <section className="bg-[#0D2007] py-8 border-b border-[#1A3D0E] relative overflow-hidden">
        <img src="/images/ui/slime-blob-face.png" alt="" aria-hidden="true"
          className="illustration absolute right-4 top-1/2 -translate-y-1/2 w-16 opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-[#1A3D0E]">
            {[
              { n: "6",   label: "Books published",   sub: "" },
              { n: "234", label: "Creatures total",   sub: "3 books, live now" },
              { n: "450+",label: "Gross-out facts",   sub: "" },
              { n: "01",  label: "Mad scientist",     sub: "" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center md:px-6">
                <span
                  className="font-creepster text-5xl leading-none"
                  style={{ color: "#5DB84A", fontFamily: "var(--font-creepster), 'Cantora One', serif", WebkitTextStroke: "1px #3D8C2A", paintOrder: "stroke fill" }}
                >
                  {s.n}
                </span>
                <span className="text-xs text-[#8A9E86] uppercase tracking-widest mt-1">{s.label}</span>
                {s.sub && <span className="text-[10px] text-[#5DB84A]/60 tracking-wider mt-0.5">{s.sub}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIMEN CARDS — collectible style ────────────────────────── */}
      <section
        className="py-16"
        style={{
          backgroundImage: "url(/images/ui/Lab%20tile%20background.png)",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
          backgroundColor: "#0A1205",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/ui/Total%20Barf%20sticker.png" alt="Total Barf" className="w-10 h-10 object-contain" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#E05050]">Total Barf tier — EWW 100</span>
              </div>
              <h2
                className="font-creepster text-4xl text-[#6ED44F]"
                style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >
                Unlock Specimen Files
              </h2>
              <p className="text-xs text-[#5A8A56] mt-1 uppercase tracking-widest">Collect. Learn. Gross out.</p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span
                className="font-creepster text-6xl leading-none text-[#5DB84A]"
                style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >234</span>
              <span className="text-[10px] uppercase tracking-widest text-[#5A8A56]">specimens total</span>
              <Link href="/specimen-files" className="text-xs font-bold text-[#5DB84A] hover:underline mt-1">Browse all →</Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredCreatures.map((c) => (
              <CreatureCard key={c.name} creature={c} showFact />
            ))}
          </div>
        </div>
      </section>

      {/* Hazard tape divider */}
      <div className="w-full h-7 overflow-hidden">
        <img src="/images/ui/Hazard%20tape%20strip%2C%20text-free.png" alt="" aria-hidden="true"
          className="w-full h-full object-cover illustration" style={{ mixBlendMode: "multiply" }} />
      </div>

      {/* ── BOOKS ─────────────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#080808" }}>
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Lab%20tile%20background.png)", backgroundSize: "200px", backgroundRepeat: "repeat" }}
        />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#5DB84A] mb-2">The collection</p>
              <h2
                className="font-creepster text-4xl md:text-5xl text-[#E8F5E2]"
                style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >
                Meet the Books
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <img src="/images/ui/Field%20Safe%20Copy%20stamp.png" alt="" aria-hidden="true"
                className="w-12 h-12 object-contain opacity-70" style={{ mixBlendMode: "screen" }} />
              <Link href="/books" className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors uppercase tracking-wide">
                View All Books
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.slice(0, 3).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <Link href="/books"
              className="border-2 border-[#5DB84A] text-[#5DB84A] font-bold px-6 py-3 rounded-full hover:bg-[#5DB84A] hover:text-white transition-colors text-sm uppercase tracking-wide">
              See all 6 books
            </Link>
          </div>
        </div>
      </section>

      {/* Evidence tape divider */}
      <div className="w-full h-7 overflow-hidden">
        <img src="/images/ui/Evidence%20tape%20strip%2C%20text-free.png" alt="" aria-hidden="true"
          className="w-full h-full object-cover illustration" style={{ mixBlendMode: "multiply" }} />
      </div>

      {/* ── APP — DARK SECTION ────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#0D0820" }}>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Lab%20tile%20background.png)", backgroundSize: "200px", backgroundRepeat: "repeat" }}
        />
        <img src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png" alt="" aria-hidden="true"
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{ height: 32, objectFit: "cover", objectPosition: "top", mixBlendMode: "soft-light" }} />

        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">Live now — iOS &amp; Android</p>
            <h2
              className="font-creepster leading-tight"
              style={{
                fontFamily: "var(--font-creepster), 'Cantora One', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#F7F2E4",
              }}
            >
              The App is{" "}
              <span style={{ color: "#5DB84A", WebkitTextStroke: "1px #3D8C2A", paintOrder: "stroke fill" }}>
                Live
              </span>
            </h2>
            <p className="text-[#A78BFA] leading-relaxed text-base">
              Scan specimens, master creatures, unlock Dr. Icky videos, and earn your EWW score. Free to start — 75 creatures with the free tier.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/app"
                className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wide">
                Get the App →
              </Link>
            </div>
            {/* App badges */}
            <div className="flex gap-3 mt-2">
              {[
                { img: "/images/ui/Mission%20Complete%20sticker.png",       label: "Mission Complete" },
                { img: "/images/ui/Badge%20Unlocked%20sticker.png",          label: "Badge Unlocked" },
                { img: "/images/ui/Total%20Barf%20Certified%20badge.png",    label: "Total Barf Certified" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1">
                  <img src={b.img} alt={b.label}
                    className="w-14 h-14 object-contain"
                    style={{ mixBlendMode: "screen" }} />
                  <span className="text-[10px] text-[#A78BFA] uppercase tracking-widest text-center leading-tight">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Dr. Icky video clip */}
            <div className="mt-2">
              <p className="text-[10px] text-[#A78BFA]/70 uppercase tracking-widest mb-2">Dr. Icky explains</p>
              <video
                src="/videos/classify_basic.mp4"
                controls
                preload="none"
                poster="/images/ui/Dr.%20Icky%20holding%20EWW-meter.png"
                className="rounded-2xl border border-[#5DB84A]/30 w-full max-w-sm"
                style={{ backgroundColor: "#080808" }}
              />
            </div>
          </div>

          {/* Phone mockups — real app screenshots */}
          <div className="relative flex items-end justify-center md:justify-end gap-0 mt-8 md:mt-0">
            {/* Back-left phone */}
            <div className="flex-shrink-0 relative z-10" style={{ transform: "rotate(-7deg) translateY(20px) translateX(16px)" }}>
              <img src="/images/ui/APP2.png" alt="EWW-niverse specimen files screen"
                className="w-36 md:w-44 object-contain drop-shadow-2xl" />
            </div>
            {/* Center phone — largest, front */}
            <div className="flex-shrink-0 relative z-20">
              <img src="/images/ui/APP3.png" alt="EWW-niverse home screen"
                className="w-44 md:w-56 object-contain drop-shadow-2xl" />
            </div>
            {/* Back-right phone */}
            <div className="flex-shrink-0 relative z-10" style={{ transform: "rotate(7deg) translateY(20px) translateX(-16px)" }}>
              <img src="/images/ui/APP6.png" alt="EWW-niverse lab mission screen"
                className="w-36 md:w-44 object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIMEN FILES ─────────────────────────────────────────────── */}
      <section className="py-16 border-t border-[#1A3D0E]" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#5DB84A] mb-1">From the field</p>
              <h2
                className="font-creepster text-3xl text-[#E8F5E2]"
                style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
              >
                Specimen Files
              </h2>
            </div>
            <Link href="/specimen-files" className="text-sm font-bold text-[#5DB84A] hover:text-[#6ED44F] transition-colors hidden sm:block uppercase tracking-wide">
              All files →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {specimenPosts.map((post) => (
              <Link key={post.slug} href={`/specimen-files/${post.slug}`}
                className="group flex flex-col rounded-xl border border-[#2A4020] bg-[#0A1405] overflow-hidden hover:border-[#5DB84A] hover:shadow-lg hover:shadow-[#5DB84A]/10 transition-all">
                {/* Creature image */}
                <div className="relative h-36 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "#0D1A06" }}>
                  <img src={creatureImagePath(post.creatureName)} alt={post.creatureName}
                    className="h-28 object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5DB84A]">
                    {categoryLabels[post.category]}
                  </span>
                  <h3
                    className="font-creepster text-base text-[#C8E8C4] leading-snug group-hover:text-[#5DB84A] transition-colors"
                    style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#5A8A56] leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#1A3D0E]">
                    <span className="text-xs text-[#5A8A56]">{post.readTime} min read</span>
                    <span className="text-xs font-bold text-[#5DB84A] group-hover:underline">Open →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────── */}
      <section className="bg-[#1A3D0E] py-8 border-t-2 border-[#5DB84A]/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "/images/ui/Green%20Risk%20sticker.png", color: "#5DB84A", title: "Kid-Safe Gross Fun", desc: "Designed for curious kids. Approved by parents." },
              { icon: "/images/ui/petri%20dish.png", color: "#A78BFA", title: "STEM Curiosity", desc: "Sparks wonder through science and discovery." },
              { icon: "/images/ui/Lab%20Safety%20Oath.png", color: "#D48B1A", title: "Printable Activities", desc: "Fun worksheets and labs you can print anytime." },
            ].map((t) => (
              <div key={t.title} className="flex items-center gap-4">
                <img src={t.icon} alt="" aria-hidden="true"
                  className="illustration w-10 h-10 object-contain flex-shrink-0"
                  style={{ mixBlendMode: "normal" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: t.color }}>{t.title}</p>
                  <p className="text-xs text-[#8A9E86] leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ─────────────────────────────────────────────── */}
      <section className="py-14 border-t border-[#1A3D0E] relative overflow-hidden" style={{ backgroundColor: "#0D1806" }}>
        <img src="/images/ui/Goo%20footprint%20trail.png" alt="" aria-hidden="true"
          className="absolute left-0 top-0 h-full opacity-5 pointer-events-none"
          style={{ objectFit: "cover", mixBlendMode: "screen" }} />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          {/* Dr. Icky inside slime circle frame */}
          <div className="relative w-28 mx-auto mb-4">
            <img src="/images/ui/slime-circle-frame.png" alt="" aria-hidden="true"
              className="w-28 h-28 object-contain absolute inset-0" style={{ mixBlendMode: "screen" }} />
            <img src="/images/dr-icky/Dr.%20Icky%20warning%20pose%20with%20raised%20finger.png"
              alt="Dr. Icky has an announcement"
              className="w-20 h-20 object-contain mx-auto relative pt-2" />
          </div>
          <h2
            className="font-creepster text-3xl text-[#E8F5E2] mb-3"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
          >
            Stay Classified
          </h2>
          <p className="text-sm text-[#8AAE86] mb-6 leading-relaxed">
            New specimen files, book news, and app updates. No spam. Dr. Icky does not tolerate spam.
          </p>
          <EmailSignupForm buttonText="Subscribe" />
        </div>
      </section>
    </>
  );
}

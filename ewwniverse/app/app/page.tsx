import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The App",
  description: "234 gross specimens across 3 books. Classify, master, earn your EWW score, and unlock Dr. Icky videos. Free to start.",
};

const features = [
  {
    icon: "/images/ui/eww-meter-100.png",
    title: "234 Specimens",
    description: "Creepy Creatures, Creepy Dinosaurs, and Creepy Earth. Every entry illustrated, rated, and ready to classify.",
  },
  {
    icon: "/images/ui/petri%20dish.png",
    title: "Master Quiz",
    description: "3 questions per specimen. Answer all correctly to master it. Dr. Icky delivers his verdict either way.",
  },
  {
    icon: "/images/ui/EWWmeter.png",
    title: "EWW Score",
    description: "A live gauge that grows as you classify and master specimens. 100% means you have done everything. Good luck.",
  },
  {
    icon: "/images/ui/microscope.png",
    title: "Slime Surges",
    description: "Master enough specimens to trigger contamination events. Special specimens unlock in your Recruit File.",
  },
];

const tiers = [
  {
    name: "Free",
    price: "€0",
    features: [
      "75 Creepy Creatures entries",
      "Full classify and master quiz",
      "EWW score tracking",
      "No ads, ever",
    ],
    cta: "Start for free",
    primary: false,
  },
  {
    name: "Full Lab Pass",
    price: "€3.99",
    priceNote: "One-time. No subscription.",
    features: [
      "Everything in Free",
      "159 more specimens (Dinosaurs + Earth)",
      "All 5 progression stages",
      "Special specimen unlocks",
      "All future book content drops",
    ],
    cta: "Get the Full Lab Pass",
    primary: true,
  },
];

export default function AppPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="dark-section min-h-[70vh] flex items-center relative overflow-hidden" style={{ backgroundColor: "#080808" }}>
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url(/images/ui/Lab%20tile%20background.png)",
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A]">
              Live now — iOS &amp; Android
            </p>
            <h1
              className="font-creepster text-5xl md:text-6xl leading-[1.1]"
              style={{ color: "#F4EED8", fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
            >
              The EWW-niverse App
            </h1>
            <p className="text-[#8A9E86] leading-relaxed max-w-md">
              234 specimens across 3 books. Classify them, master them through Dr. Icky&apos;s quiz, earn your EWW score, and unlock contamination events that reveal specimens you did not know existed.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/books"
                className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-bold px-6 py-3 rounded-full transition-colors text-sm uppercase tracking-wide"
              >
                Get the App →
              </Link>
              <Link
                href="/books"
                className="border border-[#5DB84A]/40 hover:border-[#5DB84A] text-[#8A9E86] hover:text-[#5DB84A] font-bold px-6 py-3 rounded-full transition-colors text-sm uppercase tracking-wide"
              >
                See the Books
              </Link>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <img
                src="/images/ui/Approved%20by%20Dr.%20Icky%20stamp.png"
                alt="Approved by Dr. Icky"
                className="w-14 h-14 object-contain opacity-90"
                style={{ mixBlendMode: "screen" }}
              />
              <p className="text-xs text-[#8A9E86]">
                No subscription. No ads. One-time unlock for premium books.
              </p>
            </div>
          </div>

          {/* EWW meters + Dr. Icky */}
          <div className="flex justify-center md:justify-end items-end gap-6">
            <div className="flex flex-col gap-4">
              {[
                { src: "/images/ui/eww-meter-60.png", label: "EWW 60%" },
                { src: "/images/ui/eww-meter-80.png", label: "EWW 80%" },
                { src: "/images/ui/eww-meter-100.png", label: "EWW 100%" },
              ].map((m) => (
                <img
                  key={m.label}
                  src={m.src}
                  alt={m.label}
                  className="w-28 object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
              ))}
            </div>
            <img
              src="/images/dr-icky/dr-icky-celebrating.png"
              alt="Dr. Icky celebrating"
              className="illustration-character w-44 md:w-52 object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section className="py-16 border-t border-[#1A3D0E]" style={{ backgroundColor: "#0A1205" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="font-creepster text-3xl text-[#E8F5E2] mb-10 text-center"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
          >
            What&apos;s inside the lab
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-xl border border-[#2A4020] p-5"
                style={{ backgroundColor: "#0D1A06" }}
              >
                <img
                  src={f.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-12 h-12 object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
                <h3 className="font-creepster text-base text-[#6ED44F]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>
                  {f.title}
                </h3>
                <p className="text-sm text-[#6A9E66] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP SCREENSHOTS ─────────────────────────────────────── */}
      <section className="py-16 border-t border-[#1A3D0E] overflow-hidden" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5DB84A] text-center mb-2">Inside the app</p>
          <h2
            className="font-creepster text-3xl text-[#E8F5E2] text-center mb-10"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
          >
            The Lab, Opened
          </h2>
          <div className="flex items-end justify-center gap-0">
            <div className="flex-shrink-0 relative z-10" style={{ transform: "rotate(-7deg) translateY(20px) translateX(16px)" }}>
              <img src="/images/ui/APP2.png" alt="Specimen files screen" className="w-36 md:w-44 object-contain drop-shadow-2xl" />
            </div>
            <div className="flex-shrink-0 relative z-20">
              <img src="/images/ui/APP3.png" alt="Home screen" className="w-44 md:w-56 object-contain drop-shadow-2xl" />
            </div>
            <div className="flex-shrink-0 relative z-10" style={{ transform: "rotate(4deg) translateY(14px) translateX(-16px)" }}>
              <img src="/images/ui/APP4.png" alt="Quiz screen" className="w-36 md:w-44 object-contain drop-shadow-2xl" />
            </div>
            <div className="flex-shrink-0 relative z-10 hidden md:block" style={{ transform: "rotate(8deg) translateY(24px) translateX(-24px)" }}>
              <img src="/images/ui/APP5.png" alt="Rewards screen" className="w-32 md:w-40 object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── LAB STAGES ─────────────────────────────────────────── */}
      <section className="py-16 border-t border-[#1A3D0E]" style={{ backgroundColor: "#0A1205" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
              Your progression
            </p>
            <h2
              className="font-creepster text-3xl text-[#E8F5E2]"
              style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
            >
              Five stages of the lab
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {[
              { stage: 1, name: "Kinda Curious",        color: "#5DB84A", desc: "Clean dark interface. You are just getting started." },
              { stage: 2, name: "Properly Revolted",     color: "#7BC86A", desc: "Green haze at the edges. Something is growing." },
              { stage: 3, name: "Super Slimy",           color: "#D48B1A", desc: "Specimen jar elements appear in the background." },
              { stage: 4, name: "Biologically Alarmed",  color: "#E86C5D", desc: "Ambient animations. The lab is reacting to you." },
              { stage: 5, name: "Full Dr. Icky",         color: "#A78BFA", desc: "Maximum lab atmosphere. You have unlocked everything." },
            ].map((s) => (
              <div
                key={s.stage}
                className="flex-1 rounded-xl border border-[#2A4020] p-4 flex flex-col gap-2"
                style={{ backgroundColor: "#0D1A06" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 font-boogaloo"
                  style={{ backgroundColor: s.color }}
                >
                  {s.stage}
                </div>
                <p className="text-sm font-medium" style={{ color: s.color }}>{s.name}</p>
                <p className="text-xs text-[#5A8A56] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────── */}
      <section className="py-16 border-t border-[#1A3D0E]" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="font-creepster text-3xl text-[#E8F5E2] text-center mb-10"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
          >
            Simple pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-6 flex flex-col gap-4 ${
                  tier.primary
                    ? "border-[#5DB84A] border-2"
                    : "border-[#2A4020]"
                }`}
                style={{ backgroundColor: tier.primary ? "#0D2007" : "#0A1205" }}
              >
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: tier.primary ? "#5DB84A" : "#5A8A56" }}
                  >
                    {tier.name}
                  </p>
                  <p
                    className="font-creepster text-4xl"
                    style={{ color: tier.primary ? "#E8F5E2" : "#C8E8C4", fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
                  >
                    {tier.price}
                  </p>
                  {tier.priceNote && (
                    <p className="text-xs mt-1 text-[#5A8A56]">{tier.priceNote}</p>
                  )}
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-[#5DB84A] flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-[#8AAE86]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/books"
                  className={`text-center font-bold px-5 py-3 rounded-full text-sm transition-colors uppercase tracking-wide ${
                    tier.primary
                      ? "bg-[#5DB84A] hover:bg-[#3D8C2A] text-white"
                      : "border border-[#2A4020] hover:border-[#5DB84A] text-[#6A9E66] hover:text-[#5DB84A]"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#5A8A56] mt-6">
            Books include a bundle code that unlocks that book&apos;s content in the app at no extra charge.
          </p>
        </div>
      </section>

      {/* ── DR. ICKY IN ACTION ──────────────────────────────────── */}
      <section className="py-14 border-t border-[#1A3D0E]" style={{ backgroundColor: "#0D0820" }}>
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">From the lab</p>
            <h2
              className="font-creepster text-3xl text-[#E8F5E2]"
              style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
            >
              See Dr. Icky classify a specimen
            </h2>
            <p className="text-sm text-[#8A9E86] leading-relaxed">
              Every specimen you scan triggers a Dr. Icky verdict. The worse the creature, the better the reaction.
            </p>
          </div>
          <video
            src="/videos/classify_basic.mp4"
            controls
            preload="none"
            poster="/images/dr-icky/Dr.%20Icky%20holding%20EWW-meter.png"
            className="rounded-2xl border border-[#5DB84A]/30 w-full"
            style={{ backgroundColor: "#080808" }}
          />
        </div>
      </section>
    </>
  );
}

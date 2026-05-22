import type { Metadata } from "next";
import Link from "next/link";
import EmailSignupForm from "@/components/EmailSignupForm";

export const metadata: Metadata = {
  title: "The App",
  description: "The EWW-niverse app is coming. 75 creatures, a gross-fact quiz engine, an EWW-meter, and daily disgusting science for kids.",
};

const features = [
  {
    icon: "/images/ui/petri%20dish.png",
    title: "75 Creatures",
    description: "Every creature from the Creepy Creatures book, illustrated and classified in your specimen cabinet.",
  },
  {
    icon: "/images/ui/magnifying%20glass.png",
    title: "Gross Fact Quiz",
    description: "Can you name the creature from its grossest fact? One clue. One guess. Dr. Icky is watching.",
  },
  {
    icon: "/images/ui/EWW-meter%2080%25.png",
    title: "The EWW-meter",
    description: "Three tiers: Kinda Revolting, Super Slimy, Total Barf. A viscous animated arc. Not a pie chart.",
  },
  {
    icon: "/images/ui/microscope.png",
    title: "Free Tier Included",
    description: "All 75 Creepy Creatures creatures and the Gross Fact quiz are free, forever. No ads.",
  },
];

const tiers = [
  {
    name: "Free",
    price: "€0",
    features: [
      "75 Creepy Creatures entries",
      "Gross Fact → Name quiz",
      "EWW-meter stages 1–2",
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
      "All 5 progression stages",
      "EWW-meter ranking quiz",
      "Specimen Match quiz",
      "Contamination Event streaks",
      "All future book content drops",
    ],
    cta: "Get the app",
    primary: true,
  },
];

export default function AppPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#1A3D0E] min-h-[70vh] flex items-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "url(/images/ui/slime%20splat.png)",
            backgroundSize: "180px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A]">
              Coming soon — iOS &amp; Android
            </p>
            <h1
              className="text-4xl md:text-5xl text-[#F7F2E4] leading-[1.1]"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              The EWW-niverse App
            </h1>
            <p className="text-[#8A9E86] leading-relaxed max-w-md">
              Daily disgusting science. A quiz that tests whether you can name a creature from its grossest fact. An EWW-meter that fills like a viscous arc, not a progress bar.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#notify"
                className="bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
              >
                Get notified at launch
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <img
                src="/images/ui/Approved%20by%20Dr.%20Icky%20stamp.png"
                alt="Approved by Dr. Icky"
                className="w-14 h-14 object-contain opacity-90"
              />
              <p className="text-xs text-[#8A9E86]">
                No subscription. No ads. One-time unlock.
              </p>
            </div>
          </div>

          {/* EWW meters + Dr. Icky */}
          <div className="flex justify-center md:justify-end items-end gap-6">
            <div className="flex flex-col gap-4">
              {[60, 80, 100].map((pct) => (
                <img
                  key={pct}
                  src={`/images/ui/EWW-meter%20${pct}%25.png`}
                  alt={`EWW-meter ${pct}%`}
                  className="w-28 object-contain"
                />
              ))}
            </div>
            <img
              src="/images/dr-icky/Dr.%20Icky%20shocked%20by%20gross%20goo.png"
              alt="Dr. Icky reacting to something revolting"
              className="w-44 md:w-52 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F7F2E4] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-3xl text-[#1A3D0E] mb-10 text-center"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            What&apos;s inside the lab
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-xl border border-[#C8B89A] bg-[#FDFAF3] p-5"
              >
                <img
                  src={f.icon}
                  alt=""
                  aria-hidden="true"
                  className="w-12 h-12 object-contain"
                />
                <h3
                  className="text-base text-[#1A3D0E]"
                  style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#7A6652] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab stages */}
      <section className="bg-[#FDFAF3] py-16 border-t border-[#C8B89A]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
              Your progression
            </p>
            <h2
              className="text-3xl text-[#1A3D0E]"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              Five stages of the lab
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {[
              { stage: 1, name: "Kinda Curious", desc: "Clean dark interface. You're just getting started." },
              { stage: 2, name: "Properly Revolted", desc: "Green haze at the edges. Something is growing." },
              { stage: 3, name: "Super Slimy", desc: "Specimen jar elements appear in the background." },
              { stage: 4, name: "Biologically Alarmed", desc: "Ambient slow animations. The lab is reacting to you." },
              { stage: 5, name: "Full Dr. Icky", desc: "Maximum lab atmosphere. You have unlocked everything." },
            ].map((s) => (
              <div
                key={s.stage}
                className="flex-1 rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-4 flex flex-col gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#1A3D0E] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {s.stage}
                </div>
                <p
                  className="text-sm font-medium text-[#1A3D0E]"
                  style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                >
                  {s.name}
                </p>
                <p className="text-xs text-[#7A6652] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-[#F7F2E4] py-16 border-t border-[#C8B89A]">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="text-3xl text-[#1A3D0E] text-center mb-10"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            Simple pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-6 flex flex-col gap-4 ${
                  tier.primary
                    ? "border-[#5DB84A] border-2 bg-[#1A3D0E]"
                    : "border-[#C8B89A] bg-[#FDFAF3]"
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
                      tier.primary ? "text-[#5DB84A]" : "text-[#7A6652]"
                    }`}
                  >
                    {tier.name}
                  </p>
                  <p
                    className={`text-4xl ${tier.primary ? "text-[#F7F2E4]" : "text-[#1A3D0E]"}`}
                    style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                  >
                    {tier.price}
                  </p>
                  {tier.priceNote && (
                    <p className={`text-xs mt-1 ${tier.primary ? "text-[#8A9E86]" : "text-[#7A6652]"}`}>
                      {tier.priceNote}
                    </p>
                  )}
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-[#5DB84A] flex-shrink-0 mt-0.5">✓</span>
                      <span className={tier.primary ? "text-[#E6E0CC]" : "text-[#3D2B1F]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#notify"
                  className={`text-center font-semibold px-5 py-3 rounded-full text-sm transition-colors ${
                    tier.primary
                      ? "bg-[#5DB84A] hover:bg-[#3D8C2A] text-white"
                      : "border border-[#C8B89A] hover:border-[#5DB84A] text-[#3D2B1F]"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#7A6652] mt-6">
            Books include a bundle code that unlocks that book&apos;s content in the app at no extra charge.
          </p>
        </div>
      </section>

      {/* Email capture */}
      <section id="notify" className="bg-[#EDE5CE] py-14 border-t border-[#C8B89A]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2
            className="text-2xl text-[#1A3D0E] mb-3"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            Get notified at launch
          </h2>
          <p className="text-sm text-[#7A6652] mb-6 leading-relaxed">
            Leave your email and Dr. Icky will alert you the moment the lab opens.
          </p>
          <EmailSignupForm buttonText="Notify me" />
        </div>
      </section>
    </>
  );
}

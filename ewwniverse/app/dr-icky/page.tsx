import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Icky",
  description: "The origin of Dr. Icky and the EWW-niverse. Classified personnel file — level 3 clearance required.",
};

const callouts = [
  {
    image: "dr-icky-portrait.png",
    imageAlt: "Dr. Icky",
    label: "The Mission",
    heading: "Reality is already weirder than anything you'd make up.",
    body: "Dr. Icky started the EWW-niverse project after decades of fieldwork produced findings too revolting for standard academic journals. The peer reviewers kept asking him to remove the grosser details. He did not remove them. He published them as books for children instead.",
    accent: "#5DB84A",
  },
  {
    image: "dr-icky-warning.png",
    imageAlt: "Dr. Icky warning",
    label: "Accuracy",
    heading: "Every fact has been verified. No exceptions.",
    body: "The real world is already more than sufficient. Dr. Icky does not exaggerate, invent, or embellish. Every creature is real. Every fact is sourced. If it is in the EWW-niverse, it happened — and it is worse than you think.",
    accent: "#D48B1A",
  },
  {
    image: "dr-icky-celebrating.png",
    imageAlt: "Dr. Icky celebrating",
    label: "The Books",
    heading: "Six published. One universe. 450 entries total.",
    body: "Creepy Creatures. Creepy Earth. Creepy Dinosaurs. Creepy Deep Sea. Creepy Skeletons. Creepy Tiny World. Each one a complete field guide to a different corner of the revolting natural world.",
    accent: "#A78BFA",
  },
];

export default function DrIckyPage() {
  return (
    <>
      {/* ── CLASSIFIED HEADER ─────────────────────────────────── */}
      <section className="dark-section relative overflow-hidden py-16" style={{ background: "#080808" }}>
        {/* Lab tile background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(/images/ui/Lab%20tile%20background.png)",
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        />
        {/* Hazard tape top */}
        <img
          src="/images/ui/Hazard%20tape%20strip%2C%20text-free.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 w-full pointer-events-none opacity-40"
          style={{ maxHeight: 20, objectFit: "cover" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4">
            {/* Classified stamp badge */}
            <div className="flex items-center gap-3">
              <img
                src="/images/ui/Classified%20stamp.png"
                alt="Classified"
                className="illustration w-16 h-16 object-contain opacity-90"
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A]">
                Personnel file — level 3 clearance
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl" style={{ color: "#F4EED8" }}>
              Dr. Icky
            </h1>

            <p className="text-[#8A9E86] leading-relaxed max-w-md">
              Field scientist. Specialist in biological phenomena that most respectable scientists prefer not to discuss at dinner. Founder of the EWW-niverse Laboratory.
            </p>

            {/* Mini stats */}
            <div className="flex gap-6 mt-2">
              {[
                { n: "6", label: "Books published" },
                { n: "450", label: "Field entries" },
                { n: "∞", label: "Disgust threshold" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-[#5DB84A]">{s.n}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#8A9E86]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dr. Icky hero pose */}
          <div className="flex justify-center md:justify-end relative">
            <img
              src="/images/ui/eww-lab.png"
              alt="The EWW-niverse lab"
              className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none"
            />
            <img
              src="/images/dr-icky/Dr.%20Icky%20holding%20magnifying%20glass.png"
              alt="Dr. Icky"
              className="illustration-character relative w-56 md:w-72 object-contain"
            />
          </div>
        </div>

        {/* Hazard tape bottom */}
        <img
          src="/images/ui/Hazard%20tape%20strip%2C%20text-free.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 w-full pointer-events-none opacity-40"
          style={{ maxHeight: 20, objectFit: "cover" }}
        />
      </section>

      {/* ── DR. ICKY WELCOME VIDEO ────────────────────────────── */}
      <section className="py-12 border-t border-[#1A3D0E]" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5DB84A] mb-3">From the lab</p>
          <h2
            className="font-creepster text-3xl text-[#E8F5E2] mb-6"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
          >
            Dr. Icky Has a Message For You
          </h2>
          <video
            src="/videos/welcome.mp4"
            controls
            preload="none"
            poster="/images/dr-icky/Dr.%20Icky%20holding%20EWW-meter.png"
            className="rounded-2xl border border-[#5DB84A]/30 w-full mx-auto"
            style={{ backgroundColor: "#080808", maxWidth: 640 }}
          />
          <p className="text-xs text-[#5A8A56] mt-3">Press play. He insists.</p>
        </div>
      </section>

      {/* ── DOSSIER CALLOUTS ──────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "#0A1205" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <img
              src="/images/ui/Evidence%20tape%20strip%2C%20text-free.png"
              alt=""
              aria-hidden="true"
              className="w-48 mx-auto mb-4 object-contain opacity-40"
              style={{ mixBlendMode: "screen" }}
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
              Specimen notes
            </p>
            <h2 className="text-2xl text-[#E8F5E2]">
              Field observations on the subject
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {callouts.map((c, i) => (
              <div
                key={c.label}
                className={`flex flex-col sm:flex-row ${i % 2 === 1 ? "sm:flex-row-reverse" : ""} gap-0 rounded-2xl overflow-hidden border border-[#2A4020]`}
                style={{ background: "#0D1A06" }}
              >
                {/* Illustration */}
                <div className="sm:w-56 flex-shrink-0 flex items-end justify-center pt-6 px-4" style={{ background: "#0D1A06" }}>
                  <img
                    src={`/images/dr-icky/${c.image}`}
                    alt={c.imageAlt}
                    className="illustration-character w-40 h-40 object-contain"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3 p-6 flex-1">
                  {/* Label as stamp-style badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border-2 inline-block"
                      style={{ color: c.accent, borderColor: c.accent }}
                    >
                      {c.label}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl text-[#C8E8C4] leading-snug">
                    {c.heading}
                  </h3>

                  <p className="text-sm text-[#6A9E66] leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE UNIVERSE ──────────────────────────────────────── */}
      <section className="py-12 border-t border-[#1A3D0E] relative overflow-hidden" style={{ background: "#080808" }}>
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Lab%20tile%20background.png)", backgroundSize: "200px", backgroundRepeat: "repeat" }}
        />
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl text-[#E8F5E2]">
              One universe. Multiple surfaces.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                status: "Live",
                statusColor: "#5DB84A",
                name: "The Books",
                desc: "Six published titles. 450 revolting entries. Available on Amazon.",
              },
              {
                status: "Live",
                statusColor: "#5DB84A",
                name: "The Website",
                desc: "You're here. Brand hub, creature catalogue, specimen content engine.",
              },
              {
                status: "Live",
                statusColor: "#5DB84A",
                name: "The App",
                desc: "iOS + Android. 234 specimens. Free tier + Full Lab Pass at €3.99.",
              },
            ].map((item) => (
              <div key={item.name} className="rounded-xl border border-[#2A4020] p-5 flex flex-col gap-3" style={{ backgroundColor: "#0D1A06" }}>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded w-fit border"
                  style={{ color: item.statusColor, borderColor: item.statusColor + "40", backgroundColor: item.statusColor + "18" }}
                >
                  {item.status}
                </span>
                <h3 className="font-creepster text-base text-[#C8E8C4]" style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}>{item.name}</h3>
                <p className="text-xs text-[#6A9E66] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

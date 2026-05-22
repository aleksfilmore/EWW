import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Icky",
  description: "The origin of Dr. Icky and the EWW-niverse. Who is this character and why does he know so much about disgusting creatures?",
};

export default function DrIckyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#F7F2E4] border-b border-[#C8B89A] py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: "url(/images/ui/Parchment%20paper%20texture.png)", backgroundSize: "cover" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
              Meet the scientist
            </p>
            <h1
              className="text-4xl md:text-5xl text-[#1A3D0E] mb-4"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              About Dr. Icky
            </h1>
            <p className="text-[#7A6652] leading-relaxed max-w-md">
              Dr. Icky is a field scientist specializing in biological phenomena that most respectable scientists prefer not to discuss at dinner.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/dr-icky/Dr.%20Icky%20holding%20magnifying%20glass.png"
              alt="Dr. Icky"
              className="w-56 md:w-72 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Lore */}
      <section className="bg-[#FDFAF3] py-14">
        <div className="max-w-4xl mx-auto px-4">

          <div className="rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-6 mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-3">
              Origin
            </p>
            <h2
              className="text-2xl text-[#1A3D0E] mb-3"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              The EWW-niverse
            </h2>
            <p className="text-[#7A6652] leading-relaxed text-sm">
              Dr. Icky started the EWW-niverse project after decades of fieldwork produced findings too revolting for standard academic journals. The peer reviewers kept asking him to remove the grosser details. He did not remove them. He published them as books for children instead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-5">
              <h3
                className="text-lg text-[#1A3D0E] mb-2"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                The mission
              </h3>
              <p className="text-sm text-[#7A6652] leading-relaxed">
                The EWW-niverse exists to prove that reality is stranger than anything a science textbook would risk including. Every creature in the catalog is real. Every fact has been verified. Dr. Icky does not make things up — the world is already too weird for that.
              </p>
            </div>
            <div className="rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-5">
              <h3
                className="text-lg text-[#1A3D0E] mb-2"
                style={{ fontFamily: '"Cantora One", Georgia, serif' }}
              >
                The field notebook
              </h3>
              <p className="text-sm text-[#7A6652] leading-relaxed">
                Dr. Icky keeps detailed field notes on every specimen encountered. The Specimen Files blog is the public-facing version of these notes — edited for clarity, unedited for disgust level.
              </p>
            </div>
          </div>

          {/* Poses gallery */}
          <div className="rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-6">
            <h3
              className="text-lg text-[#1A3D0E] mb-5"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              Dr. Icky in the field
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {[
                "Dr.%20Icky.png",
                "Dr.%20Icky%20holding%20magnifying%20glass.png",
                "Dr.%20Icky%20holding%20a%20clipboard.png",
                "Dr.%20Icky%20giving%20thumbs%20up.png",
                "Dr.%20Icky%20celebrating%20a%20result.png",
                "Dr.%20Icky%20warning%20pose%20with%20raised%20finger.png",
                "Dr.%20Icky%20peeking%20from%20behind%20a%20panel.png",
                "Dr.%20Icky%20holding%20specimen%20jar.png",
                "Dr.%20Icky%20shocked%20by%20gross%20goo.png",
                "Dr.%20Icky%20surrounded%20by%20flies.png",
                "Dr.%20Icky%20with%20nose%20pinched.png",
              ].map((file) => (
                <div
                  key={file}
                  className="bg-[#EDE5CE] rounded-lg aspect-square flex items-center justify-center overflow-hidden p-2"
                >
                  <img
                    src={`/images/dr-icky/${file}`}
                    alt="Dr. Icky illustration"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The brand */}
      <section className="bg-[#EDE5CE] py-12 border-t border-[#C8B89A]">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="text-2xl text-[#1A3D0E] mb-8 text-center"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            One universe, multiple surfaces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                status: "Live",
                statusColor: "#5DB84A",
                statusBg: "#EAF3DE",
                name: "The Books",
                desc: "Six published titles. 450 revolting entries. Available everywhere.",
              },
              {
                status: "Building",
                statusColor: "#854F0B",
                statusBg: "#FAEEDA",
                name: "The Website",
                desc: "You're here. Brand hub, creature catalogue, content engine.",
              },
              {
                status: "Coming",
                statusColor: "#7A6652",
                statusBg: "#F1EFE8",
                name: "The App",
                desc: "iOS + Android. Daily engagement. Free tier + Full Lab Pass.",
              },
            ].map((item) => (
              <div key={item.name} className="rounded-xl border border-[#C8B89A] bg-[#FDFAF3] p-5">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded mb-3 inline-block"
                  style={{ color: item.statusColor, backgroundColor: item.statusBg }}
                >
                  {item.status}
                </span>
                <h3
                  className="text-base text-[#1A3D0E] mb-1"
                  style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                >
                  {item.name}
                </h3>
                <p className="text-xs text-[#7A6652] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import RedeemForm from "@/components/RedeemForm";

export const metadata: Metadata = {
  title: "Redeem a Code",
  description: "Enter the bundle code from your EWW-niverse book to unlock that book's content in the app.",
};

export default function RedeemPage() {
  return (
    <>
      <section className="bg-[#F7F2E4] min-h-[70vh] py-16 flex items-center">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <div className="text-center mb-10">
            <img
              src="/images/ui/Approved%20by%20Dr.%20Icky%20stamp.png"
              alt="Dr. Icky stamp"
              className="w-16 mx-auto mb-5 object-contain"
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
              Book bundle
            </p>
            <h1
              className="text-3xl md:text-4xl text-[#1A3D0E] mb-3"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              Redeem your code
            </h1>
            <p className="text-[#7A6652] leading-relaxed text-sm max-w-md mx-auto">
              Found a code in one of your EWW-niverse books? Enter it here to unlock that book&apos;s content in the app — no purchase required.
            </p>
          </div>

          {/* Code form */}
          <div className="rounded-2xl border border-[#C8B89A] bg-[#FDFAF3] p-8">
            <div className="rounded-xl border border-[#C8B89A] bg-[#EDE5CE] p-4 mb-6">
              <p className="text-xs font-semibold text-[#854F0B] uppercase tracking-wider mb-1">
                App required
              </p>
              <p className="text-sm text-[#7A6652] leading-relaxed">
                You&apos;ll need the EWW-niverse app installed to use your code. The app isn&apos;t available yet — add your email below and we&apos;ll tell you the moment it launches.
              </p>
            </div>

            <RedeemForm />
          </div>

          {/* Help */}
          <div className="mt-6 flex flex-col gap-3">
            <h2
              className="text-base text-[#1A3D0E]"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              Where to find your code
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Creepy Creatures", desc: "Printed on the inside back cover." },
                { title: "All other titles", desc: "Printed on the inside back cover or on a dedicated insert page." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#C8B89A] bg-[#FDFAF3] p-4"
                >
                  <p
                    className="text-sm font-medium text-[#1A3D0E] mb-1"
                    style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-[#7A6652]">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#7A6652] text-center mt-2">
              Lost your code or can&apos;t find it?{" "}
              <a href="mailto:hello@ewwniverse.com" className="text-[#5DB84A] hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

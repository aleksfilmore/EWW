import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Parents",
  description: "COPPA compliance, age guidance, privacy policy, and FAQ for parents and educators using EWW-niverse.",
};

const faqs = [
  {
    q: "What age is EWW-niverse designed for?",
    a: "The books are written for ages 7 and up. The content is gross but never violent, never sexual, and always grounded in real science. The app follows the same standard.",
  },
  {
    q: "How does the app handle my child's data?",
    a: "The app is COPPA-compliant. No personally identifiable information is collected from children. When a child reaches the paywall or wants to save progress, a parent email is required. No date of birth is stored. No child record contains PII.",
  },
  {
    q: "Is there a subscription?",
    a: "No subscription. The Free tier is free, permanently, with no ads. The Full Lab Pass is a one-time purchase. You pay once. There are no recurring charges.",
  },
  {
    q: "Are there ads in the app?",
    a: "No. No ads in any tier. The business model is one-time purchase only.",
  },
  {
    q: "How do book bundle codes work?",
    a: "Each print book includes a unique code. Entering the code in the app unlocks that book's content without any additional purchase. One code per book. Print only.",
  },
  {
    q: "Is the science accurate?",
    a: "Yes. Every creature, fact, and figure has been verified. Dr. Icky does not traffic in exaggeration. The real facts are already more than sufficient.",
  },
  {
    q: "What does COPPA compliance mean for us?",
    a: "COPPA (Children's Online Privacy Protection Act) governs how apps collect data from children under 13. Our app requires verifiable parental consent before any account creation. Children can explore the free tier without creating an account.",
  },
];

export default function ForParentsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#F7F2E4] border-b border-[#C8B89A] py-14">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-2">
              Transparency
            </p>
            <h1
              className="text-4xl md:text-5xl text-[#1A3D0E] mb-4"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              For Parents
            </h1>
            <p className="text-[#7A6652] leading-relaxed max-w-md">
              Everything you need to know about what EWW-niverse is, what it does, what it does not do, and how it handles your family&apos;s information.
            </p>
          </div>
          <div className="flex justify-end">
            <img
              src="/images/dr-icky/Dr.%20Icky%20holding%20a%20clipboard.png"
              alt="Dr. Icky with documentation"
              className="illustration-character w-40 md:w-48 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-[#FDFAF3] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {[
              { icon: "/images/ui/Approved%20by%20Dr.%20Icky%20stamp.png", title: "No ads, ever", desc: "The app is funded by one-time purchases. Advertisements are not part of the model at any tier." },
              { icon: "/images/ui/Do%20Not%20Lick%20stamp.png", title: "No child PII", desc: "Children can explore the free tier without creating an account. Account creation requires a parent email." },
              { icon: "/images/ui/Green%20Risk%20sticker.png", title: "COPPA compliant", desc: "Verifiable parental consent before any account creation. No date of birth collected. No tracking." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3 rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-5">
                <img src={item.icon} alt="" aria-hidden="true" className="illustration w-12 h-12 object-contain" />
                <h3
                  className="text-base text-[#1A3D0E]"
                  style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#7A6652] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Age guidance */}
          <div className="rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-6 mb-6">
            <h2
              className="text-xl text-[#1A3D0E] mb-3"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              Age appropriateness
            </h2>
            <p className="text-sm text-[#7A6652] leading-relaxed mb-3">
              EWW-niverse is designed for children ages 7 and up. The content is:
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Gross — intentionally and specifically",
                "Scientifically accurate — every fact has a source",
                "Never violent in a graphic sense",
                "Never sexual",
                "Never scary in a horror sense — disgusting and scary are different things",
                "Always grounded in real biology, not fabricated for effect",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-[#5DB84A] flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-[#3D2B1F]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <h2
            className="text-2xl text-[#1A3D0E] mb-5"
            style={{ fontFamily: '"Cantora One", Georgia, serif' }}
          >
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-[#C8B89A] bg-[#F7F2E4] p-5">
                <h3
                  className="text-sm font-semibold text-[#1A3D0E] mb-2"
                  style={{ fontFamily: '"Cantora One", Georgia, serif' }}
                >
                  {faq.q}
                </h3>
                <p className="text-sm text-[#7A6652] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 rounded-xl border border-[#C8B89A] bg-[#EDE5CE] p-6 text-center">
            <h3
              className="text-lg text-[#1A3D0E] mb-2"
              style={{ fontFamily: '"Cantora One", Georgia, serif' }}
            >
              Still have questions?
            </h3>
            <p className="text-sm text-[#7A6652] mb-4">
              Dr. Icky&apos;s lab is open to parent inquiries.
            </p>
            <a
              href="mailto:hello@ewwniverse.com"
              className="inline-block bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

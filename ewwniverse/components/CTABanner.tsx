import AppStoreButton from "@/components/AppStoreButton";
import { PRODUCT } from "@/lib/site";

/**
 * Reusable final download CTA — real Dr. Icky + App Store button.
 * Dropped at the bottom of pages to keep the download path repeated.
 */
export default function CTABanner({
  title = "Open the lab.",
  sub = "Free to start. One-time Full Lab Pass to unlock everything. No ads, no subscription, no tracking.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-lab-line)] bg-[var(--color-lab-base)] py-16">
      <div className="lab-haze pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-[1fr_auto]">
        <div>
          <h2
            className="font-creepster neon-text"
            style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif", fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-[var(--color-ink-dim)] leading-relaxed">{sub}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <AppStoreButton />
            <span className="lab-label text-[var(--color-ink-mute)]">
              Available now on {PRODUCT.platform}
            </span>
          </div>
        </div>
        <div className="relative mx-auto w-44 md:w-52">
          <div
            className="absolute inset-0 -z-10 rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(141,231,28,0.35), transparent 70%)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dr-icky-real/dr-icky-hero.webp"
            alt="Dr. Icky, Chief Specimen Scientist"
            loading="lazy"
            decoding="async"
            className="w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

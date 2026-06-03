"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AppStoreButton from "@/components/AppStoreButton";
import PhoneFrame from "@/components/PhoneFrame";
import { PRODUCT } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--color-lab-void)" }}>
      {/* atmospheric lab haze */}
      <div className="lab-haze pointer-events-none absolute inset-0" />
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(141,231,28,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(141,231,28,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, black, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-[52%_48%] md:py-20">
        {/* ── LEFT: copy ─────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col gap-5"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          <motion.p variants={fadeUp} className="lab-label text-[var(--color-neon)]">
            The gross science app for weirdly curious kids
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-creepster"
            style={{
              fontFamily: "var(--font-creepster), 'Cantora One', serif",
              fontSize: "clamp(2.4rem, 5.4vw, 4.4rem)",
              lineHeight: 1.02,
              color: "var(--color-ink)",
            }}
          >
            Scan the specimen.{" "}
            <span className="neon-text">Survive the quiz.</span>{" "}
            Master the EWW-niverse.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-[var(--color-ink-dim)] leading-relaxed"
            style={{ fontSize: "clamp(0.95rem,1.4vw,1.1rem)" }}
          >
            EWW-niverse turns real science facts into a creepy classification game — strange creatures,
            disgusting discoveries, quizzes, EWW scores, and Dr. Icky&apos;s lab verdicts.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <AppStoreButton />
            <Link
              href="#inside"
              className="rounded-full border border-[var(--color-lab-line-bright)] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[var(--color-ink)] transition-colors hover:border-[var(--color-neon)] hover:text-[var(--color-neon)]"
            >
              See what&apos;s inside
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
            {["Free to download", "No ads", "No subscription"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--color-neon)]/40 bg-[var(--color-neon)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-neon)]"
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--color-ink-mute)]">
            <span className="lab-label">Available now on {PRODUCT.platform}</span>
            <span className="hidden sm:inline">·</span>
            <Link href="/books" className="underline-offset-2 hover:text-[var(--color-neon)] hover:underline">
              Explore the books →
            </Link>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: app + real Dr. Icky composition ─────────────── */}
        <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[480px] md:h-[540px]">
          {/* glow */}
          <div
            className="absolute left-1/2 top-1/2 -z-0 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(141,231,28,0.22), transparent 65%)" }}
          />

          {/* back phone — quiz */}
          <motion.div
            className="absolute right-2 top-2 w-40 sm:w-44 md:w-48"
            style={{ rotate: 7 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <PhoneFrame src="/images/screenshots/shot-03.webp" alt="EWW-niverse lab quiz screen" />
          </motion.div>

          {/* front phone — home / today's gross challenge */}
          <motion.div
            className="absolute left-0 top-8 w-44 sm:w-52 md:w-60"
            style={{ rotate: -5 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <PhoneFrame src="/images/screenshots/shot-01.webp" alt="EWW-niverse home screen with today's gross challenge" priority />
          </motion.div>

          {/* real Dr. Icky badge */}
          <motion.div
            className="animate-floaty absolute -bottom-2 right-0 w-32 sm:w-36 md:w-40"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 16 }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-full blur-xl"
                style={{ background: "radial-gradient(circle, rgba(141,231,28,0.4), transparent 70%)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dr-icky-real/dr-icky-hero.webp"
                alt="Dr. Icky — your guide to the EWW-niverse"
                className="w-full rounded-2xl object-cover"
                style={{ border: "1px solid var(--color-lab-line-bright)", boxShadow: "0 18px 50px -18px rgba(0,0,0,0.8)" }}
              />
              <span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black"
                style={{ backgroundColor: "var(--color-neon)" }}
              >
                Dr. Icky
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { creatures, creatureImagePath } from "@/lib/data";

const heroSpecimen = creatures.find((c) => c.name === "Tongue-Eating Louse") ?? creatures[0];

/* ── Variants ─────────────────────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ backgroundColor: "#050A02", minHeight: "92vh" }}
    >
      {/* Background lab illustration — very faint */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src="/images/ui/Illustration%20gross%20science%202.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Slime drip top */}
      <img
        src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: 32,
          objectFit: "cover",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />

      {/* Corner blob — drifts in slowly from top-right */}
      <motion.img
        src="/images/ui/Corner%20slime%20blob%20cluster.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-56 md:w-72 pointer-events-none"
        style={{ transform: "scaleX(-1)", mixBlendMode: "screen" }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />

      {/* Slime blob — drifts in from left */}
      <motion.img
        src="/images/ui/slime-drip-blob.png"
        alt=""
        aria-hidden="true"
        className="absolute top-4 left-4 md:left-8 w-24 md:w-32 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
        initial={{ opacity: 0, rotate: -20, x: -20 }}
        animate={{ opacity: 0.5, rotate: -12, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      />

      {/* Cartoon fly — persistent gentle buzz */}
      <motion.img
        src="/images/ui/cartoon-fly.png"
        alt=""
        aria-hidden="true"
        className="illustration-character absolute top-20 right-8 w-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.7,
          x: [0, 6, -4, 8, 0],
          y: [0, -5, 3, -3, 0],
          rotate: [-15, -12, -18, -10, -15],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 1 },
          x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
      />

      {/* Bug — bottom left scatter */}
      <motion.img
        src="/images/ui/bug.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-24 left-6 w-7 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35, rotate: [20, 26, 20] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.2 },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
      />

      {/* ── Main content grid ──────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* ── LEFT: headline + CTAs ──────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-7 relative z-10"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Lab label */}
            <motion.span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#5DB84A" }}
              variants={fadeUp}
            >
              ☣ Dr. Icky&apos;s Laboratory
            </motion.span>

            {/* Headline */}
            <motion.div className="relative" variants={fadeUp}>
              <img
                src="/images/ui/Big%20slime%20title%20backing%20shape.png"
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none select-none"
                style={{
                  top: "50%",
                  left: "-5%",
                  width: "110%",
                  transform: "translateY(-50%)",
                  opacity: 0.35,
                  mixBlendMode: "screen",
                }}
              />
              <h1
                className="font-creepster leading-[0.95] relative z-10"
                style={{
                  fontFamily:
                    "var(--font-creepster), 'Cantora One', Georgia, serif",
                  fontSize: "clamp(3.2rem, 9vw, 6rem)",
                  color: "#F7F2E4",
                }}
              >
                Nature is
                <br />
                <span
                  style={{
                    color: "#6ED44F",
                    WebkitTextStroke: "1.5px #3D8C2A",
                    paintOrder: "stroke fill",
                  }}
                >
                  Disgusting.
                </span>
                <br />
                <span style={{ color: "#F7F2E4" }}>And we love it.</span>
              </h1>
            </motion.div>

            {/* Body */}
            <motion.p
              className="text-sm md:text-base leading-relaxed max-w-md"
              style={{ color: "rgba(247,242,228,0.55)" }}
              variants={fadeUp}
            >
              Gross science books, weird facts, creepy creatures, and
              slime-soaked missions for curious kids.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link
                  href="/app"
                  className="inline-block bg-[#5DB84A] hover:bg-[#3D8C2A] text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wide shadow-lg"
                >
                  Get the Free Lab Kit
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link
                  href="/books"
                  className="inline-block bg-[#6B3FD4] hover:bg-[#4E2EA8] text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wide shadow-lg"
                >
                  Explore the Books
                </Link>
              </motion.div>
            </motion.div>

            {/* Stamp badges */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={fadeUp}
            >
              {[
                { src: "/images/ui/Approved%20by%20Dr.%20Icky%20stamp.png", alt: "Approved by Dr. Icky" },
                { src: "/images/ui/Do%20Not%20Lick%20stamp.png", alt: "Do not lick" },
                { src: "/images/ui/Junior%20Grossologist%20badge.png", alt: "Junior Grossologist" },
              ].map((stamp, i) => (
                <motion.img
                  key={stamp.alt}
                  src={stamp.src}
                  alt={stamp.alt}
                  className="h-11 w-auto object-contain"
                  style={{ mixBlendMode: "screen" }}
                  initial={{ opacity: 0, rotate: -10, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{
                    delay: 1.1 + i * 0.12,
                    type: "spring",
                    stiffness: 300,
                    damping: 14,
                  }}
                  whileHover={{ rotate: [-3, 4, -2, 0], scale: 1.1 }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: illustrations ────────────────────────────────── */}
          <div className="relative flex justify-center md:justify-end" style={{ minHeight: 480 }}>

            {/* EWWmeter — gentle oscillation */}
            <motion.img
              src="/images/ui/EWWmeter.png"
              alt="The EWW-meter"
              className="absolute top-0 right-0 md:right-4 w-44 md:w-52 object-contain z-10"
              style={{ mixBlendMode: "screen" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: [0, -8, 0],
                rotate: [-1.5, 1.5, -1.5],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.4 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
              }}
            />

            {/* Dr. Icky — main character, floating loop */}
            <motion.img
              src="/images/ui/EWWniverse%20Dr%20Icky.png"
              alt="Dr. Icky — EWW-niverse"
              className="absolute bottom-0 w-60 md:w-72 lg:w-80 object-contain z-20"
              style={{
                mixBlendMode: "screen",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: [0, -12, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }}
            />

            {/* Specimen card — slides in from right, slight tilt */}
            <motion.div
              className="absolute bottom-8 right-0 w-36 md:w-44 rounded-2xl overflow-hidden z-30"
              style={{
                border: "2.5px solid #E53535",
                backgroundColor: "#2A0A0A",
                boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
              }}
              initial={{ opacity: 0, x: 40, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: 4 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 180, damping: 18 }}
              whileHover={{
                rotate: 2,
                scale: 1.04,
                boxShadow: "0 28px 56px rgba(0,0,0,0.9), 0 0 20px rgba(229,53,53,0.3)",
                transition: { type: "spring", stiffness: 300, damping: 16 },
              }}
            >
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  height: 144,
                  backgroundImage:
                    "url(/images/ui/Stained%20notebook%20paper%20background.png)",
                  backgroundSize: "cover",
                  backgroundBlendMode: "multiply",
                  backgroundColor: "#EDE5CE",
                }}
              >
                <span className="absolute top-1.5 left-1.5 text-[8px] font-black uppercase tracking-wide bg-[#6B3FD4] text-white px-1.5 py-0.5 rounded-full z-10">
                  EPIC
                </span>
                <span className="absolute top-1.5 right-1.5 text-[8px] font-black uppercase tracking-wide bg-[#E53535] text-white px-1.5 py-0.5 rounded-full z-10">
                  EWW 100
                </span>
                <img
                  src={creatureImagePath(heroSpecimen.name)}
                  alt={heroSpecimen.name}
                  className="illustration w-full h-full object-contain relative z-0 scale-105"
                />
              </div>
              <div className="p-2.5">
                <p
                  className="font-creepster text-[#F7F2E4] text-xs leading-snug"
                  style={{ fontFamily: "var(--font-creepster), 'Cantora One', serif" }}
                >
                  {heroSpecimen.name}
                </p>
                <p className="text-[8px] text-[#E53535] font-bold uppercase tracking-wider mt-0.5">
                  Specimen #001
                </p>
                <div className="flex gap-0.5 mt-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#E53535" }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slime drip bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/images/ui/Slime%20drip%20bottom%20border.png"
          alt=""
          className="w-full block"
          style={{
            maxHeight: 52,
            objectFit: "cover",
            objectPosition: "bottom",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </section>
  );
}

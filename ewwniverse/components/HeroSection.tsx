"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { creatures, creatureImagePath } from "@/lib/data";

const heroSpecimen = creatures.find((c) => c.name === "Tongue-Eating Louse") ?? creatures[0];

/* ── Variants ─────────────────────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          "url(/images/ui/Stained%20notebook%20paper%20background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#EDE5CE",
        minHeight: "90vh",
      }}
    >
      {/* Left slime border */}
      <img
        src="/images/ui/Side%20slime%20ooze%20border%2C%20left.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 h-full pointer-events-none select-none z-10"
        style={{ width: 28, objectFit: "cover", objectPosition: "top" }}
      />

      {/* Right slime border */}
      <img
        src="/images/ui/Side%20slime%20ooze%20border%2C%20right.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 h-full pointer-events-none select-none z-10"
        style={{ width: 28, objectFit: "cover", objectPosition: "top" }}
      />

      {/* Slime drip top */}
      <img
        src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full pointer-events-none z-20"
        style={{ height: 40, objectFit: "cover" }}
      />

      {/* Gross stain — background texture accent */}
      <img
        src="/images/ui/gross%20stain.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-48 opacity-20 pointer-events-none"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* ── Main grid ─────────────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-10 md:px-12 pt-16 pb-12 md:pt-20 md:pb-10 z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0 items-end">

          {/* ── LEFT: text + CTAs ─────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-5 relative z-10"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Bug decoration — top left, prominent */}
            <motion.div variants={fadeUp}>
              <motion.img
                src="/images/ui/bug.png"
                alt=""
                aria-hidden="true"
                className="w-12 h-12 object-contain"
                style={{ mixBlendMode: "multiply" }}
                animate={{ rotate: [0, 8, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp}>
              <h1
                className="font-creepster leading-[0.9] select-none"
                style={{
                  fontFamily: "var(--font-creepster), 'Cantora One', Georgia, serif",
                }}
              >
                {/* Line 1 */}
                <span
                  className="block"
                  style={{
                    fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
                    color: "#1A2800",
                  }}
                >
                  Nature is
                </span>

                {/* Line 2 — DISGUSTING with slime backing */}
                <span className="relative inline-block">
                  <img
                    src="/images/ui/Big%20slime%20title%20backing%20shape.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute pointer-events-none select-none"
                    style={{
                      top: "50%",
                      left: "-4%",
                      width: "108%",
                      transform: "translateY(-48%)",
                      opacity: 0.55,
                      mixBlendMode: "multiply",
                    }}
                  />
                  <span
                    className="relative z-10 block"
                    style={{
                      fontSize: "clamp(3.8rem, 9vw, 8.5rem)",
                      color: "#4A8A0C",
                      WebkitTextStroke: "2.5px #1A3300",
                      paintOrder: "stroke fill",
                      lineHeight: 0.95,
                    }}
                  >
                    Disgusting.
                  </span>
                </span>

                {/* Line 3 */}
                <span
                  className="block"
                  style={{
                    fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                    color: "#1A2800",
                  }}
                >
                  And we love it.
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-sm md:text-base leading-relaxed max-w-sm"
              style={{ color: "#4A4030", fontWeight: 500 }}
              variants={fadeUp}
            >
              Gross science books, weird facts, creepy creatures, and
              slime-soaked missions for curious kids.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-3 items-center" variants={fadeUp}>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 14 }}
              >
                <Link
                  href="/app"
                  className="inline-flex items-center gap-2 font-creepster text-white text-sm uppercase tracking-wide px-6 py-3 rounded-full border-4 shadow-md"
                  style={{
                    fontFamily: "var(--font-creepster), serif",
                    fontSize: "1rem",
                    backgroundColor: "#5DB84A",
                    borderColor: "#2D6018",
                    boxShadow: "0 4px 0 #2D6018, 0 6px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <img
                    src="/images/ui/EWW%20gross.png"
                    alt=""
                    aria-hidden="true"
                    className="w-5 h-5 object-contain"
                    style={{ mixBlendMode: "screen" }}
                  />
                  Get the Free Lab Kit
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 14 }}
              >
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 font-creepster text-white text-sm uppercase tracking-wide px-6 py-3 rounded-full border-4 shadow-md"
                  style={{
                    fontFamily: "var(--font-creepster), serif",
                    fontSize: "1rem",
                    backgroundColor: "#6B3FD4",
                    borderColor: "#3D1A8C",
                    boxShadow: "0 4px 0 #3D1A8C, 0 6px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  Explore the Books
                  <span style={{ fontSize: "1.1rem" }}>›</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Flask decoration bottom-left */}
            <motion.div variants={fadeUp} className="mt-2">
              <motion.img
                src="/images/ui/petri%20dish.png"
                alt=""
                aria-hidden="true"
                className="w-14 h-14 object-contain"
                style={{ mixBlendMode: "multiply" }}
                animate={{ rotate: [-3, 4, -3], y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Dr. Icky HUGE + speech bubble ──────────────── */}
          <div
            className="relative hidden md:flex flex-col items-center"
            style={{ width: 480, flexShrink: 0 }}
          >
            {/* Speech bubble — top right */}
            <motion.div
              className="absolute top-0 right-4 z-30"
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 260, damping: 16 }}
            >
              <div
                className="relative px-4 py-3 rounded-2xl text-center max-w-[160px]"
                style={{
                  backgroundColor: "#FFFFF0",
                  border: "3px solid #4A8A0C",
                  boxShadow: "2px 3px 0 #2D6018",
                }}
              >
                <p className="text-[11px] font-bold text-[#1A2800] leading-tight">
                  Hi! I&apos;m{" "}
                  <span
                    className="font-creepster text-sm"
                    style={{
                      color: "#4A8A0C",
                      fontFamily: "var(--font-creepster), serif",
                    }}
                  >
                    DR. ICKY
                  </span>
                </p>
                <p className="text-[10px] text-[#4A4030] mt-0.5 leading-tight">
                  Your guide to the EWW-niverse!
                </p>
                {/* Triangle pointer pointing down-left */}
                <div
                  className="absolute"
                  style={{
                    bottom: -14,
                    left: 20,
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "14px solid #4A8A0C",
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    bottom: -11,
                    left: 22,
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: "12px solid #FFFFF0",
                  }}
                />
              </div>
            </motion.div>

            {/* Magnifying glass — mid right */}
            <motion.img
              src="/images/ui/magnifying%20glass.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-20 right-0 w-24 object-contain z-20"
              style={{ mixBlendMode: "multiply" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, rotate: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.8 },
                x: { duration: 0.5, delay: 0.8 },
                rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }}
            />

            {/* EWWmeter — left of Dr. Icky */}
            <motion.img
              src="/images/ui/EWWmeter.png"
              alt="The EWW-meter"
              className="absolute top-10 left-0 w-36 object-contain z-20"
              style={{ mixBlendMode: "multiply" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: [-2, 2, -2],
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.5 },
                x: { duration: 0.5, delay: 0.5 },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Dr. Icky — THE MAIN CHARACTER, massive */}
            <motion.img
              src="/images/ui/Dr.%20Icky%20celebrating%20a%20result.png"
              alt="Dr. Icky — your guide to the EWW-niverse"
              className="relative z-10 object-contain"
              style={{
                width: 440,
                maxWidth: "100%",
                mixBlendMode: "multiply",
                marginTop: 48,
              }}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                scale: 1,
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.15 },
                scale: { duration: 0.7, delay: 0.15 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }}
            />
          </div>
        </div>
      </div>

      {/* Slime drip bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        aria-hidden="true"
      >
        <img
          src="/images/ui/Slime%20drip%20bottom%20border.png"
          alt=""
          className="w-full block"
          style={{ maxHeight: 52, objectFit: "cover", objectPosition: "bottom" }}
        />
      </div>
    </section>
  );
}

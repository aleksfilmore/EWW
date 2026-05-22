"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ── Animation helpers ────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

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
        minHeight: "calc(100vh - 88px)",
      }}
    >
      {/* Sketch science background — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.06, mixBlendMode: "multiply" }}
      >
        <img
          src="/images/ui/Illustration%20gross%20science%202.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Slime drip — top */}
      <img
        src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full pointer-events-none z-20"
        style={{ height: 48, objectFit: "cover" }}
      />

      {/* Side slime — left */}
      <img
        src="/images/ui/Side%20slime%20ooze%20border%2C%20left.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 h-full pointer-events-none z-10"
        style={{ width: 24, objectFit: "cover" }}
      />

      {/* ── Layout: text left + Dr. Icky absolute right ───────────── */}
      <div
        className="relative max-w-7xl mx-auto px-6 md:px-12 z-10"
        style={{ minHeight: "calc(100vh - 88px)", display: "flex", alignItems: "center" }}
      >
        {/* ── LEFT: headline + CTAs (max 48% width) ──────────────── */}
        <div className="relative z-20 w-full md:max-w-[48%] flex flex-col gap-5 py-16">

          {/* Beetle — top scatter, prominent */}
          <motion.img
            src="/images/ui/bug.png"
            alt=""
            aria-hidden="true"
            className="w-14 h-14 object-contain"
            style={{ mixBlendMode: "multiply" }}
            {...fadeUp(0.1)}
            animate={{ rotate: [0, 10, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── HEADLINE ─────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.2)} className="flex flex-col leading-none gap-1">

            {/* Line 1 */}
            <span
              className="font-creepster block"
              style={{
                fontFamily: "var(--font-creepster), 'Cantora One', Georgia, serif",
                fontSize: "clamp(2.8rem, 6.5vw, 6rem)",
                color: "#1A2800",
                lineHeight: 1,
              }}
            >
              Nature is
            </span>

            {/* Line 2 — DISGUSTING. massive + slime treatment */}
            <span className="relative block" style={{ lineHeight: 1 }}>
              {/* Slime backing */}
              <img
                src="/images/ui/Big%20slime%20title%20backing%20shape.png"
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none select-none"
                style={{
                  top: "50%",
                  left: "-3%",
                  width: "106%",
                  transform: "translateY(-50%)",
                  opacity: 0.65,
                  mixBlendMode: "multiply",
                }}
              />
              <span
                className="font-creepster relative z-10 block"
                style={{
                  fontFamily: "var(--font-creepster), 'Cantora One', Georgia, serif",
                  fontSize: "clamp(4rem, 10.5vw, 10rem)",
                  color: "#3D7A08",
                  WebkitTextStroke: "3px #1A3300",
                  paintOrder: "stroke fill",
                  lineHeight: 1,
                  textShadow: "0 6px 0 rgba(26,51,0,0.35)",
                }}
              >
                Disgusting.
              </span>
            </span>

            {/* Line 3 */}
            <span
              className="font-creepster block"
              style={{
                fontFamily: "var(--font-creepster), 'Cantora One', Georgia, serif",
                fontSize: "clamp(2rem, 4.8vw, 4.5rem)",
                color: "#1A2800",
                lineHeight: 1.05,
              }}
            >
              And we love it.
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "#4A4030", maxWidth: 380, fontWeight: 500 }}
            {...fadeUp(0.35)}
          >
            Gross science books, weird facts, creepy creatures, and
            slime-soaked missions for curious kids.
          </motion.p>

          {/* ── CTAs ─────────────────────────────────────────────── */}
          <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.45)}>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 14 }}
            >
              <Link
                href="/app"
                className="inline-flex items-center gap-2 text-white uppercase tracking-wide px-7 py-3.5 rounded-full border-4 font-creepster"
                style={{
                  fontFamily: "var(--font-creepster), serif",
                  fontSize: "1rem",
                  backgroundColor: "#5DB84A",
                  borderColor: "#2D6018",
                  boxShadow: "0 5px 0 #2D6018, 0 8px 16px rgba(0,0,0,0.25)",
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
                className="inline-flex items-center gap-2 text-white uppercase tracking-wide px-7 py-3.5 rounded-full border-4 font-creepster"
                style={{
                  fontFamily: "var(--font-creepster), serif",
                  fontSize: "1rem",
                  backgroundColor: "#6B3FD4",
                  borderColor: "#3D1A8C",
                  boxShadow: "0 5px 0 #3D1A8C, 0 8px 16px rgba(0,0,0,0.25)",
                }}
              >
                Explore the Books ›
              </Link>
            </motion.div>
          </motion.div>

          {/* Flask decoration */}
          <motion.img
            src="/images/ui/petri%20dish.png"
            alt=""
            aria-hidden="true"
            className="w-16 h-16 object-contain mt-1"
            style={{ mixBlendMode: "multiply" }}
            {...fadeUp(0.55)}
            animate={{ rotate: [-4, 4, -4], y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* ── RIGHT: Dr. Icky — absolute, fills right 55% ─────────── */}
        <div
          className="hidden md:block absolute right-0 bottom-0 z-10"
          style={{ width: "58%", height: "100%" }}
        >
          {/* Speech bubble */}
          <motion.div
            className="absolute z-30"
            style={{ top: "8%", right: "4%" }}
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 16 }}
          >
            <div
              className="relative px-5 py-4 rounded-2xl text-center"
              style={{
                backgroundColor: "#FFFFF0",
                border: "3.5px solid #3D7A08",
                boxShadow: "3px 4px 0 #1A3300",
                maxWidth: 176,
              }}
            >
              <p className="text-[12px] font-bold text-[#1A2800] leading-snug">
                Hi! I&apos;m{" "}
                <span
                  className="font-creepster"
                  style={{
                    color: "#3D7A08",
                    fontFamily: "var(--font-creepster), serif",
                    fontSize: "1.05rem",
                  }}
                >
                  DR. ICKY
                </span>
              </p>
              <p className="text-[11px] text-[#4A4030] mt-1 leading-snug">
                Your guide to the EWW-niverse!
              </p>
              {/* Arrow pointer bottom-left */}
              <div
                className="absolute"
                style={{
                  bottom: -16,
                  left: 24,
                  width: 0,
                  height: 0,
                  borderLeft: "11px solid transparent",
                  borderRight: "11px solid transparent",
                  borderTop: "16px solid #3D7A08",
                }}
              />
              <div
                className="absolute"
                style={{
                  bottom: -11,
                  left: 27,
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "12px solid #FFFFF0",
                }}
              />
            </div>
          </motion.div>

          {/* Magnifying glass — right side, mid */}
          <motion.img
            src="/images/ui/magnifying%20glass.png"
            alt=""
            aria-hidden="true"
            className="absolute object-contain z-20"
            style={{
              right: "2%",
              bottom: "18%",
              width: 130,
              mixBlendMode: "multiply",
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, rotate: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 },
              x: { duration: 0.5, delay: 0.6 },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Dr. Icky — THE STAR. Bottom-anchored, fills the column */}
          <motion.img
            src="/images/ui/Dr.%20Icky%20celebrating%20a%20result.png"
            alt="Dr. Icky — your guide to the EWW-niverse"
            className="absolute object-contain object-bottom"
            style={{
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              height: "92%",
              maxHeight: 700,
              width: "auto",
              maxWidth: "none",
              mixBlendMode: "multiply",
            }}
            initial={{ opacity: 0, y: 60, scale: 0.88 }}
            animate={{
              opacity: 1,
              y: [0, -14, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.1 },
              scale: { duration: 0.8, delay: 0.1, ease: "easeOut" },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              },
            }}
          />
        </div>
      </div>

      {/* Slime drip — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
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

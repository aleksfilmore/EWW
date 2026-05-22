"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const HERO_H = "calc(100vh - 88px)";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: HERO_H,
        /* Clean notebook paper: cream base + faint horizontal rules + red margin */
        backgroundColor: "#F4EED8",
        backgroundImage: [
          "repeating-linear-gradient(transparent 0px, transparent 31px, rgba(150,170,130,0.3) 31px, rgba(150,170,130,0.3) 32px)",
          "linear-gradient(90deg, transparent 88px, rgba(210,100,100,0.18) 88px, rgba(210,100,100,0.18) 90px, transparent 90px)",
        ].join(", "),
      }}
    >
      {/* Slime drip — top (keeps the gross energy without background noise) */}
      <img
        src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png"
        alt="" aria-hidden="true"
        className="absolute top-0 left-0 w-full pointer-events-none z-20"
        style={{ height: 44, objectFit: "cover" }}
      />

      {/* Side slime — left */}
      <img
        src="/images/ui/Side%20slime%20ooze%20border%2C%20left.png"
        alt="" aria-hidden="true"
        className="absolute top-0 left-0 h-full pointer-events-none z-10"
        style={{ width: 20, objectFit: "cover" }}
      />

      {/* ── SECTION-LEVEL GRID ─────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: HERO_H,
        }}
      >
        {/* ── LEFT: text ────────────────────────────────────────────── */}
        <div
          className="flex items-center py-20 relative z-20"
          style={{
            paddingLeft: "clamp(2.5rem, calc((100vw - 80rem)/2 + 3rem), 7rem)",
            paddingRight: "1.5rem",
          }}
        >
          <motion.div
            className="flex flex-col gap-4 w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
          >
            {/* Bug */}
            <motion.img
              src="/images/ui/bug.png" alt="" aria-hidden="true"
              className="w-12 h-12 object-contain"
              style={{ mixBlendMode: "multiply" }}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              animate={{ rotate: [0, 10, -5, 0] }}
              transition={{ rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
            />

            {/* ── HEADLINE ──────────────────────────────────────────── */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              {/* NATURE IS */}
              <div
                className="uppercase"
                style={{
                  fontFamily: "var(--font-boogaloo), cursive",
                  fontSize: "clamp(2.4rem, 5vw, 5rem)",
                  color: "#111800",
                  lineHeight: 1.05,
                }}
              >
                Nature is
              </div>

              {/* DISGUSTING. */}
              <div className="relative" style={{ lineHeight: 1, margin: "0.05em 0" }}>
                <img
                  src="/images/ui/Big%20slime%20title%20backing%20shape.png"
                  alt="" aria-hidden="true"
                  className="absolute pointer-events-none select-none"
                  style={{
                    top: "50%", left: "-3%", width: "106%",
                    transform: "translateY(-50%)",
                    opacity: 0.75, mixBlendMode: "multiply",
                  }}
                />
                <div
                  className="relative z-10 uppercase"
                  style={{
                    fontFamily: "var(--font-boogaloo), cursive",
                    fontSize: "clamp(3.6rem, 8vw, 8.5rem)",
                    color: "#3D7A08",
                    WebkitTextStroke: "3px #1A3300",
                    paintOrder: "stroke fill",
                    lineHeight: 1,
                    textShadow: "0 5px 0 rgba(26,51,0,0.25)",
                  }}
                >
                  Disgusting.
                </div>
              </div>

              {/* AND WE LOVE IT. */}
              <div
                className="uppercase"
                style={{
                  fontFamily: "var(--font-boogaloo), cursive",
                  fontSize: "clamp(1.8rem, 3.8vw, 3.8rem)",
                  color: "#111800",
                  lineHeight: 1.1,
                }}
              >
                And we love it.
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              style={{ color: "#5A5040", maxWidth: 340, fontSize: "0.95rem", lineHeight: 1.65 }}
            >
              Gross science books, weird facts, creepy creatures, and slime-soaked missions for curious kids.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              {[
                {
                  href: "/app", label: "Get the Free Lab Kit",
                  bg: "#5DB84A", border: "#2D6018", shadow: "#2D6018",
                  icon: true,
                },
                {
                  href: "/books", label: "Explore the Books ›",
                  bg: "#6B3FD4", border: "#3D1A8C", shadow: "#3D1A8C",
                  icon: false,
                },
              ].map((b) => (
                <motion.div key={b.href}
                  whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 380, damping: 14 }}
                >
                  <Link
                    href={b.href}
                    className="inline-flex items-center gap-2 text-white uppercase rounded-full border-4 px-6 py-3"
                    style={{
                      fontFamily: "var(--font-creepster), serif",
                      fontSize: "0.95rem",
                      letterSpacing: "0.05em",
                      backgroundColor: b.bg,
                      borderColor: b.border,
                      boxShadow: `0 5px 0 ${b.shadow}`,
                    }}
                  >
                    {b.icon && (
                      <img src="/images/ui/EWW%20gross.png" alt="" aria-hidden="true"
                        className="w-5 h-5 object-contain" style={{ mixBlendMode: "screen" }} />
                    )}
                    {b.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Petri dish */}
            <motion.img
              src="/images/ui/petri%20dish.png" alt="" aria-hidden="true"
              className="w-14 h-14 object-contain"
              style={{ mixBlendMode: "multiply" }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT: Dr. Icky — flex, bottom-aligned, no clipping ──── */}
        <div
          className="hidden md:flex items-end justify-center relative"
          style={{ paddingTop: 44 /* slime border height */ }}
        >
          {/* Speech bubble */}
          <motion.div
            className="absolute z-30"
            style={{ top: "8%", right: "6%" }}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 240, damping: 16 }}
          >
            <div
              className="relative px-4 py-3 rounded-2xl text-center"
              style={{
                backgroundColor: "#FFFFE8",
                border: "3px solid #3D7A08",
                boxShadow: "3px 3px 0 #1A3300",
                maxWidth: 160,
              }}
            >
              <p className="text-[11px] font-bold text-[#1A2800] leading-snug">
                Hi! I&apos;m{" "}
                <span style={{ fontFamily: "var(--font-boogaloo), cursive", color: "#3D7A08", fontSize: "1rem" }}>
                  DR. ICKY
                </span>
              </p>
              <p className="text-[10px] text-[#5A5040] mt-0.5 leading-snug">
                Your guide to the EWW-niverse!
              </p>
              <div className="absolute" style={{ bottom: -15, left: 20, width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "15px solid #3D7A08" }} />
              <div className="absolute" style={{ bottom: -11, left: 23, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "11px solid #FFFFE8" }} />
            </div>
          </motion.div>

          {/* Magnifying glass */}
          <motion.img
            src="/images/ui/magnifying%20glass.png" alt="" aria-hidden="true"
            className="absolute object-contain z-20"
            style={{ right: "3%", bottom: "22%", width: 110, mixBlendMode: "multiply" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, rotate: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.8 },
              x: { duration: 0.5, delay: 0.8 },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* DR. ICKY — naturally-flowing flex item, fills column height */}
          <motion.img
            src="/images/ui/Dr.%20Icky%20celebrating%20a%20result.png"
            alt="Dr. Icky — your guide to the EWW-niverse"
            style={{
              height: "90%",
              width: "auto",
              maxWidth: "none",
              objectFit: "contain",
              objectPosition: "bottom",
              mixBlendMode: "multiply",
              flexShrink: 0,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 0.7, delay: 0.1 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
            }}
          />
        </div>
      </div>

      {/* Slime drip — bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20" aria-hidden="true">
        <img src="/images/ui/Slime%20drip%20bottom%20border.png" alt=""
          className="w-full block"
          style={{ maxHeight: 52, objectFit: "cover", objectPosition: "bottom" }} />
      </div>
    </section>
  );
}

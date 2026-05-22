"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    /*  Dark "desk" behind the tilted notebook  */
    <div
      style={{
        backgroundColor: "#080808",
        padding: "28px 0 36px",
        overflow: "hidden",
      }}
    >
      {/* ── THE NOTEBOOK — tilted like a real book on a desk ─────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#F4EED8",
          backgroundImage: [
            "repeating-linear-gradient(transparent 0px,transparent 31px,rgba(150,170,130,0.28) 31px,rgba(150,170,130,0.28) 32px)",
            "linear-gradient(90deg,transparent 88px,rgba(210,100,100,0.15) 88px,rgba(210,100,100,0.15) 90px,transparent 90px)",
          ].join(","),
          transform: "rotate(-1.5deg)",
          transformOrigin: "center center",
          margin: "0 -4%",
        }}
      >
        {/* CSS top edge */}
        <div
          className="absolute top-0 left-0 w-full z-20 pointer-events-none"
          style={{ height: 6, backgroundColor: "#3D7A08", opacity: 0.7 }}
        />

        {/* ── RESPONSIVE LAYOUT ───────────────────────────────────── */}
        {/* Mobile: single column stack | Desktop: 44/56 grid         */}
        <div
          className="grid grid-cols-1 md:grid-cols-[38%_62%]"
          style={{ minHeight: "86vh" }}
        >

          {/* ── LEFT: text ─────────────────────────────────────────── */}
          <div
            className="flex items-center py-14 md:py-20 relative z-10 order-1"
            style={{
              paddingLeft: "clamp(3.5rem,10vw,10rem)",
              paddingRight: "1rem",
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
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                style={{ mixBlendMode: "multiply" }}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                animate={{ rotate: [0, 10, -5, 0] }}
                transition={{ rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
              />

              {/* ── HEADLINE ──────────────────────────────────────── */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              >
                <div className="uppercase" style={{
                  fontFamily: "var(--font-boogaloo),cursive",
                  fontSize: "clamp(1.9rem,4.2vw,5rem)",
                  color: "#111800", lineHeight: 1.05,
                }}>
                  Nature is
                </div>

                <div className="uppercase" style={{
                  fontFamily: "var(--font-boogaloo),cursive",
                  fontSize: "clamp(3rem,7vw,8rem)",
                  color: "#5DB80A",
                  WebkitTextStroke: "3px #1A3300",
                  paintOrder: "stroke fill",
                  lineHeight: 1,
                  textShadow: [
                    "0 4px 0 #1A3300",
                    "0 8px 16px rgba(26,51,0,0.25)",
                  ].join(","),
                  margin: "0.04em 0",
                  display: "block",
                }}>
                  Disgusting.
                </div>

                <div className="uppercase" style={{
                  fontFamily: "var(--font-boogaloo),cursive",
                  fontSize: "clamp(1.35rem,3.2vw,3.8rem)",
                  color: "#111800", lineHeight: 1.1,
                }}>
                  And we love it.
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                style={{ color: "#5A5040", maxWidth: 300, fontSize: "clamp(0.82rem,1.4vw,0.95rem)", lineHeight: 1.65 }}
              >
                Gross science books, weird facts, creepy creatures, and slime-soaked missions for curious kids.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                {[
                  { href: "/app", label: "Get the Free Lab Kit", bg: "#5DB84A", border: "#2D6018", icon: true },
                  { href: "/books", label: "Explore the Books ›", bg: "#6B3FD4", border: "#3D1A8C", icon: false },
                ].map((b) => (
                  <motion.div key={b.href}
                    whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 380, damping: 14 }}
                  >
                    <Link href={b.href}
                      className="inline-flex items-center gap-2 text-white uppercase rounded-full border-4 px-5 py-2.5 md:px-6 md:py-3"
                      style={{
                        fontFamily: "var(--font-creepster),serif",
                        fontSize: "clamp(0.78rem,1.2vw,0.95rem)",
                        letterSpacing: "0.05em",
                        backgroundColor: b.bg,
                        borderColor: b.border,
                        boxShadow: `0 5px 0 ${b.border}`,
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
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                style={{ mixBlendMode: "multiply" }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Dr. Icky ─────────────────────────────────────── */}
          {/* On mobile: 56vw tall panel below text                      */}
          {/* On desktop: flex items-end, fills grid cell height          */}
          <div
            className="relative flex items-end justify-start order-2"
            style={{
              paddingTop: 44,
              minHeight: "56vw",
              marginLeft: "-2%",   /* bridge remaining gap between text and Dr. Icky */
            }}
          >
            {/* Only show decorative elements on desktop */}
            {/* Speech bubble */}
            <motion.div
              className="absolute z-30 hidden md:block"
              style={{ top: "8%", right: "14%" }}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 240, damping: 16 }}
            >
              <div
                className="relative px-4 py-3 rounded-2xl text-center"
                style={{
                  backgroundColor: "#FFFFE8",
                  border: "3px solid #3D7A08",
                  boxShadow: "3px 3px 0 #1A3300",
                  maxWidth: 152,
                }}
              >
                <p className="text-[11px] font-bold text-[#1A2800] leading-snug">
                  Hi! I&apos;m{" "}
                  <span style={{ fontFamily: "var(--font-boogaloo),cursive", color: "#3D7A08", fontSize: "1rem" }}>
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
              className="absolute object-contain z-20 hidden md:block"
              style={{ right: "2%", bottom: "18%", width: 90, mixBlendMode: "multiply" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.85, x: 0, rotate: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.8 },
                x: { duration: 0.5, delay: 0.8 },
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Dr. Icky — visible on all breakpoints */}
            <motion.img
              src="/images/ui/Dr.%20Icky%20celebrating%20a%20result.png"
              alt="Dr. Icky — your guide to the EWW-niverse"
              className="relative z-10"
              style={{
                height: "100%",
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

        {/* CSS bottom edge */}
        <div
          className="absolute bottom-0 left-0 w-full z-20 pointer-events-none"
          style={{ height: 6, backgroundColor: "#3D7A08", opacity: 0.7 }}
        />
      </section>
    </div>
  );
}

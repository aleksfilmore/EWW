"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
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
        backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#EDE5CE",
        minHeight: "calc(100vh - 88px)",
      }}
    >
      {/* Sketch science overlay — subtle background depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.07, mixBlendMode: "multiply" }}
      >
        <img src="/images/ui/Illustration%20gross%20science%202.png" alt=""
          className="w-full h-full object-cover" />
      </div>

      {/* Slime drip — top */}
      <img src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png" alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full pointer-events-none z-20"
        style={{ height: 48, objectFit: "cover" }} />

      {/* Side slime — left */}
      <img src="/images/ui/Side%20slime%20ooze%20border%2C%20left.png" alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 h-full pointer-events-none z-10"
        style={{ width: 22, objectFit: "cover" }} />

      {/* ── SECTION-LEVEL GRID — no container constraint ──────────── */}
      {/*  Left 50% = text   |   Right 50% = Dr. Icky full height     */}
      <div
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          minHeight: "calc(100vh - 88px)",
        }}
      >

        {/* ── LEFT: text, padded to align with max-w container ────── */}
        <div
          className="flex items-center py-20 relative z-20"
          style={{
            paddingLeft: "clamp(2rem, calc((100vw - 80rem) / 2 + 3rem), 8rem)",
            paddingRight: "2rem",
          }}
        >
          <motion.div
            className="flex flex-col gap-5 w-full"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          >

            {/* Bug */}
            <motion.img
              src="/images/ui/bug.png" alt="" aria-hidden="true"
              className="w-14 h-14 object-contain"
              style={{ mixBlendMode: "multiply" }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              animate={{ rotate: [0, 10, -5, 0] }}
              transition={{ rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
            />

            {/* ── HEADLINE ────────────────────────────────────────── */}
            <motion.div
              className="flex flex-col"
              style={{ lineHeight: 1, gap: "0.1em" }}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            >
              {/* NATURE IS */}
              <span
                className="block uppercase"
                style={{
                  fontFamily: "var(--font-boogaloo), 'Boogaloo', cursive",
                  fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
                  color: "#111800",
                  lineHeight: 1.05,
                }}
              >
                Nature is
              </span>

              {/* DISGUSTING. */}
              <span className="relative block">
                <img
                  src="/images/ui/Big%20slime%20title%20backing%20shape.png"
                  alt="" aria-hidden="true"
                  className="absolute pointer-events-none select-none"
                  style={{
                    top: "50%", left: "-2%", width: "104%",
                    transform: "translateY(-50%)",
                    opacity: 0.7, mixBlendMode: "multiply",
                  }}
                />
                <span
                  className="relative z-10 block uppercase"
                  style={{
                    fontFamily: "var(--font-boogaloo), 'Boogaloo', cursive",
                    fontSize: "clamp(3.8rem, 8.5vw, 9rem)",
                    color: "#3D7A08",
                    WebkitTextStroke: "3px #1A3300",
                    paintOrder: "stroke fill",
                    lineHeight: 1,
                    textShadow: "0 5px 0 rgba(26,51,0,0.28)",
                  }}
                >
                  Disgusting.
                </span>
              </span>

              {/* AND WE LOVE IT. */}
              <span
                className="block uppercase"
                style={{
                  fontFamily: "var(--font-boogaloo), 'Boogaloo', cursive",
                  fontSize: "clamp(1.9rem, 4vw, 4rem)",
                  color: "#111800",
                  lineHeight: 1.05,
                }}
              >
                And we love it.
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              style={{ color: "#4A4030", maxWidth: 360, fontWeight: 500, fontSize: "0.95rem", lineHeight: 1.6 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              Gross science books, weird facts, creepy creatures, and slime-soaked missions for curious kids.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 14 }}>
                <Link href="/app"
                  className="inline-flex items-center gap-2 text-white uppercase px-6 py-3 rounded-full border-4"
                  style={{
                    fontFamily: "var(--font-creepster), serif",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    backgroundColor: "#5DB84A",
                    borderColor: "#2D6018",
                    boxShadow: "0 5px 0 #2D6018",
                  }}
                >
                  <img src="/images/ui/EWW%20gross.png" alt="" aria-hidden="true"
                    className="w-5 h-5 object-contain" style={{ mixBlendMode: "screen" }} />
                  Get the Free Lab Kit
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 14 }}>
                <Link href="/books"
                  className="inline-flex items-center gap-2 text-white uppercase px-6 py-3 rounded-full border-4"
                  style={{
                    fontFamily: "var(--font-creepster), serif",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    backgroundColor: "#6B3FD4",
                    borderColor: "#3D1A8C",
                    boxShadow: "0 5px 0 #3D1A8C",
                  }}
                >
                  Explore the Books ›
                </Link>
              </motion.div>
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

        {/* ── RIGHT: Dr. Icky — fills the column, bottom-anchored ──── */}
        <div className="relative hidden md:block" style={{ overflow: "visible" }}>

          {/* Speech bubble */}
          <motion.div
            className="absolute z-30"
            style={{ top: "6%", right: "8%" }}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 240, damping: 16 }}
          >
            <div
              className="relative px-4 py-3 rounded-2xl text-center"
              style={{
                backgroundColor: "#FFFFF0",
                border: "3px solid #3D7A08",
                boxShadow: "3px 3px 0 #1A3300",
                maxWidth: 164,
              }}
            >
              <p className="text-[11px] font-bold text-[#1A2800] leading-snug">
                Hi! I&apos;m{" "}
                <span style={{ fontFamily: "var(--font-boogaloo), cursive", color: "#3D7A08", fontSize: "1.05rem" }}>
                  DR. ICKY
                </span>
              </p>
              <p className="text-[10px] text-[#4A4030] mt-0.5 leading-snug">
                Your guide to the EWW-niverse!
              </p>
              {/* pointer */}
              <div className="absolute" style={{ bottom: -15, left: 22, width: 0, height: 0,
                borderLeft: "10px solid transparent", borderRight: "10px solid transparent",
                borderTop: "15px solid #3D7A08" }} />
              <div className="absolute" style={{ bottom: -11, left: 25, width: 0, height: 0,
                borderLeft: "7px solid transparent", borderRight: "7px solid transparent",
                borderTop: "11px solid #FFFFF0" }} />
            </div>
          </motion.div>

          {/* Magnifying glass */}
          <motion.img
            src="/images/ui/magnifying%20glass.png" alt="" aria-hidden="true"
            className="absolute object-contain z-20"
            style={{ right: "4%", bottom: "20%", width: 120, mixBlendMode: "multiply" }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, rotate: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.7 },
              x: { duration: 0.5, delay: 0.7 },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Dr. Icky — fills entire right column, bottom-anchored */}
          <motion.img
            src="/images/ui/Dr.%20Icky%20celebrating%20a%20result.png"
            alt="Dr. Icky — your guide to the EWW-niverse"
            className="absolute object-contain object-bottom"
            style={{
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              height: "95%",
              width: "auto",
              maxWidth: "none",
              mixBlendMode: "multiply",
            }}
            initial={{ opacity: 0, y: 50 }}
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

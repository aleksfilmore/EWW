"use client";

import { motion } from "framer-motion";
import type { Creature, Rarity } from "@/lib/data";
import { creatureImagePath, rarityColors } from "@/lib/data";

function DotRow({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full border border-[#C8B89A] flex-shrink-0"
          style={{ backgroundColor: i < value ? color : "transparent" }}
        />
      ))}
    </div>
  );
}

const ewwBg: Record<number, string> = {
  100: "#2A0A0A",
  80:  "#1A1206",
  60:  "#0D2007",
};

const ewwAccent: Record<number, string> = {
  100: "#E53535",
  80:  "#D48B1A",
  60:  "#5DB84A",
};

interface CreatureCardProps {
  creature: Creature;
  locked?: boolean;
  showFact?: boolean;
}

export default function CreatureCard({ creature, locked, showFact }: CreatureCardProps) {
  const rCol = rarityColors[creature.rarity as Rarity];
  const accent = ewwAccent[creature.ewwMeter] ?? "#5DB84A";
  const cardBg = ewwBg[creature.ewwMeter] ?? "#0D2007";
  const hasFact = showFact && creature.grossFact && !creature.grossFact.startsWith("TODO");

  return (
    <motion.div
      className="group relative flex flex-col rounded-2xl overflow-hidden border-2 cursor-default select-none"
      style={{ borderColor: accent, backgroundColor: cardBg }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.04,
        boxShadow: `0 24px 48px rgba(0,0,0,0.6), 0 0 16px ${accent}40`,
        transition: { type: "spring", stiffness: 320, damping: 18 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Rarity badge — top left */}
      <div className="absolute top-2 left-2 z-20">
        <span
          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ backgroundColor: rCol.bg, color: rCol.text }}
        >
          {creature.rarity}
        </span>
      </div>

      {/* EWW tier — top right */}
      <div className="absolute top-2 right-2 z-20">
        <span
          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ backgroundColor: accent, color: "#fff" }}
        >
          EWW {creature.ewwMeter}
        </span>
      </div>

      {/* Creature image panel */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: "160px",
          backgroundImage: "url(/images/ui/Stained%20notebook%20paper%20background.png)",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          backgroundColor: "#EDE5CE",
        }}
      >
        {locked ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <img
              src="/images/ui/Variable%20Locked%20sticker.png"
              alt="Locked"
              className="illustration w-10 object-contain"
            />
            <span className="text-xs text-[#7A6652] font-semibold uppercase tracking-wider">Locked</span>
          </div>
        ) : (
          <img
            src={creatureImagePath(creature.name)}
            alt={creature.name}
            className="relative z-10 illustration h-36 w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <p
          className="font-creepster text-base leading-tight"
          style={{ color: "#F7F2E4", fontFamily: "var(--font-creepster), 'Cantora One', Georgia, serif" }}
        >
          {creature.name}
        </p>

        {/* Stats rows */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#8A9E86" }}>
              EWW Factor
            </span>
            <DotRow value={creature.ewwFactor} color={accent} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#8A9E86" }}>
              Yuck Level
            </span>
            <DotRow value={creature.yuckLevel} color="#6B3FD4" />
          </div>
        </div>

        {hasFact && (
          <p
            className="text-[10px] leading-relaxed mt-1 line-clamp-2"
            style={{ color: "#8A9E86" }}
          >
            {creature.grossFact}
          </p>
        )}
      </div>
    </motion.div>
  );
}

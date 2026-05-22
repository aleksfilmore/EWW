import type { Creature } from "@/lib/data";
import { creatureImagePath } from "@/lib/data";
import EwwMeterBadge from "./EwwMeter";

// EWW tier label + colour
function ewwTierLabel(value: number): { label: string; bg: string; text: string } {
  if (value === 100) return { label: "Total Barf", bg: "#A32D2D", text: "#fff" };
  if (value === 80)  return { label: "Super Slimy", bg: "#854F0B", text: "#fff" };
  return               { label: "Kinda Revolting", bg: "#3D8C2A", text: "#fff" };
}

interface CreatureCardProps {
  creature: Creature;
  locked?: boolean;
  /** Show the gross fact snippet below the name */
  showFact?: boolean;
}

export default function CreatureCard({ creature, locked, showFact }: CreatureCardProps) {
  const tier = ewwTierLabel(creature.ewwMeter);
  const hasFact = showFact && creature.grossFact && !creature.grossFact.startsWith("TODO");

  return (
    <div className="group flex flex-col rounded-xl border border-[#C8B89A] bg-[#FDFAF3] overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative bg-[#EDE5CE] aspect-square flex items-center justify-center overflow-hidden p-4">
        {/* EWW tier badge — top left */}
        {!locked && (
          <span
            className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded z-10"
            style={{ backgroundColor: tier.bg, color: tier.text }}
          >
            {tier.label}
          </span>
        )}
        {locked ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#EDE5CE]">
            <span className="text-[#7A6652] text-xs font-semibold uppercase tracking-wider">Unclassified</span>
          </div>
        ) : (
          <img
            src={creatureImagePath(creature.name)}
            alt={creature.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 illustration"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <p className="text-[#1A3D0E] text-sm font-semibold leading-snug" style={{ fontFamily: '"Cantora One", Georgia, serif' }}>
          {creature.name}
        </p>
        <EwwMeterBadge value={creature.ewwMeter} size="sm" />
        {hasFact && (
          <p className="text-[11px] text-[#7A6652] leading-relaxed line-clamp-2 mt-0.5">
            {creature.grossFact}
          </p>
        )}
      </div>
    </div>
  );
}

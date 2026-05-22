import type { Creature } from "@/lib/data";
import { creatureImagePath } from "@/lib/data";
import EwwMeterBadge from "./EwwMeter";

interface CreatureCardProps {
  creature: Creature;
  locked?: boolean;
}

export default function CreatureCard({ creature, locked }: CreatureCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-[#C8B89A] bg-[#FDFAF3] overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative bg-[#EDE5CE] aspect-square flex items-center justify-center overflow-hidden p-4">
        {locked ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#EDE5CE]">
            <span className="text-[#7A6652] text-xs font-semibold uppercase tracking-wider">Unclassified</span>
          </div>
        ) : (
          <img
            src={creatureImagePath(creature.name)}
            alt={creature.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-3">
        <p className="text-[#1A3D0E] text-sm font-semibold leading-snug mb-1.5" style={{ fontFamily: '"Cantora One", Georgia, serif' }}>
          {creature.name}
        </p>
        <EwwMeterBadge value={creature.ewwMeter} size="sm" />
      </div>
    </div>
  );
}

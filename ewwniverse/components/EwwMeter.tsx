import type { EwwMeter } from "@/lib/data";
import { ewwMeterLabels } from "@/lib/data";

interface EwwMeterProps {
  value: EwwMeter;
  size?: "sm" | "md";
}

export default function EwwMeterBadge({ value, size = "md" }: EwwMeterProps) {
  const { label, color, bg } = ewwMeterLabels[value];
  const isSmall = size === "sm";

  return (
    <span
      style={{ backgroundColor: bg, color }}
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        isSmall ? "text-[11px] px-2.5 py-0.5" : "text-xs px-3 py-1"
      }`}
    >
      <span style={{ color }} className="font-bold">
        {value}%
      </span>
      {label}
    </span>
  );
}

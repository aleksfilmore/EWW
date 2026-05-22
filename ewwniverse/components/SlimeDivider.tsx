interface SlimeDividerProps {
  flip?: boolean;
  className?: string;
}

export default function SlimeDivider({ flip, className = "" }: SlimeDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <img
        src="/images/ui/Slime%20drip%20top%20border%2C%20full%20width.png"
        alt=""
        className="w-full"
        style={{ display: "block", maxHeight: 48, objectFit: "cover" }}
      />
    </div>
  );
}

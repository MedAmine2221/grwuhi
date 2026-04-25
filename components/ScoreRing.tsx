import { ScoreRingProps } from "@/constants/interfaces";

export default function ScoreRing({ score, max = 100 }: ScoreRingProps) {
  const pct   = Math.round((score / max) * 100);
  const r     = 26;
  const circ  = 2 * Math.PI * r;
  const dash  = (pct / 100) * circ;
  const color = pct >= 70 ? "#1a9e8f" : pct >= 40 ? "#d99934" : "#e05c3a";

  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
        {/* Track */}
        <circle cx="32" cy="32" r={r} fill="none"
                stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
        {/* Progress */}
        <circle cx="32" cy="32" r={r} fill="none"
                stroke={color} strokeWidth="5"
                strokeDasharray={`${dash} ${circ}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.7s ease" }} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold"
            style={{ color }}>
        {score}/{max}
      </span>
    </div>
  );
}
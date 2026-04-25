/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategorySectionProps } from "@/constants/interfaces";
import QuestionCard from "./QuestionCard";
import SectionCard from "./SectionCard";

export default function CategorySection({ title, items, accentColor }: CategorySectionProps) {
  const avg = items.reduce((s: number, q: any) => s + q.score, 0) / items.length;
  const pct = Math.round((avg / 10) * 100);
  const barColor = pct >= 70 ? "#1a9e8f" : pct >= 40 ? "#d99934" : "#e05c3a";

  return (
    <SectionCard title={title} titleColor={accentColor}>
      {/* Mini progress bar */}
      <div className="flex justify-between text-xs text-[#8a9bb8] mb-2">
        <span>Average score</span>
        <span className="font-medium text-[#f4f1ea]">{avg.toFixed(1)} / 10</span>
      </div>
      <div className="h-1 bg-white/8 rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item: any, i: number) => (
          <QuestionCard key={i} item={item} index={i} accentColor={accentColor} />
        ))}
      </div>
    </SectionCard>
  );
}
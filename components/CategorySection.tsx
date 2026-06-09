/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategorySectionProps } from "@/constants/interfaces";
import QuestionCard from "./QuestionCard";
import SectionCard from "./SectionCard";

export default function CategorySection({ title, items, accentColor }: CategorySectionProps) {
  const avg = items?.reduce((s: number, q: any) => s + q.score, 0) / items?.length;
  const pct = Math.round((avg / 10) * 100);
  const barColor = pct >= 70 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <SectionCard title={title} titleColor={accentColor}>
      {/* Mini progress bar */}
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Average score</span>
        <span className="font-medium text-gray-900">{avg.toFixed(1)} / 10</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>

      <div className="space-y-3">
        {items?.map((item: any, i: number) => (
          <QuestionCard key={i} item={item} index={i} accentColor={accentColor} />
        ))}
      </div>
    </SectionCard>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionCard from "./QuestionCard";
import SectionCard from "./SectionCard";

export default function CategorySection({
  title,
  items,
  accentColor,
}: {
  title: string;
  items: any[];
  accentColor: string;
}) {
  const avg = items.reduce((s: number, q: any) => s + q.score, 0) / items.length;
  const pct = Math.round((avg / 10) * 100);

  return (
    <SectionCard title={title}>
      {/* mini progress bar */}
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Average score</span>
        <span className="font-medium text-foreground">{avg.toFixed(1)} / 10</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: pct >= 70 ? "#1D9E75" : pct >= 40 ? "#d99934" : "#D85A30",
          }}
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
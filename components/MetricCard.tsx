import { MetricItemProps } from "@/constants/interfaces";

export default function MetricCard({ label, value }: MetricItemProps) {
  return (
    <div className="flex-1 border-2 border-muted/50 rounded-xl px-4 py-3 min-w-0">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-medium">{value}</p>
    </div>
  );
}

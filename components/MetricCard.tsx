import { valueColor } from "@/constants";
import { MetricItemProps } from "@/constants/interfaces";

export default function MetricCard({ label, value, variant = "default" }: MetricItemProps) {
  return (
    <div className="flex-1 min-w-22.5 bg-white/4 border border-white/8
                    rounded-2xl px-4 py-3">
      <p className="text-[10px] text-[#8a9bb8] uppercase tracking-widest mb-1.5">{label}</p>
      <p className={`font-serif text-2xl font-semibold leading-none ${valueColor[variant]}`}>
        {value}
      </p>
    </div>
  );
}
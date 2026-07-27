/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetricItemProps } from "@/constants/interfaces";

const variantStyles = {
  primary: "text-blue-600",
  secondary: "text-green-600",
  default: "text-gray-900",
} as any;

export default function MetricCard({ label, value, variant = "default" }: MetricItemProps) {
  return (
    <div className="flex-1 min-w-24 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">{label}</p>
      <p className={`text-2xl font-bold leading-none ${variantStyles[variant] || variantStyles.default}`}>
        {value}
      </p>
    </div>
  );
}
import { SectionCardProps } from "@/constants/interfaces";

export default function SectionCard({ title, titleColor, accent, children }: SectionCardProps) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
      style={accent ? { borderLeft: `3px solid ${accent}`, borderRadius: "12px 12px 12px 12px" } : {}}
    >
      <p
        className="text-xs font-semibold uppercase tracking-wide mb-3"
        style={{ color: titleColor ?? "#64748b" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
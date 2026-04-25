import { SectionCardProps } from "@/constants/interfaces";

export default function SectionCard({ title, titleColor, accent, children }: SectionCardProps) {
  return (
    <div
      className="bg-white/4 border border-white/8 rounded-2xl p-4"
      style={accent ? { borderLeft: `2px solid ${accent}`, borderRadius: "0 14px 14px 0" } : {}}
    >
      <p
        className="text-[10px] font-medium uppercase tracking-widest mb-3"
        style={{ color: titleColor ?? "#8a9bb8" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
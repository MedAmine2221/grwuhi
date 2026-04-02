import { SectionCardProps } from "@/constants/interfaces";

export default function SectionCard({
  title,
  titleColor,
  children,
  accent,
}: SectionCardProps) {
  return (
    <div
      className="bg-background border border-border/50 rounded-xl p-4"
      style={
        accent
          ? {
              borderLeft: `3px solid ${accent}`,
              borderRadius: "0 12px 12px 0",
            }
          : {}
      }
    >
      <p
        className="text-xs font-medium uppercase tracking-widest mb-3"
        style={{ color: titleColor ?? "var(--muted-foreground)" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

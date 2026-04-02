import { FlagItemProps } from "@/constants/interfaces";

export default function FlagItem({ text, color }: FlagItemProps) {
  return (
    <div className="flex gap-2.5 items-start py-2 border-b border-border/50 last:border-0 text-sm leading-relaxed">
      <span
        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
        style={{ background: color }}
      />
      {text}
    </div>
  );
}


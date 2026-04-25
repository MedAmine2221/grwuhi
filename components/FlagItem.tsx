export default function FlagItem({ text, color }: { text: string; color: string }) {
  return (
    <div className="flex items-start gap-2 mb-2 last:mb-0">
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.25"
        style={{ background: color }}
      />
      <p className="text-xs text-[#f4f1ea]/70 leading-relaxed">{text}</p>
    </div>
  );
}
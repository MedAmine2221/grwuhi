export default function FlagItem({ text, color }: { text: string; color: string }) {
  return (
    <div className="flex items-start gap-2 mb-2 last:mb-0">
      <span
        className="w-2 h-2 rounded-full shrink-0 mt-1.5"
        style={{ background: color }}
      />
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
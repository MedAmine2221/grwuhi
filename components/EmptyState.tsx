export default function EmptyState({
  message,
  color,
}: {
  message: string;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 py-1"
      style={{ opacity: 0.5 }}
    >
      <div
        className="w-4 h-px rounded-full shrink-0"
        style={{ background: color }}
      />
      <p className="text-xs italic" style={{ color }}>
        {message}
      </p>
    </div>
  );
}
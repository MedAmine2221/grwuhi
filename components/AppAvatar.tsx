export default function Avatar({ name }: { name: string }) {
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200
                    flex items-center justify-center text-[10px] font-semibold text-gray-600 shrink-0">
      {initials}
    </div>
  );
}
export default function Avatar({ name }: { name: string }) {
  const initials = name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-[#113d3c]/10 border border-[#113d3c]/20
                    flex items-center justify-center text-[10px] font-semibold text-[#113d3c] shrink-0">
      {initials}
    </div>
  );
}
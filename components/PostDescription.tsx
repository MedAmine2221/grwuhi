import { PostDescriptionProps } from "@/constants/interfaces";

export default function PostDescription({ setPostDesc, postDesc, isPressed }: PostDescriptionProps) {
  const hasError = !postDesc && isPressed;
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className={`text-[11px] uppercase tracking-[0.08em] font-medium ${hasError ? "text-red-400" : "text-[#d99934]"}`}>
        Position Description <span className="opacity-60">*</span>
      </label>
      <textarea
        className={`w-full h-28 rounded-xl px-4 py-3 text-sm font-light resize-none outline-none
          bg-white/5 border transition-all duration-200
          text-[#f4f1ea] placeholder:text-[#8a9bb8]
          ${hasError
            ? "border-red-400/60 bg-red-400/5 focus:border-red-400"
            : "border-[#d99934]/30 focus:border-[#d99934]/70 hover:border-[#d99934]/50"
          }`}
        placeholder="Describe the position you're applying for…"
        onChange={(e) => setPostDesc(e.currentTarget.value)}
      />
      {hasError && (
        <p className="text-red-400 text-[11px]">This field is required.</p>
      )}
    </div>
  );
}
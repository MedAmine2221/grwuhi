export default function CheckBoxApp({text}:  {text: string}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-[#d99934]/30 accent-[#d99934] cursor-pointer"
      />
      <span className="text-xs text-white/50">{text}</span>
    </label>
  )
}

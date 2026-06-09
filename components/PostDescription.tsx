import { PostDescriptionProps } from "@/constants/interfaces";

export default function PostDescription({ setPostDesc, postDesc, isPressed }: PostDescriptionProps) {
  const hasError = !postDesc && isPressed;
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className={`text-xs font-medium uppercase tracking-wide ${hasError ? "text-red-500" : "text-gray-700"}`}>
        Position Description <span className="text-gray-400">*</span>
      </label>
      <textarea
        className={`w-full h-28 rounded-xl px-4 py-3 text-sm resize-none outline-none
          bg-gray-50 border transition-all duration-200
          text-gray-900 placeholder:text-gray-400
          ${hasError
            ? "border-red-400 bg-red-50/50 focus:border-red-500"
            : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          }`}
        placeholder="Describe the position you're applying for…"
        onChange={(e) => setPostDesc(e.currentTarget.value)}
      />
      {hasError && (
        <p className="text-red-500 text-xs">This field is required.</p>
      )}
    </div>
  );
}
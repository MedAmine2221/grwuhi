export default function SortIcon({ state }: { state: false | "asc" | "desc" }) {
  return (
    <span className="ml-1 inline-flex flex-col gap-px">
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        className={`transition-colors ${
          state === "asc" ? "text-[#1a9e8f]" : "text-[#8a9bb8]/25"
        }`}
      >
        <path d="M4 0L8 5H0L4 0Z" fill="currentColor" />
      </svg>
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        className={`transition-colors ${
          state === "desc" ? "text-[#1a9e8f]" : "text-[#8a9bb8]/25"
        }`}
      >
        <path d="M4 5L0 0H8L4 5Z" fill="currentColor" />
      </svg>
    </span>
  );
}

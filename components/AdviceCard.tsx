/* eslint-disable @next/next/no-img-element */
import { AdviceCardProps } from "@/constants/interfaces";

export function AdviceCard({
  title,
  description,
  tag,
  tagColor = "#2563eb",
  imageSrc,
  imageAlt,
  href,
}: AdviceCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden
                 hover:border-blue-200 hover:shadow-md transition-all duration-250 no-underline"
    >
      {/* Left image strip */}
      <div className="w-[88px] shrink-0 relative bg-slate-100 overflow-hidden">
        <img
          alt={imageAlt}
          src={imageSrc}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105 group-hover:scale-100 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-5 flex-1 min-w-0">
        <span
          className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full w-fit"
          style={{
            backgroundColor: `${tagColor}14`,
            color: tagColor,
            border: `1px solid ${tagColor}28`,
          }}
        >
          {tag}
        </span>

        <h3 className="text-[13.5px] font-semibold text-slate-900 leading-snug">{title}</h3>
        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">{description}</p>

        <span className="mt-auto inline-flex items-center gap-1.5 text-blue-600 text-[11.5px] font-semibold">
          Read the guide
          <svg
            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </a>
  );
}
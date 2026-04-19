/* eslint-disable @next/next/no-img-element */
import { AdviceCardProps } from "@/constants/interfaces";

export function AdviceCard({
  title, description, tag, tagColor = "#d99934", imageSrc, imageAlt, href,
}: AdviceCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-row bg-white/4 border border-[#d99934]/20 rounded-2xl overflow-hidden
                 hover:border-[#d99934]/45 hover:bg-white/[0.07] transition-all duration-250 no-underline"
    >
      {/* Image */}
      <div className="w-24 shrink-0 relative overflow-hidden bg-linear-to-br from-[#0d7a6e] to-[#162d52]">
        <img
          alt={imageAlt}
          src={imageSrc}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-110 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d1f3c]/60 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <span
          className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full w-fit"
          style={{ backgroundColor: `${tagColor}18`, color: tagColor, border: `1px solid ${tagColor}30` }}
        >
          {tag}
        </span>
        <h3 className="text-[15px] font-semibold text-[#f4f1ea] leading-snug">{title}</h3>
        <p className="text-xs text-[#8a9bb8] leading-relaxed line-clamp-2">{description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-[#1a9e8f] text-xs font-medium
                        px-2.5 py-1 rounded-md border border-[#1a9e8f]/25 bg-[#1a9e8f]/7 w-fit">
          Read the article
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </a>
  );
}
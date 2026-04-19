"use client";;
import { AdviceHeaderProps } from "@/constants/interfaces";
import Image from "next/image";

export default function AdviceHeader({
  title1, title2, description, buttonText, buttonLink, imageSrc,
}: AdviceHeaderProps) {
  return (
    <header className="bg-linear-to-br from-[#091628] to-[#162d52] relative overflow-hidden border-b-2 border-[#d99934]">
      {/* Decorative rings */}
      <div className="absolute w-72 h-72 rounded-full border border-[#1a9e8f]/10 -right-14 -top-14 pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full border border-[#d99934]/7 right-5 top-5 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full border border-[#1a9e8f]/5 -right-20 top-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8 py-14 flex flex-wrap items-center gap-10 relative z-10">
        {/* Mobile image */}
        <div className="flex lg:hidden mx-auto w-36 h-36 rounded-full border-2 border-[#d99934]/25 bg-white/5 items-center justify-center overflow-hidden mt-10">
          <Image width={120} height={120} alt="illustration" src={imageSrc} loading="eager" className="object-contain w-full h-full" />
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-72 mt-8 lg:mt-0">
          <p className="text-[#d99934] text-[10px] tracking-[4px] uppercase mb-4 font-medium">
            — Career Guide
          </p>
          <h1 className="font-semibold text-[#f4f1ea] leading-tight text-4xl md:text-5xl mb-5">
            {title1}<br />
            <span className="text-[#d99934]">{title2}</span>
          </h1>
          <p className="text-[#f4f1ea]/50 text-sm leading-relaxed max-w-md mb-8 italic font-light">
            {description}
          </p>
          {buttonLink && buttonText && (
            <button
              onClick={() => window.open(buttonLink)}
              className="inline-flex items-center gap-2 bg-[#d99934] text-[#0d1f3c] font-semibold
                         uppercase tracking-widest text-xs px-8 py-3.5 rounded-lg
                         hover:bg-[#c4891f] active:scale-[0.98] transition-all duration-200"
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* Desktop image bubble */}
        <div className="hidden lg:flex w-44 h-44 rounded-full border-2 border-[#d99934]/25
                        bg-white/4 items-center justify-center overflow-hidden
                        shadow-[0_0_60px_rgba(217,153,52,0.08)] shrink-0">
          <Image width={160} height={160} alt="illustration" src={imageSrc} loading="eager"
                 className="object-contain w-full h-full" />
        </div>
      </div>
    </header>
  );
}
"use client";;
import { AdviceHeaderProps } from "@/constants/interfaces";
import Image from "next/image";

export default function AdviceHeader({
  title1, title2, description, buttonText, buttonLink, imageSrc,
}: AdviceHeaderProps) {
  return (
    <header className="bg-gradient-to-br from-white to-gray-50 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-8 py-14 flex flex-wrap items-center gap-10 relative z-10">
        {/* Mobile image */}
        <div className="flex lg:hidden mx-auto w-36 h-36 rounded-full border-2 border-blue-200 bg-white items-center justify-center overflow-hidden mt-10 shadow-sm">
          <Image width={120} height={120} alt="illustration" src={imageSrc} loading="eager" className="object-contain w-full h-full" />
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-72 mt-8 lg:mt-0">
          <p className="text-blue-600 text-[10px] tracking-[4px] uppercase mb-4 font-medium">
            — Career Guide
          </p>
          <h1 className="font-bold text-gray-900 leading-tight text-4xl md:text-5xl mb-5">
            {title1}<br />
            <span className="text-blue-600">{title2}</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md mb-8 font-light">
            {description}
          </p>
          {buttonLink && buttonText && (
            <button
              onClick={() => window.open(buttonLink)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold
                         uppercase tracking-wider text-xs px-8 py-3.5 rounded-lg
                         hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* Desktop image bubble */}
        <div className="hidden lg:flex w-44 h-44 rounded-full border-2 border-blue-200
                        bg-white items-center justify-center overflow-hidden shadow-sm shrink-0">
          <Image width={160} height={160} alt="illustration" src={imageSrc} loading="eager"
                 className="object-contain w-full h-full" />
        </div>
      </div>
    </header>
  );
}
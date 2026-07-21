"use client";
import { AdviceHeaderProps } from "@/constants/interfaces";
import Image from "next/image";

export default function AdviceHeader({
  title1,
  title2,
  description,
  buttonText,
  buttonLink,
  imageSrc,
}: AdviceHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 flex flex-col lg:flex-row items-center gap-12">

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Career Guide
          </span>

          <h1 className="text-3xl md:text-4xl xl:text-[42px] font-bold leading-[1.12] text-slate-900 mb-5">
            {title1}{" "}
            <span className="text-blue-600">{title2}</span>
          </h1>

          <p className="text-[15px] text-slate-500 leading-relaxed max-w-[480px] mb-8">
            {description}
          </p>

          {buttonLink && buttonText && (
            <button
              onClick={() => window.open(buttonLink)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-[13px] px-6 py-3 rounded-xl transition-all duration-200"
            >
              {buttonText}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </button>
          )}
        </div>

        {/* Image */}
        <div className="shrink-0 w-48 h-48 lg:w-52 lg:h-52 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
          <Image
            width={160}
            height={160}
            alt="illustration"
            src={imageSrc}
            loading="eager"
            className="object-contain w-4/5 h-4/5"
          />
        </div>
      </div>
    </header>
  );
}
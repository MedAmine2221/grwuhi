"use client";
import Image from 'next/image';
import { FiArrowLeft } from 'react-icons/fi';

export default function AdviceHeader({title1, title2, description, buttonText, buttonLink, imageSrc}: {title1: string, title2: string, description: string, buttonText: string, buttonLink: string, imageSrc: string}) {
  return (
    <header className="bg-[#113d3c] relative overflow-hidden">
      {/* decorative rings */}
      <div className="max-w-5xl mx-auto px-8 py-16 flex flex-wrap items-center justify-between gap-10 relative z-10">
        {/* text */}
        <FiArrowLeft onClick={() => window.history.back()} className='font-extrabold cursor-pointer' color='white' size={40}/>
        <div className="flex-1 min-w-72">
          <p className="text-amber-400 text-xs tracking-[4px] uppercase mb-4">Career Guide</p>
          <h1 className="text-white font-bold leading-tight text-4xl md:text-5xl mb-5">
            {title1}<br />
            <span className="text-amber-400">{title2}</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-md mb-8 italic">
            {description}
          </p>
          {buttonLink != "" && buttonText != "" && <button
            onClick={() => window.open(buttonLink)}
            className="bg-amber-500 text-[#113d3c] font-bold uppercase tracking-widest text-sm px-9 py-4 rounded-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(217,153,52,0.45)] hover:-translate-y-0.5 active:translate-y-0"
          >
            {buttonText}
          </button>}
        </div>
        {/* image bubble */}
        <div className="flex-none w-100 h-100 rounded-full border-2 border-amber-400/30 bg-white/5 flex items-center justify-center overflow-hidden">
          <Image
            width={220} height={220}
            alt="cv illustration"
            src={imageSrc}
            loading="eager"
            className="object-contain w-75 h-75"
          />
        </div>
      </div>
      {/* gold rule */}
      <div className="h-1 w-full bg-amber-500" />
    </header>
  )
}

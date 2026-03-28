/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { STEPS_CoverLetter } from "@/constants";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Cover_letter() {
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const step = STEPS_CoverLetter[activeStep];

  return (
    <div className={`min-h-screen bg-stone-100 font-serif transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>

      {/* ── HERO ── */}
      <header className="bg-[#113d3c] relative overflow-hidden">
        {/* decorative rings */}
        <div className="max-w-5xl mx-auto px-8 py-16 flex flex-wrap items-center justify-between gap-10 relative z-10">
          {/* text */}
          <div className="flex-1 min-w-72">
            <p className="text-amber-400 text-xs tracking-[4px] uppercase mb-4">Career Guide</p>
            <h1 className="text-white font-bold leading-tight text-4xl md:text-5xl mb-5">
              How to Write<br />
              <span className="text-amber-400">a Perfect Cover Letter</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-md mb-8 italic">
                {"At its core, a cover letter is a personalized document that introduces you to potential employers. It's your chance to convey your enthusiasm for the position, highlight your qualifications, and showcase your communication skills. A well-crafted cover letter serves as a bridge between your CV and the job you're applying for."} 
            </p>
            <button
              onClick={() => window.open("https://novoresume.com/?noRedirect=true")}
              className="bg-amber-500 text-[#113d3c] font-bold uppercase tracking-widest text-sm px-9 py-4 rounded-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(217,153,52,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Create My Cover Letter →
            </button>
          </div>

          {/* image bubble */}
          <div className="flex-none w-100 h-100 border-2 border-amber-400/30 bg-white/5 flex items-center justify-center overflow-hidden">
            <Image
              width={220} height={220}
              alt="cv illustration"
              src="/write_cover_letter.png"
              loading="eager"
              className="object-contain w-100 h-100"
            />
          </div>
        </div>

        {/* gold rule */}
        <div className="h-1 w-full bg-amber-500" />
      </header>

      {/* ── MAIN ── */}
      <main className="max-w-5xl mx-auto px-8 py-14">

        {/* tab row */}
        <div className="flex flex-wrap gap-2 mb-10">
          {STEPS_CoverLetter.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`border-2 rounded-sm px-5 py-2.5 font-serif font-bold text-sm tracking-wide transition-all duration-200 ${
                activeStep === i ? s.tabActive : s.tabIdle
              }`}
            >
              <span className="block text-[10px] opacity-60 leading-none mb-0.5">{s.number}</span>
              {s.title}
            </button>
          ))}
        </div>

        {/* content panel */}
        <div
          key={activeStep}
          className={`bg-white border-l-4 ${step.accent} shadow-sm rounded-sm px-10 py-10 animate-[fadeUp_0.35s_ease_both]`}
        >
          {/* heading row */}
          <div className="flex items-baseline gap-4 mb-8">
            <span className={`font-bold text-6xl leading-none opacity-[0.15] tracking-tighter select-none ${step.ghost}`}>
              {step.number}
            </span>
            <h2 className="font-serif font-bold text-2xl text-stone-800">{step.title}</h2>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {step.items.map((item, j) => (
              <div
                key={j}
                style={{ animationDelay: `${j * 0.06}s` }}
                className={`bg-stone-50 border-t-4 ${step.cardTop} rounded-sm p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md animate-[fadeUp_0.4s_ease_both]`}
              >
                <p className="font-serif font-bold text-stone-800 text-sm mb-2">{item.label}</p>
                <p className="font-serif text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
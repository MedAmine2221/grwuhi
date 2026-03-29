/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_Prepar_Interview } from "@/constants";
import { useState, useEffect } from "react";

export default function PreparingInterview() {
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const step = STEPS_Prepar_Interview[activeStep];

  return (
    <div className={`min-h-screen bg-stone-100 font-serif transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <AdviceHeader
            title1="How to Prepare"
            title2="Your Interview"
            description="Succeeding in a job interview requires preparation. This involves thoroughly analyzing the job posting, conducting in-depth research on the company, its industry, and its projects. You should prepare a concise presentation of your background, anticipate common interview questions, list your concrete achievements, and prepare questions to ask the recruiter to demonstrate your motivation."
            buttonText=""
            buttonLink=""
            imageSrc="/interview.png"
        />

      {/* ── MAIN ── */}
      <main className="max-w-5xl mx-auto px-8 py-14">

        {/* tab row */}
        <div className="flex flex-wrap gap-2 mb-10">
          {STEPS_Prepar_Interview.map((s, i) => (
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
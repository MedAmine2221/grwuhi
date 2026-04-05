/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import AdviceBody from "@/components/AdviceBody";
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
      <AdviceBody data={STEPS_Prepar_Interview} setActiveStep={setActiveStep} activeStep={activeStep} step={step} />
    </div>
  );
}
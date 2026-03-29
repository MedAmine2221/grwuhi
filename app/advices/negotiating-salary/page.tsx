/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_SALARY_NEGOTIATION } from "@/constants";
import { useState, useEffect } from "react";


export default function NegotiatingSalary() {
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const step = STEPS_SALARY_NEGOTIATION[activeStep];

  return (
    <div className={`min-h-screen bg-stone-100 font-serif transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>

      {/* ── HERO ── */}
      <AdviceHeader
        title1="How to Negotiate"
        title2="Your Salary"
        description="Bringing up the topic of salary in a job interview is never easy. You might even feel uncomfortable and tend to avoid the question altogether, or simply accept the recruiter's offer. To get the compensation you believe you deserve, you'll need to prepare and hone your arguments. Here's our advice."
        buttonText=""
        buttonLink=""
        imageSrc="/salary.png"
      />
      {/* ── MAIN ── */}
      <AdviceBody data={STEPS_SALARY_NEGOTIATION} setActiveStep={setActiveStep} activeStep={activeStep} step={step} />
    </div>
  );
}
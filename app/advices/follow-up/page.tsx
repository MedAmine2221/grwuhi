/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_FollowUp_Email } from "@/constants";
import { useState, useEffect } from "react";


export default function FollowUp() {
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const step = STEPS_FollowUp_Email[activeStep];

  return (
    <div className={`min-h-screen bg-stone-100 font-serif transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>

      {/* ── HERO ── */}
      <AdviceHeader
        title1="How to Write"
        title2="Your Follow-Up Email"
        description="Sending a thank-you email after an interview isn't just a matter of politeness; it's a strategic tool to confirm your interest and demonstrate that you fully understand the requirements of the position."
        buttonText=""
        buttonLink=""
        imageSrc="/follow-up.png"
      />
      {/* ── MAIN ── */}
      <AdviceBody data={STEPS_FollowUp_Email} setActiveStep={setActiveStep} activeStep={activeStep} step={step} />
    </div>
  );
}
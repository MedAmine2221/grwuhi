/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_LinkedIn_Strategy } from "@/constants";
import { useState, useEffect } from "react";


export default function LinkedinNetworking() {
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const step = STEPS_LinkedIn_Strategy[activeStep];

  return (
    <div className={`min-h-screen bg-stone-100 font-serif transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>

      {/* ── HERO ── */}
      <AdviceHeader
        title1="How to Network Effectively"
        title2="On LinkedIn to Find a Job"
        description="To network effectively on LinkedIn and find a job, optimize your profile with strategic keywords, a professional photo, and a clear headline. Target relevant connections (HR professionals, managers, alumni), engage through comments and shares, and ask for advice rather than direct job postings."
        buttonText=""
        buttonLink=""
        imageSrc="/linkedin.png"
      />
      {/* ── MAIN ── */}
      <AdviceBody data={STEPS_LinkedIn_Strategy} setActiveStep={setActiveStep} activeStep={activeStep} step={step} />
    </div>
  );
}
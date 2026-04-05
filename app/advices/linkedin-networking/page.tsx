"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_LinkedIn_Strategy } from "@/constants";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LinkedinNetworking() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS_LinkedIn_Strategy[activeStep];

  return (
    <motion.div 
      className={`min-h-screen bg-stone-100 font-serif transition-opacity duration-700 `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
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
    </motion.div>  
  );
}
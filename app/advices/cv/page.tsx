"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_CV } from "@/constants";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Cv() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS_CV[activeStep];
  
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
        title1="How to Write"
        title2="a Perfect CV"
        description="Your CV is the first impression you make on a recruiter. A well-structured document highlights your skills, experience, and personality — greatly increasing your chances of landing an interview."
        buttonText="Create My CV →"
        buttonLink="https://www.moncvparfait.fr/creer-cv"
        imageSrc="/write-cv.png"
      />
      {/* ── INTRO STRIP ── */}
      <div className="bg-white border-b border-stone-200 py-7 px-8">
        <p className="max-w-3xl mx-auto text-center italic text-stone-500 text-base leading-relaxed">
          A perfect CV is a tailored, concise, and error-free document — a marketing tool for your skills and achievements. It spans one to two A4 pages and should be adapted for each application to highlight the most relevant experience.
        </p>
      </div>
      <AdviceBody data={STEPS_CV} setActiveStep={setActiveStep} activeStep={activeStep} step={step} />
    </motion.div>
  );
}
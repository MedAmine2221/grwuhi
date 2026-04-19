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
    // PreparingInterview, NegotiatingSalary, LinkedinNetworking, FollowUp, Cv, Cover_letter
    <motion.div 
      className="min-h-screen bg-[#0d1f3c]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
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
      <AdviceBody data={STEPS_CV} setActiveStep={setActiveStep} activeStep={activeStep} step={step} />
    </motion.div>
  );
}
"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_CoverLetter } from "@/constants";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Cover_letter() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS_CoverLetter[activeStep];

  return (
    <motion.div 
      className={`min-h-screen bg-stone-100 font-serif transition-opacity duration-700 `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >      
    <AdviceHeader
        title1="How to Write"
        title2="a Perfect Cover Letter"
        description="At its core, a cover letter is a personalized document that introduces you to potential employers. It's your chance to convey your enthusiasm for the position, highlight your qualifications, and showcase your communication skills. A well-crafted cover letter serves as a bridge between your CV and the job you're applying for."
        buttonText="Create My Cover Letter →"
        buttonLink="https://novoresume.com/?noRedirect=true"
        imageSrc="/write_cover_letter.png"
      />
      {/* ── MAIN ── */}
      <AdviceBody data={STEPS_CoverLetter} setActiveStep={setActiveStep} activeStep={activeStep} step={step} />
    </motion.div>
  );
}
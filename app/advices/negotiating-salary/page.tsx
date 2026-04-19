"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_SALARY_NEGOTIATION } from "@/constants";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NegotiatingSalary() {
  const [activeStep, setActiveStep] = useState(0);

  const step = STEPS_SALARY_NEGOTIATION[activeStep];

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
        title1="How to Negotiate"
        title2="Your Salary"
        description="Bringing up the topic of salary in a job interview is never easy. You might even feel uncomfortable and tend to avoid the question altogether, or simply accept the recruiter's offer. To get the compensation you believe you deserve, you'll need to prepare and hone your arguments. Here's our advice."
        buttonText=""
        buttonLink=""
        imageSrc="/salary.png"
        />
      {/* ── MAIN ── */}
      <AdviceBody data={STEPS_SALARY_NEGOTIATION} setActiveStep={setActiveStep} activeStep={activeStep} step={step} />
    </motion.div>
  );
}
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
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <AdviceHeader
        title1="How to Network Effectively"
        title2="On LinkedIn to Find a Job"
        description="Optimize your profile with strategic keywords, a professional photo, and a clear headline. Target relevant connections, engage through comments, and ask for advice rather than direct job postings."
        buttonText=""
        buttonLink=""
        imageSrc="/linkedin.png"
      />
      <AdviceBody
        data={STEPS_LinkedIn_Strategy}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        step={step}
      />
    </motion.div>
  );
}
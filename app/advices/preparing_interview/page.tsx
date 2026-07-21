"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_Prepar_Interview } from "@/constants";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PreparingInterview() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS_Prepar_Interview[activeStep];

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <AdviceHeader
        title1="How to Prepare"
        title2="Your Interview"
        description="Succeeding in a job interview requires preparation: analyze the job posting, research the company, prepare a concise self-presentation, anticipate common questions, and list your concrete achievements."
        buttonText=""
        buttonLink=""
        imageSrc="/interview.png"
      />
      <AdviceBody
        data={STEPS_Prepar_Interview}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        step={step}
      />
    </motion.div>
  );
}
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
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <AdviceHeader
        title1="How to Negotiate"
        title2="Your Salary"
        description="Bringing up salary in a job interview is never easy. To get the compensation you deserve, you'll need to prepare and hone your arguments. Here's our advice."
        buttonText=""
        buttonLink=""
        imageSrc="/salary.png"
      />
      <AdviceBody
        data={STEPS_SALARY_NEGOTIATION}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        step={step}
      />
    </motion.div>
  );
}
"use client";
import AdviceBody from "@/components/AdviceBody";
import AdviceHeader from "@/components/AdviceHeader";
import { STEPS_FollowUp_Email } from "@/constants";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FollowUp() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS_FollowUp_Email[activeStep];

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <AdviceHeader
        title1="How to Write"
        title2="Your Follow-Up Email"
        description="Sending a thank-you email after an interview isn't just a matter of politeness — it's a strategic tool to confirm your interest and demonstrate that you fully understand the requirements of the position."
        buttonText=""
        buttonLink=""
        imageSrc="/follow-up.png"
      />
      <AdviceBody
        data={STEPS_FollowUp_Email}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
        step={step}
      />
    </motion.div>
  );
}
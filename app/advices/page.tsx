"use client";;
import { AdviceCard } from "@/components/AdviceCard";
import { ADVICES } from "@/constants";
import { motion } from "framer-motion";

export default function Advices() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen bg-[#0d1f3c] py-12 px-6 max-w-5xl mx-auto"
    >
      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {ADVICES.map((advice) => (
          <AdviceCard key={advice.id} {...advice} />
        ))}
      </div>
    </motion.section>
  );
}
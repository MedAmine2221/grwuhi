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
      className="min-h-screen bg-white py-12 px-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          Career Resources
        </span>
        <h1 className="text-3xl font-bold text-gray-900">Interview Preparation Guides</h1>
        <p className="text-gray-500 mt-2">Expert advice to help you succeed in your job search</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {ADVICES.map((advice) => (
          <AdviceCard key={advice.id} {...advice} />
        ))}
      </div>
    </motion.section>
  );
}
"use client";
import { AdviceCard } from "@/components/AdviceCard";
import { ADVICES } from "@/constants";
import { motion } from "framer-motion";

export default function Advices() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="min-h-screen bg-white"
    >
      {/* ── Page header ── */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 text-center">
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Career Resources
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
            Interview Preparation Guides
          </h1>
          <p className="text-slate-500 text-[15px] leading-relaxed max-w-md mx-auto">
            Step-by-step advice to help you stand out at every stage of your job search.
          </p>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {ADVICES.map((advice, i) => (
            <motion.div
              key={advice.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
            >
              <AdviceCard {...advice} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
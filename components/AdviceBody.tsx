/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AdviceBodyProps } from "@/constants/interfaces";
import { motion, AnimatePresence } from "framer-motion";

export default function AdviceBody({
  data,
  setActiveStep,
  activeStep,
  step,
}: AdviceBodyProps) {
  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 py-14">

      {/* ── Step tabs ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {data.map((s: any, i: number) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`relative text-left rounded-xl px-4 py-3.5 border transition-all duration-200
              ${activeStep === i
                ? "bg-blue-50 border-blue-200"
                : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
          >
            {activeStep === i && (
              <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-blue-600" />
            )}
            <span className={`block text-[10px] font-semibold tracking-widest uppercase mb-1
              ${activeStep === i ? "text-blue-500" : "text-slate-400"}`}>
              {s.number}
            </span>
            <span className={`text-[13px] font-semibold leading-snug
              ${activeStep === i ? "text-slate-900" : "text-slate-500"}`}>
              {s.title}
            </span>
          </button>
        ))}
      </div>

      {/* ── Content panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
        >
          {/* Panel header */}
          <div className="border-b border-slate-100 px-8 py-6 flex items-baseline gap-5 bg-slate-50">
            <span className="font-bold text-5xl leading-none text-blue-100 tracking-tight select-none">
              {step.number}
            </span>
            <h2 className="font-bold text-xl text-slate-900">{step.title}</h2>
          </div>

          {/* Cards grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {step.items.map((item: any, j: number) => (
              <div
                key={j}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-3.5">
                  <svg
                    className="text-blue-600"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-900 text-[13.5px] mb-1.5 leading-snug">
                  {item.label}
                </p>
                <p className="text-slate-500 text-[12.5px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Navigation buttons ── */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setActiveStep((p: number) => Math.max(0, p - 1))}
          disabled={activeStep === 0}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Previous
        </button>

        <span className="text-[12px] text-slate-400 font-medium">
          {activeStep + 1} / {data.length}
        </span>

        <button
          onClick={() => setActiveStep((p: number) => Math.min(data.length - 1, p + 1))}
          disabled={activeStep === data.length - 1}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </main>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDispatch, useSelector } from "react-redux";
import SectionCard from "./SectionCard";
import { motion } from "framer-motion";
import CategorySection from "./CategorySection";
import { QuizResultProps } from "@/constants/interfaces";
import { FiArrowLeft } from "react-icons/fi";
import { addQuizResult } from "@/redux/slice/quizResultSlice";

export default function QuizResult({ candidateName, candidatePost }: QuizResultProps) {
  const dispatch  = useDispatch();
  const quizResult = useSelector((state: any) => state.quizResult.quizResult);
  if (!quizResult) return null;

  const { hr_analysis, technical_analysis, overall } = quizResult;
  const globalPct   = Math.round((overall.global_score / 100) * 100);
  const globalColor = globalPct >= 70 ? "#1a9e8f" : globalPct >= 40 ? "#d99934" : "#e05c3a";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-4 py-10 space-y-4"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => { localStorage.removeItem("quizResult"); dispatch(addQuizResult(null)); }}
          className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center
                     justify-center hover:bg-white/10 transition-colors shrink-0"
        >
          <FiArrowLeft size={16} color="#f4f1ea" />
        </button>

        <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#1a9e8f] to-[#162d52]
                        border-2 border-[#1a9e8f]/40 flex items-center justify-center
                        font-medium text-sm text-[#f4f1ea] shrink-0">
          {candidateName.split(" ").map((w: string) => w[0])}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-[15px] text-[#f4f1ea]">{candidateName}</p>
          <p className="text-xs text-[#8a9bb8] mt-0.5">{candidatePost} — Quiz results</p>
        </div>

        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5
                     rounded-full shrink-0 border"
          style={{ background: `${globalColor}15`, color: globalColor, borderColor: `${globalColor}40` }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: globalColor }} />
          Score {overall.global_score.toFixed(1)} / 100
        </span>
      </div>

      {/* ── Metric cards ── */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "Global Score",   value: `${overall.global_score.toFixed(1)} / 100`,   color: globalColor },
          { label: "HR Average",     value: `${overall.hr_average.toFixed(1)} / 100`,      color: "#4a9de0"   },
          { label: "Technical Avg",  value: `${overall.technical_average.toFixed(1)} / 100`, color: "#d99934" },
        ].map(({ label, value, color }) => (
          <div key={label}
               className="flex-1 min-w-22.5 bg-white/4 border border-white/8 rounded-2xl px-4 py-3">
            <p className="text-[10px] text-[#8a9bb8] uppercase tracking-widest mb-1.5">{label}</p>
            <p className="font-serif text-xl font-semibold leading-none" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Global score bar ── */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-4">
        <div className="flex justify-between text-xs text-[#8a9bb8] mb-2">
          <span>Overall quiz performance</span>
          <span className="font-medium" style={{ color: globalColor }}>{globalPct}%</span>
        </div>
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${globalPct}%`, background: globalColor }}
          />
        </div>
      </div>

      {/* ── Summary ── */}
      <SectionCard title="Summary" accent="#1a9e8f" titleColor="#1a9e8f">
        <p className="text-sm leading-relaxed text-[#f4f1ea]/75">{overall.summary}</p>
      </SectionCard>

      {/* ── HR Questions ── */}
      <CategorySection title="HR Questions"     items={hr_analysis}        accentColor="#4a9de0" />

      {/* ── Technical Questions ── */}
      <CategorySection title="Technical Questions" items={technical_analysis} accentColor="#d99934" />
    </motion.div>
  );
}
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
  const globalPct   = Math?.round((overall?.global_score / 100) * 100);
  const globalColor = globalPct >= 70 ? "#10b981" : globalPct >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-4 py-10 space-y-4 bg-white"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => { localStorage.removeItem("quizResult"); dispatch(addQuizResult(null)); }}
          className="w-9 h-9 rounded-xl border border-gray-200 flex items-center
                     justify-center hover:bg-gray-100 transition-colors shrink-0"
        >
          <FiArrowLeft size={16} color="#64748b" />
        </button>

        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                        flex items-center justify-center font-medium text-sm text-white shadow-sm shrink-0">
          {candidateName.split(" ").map((w: string) => w[0]).join("")}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{candidateName}</p>
          <p className="text-xs text-gray-500 mt-0.5">{candidatePost} — Quiz results</p>
        </div>

        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5
                     rounded-full shrink-0"
          style={{ background: `${globalColor}15`, color: globalColor }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: globalColor }} />
          Score {overall?.global_score?.toFixed(1)} / 100
        </span>
      </div>

      {/* ── Metric cards ── */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "Global Score",   value: `${overall?.global_score.toFixed(1)} / 100`,   color: globalColor },
          { label: "HR Average",     value: `${overall?.hr_average.toFixed(1)} / 100`,      color: "#3b82f6" },
          { label: "Technical Avg",  value: `${overall?.technical_average.toFixed(1)} / 100`, color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label}
               className="flex-1 min-w-24 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">{label}</p>
            <p className="text-xl font-bold leading-none" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Global score bar ── */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Overall quiz performance</span>
          <span className="font-medium" style={{ color: globalColor }}>{globalPct}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${globalPct}%`, background: globalColor }}
          />
        </div>
      </div>

      {/* ── Summary ── */}
      <SectionCard title="Summary" accent="#2563eb" titleColor="#2563eb">
        <p className="text-sm leading-relaxed text-gray-600">{overall?.summary}</p>
      </SectionCard>

      {/* ── HR Questions ── */}
      <CategorySection title="HR Questions" items={hr_analysis} accentColor="#3b82f6" />

      {/* ── Technical Questions ── */}
      <CategorySection title="Technical Questions" items={technical_analysis} accentColor="#f59e0b" />
    </motion.div>
  );
}
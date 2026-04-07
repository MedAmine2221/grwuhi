/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";;
import { useDispatch, useSelector } from "react-redux";
import SectionCard from "./SectionCard";
import { motion } from "framer-motion";
import CategorySection from "./CategorySection";
import { QuizResultProps } from "@/constants/interfaces";
import { FiArrowLeft } from "react-icons/fi";
import { addQuizResult } from "@/redux/slice/quizResultSlice";

export default function QuizResult({ candidateName, candidatePost }: QuizResultProps) {
  const dispatch = useDispatch();
  const quizResult = useSelector((state: any) => state.quizResult.quizResult);

  if (!quizResult) return null;

  const { hr_analysis, technical_analysis, overall } = quizResult;

  const globalPct = Math.round((overall.global_score / 100) * 100);
  const globalColor =
    globalPct >= 70 ? "#1D9E75" : globalPct >= 40 ? "#d99934" : "#D85A30";

  return (
    <motion.div       
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }} 
      className="max-w-3xl mx-auto px-4 py-8 space-y-4"
    >

      {/* Header — mirrors AnalysisResult */}
      <div className="flex items-center gap-3 mb-6">
        <FiArrowLeft size = {30} onClick={
          ()=>{
            localStorage.removeItem("quizResult");
            dispatch(addQuizResult(null))
          }}
          className="cursor-pointer"
        />
        <div className="w-11 h-11 rounded-full bg-[#113d3c] text-white flex items-center justify-center font-medium text-sm shrink-0">
          {candidateName.split(" ").map((w: string) => w[0])}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-base">{candidateName}</p>
          <p className="text-sm text-muted-foreground">{candidatePost} — Quiz results</p>
        </div>

        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full shrink-0 border"
          style={{
            background: `${globalColor}15`,
            color: globalColor,
            borderColor: globalColor,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: globalColor }} />
          Score {overall.global_score.toFixed(1)} / 100
        </span>
      </div>

      {/* Score metrics */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "Global score", value: `${overall.global_score.toFixed(1)} / 100` },
          { label: "HR average", value: `${overall.hr_average.toFixed(1)} / 100` },
          { label: "Technical avg", value: `${overall.technical_average.toFixed(1)} / 100` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex-1 min-w-25 bg-background border border-border/50 rounded-xl p-3"
          >
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-sm font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* Global score bar */}
      <div className="bg-background border border-border/50 rounded-xl p-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Overall quiz performance</span>
          <span className="font-medium text-foreground" style={{ color: globalColor }}>
            {globalPct}%
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${globalPct}%`, background: globalColor }}
          />
        </div>
      </div>

      {/* Summary */}
      <SectionCard title="Summary" accent="#1D9E75">
        <p className="text-sm leading-relaxed text-foreground">{overall.summary}</p>
      </SectionCard>

      {/* HR questions */}
      <CategorySection
        title="HR Questions"
        items={hr_analysis}
        accentColor="#378ADD"
      />

      {/* Technical questions */}
      <CategorySection
        title="Technical Questions"
        items={technical_analysis}
        accentColor="#d99934"
      />
    </motion.div>
  );
}
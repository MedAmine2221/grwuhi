/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "@heroui/react";
import { useState } from "react";
import QuizModal from "./QuizModal";
import SectionCard from "./SectionCard";
import FlagItem from "./FlagItem";
import MetricCard from "./MetricCard";
import { useSelector } from "react-redux";
import {motion} from "framer-motion";
export default function AnalysisResult({ quiz }: { quiz: any }) {
  const quizReslt = useSelector((state: any)=> state.quizResult.quizResult)  
  const { analysis, evaluation_summary, hr_questions, technical_questions } = quiz;
  const score = parseInt(analysis?.match_score);
  const [start, setStart]= useState(false)
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto px-4 py-8 space-y-4"
    >

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-full bg-[#113d3c] text-white flex items-center justify-center font-medium text-sm shrink-0">
          {quiz?.condidate_name?.split(" ").map((element: any) => (
            element[0]
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-base">{quiz?.condidate_name}</p>
          <p className="text-sm text-muted-foreground">
            {quiz?.candidate_post} — {analysis?.detected_level} level
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-[#d99934]/10 text-[#d99934] border border-[#d99934] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d99934]" />
          {evaluation_summary?.hiring_recommendation === "strong yes"
            ? "Strong hire"
            : evaluation_summary?.hiring_recommendation}
        </span>
      </div>

      {/* Metrics */}
      <div className="flex gap-3 flex-wrap">
        <MetricCard label="Match score" value={analysis?.match_score} />
        <MetricCard
          label="Experience"
          value={`${analysis?.years_of_experience} yrs`}
        />
        <MetricCard label="Level" value={analysis?.detected_level} />
      </div>
      <Button className="bg-[#d99934]/10 border border-[#d99934] text-[#d99934]" onClick={()=> setStart(true)}>Start Test</Button>
      {/* Match score bar */}
      <div className="bg-background border border-border/50 rounded-xl p-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Overall compatibility</span>
          <span className="font-medium text-foreground">
            {analysis?.match_score}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Tech stack */}
      <SectionCard title="Tech stack">
        <div className="flex flex-wrap gap-1.5">
          {analysis?.main_stack.map((item: string) => (
            <span
              key={item}
              className="text-xs px-2.5 py-1 rounded-md border-muted/50 border-2 text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Match justification */}
      <SectionCard title="Match justification">
        <p className="text-sm leading-relaxed text-foreground">
          {analysis?.match_justification}
        </p>
      </SectionCard>

      {/* Green & Red flags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SectionCard title="Green flags" titleColor="#0F6E56">
          {evaluation_summary?.green_flags.map((item: string, i: number) => (
            <FlagItem key={i} text={item} color="#1D9E75" />
          ))}
        </SectionCard>
        <SectionCard title="Red flags" titleColor="#993C1D">
          {evaluation_summary?.red_flags.map((item: string, i: number) => (
            <FlagItem key={i} text={item} color="#D85A30" />
          ))}
        </SectionCard>
      </div>

      {/* Strengths & Concerns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SectionCard title="Strengths">
          {evaluation_summary?.strengths.map((item: string, i: number) => (
            <FlagItem key={i} text={item} color="#378ADD" />
          ))}
        </SectionCard>
        <SectionCard title="Concerns" titleColor="#854F0B">
          {evaluation_summary?.concerns.map((item: string, i: number) => (
            <FlagItem key={i} text={item} color="#EF9F27" />
          ))}
        </SectionCard>
      </div>

      {/* Hiring justification */}
      <SectionCard title="Hiring recommendation" accent="#1D9E75">
        <p className="text-sm leading-relaxed text-foreground">
          {evaluation_summary?.hiring_justification}
        </p>
      </SectionCard>
      <Modal>
        {start && !quizReslt && <QuizModal hr={hr_questions} technical={technical_questions} />}
      </Modal>
    </motion.div>
  );
}

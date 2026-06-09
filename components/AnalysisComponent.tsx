/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "@heroui/react";
import { useState } from "react";
import QuizModal from "./QuizModal";
import SectionCard from "./SectionCard";
import FlagItem from "./FlagItem";
import MetricCard from "./MetricCard";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPlay } from "react-icons/fi";
import { addQuiz } from "@/redux/slice/quizSlice";
import EmptyState from "./EmptyState";

export default function AnalysisResult({ quiz }: { quiz: any }) {
  const dispatch = useDispatch();
  const quizReslt = useSelector((state: any) => state.quizResult.quizResult);
  const { analysis, evaluation_summary, hr_questions, technical_questions } = quiz;
  const score = parseInt(analysis?.match_score);
  const [start, setStart] = useState(false);

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
          onClick={() => {
            localStorage.removeItem("quiz");
            dispatch(addQuiz(null));
          }}
          className="w-9 h-9 rounded-xl border border-gray-200 flex items-center
                     justify-center hover:bg-gray-100 transition-colors shrink-0"
        >
          <FiArrowLeft size={16} color="#64748b" />
        </button>

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                        flex items-center justify-center font-medium text-sm text-white shadow-sm shrink-0">
          {quiz?.condidate_name ? quiz?.condidate_name?.split(" ").map((w: any) => w[0]).join("") : "C"}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{quiz?.condidate_name}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {quiz?.candidate_post} — {analysis?.detected_level} level
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5
                         rounded-full bg-green-100 text-green-700">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
          {evaluation_summary?.hiring_recommendation === "Yes"
            ? "Excellent match — go ahead and apply with confidence!"
            : evaluation_summary?.hiring_recommendation === "Maybe" 
            ? "Solid chance — apply while working on the identified gaps." 
            : "Not ready yet — strengthen the key areas before applying."
          }
        </span>
      </div>

      {/* ── Metrics ── */}
      <div className="flex gap-3 flex-wrap">
        <MetricCard label="Match Score" value={`${analysis?.match_score}%`} variant="primary" />
        {String(analysis?.years_of_experience).length < 10 && (
          <MetricCard label="Experience" value={`${analysis?.years_of_experience} yrs`} variant="secondary" />
        )}
        <MetricCard label="Level" value={analysis?.detected_level} variant="default" />
      </div>

      {/* ── Start Test ── */}
      <Modal>
        <Button
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold
                     text-sm px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700
                     active:scale-[0.98] transition-all duration-200"
          onClick={() => setStart(true)}
        >
          <FiPlay size={14} />
          Start Test
        </Button>
        {start && !quizReslt && (
          <QuizModal hr={hr_questions} technical={technical_questions} />
        )}
      </Modal>

      {/* ── Score Bar ── */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Overall compatibility</span>
          <span className="font-medium text-gray-900">{analysis?.match_score}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 bg-blue-600"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* ── Tech Stack ── */}
      {analysis?.main_stack.length != 0 ? (
        <SectionCard title="Tech Stack">
          <div className="flex flex-wrap gap-2">
            {analysis?.main_stack.map((item: string) => (
              <span
                key={item}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200
                           text-gray-600 bg-gray-50"
              >
                {item}
              </span>
            ))}
          </div>
        </SectionCard>
      ) : (
        <SectionCard title="Tech Stack">
          <EmptyState message="No Tech Stack identified" color="#64748b" />
        </SectionCard>
      )}

      {/* ── Match Justification ── */}
      {analysis?.match_justification ? (
        <SectionCard title="Match Justification" accent="#2563eb" titleColor="#2563eb">
          <p className="text-sm leading-relaxed text-gray-600">
            {analysis?.match_justification}
          </p>
        </SectionCard>
      ) : (
        <SectionCard title="Match Justification" accent="#2563eb" titleColor="#2563eb">
          <EmptyState message="No Match Justification identified" color="#2563eb" />
        </SectionCard>
      )}

      {/* ── Green & Red Flags ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {evaluation_summary?.green_flags.length !== 0 ? (
          <SectionCard title="Green Flags" titleColor="#10b981">
            {evaluation_summary?.green_flags.map((item: string, i: number) => (
              <FlagItem key={i} text={item} color="#10b981" />
            ))}
          </SectionCard>
        ) : (
          <SectionCard title="Green Flags" titleColor="#10b981">
            <EmptyState message="No green flags identified" color="#10b981" />
          </SectionCard>
        )}
        {evaluation_summary?.red_flags.length != 0 ? (
          <SectionCard title="Red Flags" titleColor="#ef4444">
            {evaluation_summary?.red_flags.map((item: string, i: number) => (
              <FlagItem key={i} text={item} color="#ef4444" />
            ))}
          </SectionCard>
        ) : (
          <SectionCard title="Red Flags" titleColor="#ef4444">
            <EmptyState message="No red flags identified" color="#ef4444" />
          </SectionCard>
        )}
      </div>

      {/* ── Strengths & Concerns ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {evaluation_summary?.strengths.length != 0 ? (
          <SectionCard title="Strengths" titleColor="#3b82f6">
            {evaluation_summary?.strengths.map((item: string, i: number) => (
              <FlagItem key={i} text={item} color="#3b82f6" />
            ))}
          </SectionCard>
        ) : (
          <SectionCard title="Strengths" titleColor="#3b82f6">
            <EmptyState message="No Strengths identified" color="#3b82f6" />
          </SectionCard>
        )}
        {evaluation_summary?.concerns.length != 0 ? (
          <SectionCard title="Concerns" titleColor="#f59e0b">
            {evaluation_summary?.concerns.map((item: string, i: number) => (
              <FlagItem key={i} text={item} color="#f59e0b" />
            ))}
          </SectionCard>
        ) : (
          <SectionCard title="Concerns" titleColor="#f59e0b">
            <EmptyState message="No Concerns identified" color="#f59e0b" />
          </SectionCard>
        )}
      </div>

      {/* ── Hiring Recommendation ── */}
      {evaluation_summary?.hiring_justification ? (
        <SectionCard title="Hiring Recommendation" accent="#f59e0b" titleColor="#f59e0b">
          <p className="text-sm leading-relaxed text-gray-600">
            {evaluation_summary?.hiring_justification}
          </p>
        </SectionCard>
      ) : (
        <SectionCard title="Hiring Recommendation" accent="#f59e0b" titleColor="#f59e0b">
          <EmptyState message="No Hiring Recommendation identified" color="#f59e0b" />
        </SectionCard>
      )}
    </motion.div>
  );
}
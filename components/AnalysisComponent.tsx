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
      className="max-w-3xl mx-auto px-4 py-10 space-y-4"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            localStorage.removeItem("quiz");
            dispatch(addQuiz(null));
          }}
          className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center
                     justify-center hover:bg-white/10 transition-colors shrink-0"
        >
          <FiArrowLeft size={16} color="#f4f1ea" />
        </button>

        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#1a9e8f] to-[#162d52]
                        border-2 border-[#1a9e8f]/40 flex items-center justify-center
                        font-medium text-sm text-[#f4f1ea] shrink-0">
          {quiz?.condidate_name ? quiz?.condidate_name?.split(" ").map((w: any) => w[0]): "C"}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-[15px] text-[#f4f1ea]">{quiz?.condidate_name}</p>
          <p className="text-xs text-[#8a9bb8] mt-0.5">
            {quiz?.candidate_post} — {analysis?.detected_level} level
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5
                         rounded-full bg-[#d99934]/10 text-[#d99934] border border-[#d99934]/35 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d99934] animate-pulse" />
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
        <MetricCard label="Match Score" value={analysis?.match_score} variant="gold" />
        {String(analysis?.years_of_experience).length < 10 && (
          <MetricCard label="Experience" value={`${analysis?.years_of_experience} yrs`} variant="teal" />
        )}
        <MetricCard label="Level" value={analysis?.detected_level} />
      </div>
      {String(analysis?.years_of_experience).length > 10 && (
        <MetricCard label="Experience" value={`${analysis?.years_of_experience} yrs`} variant="teal" />
      )}

      {/* ── Start Test ── */}
      <Modal>
        <Button
          className="inline-flex items-center gap-2 bg-[#d99934] text-[#0d1f3c] font-semibold
                     text-sm px-5 py-2.5 rounded-xl border-none hover:bg-[#c4891f]
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
      <div className="bg-white/4 border border-white/8 rounded-2xl p-4">
        <div className="flex justify-between text-xs text-[#8a9bb8] mb-2">
          <span>Overall compatibility</span>
          <span className="font-medium text-[#f4f1ea]">{analysis?.match_score}</span>
        </div>
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${score}%`,
              background: "linear-gradient(90deg, #1a9e8f, #d99934)",
            }}
          />
        </div>
      </div>

      {/* ── Tech Stack ── */}
      {analysis?.main_stack.length != 0 ? <SectionCard title="Tech Stack">
        <div className="flex flex-wrap gap-1.5">
          {analysis?.main_stack.map((item: string) => (
            <span
              key={item}
              className="text-xs px-2.5 py-1 rounded-lg border border-white/10
                         text-[#8a9bb8] bg-white/3"
            >
              {item}
            </span>
          ))}
        </div>
      </SectionCard>:
      <SectionCard title="Tech Stack">
        <EmptyState  message="No Tech Stack identified"  color="#8a9bb8"/>
      </SectionCard>
      }

      {/* ── Match Justification ── */}
      {analysis?.match_justification ? <SectionCard title="Match Justification" accent="#1a9e8f" titleColor="#1a9e8f">
        <p className="text-sm leading-relaxed text-[#f4f1ea]/75">
          {analysis?.match_justification}
        </p>
      </SectionCard> :
      <SectionCard title="Match Justification" accent="#1a9e8f" titleColor="#1a9e8f">
        <EmptyState  message="No Match Justification identified"  color="#1a9e8f"/>
      </SectionCard>
      }

      {/* ── Green & Red Flags ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {
          evaluation_summary?.green_flags.length !== 0 ? <SectionCard title="Green Flags" titleColor="#1a9e8f">
            {evaluation_summary?.green_flags.map((item: string, i: number) => (
              <FlagItem key={i} text={item} color="#1a9e8f" />
            ))}
          </SectionCard>:
          <SectionCard title="Green Flags" titleColor="#1a9e8f">
            <EmptyState  message="No green flags identified"  color="#1a9e8f"/>
          </SectionCard>
        }
        {
          evaluation_summary?.red_flags.length != 0 ? <SectionCard title="Red Flags" titleColor="#e05c3a">
            {evaluation_summary?.red_flags.map((item: string, i: number) => (
              <FlagItem key={i} text={item} color="#e05c3a" />
            ))}
          </SectionCard>:
          <SectionCard title="Red Flags" titleColor="#e05c3a">
            <EmptyState  message="No red flags identified"  color="#e05c3a"/>
          </SectionCard>
        }
      </div>

      {/* ── Strengths & Concerns ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {evaluation_summary?.strengths.length != 0 ? <SectionCard title="Strengths" titleColor="#4a9de0">
          {evaluation_summary?.strengths.map((item: string, i: number) => (
            <FlagItem key={i} text={item} color="#4a9de0" />
          ))}
        </SectionCard>:
        <SectionCard title="Strengths" titleColor="#4a9de0">
            <EmptyState  message="No Strengths identified"  color="#4a9de0"/>
        </SectionCard>
        }
        {evaluation_summary?.concerns.length != 0 ? <SectionCard title="Concerns" titleColor="#d99934">
          {evaluation_summary?.concerns.map((item: string, i: number) => (
            <FlagItem key={i} text={item} color="#d99934" />
          ))}
        </SectionCard> : 
        <SectionCard title="Concerns" titleColor="#d99934">
            <EmptyState  message="No Concerns identified"  color="#d99934"/>
        </SectionCard>
        }
      </div>

      {/* ── Hiring Recommendation ── */}
      {evaluation_summary?.hiring_justification ? <SectionCard title="Hiring Recommendation" accent="#d99934" titleColor="#d99934">
        <p className="text-sm leading-relaxed text-[#f4f1ea]/75">
          {evaluation_summary?.hiring_justification}
        </p>
      </SectionCard> : 
      <SectionCard title="Hiring Recommendation" accent="#d99934" titleColor="#d99934">
        <EmptyState  message="No Hiring Recommendation identified"  color="#d99934"/>
      </SectionCard>
    }
    </motion.div>
  );
}
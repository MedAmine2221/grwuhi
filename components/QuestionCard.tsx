import { useState } from "react";
import ScoreRing from "./ScoreRing";
import { QuestionCardProps } from "@/constants/interfaces";

export default function QuestionCard({ item, index, accentColor }: QuestionCardProps) {
  const [open, setOpen] = useState(false);
  const answered = item.candidate_answer && item.candidate_answer !== "Pas de réponse";

  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden bg-white/3
                    hover:border-white/12 transition-colors">

      {/* ── Header row ── */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-white/3 transition-colors"
      >
        <ScoreRing score={item.score} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-widest mb-1"
             style={{ color: accentColor }}>
            Q{index + 1}
          </p>
          <p className="text-sm font-medium text-[#f4f1ea] leading-snug line-clamp-2">
            {item.question}
          </p>
        </div>
        <span className="text-[#8a9bb8] text-sm mt-1 select-none shrink-0">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {/* ── Expanded body ── */}
      {open && (
        <div className="px-4 pb-5 space-y-4 border-t border-white/6 pt-4">

          {/* Candidate answer */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#8a9bb8] mb-1.5">
              Candidate Answer
            </p>
            <p className={`text-sm leading-relaxed ${
              answered ? "text-[#f4f1ea]/80" : "text-[#8a9bb8] italic"
            }`}>
              {item.candidate_answer || "No answer provided"}
            </p>
          </div>

          {/* Feedback */}
          <div
            className="rounded-xl p-3"
            style={{
              background: `${accentColor}0f`,
              border: `1px solid ${accentColor}28`,
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-widest mb-1.5"
               style={{ color: accentColor }}>
              Feedback
            </p>
            <p className="text-sm leading-relaxed text-[#f4f1ea]/75">{item.feedback}</p>
          </div>

          {/* Ideal answer */}
          <div className="bg-white/3 border border-white/6 rounded-xl p-3">
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#8a9bb8] mb-1.5">
              Ideal Answer
            </p>
            <p className="text-sm leading-relaxed text-[#8a9bb8]">{item.ideal_answer}</p>
          </div>

        </div>
      )}
    </div>
  );
}
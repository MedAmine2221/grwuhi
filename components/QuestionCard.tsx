import { useState } from "react";
import ScoreRing from "./ScoreRing";
import { QuestionCardProps } from "@/constants/interfaces";

export default function QuestionCard({ item, index, accentColor }: QuestionCardProps) {
  const [open, setOpen] = useState(false);
  const answered = item.candidate_answer && item.candidate_answer !== "Pas de réponse";

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50
                    hover:border-gray-300 transition-colors">

      {/* ── Header row ── */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-100/50 transition-colors"
      >
        <ScoreRing score={item.score} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1"
             style={{ color: accentColor }}>
            Q{index + 1}
          </p>
          <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
            {item.question}
          </p>
        </div>
        <span className="text-gray-400 text-sm mt-1 select-none shrink-0">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {/* ── Expanded body ── */}
      {open && (
        <div className="px-4 pb-5 space-y-4 border-t border-gray-200 pt-4">

          {/* Candidate answer */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
              Candidate Answer
            </p>
            <p className={`text-sm leading-relaxed ${
              answered ? "text-gray-700" : "text-gray-400 italic"
            }`}>
              {item.candidate_answer || "No answer provided"}
            </p>
          </div>

          {/* Feedback */}
          <div
            className="rounded-xl p-3"
            style={{
              background: `${accentColor}0a`,
              border: `1px solid ${accentColor}20`,
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-wider mb-1.5"
               style={{ color: accentColor }}>
              Feedback
            </p>
            <p className="text-sm leading-relaxed text-gray-600">{item.feedback}</p>
          </div>

          {/* Ideal answer */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1.5">
              Ideal Answer
            </p>
            <p className="text-sm leading-relaxed text-gray-500">{item.ideal_answer}</p>
          </div>

        </div>
      )}
    </div>
  );
}
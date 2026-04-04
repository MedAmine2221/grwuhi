/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ScoreRing from "./ScoreRing";

export default function QuestionCard({
  item,
  index,
  accentColor,
}: {
  item: any;
  index: number;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);
  const answered = item.candidate_answer && item.candidate_answer !== "Pas de réponse";

  return (
    <div className="border border-border/40 rounded-xl overflow-hidden bg-background">
      {/* header row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/20 transition-colors"
      >
        <ScoreRing score={item.score} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
            Q{index + 1}
          </p>
          <p className="text-sm font-medium leading-snug line-clamp-2">{item.question}</p>
        </div>
        <span className="text-muted-foreground text-lg mt-1 select-none">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {/* expanded body */}
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-border/30 pt-3">
          {/* candidate answer */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Candidate answer
            </p>
            <p
              className={`text-sm leading-relaxed ${
                answered ? "text-foreground" : "text-muted-foreground italic"
              }`}
            >
              {item.candidate_answer || "No answer provided"}
            </p>
          </div>

          {/* feedback */}
          <div className="rounded-lg p-3" style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}30` }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
              Feedback
            </p>
            <p className="text-sm leading-relaxed text-foreground">{item.feedback}</p>
          </div>

          {/* ideal answer */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Ideal answer
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.ideal_answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

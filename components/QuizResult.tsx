/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import SectionCard from "./SectionCard";

// ── helpers ──────────────────────────────────────────────────────────────────

function ScoreRing({ score, max = 10 }: { score: number; max?: number }) {
  const pct = Math.round((score / max) * 100);
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color =
    pct >= 70 ? "#1D9E75" : pct >= 40 ? "#d99934" : "#D85A30";

  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#1e2a2a" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.7s ease" }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
        style={{ color }}
      >
        {score}/{max}
      </span>
    </div>
  );
}

function QuestionCard({
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

function CategorySection({
  title,
  items,
  accentColor,
}: {
  title: string;
  items: any[];
  accentColor: string;
}) {
  const avg = items.reduce((s: number, q: any) => s + q.score, 0) / items.length;
  const pct = Math.round((avg / 10) * 100);

  return (
    <SectionCard title={title}>
      {/* mini progress bar */}
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Average score</span>
        <span className="font-medium text-foreground">{avg.toFixed(1)} / 10</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: pct >= 70 ? "#1D9E75" : pct >= 40 ? "#d99934" : "#D85A30",
          }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item: any, i: number) => (
          <QuestionCard key={i} item={item} index={i} accentColor={accentColor} />
        ))}
      </div>
    </SectionCard>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function QuizResult({ candidateName, candidatePost }: { candidateName: string; candidatePost: string }) {
  const quizResult = useSelector((state: any) => state.quizResult.quizResult);

  if (!quizResult) return null;

  const { hr_analysis, technical_analysis, overall } = quizResult;

  const globalPct = Math.round((overall.global_score / 10) * 100);
  const globalColor =
    globalPct >= 70 ? "#1D9E75" : globalPct >= 40 ? "#d99934" : "#D85A30";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">

      {/* Header — mirrors AnalysisResult */}
      <div className="flex items-center gap-3 mb-6">
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
          Score {overall.global_score.toFixed(1)} / 10
        </span>
      </div>

      {/* Score metrics */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "Global score", value: `${overall.global_score.toFixed(1)} / 10` },
          { label: "HR average", value: `${overall.hr_average.toFixed(1)} / 10` },
          { label: "Technical avg", value: `${overall.technical_average.toFixed(1)} / 10` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex-1 min-w-[100px] bg-background border border-border/50 rounded-xl p-3"
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
    </div>
  );
}
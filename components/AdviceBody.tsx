/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdviceBodyProps } from "@/constants/interfaces";

export default function AdviceBody({ data, setActiveStep, activeStep, step }: AdviceBodyProps) {
  return (
    <main className="max-w-5xl mx-auto px-6 lg:px-8 py-12">

      {/* ── Tab Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {data.map((s: any, i: any) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`relative rounded-xl px-4 py-3 text-left transition-all duration-200 border
              ${activeStep === i
                ? "bg-[#d99934]/10 border-[#d99934]/40 shadow-[0_0_20px_rgba(217,153,52,0.08)]"
                : "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12]"
              }`}
          >
            {activeStep === i && (
              <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-[#d99934]" />
            )}
            <span className={`block text-[11px] font-medium mb-1 tracking-widest
              ${activeStep === i ? "text-[#d99934]" : "text-[#8a9bb8]"}`}>
              {s.number}
            </span>
            <span className={`text-sm font-semibold leading-snug
              ${activeStep === i ? "text-[#f4f1ea]" : "text-[#8a9bb8]"}`}>
              {s.title}
            </span>
          </button>
        ))}
      </div>

      {/* ── Content Panel ── */}
      <div
        key={activeStep}
        className="bg-white/4 border border-white/[0.07] rounded-2xl px-8 py-10
                  animate-[fadeUp_0.35s_ease_both]"
        style={{ borderLeft: "2px solid rgba(217,153,52,0.6)" }}
      >
        {/* Heading row */}
        <div className="flex items-baseline gap-5 mb-8">
          <span className="font-bold text-6xl leading-none select-none text-[#d99934]/15 tracking-tighter">
            {step.number}
          </span>
          <h2 className="font-semibold text-2xl text-[#f4f1ea]">{step.title}</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {step.items.map((item: any, j: any) => (
            <div
              key={j}
              className="bg-white/4 border border-white/[0.07] rounded-xl p-5
                        transition-all duration-200 hover:-translate-y-0.5
                        hover:border-[#d99934]/30 hover:bg-white/[0.07]
                        animate-[fadeUp_0.4s_ease_both]"
              style={{
                animationDelay: `${j * 0.06}s`,
                borderTop: `2px solid ${j % 2 === 0 ? "rgba(26,158,143,0.5)" : "rgba(217,153,52,0.4)"}`
              }}
            >
              <p className="font-semibold text-[#f4f1ea] text-sm mb-2 leading-snug">
                {item.label}
              </p>
              <p className="text-[#8a9bb8] text-xs leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
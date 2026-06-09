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
                ? "bg-blue-50 border-blue-300 shadow-sm"
                : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
          >
            {activeStep === i && (
              <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-blue-600" />
            )}
            <span className={`block text-[11px] font-medium mb-1 tracking-wider
              ${activeStep === i ? "text-blue-600" : "text-gray-400"}`}>
              {s.number}
            </span>
            <span className={`text-sm font-semibold leading-snug
              ${activeStep === i ? "text-gray-900" : "text-gray-500"}`}>
              {s.title}
            </span>
          </button>
        ))}
      </div>

      {/* ── Content Panel ── */}
      <div
        key={activeStep}
        className="bg-white border border-gray-200 rounded-2xl px-8 py-10 shadow-sm"
        style={{ borderLeft: "3px solid #2563eb" }}
      >
        {/* Heading row */}
        <div className="flex items-baseline gap-5 mb-8">
          <span className="font-bold text-6xl leading-none select-none text-blue-100 tracking-tighter">
            {step.number}
          </span>
          <h2 className="font-bold text-2xl text-gray-900">{step.title}</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {step.items.map((item: any, j: any) => (
            <div
              key={j}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5
                        transition-all duration-200 hover:-translate-y-0.5
                        hover:border-blue-300 hover:bg-gray-100/50"
              style={{
                borderTop: `2px solid ${j % 2 === 0 ? "#3b82f6" : "#f59e0b"}`
              }}
            >
              <p className="font-semibold text-gray-900 text-sm mb-2 leading-snug">
                {item.label}
              </p>
              <p className="text-gray-500 text-xs leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
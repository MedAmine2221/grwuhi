
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal, Spinner } from '@heroui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const PER_QUESTION_TIME = 90;

export default function QuizModal() {
  const quiz = useSelector((state: any) => state.quiz.quiz);

  const [current, setCurrent] = useState(0);
  const [seconds, setSeconds] = useState(PER_QUESTION_TIME);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const totalQuestions = quiz?.hr_questions?.length ?? 0;
  const progress = Math.round((seconds / PER_QUESTION_TIME) * 100);
  const isUrgent = seconds <= 30;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // Reset timer on question change
    useEffect(() => {
      const id = setTimeout(() => setSeconds(PER_QUESTION_TIME), 0);
      return () => clearTimeout(id);
    }, [current]);

  // Countdown + auto-advance
  useEffect(() => {
    if (seconds <= 0) {
      if (current < totalQuestions - 1) {
        const t = setTimeout(() => setCurrent(c => c + 1), 0);
        return () => clearTimeout(t);
      }
      return;
    }
    const id = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds, current, totalQuestions]);

  const goNext = () => { if (current < totalQuestions - 1) setCurrent(c => c + 1); };
  const goPrev = () => { if (current > 0) setCurrent(c => c - 1); };

  const currentQuestion = quiz?.hr_questions?.[current];
  return (
    <>
      {!quiz ? (
        /* ─────────── Welcome Screen ─────────── */
        <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
          <Modal.Container className="flex items-center justify-center min-h-screen p-4">
            <Modal.Dialog className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-[#113d3c]/10">
              {/* Header */}
              <Modal.CloseTrigger className='w-10 h-10' />
              <div className="relative px-8 pt-10 pb-7 bg-linear-to-b from-[#113d3c]/5 to-transparent overflow-hidden">
                {/* Avatar */}
                <div className="mx-auto mb-5 w-50 h-50 rounded-full p-0.75 bg-linear-to-br from-[#d99934] to-[#113d3c]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <Image src="/hiring-interview.png" alt="hiring-interview" loading="eager" width={88} height={88} className="object-cover" />
                  </div>
                </div>
                <h1 className="text-center text-xl font-bold text-[#113d3c] tracking-tight">The HR and technical test for the position you applied for is currently under development</h1>
              </div>

              {/* Body */}
              <div className="px-8 pb-8">
                <div className="flex items-center justify-center">
                  <Spinner className='w-30 h-30'/>
                </div>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>

      ) : quiz === "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants." ? (
        <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">

          <Modal.Container className="flex items-center justify-center min-h-screen p-4">

            <Modal.Dialog className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-[#113d3c]/10">
              <Modal.CloseTrigger className='w-10 h-10' />
              <div className="px-8 pb-8">
                <div className="flex items-center justify-center">
                  <Image src="/Error-429.png" alt="error" loading="eager" width={1000} height={1000} className="object-cover ml-4" />
                </div>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      ) : (
        /* ─────────── Quiz Screen ─────────── */
        <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
          <Modal.Container className="flex items-center justify-center min-h-screen p-4">
            <Modal.Dialog className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-[#113d3c]/10">
              <Modal.CloseTrigger className='w-10 h-10' />
              {/* ── Timer bar ── */}
              <div className="px-6 pt-5 pb-4 bg-[#113d3c]/3 border-b border-[#113d3c]/8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isUrgent ? 'bg-red-500 animate-ping' : 'bg-[#d99934] animate-pulse'}`} />
                    <span className={`font-mono text-2xl font-semibold tracking-widest transition-colors ${isUrgent ? 'text-red-500' : 'text-[#113d3c]'}`}>
                      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#113d3c]/6 text-[#113d3c]/55 text-xs font-bold font-mono">
                    {current + 1} / {totalQuestions}
                  </span>
                </div>

                {/* Progress */}
                <div className="h-1.5 w-full bg-[#113d3c]/8 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${isUrgent ? 'bg-linear-to-r from-red-500 to-red-400' : 'bg-linear-to-r from-[#d99934] to-[#f0b840]'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* ── Question ── */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#d99934]/10 border border-[#d99934]/25 text-[#d99934] text-[11px] font-bold font-mono shrink-0">
                    {String(current + 1).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-bold text-[#113d3c]/35 uppercase tracking-widest">Question</span>
                </div>

                <p className="text-sm font-semibold text-[#113d3c] leading-relaxed mb-5 min-h-12">
                  {currentQuestion?.question}
                </p>

                <textarea
                  rows={4}
                  placeholder="Type your answer here…"
                  value={answers[current] ?? ''}
                  onChange={e => setAnswers(prev => ({ ...prev, [current]: e.target.value }))}
                  className="w-full bg-[#113d3c]/3 border border-[#113d3c]/10 rounded-xl px-4 py-3 text-sm text-[#113d3c] placeholder-[#113d3c]/25 outline-none resize-none focus:border-[#d99934]/50 focus:bg-[#d99934]/2 transition-all"
                />
              </div>

              {/* ── Navigation ── */}
              <div className="px-6 pb-6 pt-3 border-t border-[#113d3c]/[0.07] flex items-center gap-3">

                {/* Prev */}
                <button
                  onClick={goPrev}
                  disabled={current === 0}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-[#113d3c]/12 bg-[#113d3c]/4 text-[#113d3c]/50 hover:bg-[#113d3c]/9 hover:text-[#113d3c] transition-all disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer text-xl"
                >
                  <FiChevronLeft />
                </button>

                {/* Dot indicators */}
                <div className="flex-1 flex items-center justify-center gap-1.5">
                  {quiz.hr_questions.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`rounded-full transition-all duration-200 cursor-pointer ${
                        i === current
                          ? 'w-5 h-2 bg-[#d99934]'
                          : answers[i]
                          ? 'w-2 h-2 bg-[#113d3c]/40'
                          : 'w-2 h-2 bg-[#113d3c]/15'
                      }`}
                    />
                  ))}
                </div>

                {/* Next / Submit */}
                {current < totalQuestions - 1 ? (
                  <button
                    onClick={goNext}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#113d3c] text-white hover:bg-[#1a5a58] hover:shadow-md hover:shadow-[#113d3c]/20 hover:-translate-y-px transition-all cursor-pointer text-xl"
                  >
                    <FiChevronRight />
                  </button>
                ) : (
                  <button className="h-11 px-5 flex items-center justify-center rounded-xl bg-[#d99934] text-white text-xs font-bold hover:bg-[#e8a840] hover:shadow-md hover:shadow-[#d99934]/25 hover:-translate-y-px transition-all cursor-pointer">
                    Submit
                  </button>
                )}
              </div>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      )}
    </>
  );
}
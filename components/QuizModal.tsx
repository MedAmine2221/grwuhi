/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PER_QUESTION_TIME } from '@/constants';
import { TestType } from '@/constants/enums';
import { AllAnswersType, QuestionAnswer, QuizModalProps } from '@/constants/interfaces';
import { setLoadingFalse, setLoadingTrue } from '@/redux/slice/loadingSlice';
import { addQuizResult } from '@/redux/slice/quizResultSlice';
import { analyseResponses } from '@/utils/functions';
import { Modal } from '@heroui/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

export default function QuizModal({ hr, technical }: QuizModalProps) {
  const dispatch = useDispatch();
  const quiz    = useSelector((state: any) => state.quiz.quiz);
  const loading = useSelector((state: any) => state.loading.loading);

  const [phase,            setPhase]            = useState<TestType>(TestType.HR);
  const [current,          setCurrent]          = useState(0);
  const [seconds,          setSeconds]          = useState(PER_QUESTION_TIME);
  const [draft,            setDraft]            = useState("");
  const [hrAnswers,        setHrAnswers]        = useState<QuestionAnswer[]>([]);
  const [technicalAnswers, setTechnicalAnswers] = useState<QuestionAnswer[]>([]);
  const [msgAtt,           setMsgAtt]           = useState("This operation may take a few minutes…");

  const draftRef = useRef(draft);
  useEffect(() => { draftRef.current = draft; }, [draft]);

  const questions       = phase === TestType.HR ? (hr ?? []) : (technical ?? []);
  const totalQuestions  = questions.length;
  const currentQuestion = questions[current];
  const progress        = Math.round((seconds / PER_QUESTION_TIME) * 100);
  const isUrgent        = seconds <= 30;
  const mins            = Math.floor(seconds / 60);
  const secs            = seconds % 60;
  const isLastQuestion  = current === totalQuestions - 1;
  const isLastPhase     = phase === TestType.TECHNICAL;
  const answersForPhase = phase === TestType.HR ? hrAnswers : technicalAnswers;
  const dotAnswered     = (i: number) => answersForPhase[i] !== undefined;

  const saveCurrentAnswer = (idx: number, value: string, ph: TestType) => {
    const entry: QuestionAnswer = {
      question: ph === TestType.HR ? hr?.[idx]?.question : technical?.[idx]?.question,
      answer: value.trim() === "" ? null : value.trim(),
    };
    const setter = ph === TestType.HR ? setHrAnswers : setTechnicalAnswers;
    setter(prev => { const next = [...prev]; next[idx] = entry; return next; });
  };

  const goNext = () => {
    saveCurrentAnswer(current, draftRef.current, phase);
    if (current < totalQuestions - 1) {
      setCurrent(c => c + 1);
    } else if (phase === TestType.HR) {
      setPhase(TestType.TECHNICAL);
      setCurrent(0);
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch(setLoadingTrue());
      const lastEntry: QuestionAnswer = {
        question: technical?.[current]?.question,
        answer: draftRef.current.trim() === "" ? null : draftRef.current.trim(),
      };
      setTechnicalAnswers(prev => { const next = [...prev]; next[current] = lastEntry; return next; });
      const allAnswers: AllAnswersType = { hr: hrAnswers, technical: technicalAnswers };
      const response = await analyseResponses(allAnswers, hr, technical);
      if (typeof response !== "string") return;
      const clean  = response.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = clean.startsWith("Je suis") || clean.startsWith("Je ne peux")
        ? clean : JSON.parse(clean);
      dispatch(addQuizResult(parsed));
      if (typeof parsed === "object") localStorage.setItem("quizResult", JSON.stringify(parsed));
    } catch (e) { console.error(e); }
    finally { dispatch(setLoadingFalse()); }
  };

  useEffect(() => {
    const saved = phase === TestType.HR
      ? hrAnswers[current]?.answer ?? ""
      : technicalAnswers[current]?.answer ?? "";
    setDraft(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, phase]);

  useEffect(() => {
    const raw = currentQuestion?.estimated_time_seconds ?? PER_QUESTION_TIME;
    setSeconds(typeof raw === "string" ? parseInt(raw) : raw);
  }, [current, currentQuestion, phase]);

  useEffect(() => {
    if (seconds <= 0) {
      if (!(current === totalQuestions - 1 && phase === TestType.TECHNICAL)) goNext();
      return;
    }
    const id = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    const t = setTimeout(() => setMsgAtt("Your answers are being analyzed. Please wait…"), 25000);
    return () => clearTimeout(t);
  });

  const isHR = phase === TestType.HR;

  return (
    <>
      {quiz === "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants." ? (
        <Modal.Backdrop className="bg-[#0d1f3c]/80 backdrop-blur-sm">
          <Modal.Container className="flex items-center justify-center min-h-screen p-4">
            <Modal.Dialog className="relative w-full max-w-sm bg-[#0d1f3c] border border-white/8
                                     rounded-2xl overflow-hidden shadow-2xl">
              <Modal.CloseTrigger className="w-10 h-10" />
              <div className="px-8 pb-8 flex items-center justify-center">
                <Image src="/Error-429.png" alt="error" loading="eager"
                       width={1000} height={1000} className="object-cover ml-4" />
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>

      ) : (
        <Modal.Backdrop className="bg-[#0d1f3c]/75 backdrop-blur-sm">
          <Modal.Container className="flex items-center justify-center min-h-screen p-4">
            <Modal.Dialog className="relative w-full max-w-sm bg-[#0f2240] border border-white/8
                                     rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <Modal.CloseTrigger className="w-10 h-10 text-[#8a9bb8]" />

              {/* ── Phase badge ── */}
              <div className="flex justify-center pt-5 pb-1">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                  text-[10px] font-medium uppercase tracking-widest border
                                  ${isHR
                                    ? "bg-[#d99934]/10 text-[#d99934] border-[#d99934]/25"
                                    : "bg-[#1a9e8f]/10 text-[#1a9e8f] border-[#1a9e8f]/25"
                                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse
                    ${isHR ? "bg-[#d99934]" : "bg-[#1a9e8f]"}`} />
                  {isHR ? "HR Questions" : "Technical Questions"}
                </span>
              </div>

              {/* ── Timer bar ── */}
              <div className="px-6 pt-4 pb-5 border-b border-white/6">
                {!loading && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 transition-colors
                          ${isUrgent ? "bg-red-400 animate-ping" : "bg-[#d99934] animate-pulse"}`} />
                        <span className={`text-2xl font-semibold tracking-widest font-mono transition-colors
                          ${isUrgent ? "text-red-400" : "text-[#f4f1ea]"}`}>
                          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-xs text-[#8a9bb8] bg-white/5 border border-white/8
                                       px-2.5 py-1 rounded-full font-medium">
                        {current + 1} / {totalQuestions}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/[0.07] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${progress}%`,
                          background: isUrgent
                            ? "linear-gradient(90deg,#ef4444,#f87171)"
                            : "linear-gradient(90deg,#d99934,#f0b840)",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* ── Question ── */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center
                                   text-[11px] font-bold shrink-0 border
                                   ${isHR
                                     ? "bg-[#d99934]/10 border-[#d99934]/25 text-[#d99934]"
                                     : "bg-[#1a9e8f]/10 border-[#1a9e8f]/25 text-[#1a9e8f]"
                                   }`}>
                    {String(current + 1).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] font-medium text-[#8a9bb8] uppercase tracking-widest">
                    Question
                  </span>
                </div>

                <p className="text-sm font-medium text-[#f4f1ea] leading-relaxed mb-5 min-h-12">
                  {currentQuestion?.question}
                </p>

                <textarea
                  rows={4}
                  placeholder="Type your answer here…"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  className="w-full bg-white/4 border border-white/8 rounded-xl
                             px-4 py-3 text-sm text-[#f4f1ea] placeholder:text-[#8a9bb8]/60
                             outline-none resize-none
                             focus:border-[#d99934]/40 focus:bg-[#d99934]/3
                             transition-all duration-200"
                />
              </div>

              {/* ── Navigation ── */}
              <div className="px-6 pb-6 pt-3 border-t border-white/6 flex flex-col items-center gap-4">

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {questions.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => { saveCurrentAnswer(current, draftRef.current, phase); setCurrent(i); }}
                      className={`rounded-full transition-all duration-200
                        ${i === current
                          ? `w-5 h-2 ${isHR ? "bg-[#d99934]" : "bg-[#1a9e8f]"}`
                          : dotAnswered(i)
                            ? "w-2 h-2 bg-white/30"
                            : "w-2 h-2 bg-white/10"
                        }`}
                    />
                  ))}
                </div>

                {/* CTA button */}
                {isLastQuestion && isLastPhase ? (
                  !loading ? (
                    <button
                      onClick={handleSubmit}
                      className="h-11 px-8 rounded-xl bg-[#d99934] text-[#0d1f3c] text-xs
                                 font-bold tracking-wide hover:bg-[#c4891f] active:scale-[0.98]
                                 transition-all duration-200"
                    >
                      Submit Answers
                    </button>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/scanne_response.gif" width={80} height={80} alt="" />
                      <p className="text-[#d99934] text-xs font-medium text-center animate-pulse">
                        {msgAtt}
                      </p>
                    </div>
                  )
                ) : isLastQuestion && phase === TestType.HR ? (
                  <button
                    onClick={goNext}
                    className="h-11 px-6 rounded-xl bg-[#1a9e8f] text-[#0d1f3c] text-xs
                               font-bold tracking-wide hover:bg-[#0d7a6e] active:scale-[0.98]
                               transition-all duration-200 whitespace-nowrap"
                  >
                    Technical Questions
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    className="h-11 w-11 rounded-xl bg-white/[0.07] border border-white/10
                               text-[#f4f1ea] text-sm flex items-center justify-center
                               hover:bg-white/12 active:scale-[0.98] transition-all duration-200"
                  >
                    <FiSend size= {20} />
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
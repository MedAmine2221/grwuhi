/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";;
import { PER_QUESTION_TIME } from '@/constants';
import { TestType } from '@/constants/enums';
import { AllAnswersType, QuestionAnswer, QuizModalProps } from '@/constants/interfaces';
import { setLoadingFalse, setLoadingTrue } from '@/redux/slice/loadingSlice';
import { addQuizResult } from '@/redux/slice/quizResultSlice';
import { analyseResponses } from '@/utils/functions';
import { Modal } from '@heroui/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ─── Component ───────────────────────────────────────────────────────────────
export default function QuizModal({
  hr,
  technical,
}: QuizModalProps) {
  const dispatch = useDispatch();
  const quiz = useSelector((state: any) => state.quiz.quiz);
  const loading = useSelector((state: any)=> state.loading.loading);
  
  const [phase, setPhase] = useState<TestType>(TestType.HR);
  const [current, setCurrent] = useState(0);
  const [seconds, setSeconds] = useState(PER_QUESTION_TIME);

  // Draft text currently visible in the textarea
  const [draft, setDraft] = useState("");

  // Saved answers – one array per phase, each slot: { question, answer }
  const [hrAnswers, setHrAnswers] = useState<QuestionAnswer[]>([]);
  const [technicalAnswers, setTechnicalAnswers] = useState<QuestionAnswer[]>([]);

  // Ref so timer callbacks always read the latest draft without stale closures
  const draftRef = useRef(draft);
  useEffect(() => { draftRef.current = draft; }, [draft]);

  const questions: any[] = phase === TestType.HR
    ? (hr        ?? [])
    : (technical ?? []);

  const totalQuestions  = questions.length;
  const currentQuestion = questions[current];

  const progress = Math.round((seconds / PER_QUESTION_TIME) * 100);
  const isUrgent = seconds <= 30;
  const mins     = Math.floor(seconds / 60);
  const secs     = seconds % 60;

  // ── Save current answer (or null) into the right phase array ──────────────
  const saveCurrentAnswer = (idx: number, value: string, ph: TestType) => {
    const entry: QuestionAnswer = {
      question: ph === TestType.HR
        ? hr?.[idx]?.question
        : technical?.[idx]?.question,
      answer: value.trim() === "" ? null : value.trim(),
    };

    if (ph === TestType.HR) {
      setHrAnswers(prev => {
        const next = [...prev];
        next[idx]  = entry;
        return next;
      });
    } else {
      setTechnicalAnswers(prev => {
        const next = [...prev];
        next[idx]  = entry;
        return next;
      });
    }
  };

  // ── Navigate: save → move forward (or switch phase) ──────────────────────
  const goNext = () => {
    saveCurrentAnswer(current, draftRef.current, phase);

    if (current < totalQuestions - 1) {
      setCurrent(c => c + 1);
    } else if (phase === TestType.HR) {
      // HR done → switch to Technical phase
      setPhase(TestType.TECHNICAL);
      setCurrent(0);
    }
    // If last technical question → handled by the Submit button
  };

  // ── Submit: save last answer then log / dispatch ───────────────────────────
  const handleSubmit = async () => {
    try {
      dispatch(setLoadingTrue());
      // Save last answer synchronously via functional updater
      const lastEntry: QuestionAnswer = {
        question: technical?.[current]?.question,
        answer:   draftRef.current.trim() === "" ? null : draftRef.current.trim(),
      };

      setTechnicalAnswers(prev => {
        const next  = [...prev];
        next[current] = lastEntry;
        return next;
      });
      const allAnswers: AllAnswersType = {
        hr: hrAnswers,
        technical: technicalAnswers
      }

      const response = await analyseResponses(allAnswers, hr, technical)
      if (typeof response !== "string") {
        console.error("No response from gemini");
        return;
      }

      const clean = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
      const parsed = clean === "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants." || clean === "Je ne peux pas répondre pour le moment. Veuillez réessayer plus tard." ? clean :  JSON?.parse(clean);        
      dispatch(addQuizResult(parsed));
    } catch (error) {
      console.error(error);      
    } finally {
      dispatch(setLoadingFalse());
    }
  };
  // ── Restore draft when switching questions ─────────────────────────────────
  useEffect(() => {
    const saved =
      phase === TestType.HR
        ? hrAnswers[current]?.answer ?? ""
        : technicalAnswers[current]?.answer ?? "";
    setDraft(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, phase]);

  // ── Timer reset ────────────────────────────────────────────────────────────
  useEffect(() => {
    setSeconds(PER_QUESTION_TIME);
  }, [current, phase]);

  // ── Countdown + auto-advance ───────────────────────────────────────────────
  useEffect(() => {
    if (seconds <= 0) {
      // Only auto-advance if not on the very last question of the last phase
      if (!(current === totalQuestions - 1 && phase === TestType.TECHNICAL)) {
        goNext();
      }
      return;
    }
    const id = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const isLastQuestion = current === totalQuestions - 1;
  const isLastPhase    = phase === TestType.TECHNICAL;
  const answersForPhase = phase === TestType.HR ? hrAnswers : technicalAnswers;
  const dotAnswered     = (i: number) => answersForPhase[i] !== undefined;
  const [msgAtt, setMsgAtt] = useState("This operation may take a few minutes")
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setMsgAtt("Your CV is being analyzed. Please wait a moment…")
    },25000);
    return(()=>clearTimeout(timer));
  })
  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {quiz === "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants." ? (
        /* ─────────── Error Screen ─────────── */
        <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
          <Modal.Container className="flex items-center justify-center min-h-screen p-4">
            <Modal.Dialog className="relative w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-[#113d3c]/10">
              <Modal.CloseTrigger className="w-10 h-10" />
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
              <Modal.CloseTrigger className="w-10 h-10" />

              {/* ── Phase badge ── */}
              <div className="flex justify-center pt-4 pb-1">
                <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  phase === TestType.HR
                    ? "bg-[#d99934]/15 text-[#d99934]"
                    : "bg-[#113d3c]/10 text-[#113d3c]"
                }`}>
                  {phase === TestType.HR ? "🤝 HR Questions" : "⚙️ Technical Questions"}
                </span>
              </div>

              {/* ── Timer bar ── */}
              <div className="px-6 pt-3 pb-4 bg-[#113d3c]/3 border-b border-[#113d3c]/8">
                {!loading && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${isUrgent ? "bg-red-500 animate-ping" : "bg-[#d99934] animate-pulse"}`} />
                        <span className={`font-mono text-2xl font-semibold tracking-widest transition-colors ${isUrgent ? "text-red-500" : "text-[#113d3c]"}`}>
                          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#113d3c]/6 text-[#113d3c]/55 text-xs font-bold font-mono">
                        {current + 1} / {totalQuestions}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#113d3c]/8 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${isUrgent
                            ? "bg-linear-to-r from-red-500 to-red-400"
                            : "bg-linear-to-r from-[#d99934] to-[#f0b840]"}`}
                        style={{ width: `${progress}%` }} 
                      />
                    </div>
                  </>
                )}
              </div>

              {/* ── Question ── */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#d99934]/10 border border-[#d99934]/25 text-[#d99934] text-[11px] font-bold font-mono shrink-0">
                    {String(current + 1).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] font-bold text-[#113d3c]/35 uppercase tracking-widest">Question</span>
                </div>

                <p className="text-sm font-semibold text-[#113d3c] leading-relaxed mb-5 min-h-12">
                  {currentQuestion?.question}
                </p>

                <textarea
                  rows={4}
                  placeholder="Type your answer here…"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  className="w-full bg-[#113d3c]/3 border border-[#113d3c]/10 rounded-xl px-4 py-3 text-sm text-[#113d3c] placeholder-[#113d3c]/25 outline-none resize-none focus:border-[#d99934]/50 focus:bg-[#d99934]/2 transition-all"
                />
              </div>

              {/* ── Navigation ── */}
              <div className="px-6 pb-6 pt-3 border-t border-[#113d3c]/[0.07] flex flex-col items-center gap-3">
                {/* Dot indicators */}
                <div className="flex-1 flex items-center justify-center gap-1.5 flex-wrap">
                  {questions.map((_: any, i: number) => (
                    <button
                      key={i}
                      className={`rounded-full transition-all duration-200 cursor-pointer ${
                        i === current
                          ? "w-5 h-2 bg-[#d99934]"
                          : dotAnswered(i)
                          ? "w-2 h-2 bg-[#113d3c]/40"
                          : "w-2 h-2 bg-[#113d3c]/15"
                      }`}
                    />
                  ))}
                </div>

                {/* ── Next / "Technical Questions" / Submit ── */}
                {isLastQuestion && isLastPhase ? (
                  // Last question of technical → Submit
                  !loading ? (
                      <button
                        onClick={handleSubmit}
                        className="h-11 px-5 flex items-center justify-center rounded-xl bg-[#d99934] text-white text-xs font-bold hover:bg-[#e8a840] hover:shadow-md hover:shadow-[#d99934]/25 hover:-translate-y-px transition-all cursor-pointer"
                      >
                        Submit
                      </button>
                    ):(
                      <div className='flex flex-col items-center'>
                        <Image src={"/scanne_response.gif"} width={100} height={100} alt={""} />
                        <p className="text-[#d99934] text-sm font-bold text-center">{msgAtt}</p>
                      </div>
                    )
                ) : isLastQuestion && phase === TestType.HR ? (
                  // Last HR question → show "Technical Questions" button
                  <button
                    onClick={goNext}
                    className="h-11 px-4 flex items-center justify-center gap-1.5 rounded-xl bg-[#113d3c] text-white text-xs font-bold hover:bg-[#1a5a58] hover:shadow-md hover:shadow-[#113d3c]/20 hover:-translate-y-px transition-all cursor-pointer whitespace-nowrap"
                  >
                    Technical Questions →
                  </button>
                ) : (
                  // Any other question → plain next arrow
                  <button
                    onClick={goNext}
                    className="text-xs w-11 h-11 flex items-center justify-center rounded-xl bg-[#113d3c] text-white hover:bg-[#1a5a58] hover:shadow-md hover:shadow-[#113d3c]/20 hover:-translate-y-px transition-all cursor-pointer"
                  >
                    Next
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
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PER_QUESTION_TIME } from '@/constants';
import { TestType } from '@/constants/enums';
import { AllAnswersType, QuestionAnswer, QuizModalProps } from '@/constants/interfaces';
import { setLoadingFalse, setLoadingTrue } from '@/redux/slice/loadingSlice';
import { addQuizResult } from '@/redux/slice/quizResultSlice';
import { analyseResponses } from '@/utils/functions';
import { Modal } from '@heroui/react';
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
    <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
      <Modal.Container className="flex items-center justify-center min-h-screen p-4">
        <Modal.Dialog className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-xl">
          <Modal.CloseTrigger className="w-10 h-10 text-gray-400 hover:text-gray-600" />

          {/* ── Phase badge ── */}
          <div className="flex justify-center pt-6 pb-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
              ${isHR
                ? "bg-amber-100 text-amber-700"
                : "bg-blue-100 text-blue-700"
              }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse
                ${isHR ? "bg-amber-600" : "bg-blue-600"}`} />
              {isHR ? "HR Questions" : "Technical Questions"}
            </span>
          </div>

          {/* ── Timer bar ── */}
          <div className="px-6 pt-4 pb-5 border-b border-gray-100">
            {!loading && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors
                      ${isUrgent ? "bg-red-500 animate-ping" : "bg-blue-600 animate-pulse"}`} />
                    <span className={`text-3xl font-mono font-bold tracking-wider transition-colors
                      ${isUrgent ? "text-red-600" : "text-gray-900"}`}>
                      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {current + 1} / {totalQuestions}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progress}%`,
                      background: isUrgent
                        ? "linear-gradient(90deg,#ef4444,#f87171)"
                        : "linear-gradient(90deg,#2563eb,#3b82f6)",
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* ── Question ── */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0
                ${isHR
                  ? "bg-amber-100 text-amber-700"
                  : "bg-blue-100 text-blue-700"
                }`}>
                {String(current + 1).padStart(2, "0")}
              </div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Question
              </span>
            </div>

            <p className="text-base font-medium text-gray-900 leading-relaxed mb-5 min-h-12">
              {currentQuestion?.question}
            </p>

            <textarea
              rows={5}
              placeholder="Type your answer here…"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl
                         px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400
                         outline-none resize-none
                         focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                         transition-all duration-200"
            />
          </div>

          {/* ── Navigation ── */}
          <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex flex-col items-center gap-4">

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {questions.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => { saveCurrentAnswer(current, draftRef.current, phase); setCurrent(i); }}
                  className={`rounded-full transition-all duration-200 h-2
                    ${i === current
                      ? `w-6 ${isHR ? "bg-amber-600" : "bg-blue-600"}`
                      : dotAnswered(i)
                        ? "w-2 bg-gray-400"
                        : "w-2 bg-gray-200"
                    }`}
                />
              ))}
            </div>

            {/* CTA button */}
            {isLastQuestion && isLastPhase ? (
              !loading ? (
                <button
                  onClick={handleSubmit}
                  className="h-11 px-8 rounded-xl bg-blue-600 text-white text-sm
                             font-semibold hover:bg-blue-700 active:scale-[0.98]
                             transition-all duration-200 shadow-sm"
                >
                  Submit Answers
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                  <p className="text-blue-600 text-xs font-medium text-center">
                    {msgAtt}
                  </p>
                </div>
              )
            ) : isLastQuestion && phase === TestType.HR ? (
              <button
                onClick={goNext}
                className="h-11 px-6 rounded-xl bg-blue-600 text-white text-sm
                           font-semibold hover:bg-blue-700 active:scale-[0.98]
                           transition-all duration-200 shadow-sm whitespace-nowrap"
              >
                Technical Questions →
              </button>
            ) : (
              <button
                onClick={goNext}
                className="h-11 w-11 rounded-xl bg-gray-100 border border-gray-200
                           text-gray-600 text-lg flex items-center justify-center
                           hover:bg-gray-200 active:scale-[0.98] transition-all duration-200"
              >
                <FiSend size={18} />
              </button>
            )}
          </div>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
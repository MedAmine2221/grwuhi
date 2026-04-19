/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Formulaire from "@/components/Formulaire";
import { useSelector, useDispatch } from "react-redux";
import AnalysisResult from "@/components/AnalysisComponent";
import QuizResult from "@/components/QuizResult";
import { motion } from "framer-motion";
import { addQuiz } from "@/redux/slice/quizSlice";
import { addQuizResult } from "@/redux/slice/quizResultSlice";

export default function Home() {
  const dispatch = useDispatch();
  const quiz = useSelector((state: any) => state.quiz.quiz);
  const quizResult = useSelector((state: any) => state.quizResult.quizResult);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const savedQuiz = localStorage.getItem("quiz");
    const savedResult = localStorage.getItem("quizResult");
    if (savedQuiz && !quiz) try { dispatch(addQuiz(JSON.parse(savedQuiz))); } catch {}
    if (savedResult && !quizResult) try { dispatch(addQuizResult(JSON.parse(savedResult))); } catch {}
  }, [dispatch, quiz, quizResult]);

  const isError = quiz === "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants.";

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {(!quiz || isError) && !quizResult ? (
        <main className="min-h-screen bg-[#0d1f3c] flex flex-col lg:flex-row items-center justify-center gap-12 px-8 py-16">

          {/* Left – Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full border border-[#1a9e8f]/20 animate-ping scale-110 pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-[#d99934]/10 animate-pulse scale-125 pointer-events-none" />
            <Image
              src="/interview.gif"
              width={420}
              height={420}
              className="w-72 h-72 lg:w-96 lg:h-96 object-contain rounded-full border-2 border-[#1a9e8f]/30 shadow-[0_0_60px_rgba(26,158,143,0.12)]"
              alt="GRWUHI Interview Coach"
              loading="eager"
            />
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-5 w-full max-w-md"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 self-start bg-[#1a9e8f]/10 border border-[#1a9e8f]/30 text-[#1a9e8f] text-[11px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e8f] animate-pulse" />
              AI-Powered Assessment
            </span>

            <h1 className="text-4xl lg:text-5xl font-semibold text-[#f4f1ea] leading-tight">
              Land Your Next<br />
              <span className="text-[#d99934]">Dream Position</span>
            </h1>

            <p className="text-[#8a9bb8] text-sm leading-relaxed">
              Upload your CV and describe the role. Our AI generates personalized HR interview
              questions to maximize your hiring chances.
            </p>

            {/* Card */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
              <Formulaire />
              {isError && !remove && (
                <p
                  onClick={() => setRemove(true)}
                  className="text-red-400 text-xs font-medium text-center cursor-pointer hover:text-red-300 transition-colors"
                >
                  Technical error — please try again in a few moments. ✕
                </p>
              )}
            </div>
          </motion.div>
        </main>

      ) : quizResult ? (
        <QuizResult
          candidateName={quiz?.condidate_name ?? "Candidate"}
          candidatePost={quiz?.candidate_post ?? ""}
        />
      ) : (
        <AnalysisResult quiz={quiz} />
      )}
    </motion.div>
  );
}
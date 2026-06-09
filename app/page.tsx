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
        <main className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center gap-12 px-8 py-16">
          {/* Left – Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">AI Interview Coach</p>
              </div>
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-5 w-full max-w-md"
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 self-start bg-blue-50 text-blue-600 text-[11px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              AI-Powered Assessment
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Land Your Next<br />
              <span className="text-blue-600">Dream Position</span>
            </h1>

            <p className="text-gray-500 text-sm leading-relaxed">
              Upload your CV and describe the role. Our AI generates personalized HR interview
              questions to maximize your hiring chances.
            </p>

            {/* Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <Formulaire />
              {isError && !remove && (
                <p
                  onClick={() => setRemove(true)}
                  className="text-red-500 text-xs font-medium text-center cursor-pointer hover:text-red-600 transition-colors"
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
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

    if (savedQuiz && !quiz) {
      try { dispatch(addQuiz(JSON.parse(savedQuiz))); } catch {}
    }
    if (savedResult && !quizResult) {
      try { dispatch(addQuizResult(JSON.parse(savedResult))); } catch {}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isError = quiz === "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants.";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
      {(!quiz || isError) && !quizResult ? (
        <main className="flex flex-col items-center lg:justify-around justify-center lg:flex-row m-8">
          <Image
            src="/interview.gif"
            width={1000}
            height={1000}
            className="lg:w-200 lg:h-200 w-110 h-100 object-contain"
            alt="GRWUHI Home Desc"
            loading="eager"
          />
          <div className="flex flex-col items-center">
            <p className="text-center text-xl mb-4">
              Select your CV and provide a description of the position <br />
              to generate a test with possible HR interview questions
            </p>
            <Formulaire />
            {isError && !remove && (
              <p
                onClick={() => setRemove(true)}
                className="text-center text-sm mb-4 text-danger font-bold cursor-pointer"
              >
                {"I'm sorry, I'm currently experiencing technical difficulties. Please try again in a few moments."}
              </p>
            )}
          </div>
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
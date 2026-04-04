/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";;
import Image from "next/image";
import { useState, useEffect } from "react";
import Formulaire from "@/components/Formulaire";
import { useSelector } from "react-redux";
import AnalysisResult from "@/components/AnalysisComponent";
import QuizResult from "@/components/QuizResult";
import { motion } from "framer-motion";
export default function Home() {
  const quiz = useSelector((state: any) => state.quiz.quiz);
  const quizResult = useSelector((state: any) => state.quizResult.quizResult);
  const [errorMsg,setErrorMsg] = useState("I'm sorry, I'm currently experiencing technical difficulties. Please try again in a few moments.");
  useEffect(()=>{
    const timer = setTimeout(()=>{
    setErrorMsg("");
    },15000),
    return () => clearTimeout(timer);
  },[])
  return (
    <motion.div         
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
      {!quiz && !quizResult || quiz =="Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants." ? (
        <main className="flex flex-col items-center lg:justify-around justify-center lg:flex-row m-8">
          <Image
            src="/home.png"
            width={1000}
            height={1000}
            className="lg:w-200 w-110 h-110 object-contain"
            alt="GRWUHI Home Desc"
            loading="eager"
          />
          <div className="flex flex-col items-center">
            <p className="text-center text-xl mb-4">
              Select your CV and provide a description of the position <br />
              to generate a test with possible HR interview questions
            </p>
            <Formulaire />
          { quiz === "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants." && (
            <p className="text-center text-sm mb-4 text-danger font-bold">{errorMsg}</p>
          )}
          </div>
        </main>
      ) : !quizResult && quiz ? (
        <AnalysisResult quiz={quiz} />
      ) : (
        <QuizResult
          candidateName={quiz?.condidate_name ?? "Candidate"}
          candidatePost={quiz?.candidate_post ?? ""}
        />
      )}
    </motion.div>
  );
}
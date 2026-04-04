/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";;
import Image from "next/image";
import Formulaire from "@/components/Formulaire";
import { useSelector } from "react-redux";
import AnalysisResult from "@/components/AnalysisComponent";

export default function Home() {
  const quiz = useSelector((state: any) => state.quiz.quiz);
  const quizResult = useSelector((state: any) => state.quizResult.quizResult);
  return (
    <>
      {!quiz && !quizResult ? (
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
          </div>
        </main>
      ) : !quizResult && quiz ? (
        <AnalysisResult quiz={quiz} />
      ) : (
        <>
        
        </>
      )}
    </>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSelector } from 'react-redux';

export default function MatchingScore() {
  const quiz = useSelector((state: any) => state.quiz.quiz);
  console.log("quiz in matching score page", quiz);
  
  return (
    <div>Hello World</div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@heroui/react";
import PostDescription from "./PostDescription";
import UploadCV from "./UploadCV";
import { useEffect, useState } from "react";
import { gemini } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "@/redux/slice/quizSlice";
import { setLoadingFalse, setLoadingTrue } from "@/redux/slice/loadingSlice";
import Image from "next/image";
import { db } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function Formulaire() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.loading.loading);
  const [postDesc, setPostDesc] = useState("");
  const [cv, setCv] = useState<any>();
  const [isPressed, setIsPressed] = useState(false);
  const [msgAtt, setMsgAtt] = useState("This operation may take a few minutes…");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsgAtt("Your CV is being analyzed. Please wait a moment…");
    }, 25000);
    return () => clearTimeout(timer);
  });

  const createQuiz = async () => {
    try {
      setIsPressed(true);
      if (cv && postDesc) {
        dispatch(setLoadingTrue());
        const resp = await gemini(cv, postDesc);
        if (typeof resp !== "string") return;
        const clean = resp.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed =
          clean.startsWith("Je suis") || clean.startsWith("Je ne peux")
            ? clean
            : JSON.parse(clean);
        dispatch(addQuiz(parsed));
        if (typeof parsed === "object") localStorage.setItem("quiz", JSON.stringify(parsed));        
        await addDoc(collection(db, "users"), {
          name: parsed?.condidate_name,
          email: parsed?.candidate_email,
          createdAt: `${new Date()}`,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <PostDescription isPressed={isPressed} postDesc={postDesc} setPostDesc={setPostDesc} />
      <UploadCV isPressed={isPressed} cv={cv} setCv={setCv} />

      {!loading ? (
        <Button
          onClick={createQuiz}
          className="w-full h-12 rounded-xl bg-[#d99934] text-[#0d1f3c] font-semibold text-sm
                     hover:bg-[#c4891f] active:scale-[0.98] transition-all duration-200
                     flex items-center justify-center gap-2 tracking-wide border-none"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          Evaluate Compatibility
        </Button>
      ) : (
        <div className="flex flex-col items-center gap-2 py-2">
          <Image src="/scanner.gif" width={64} height={64} alt="" className="opacity-90" />
          <p className="text-[#d99934] text-xs font-medium text-center animate-pulse">{msgAtt}</p>
        </div>
      )}
    </div>
  );
}
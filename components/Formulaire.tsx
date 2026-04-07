/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";;
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
    const [cv, setCv] = useState();
    const [isPressed, setIsPressed] = useState(false);
    const [msgAtt, setMsgAtt] = useState("This operation may take a few minutes")
    useEffect(()=>{
      const timer = setTimeout(()=>{
        setMsgAtt("Your CV is being analyzed. Please wait a moment…")
      },25000);
      return(()=>clearTimeout(timer));
    })
    const createQuiz = async () => {
      try {
        setIsPressed(true);
        if(cv && postDesc){
          dispatch(setLoadingTrue());
          const resp = await gemini(cv, postDesc);
          
          if (typeof resp !== "string") {
            console.error("No response from gemini");
            return;
          }
          
          const clean = resp
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
          const parsed = clean === "Je suis désolé, je rencontre actuellement des difficultés techniques. Veuillez réessayer dans quelques instants." || clean === "Je ne peux pas répondre pour le moment. Veuillez réessayer plus tard." ? clean :  JSON?.parse(clean);        
          dispatch(addQuiz(parsed));
          await addDoc(collection(db, "users"), {
            name: parsed?.condidate_name,
            email: parsed?.candidate_email,
            createdAt: `${new Date().getDay()} - ${new Date().getMonth()} - ${new Date().getFullYear()}`
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(setLoadingFalse());
      }
    }
  return (
    <>
      <PostDescription isPressed={isPressed} postDesc={postDesc} setPostDesc={setPostDesc} />
      <UploadCV isPressed={isPressed} cv = {cv} setCv={setCv} />
      {!loading ? 
        <Button isDisabled={loading} onClick={createQuiz} className="flex justify-center items-center bg-[#d99934]/10 hover:bg-[#d99934] hover:text-white transition-colors duration-500 hover:scale-105 border-2 border-[#d99934] rounded-lg m-4 w-fit h-12 text-[#d99934] font-bold">
          Evaluate Compatibility
        </Button>
        :                            
        <>
          <Image src={"/scanner.gif"} width={100} height={100} alt={""} />
          <p className="text-[#d99934] text-sm font-bold text-center">{msgAtt}</p>
        </>
      }
    </>
)
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Modal, Spinner } from "@heroui/react";
import PostDescription from "./PostDescription";
import UploadCV from "./UploadCV";
import { useState } from "react";
import { gemini } from "@/utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "@/redux/slice/quizSlice";
import { setLoadingFalse, setLoadingTrue } from "@/redux/slice/loadingSlice";
import { useRouter } from "next/navigation";
export default function Formulaire() {
    const dispatch = useDispatch();
    const router = useRouter();
    const loading = useSelector((state: any) => state.loading.loading);
    const [postDesc, setPostDesc] = useState("");
    const [cv, setCv] = useState();
    const [isPressed, setIsPressed] = useState(false)
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
          router.push("/matching-score");
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
        <Modal>
            {!loading ? 
              <Button isDisabled={loading} onClick={createQuiz} className="flex justify-center items-center bg-[#d99934]/10 hover:bg-[#d99934] hover:text-white transition-colors duration-500 hover:scale-105 border-2 border-[#d99934] rounded-lg m-4 w-fit h-12 text-[#d99934] font-bold">
                Evaluate Compatibility
              </Button>
              :                            
              <Spinner className="mt-8 text-[#d99934] w-10 h-10"/>
            }

            {/* {cv && postDesc && isPressed && <QuizModal />} */}
        </Modal>
    </>
)
}

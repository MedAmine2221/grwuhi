"use client";
import { Button, Modal } from "@heroui/react";
import PostDescription from "./PostDescription";
import UploadCV from "./UploadCV";
import { useState } from "react";
import QuizModal from "./QuizModal";
import { gemini } from "@/utils/functions";
import { useDispatch } from "react-redux";
import { addQuiz } from "@/redux/slice/quizSlice";
import { setLoadingFalse, setLoadingTrue } from "@/redux/slice/loadingSlice";
export default function Formulaire() {
    const dispatch = useDispatch()
    const [postDesc, setPostDesc] = useState("");
    const [cv, setCv] = useState();
    const [isPressed, setIsPressed] = useState(false)
    const createQuiz = async () => {
      try {
        dispatch(setLoadingTrue());
        setIsPressed(true);
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
            <Button onClick={createQuiz} className="bg-[#d99934]/10 hover:bg-[#d99934] hover:text-white transition-colors duration-500 hover:scale-105 border-2 border-[#d99934] rounded-lg m-4 w-fit h-12 text-[#d99934] font-bold">
              Create a Virtual Interview
            </Button>
            {cv && postDesc && isPressed && <QuizModal />}
        </Modal>
    </>
)
}

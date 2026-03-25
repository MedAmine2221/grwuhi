"use client";
import { Button } from "@heroui/react";
import PostDescription from "./PostDescription";
import UploadCV from "./UploadCV";
import { useState } from "react";

export default function Formulaire() {
    const [postDesc, setPostDesc] = useState("");
    const [cv, setCv] = useState();
    const [isPressed, setIsPressed] = useState(false)
  return (
    <>
        <PostDescription isPressed={isPressed} postDesc={postDesc} setPostDesc={setPostDesc} />
        <UploadCV isPressed={isPressed} cv = {cv} setCv={setCv} />
        <Button onClick={()=> setIsPressed(true)
        } className="bg-[#d99934]/10 border-2 border-[#d99934] rounded-lg m-4 w-fit h-12 text-[#d99934] font-bold">
          Create a Virtual Interview
        </Button>
    </>
)
}

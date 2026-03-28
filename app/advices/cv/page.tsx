"use client";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Cv() {
  return (
    <div className='flex flex-col justify-between'>
        <div className='flex bg-[#113d3c] rounded-b-full justify-evenly items-center h-75'>
            <div className="flex flex-col">
                <p className="text-4xl text-white font-bold">How to write a perfect CV?</p>
                <p className="text-base text-white/60 m-4">Your CV is the first impression you make on a recruiter. <br/> A well-structured and complete CV highlights <br/> your skills, experience, and personality, greatly increasing <br/> your chances of landing an interview and securing the job</p>
                <Button className={"bg-[#d99934] mt-4 w-50 text-xl font-bold hover:shadow-lg duration-500 hover:shadow-[#d99934]"} onClick={()=>window.open("https://www.moncvparfait.fr/creer-cv")}>Create CV</Button>
            </div>
            <Image
              width={1000}
              height={1000}
              alt={"cv"}
              className="h-70 w-70 m-8"
              loading="eager"
              src={"/write-cv.png"}
            />        
        </div>
        <div>

        </div>
    </div>
  )
}

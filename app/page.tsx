"use client";;
import UploadCV from "@/components/UploadCV";
import Image from "next/image";
import { TextArea } from "@heroui/react";

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-around">
      <Image
        src="/home.png"
        width={1000}
        height={1000}
        className="w-125 h-125 object-contain"
        alt="GRWUHI Home Desc"
        loading="eager"
      />

      <div className="flex flex-col items-center">
        <p className="text-center mb-4">
          Select your CV and provide a description of the position <br />
          to generate a test with possible HR interview questions
        </p>
        <TextArea
          className="w-full border-2 border-[#d99934] m-4"
          placeholder="Describe the post"
          variant="primary"
        />
        <UploadCV />
      </div>
    </main>
  );
}
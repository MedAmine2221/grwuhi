"use client";
import Image from "next/image";
import Formulaire from "@/components/Formulaire";

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-around">
      <div className="absolute -top-25 left-40 bg-[#d99934]/10 border-2 border-[#d99934] rounded-full w-125 h-125 z-0" />
      <Image
        src="/home.png"
        width={1000}
        height={1000}
        className="w-100 h-100 object-contain"
        alt="GRWUHI Home Desc"
        loading="eager"
      />

      <div className="flex flex-col items-center">
        <p className="text-center mb-4">
          Select your CV and provide a description of the position <br />
          to generate a test with possible HR interview questions
        </p>
        <Formulaire />
      </div>
    </main>
  );
}
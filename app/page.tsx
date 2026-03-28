"use client";
import Image from "next/image";
import Formulaire from "@/components/Formulaire";

export default function Home() {
  return (
    <main className="flex lg:flex-row items-center lg:justify-around md:justify-center sm:justify-center md:flex-col sm:flex-col">
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
  );
}
"use client";
import { AdviceCard } from "@/components/AdviceCard";
import { ADVICES } from "@/constants";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function Advices() {
  const router = useRouter();
  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <div className="flex flex-row items-center">
        <FiArrowLeft onClick={() => router.push("/")} className='font-extrabold cursor-pointer' color='black' size={40}/>
        <div className="ml-8">
          <h1 className="text-3xl font-bold text-foreground">HR Advices</h1>
          <p className="text-muted mt-1">
            {"All our avices to help you succeed in your job search"}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {ADVICES.map((advice) => (
          <AdviceCard key={advice.id} {...advice} />
        ))}
      </div>
    </section>
  );
}
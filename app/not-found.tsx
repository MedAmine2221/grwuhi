"use client";;
import Image from 'next/image';
import { FiHome } from 'react-icons/fi';

export default function App() {
  return (
    <div className='flex flex-col items-center justify-center gap-6 min-h-screen text-center px-4'>
        <FiHome
            onClick={() => window.location.href = "/"}
            size={48}
            className="mt-8 text-amber-500 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500 hover:-translate-y-0.5 active:translate-y-0"
        />
        <p className='text-[#113d3c] text-4xl font-bold'>
            We are currently working on this page and it will be available very soon
        </p>
        <Image     
          width={2200} height={2200}
          alt="cv illustration"
          src="/not-found.png"
          loading="eager"
          className="object-contain w-200 h-200"
        />
    </div>
  )
}

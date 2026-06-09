"use client";
import Image from 'next/image';
import { FiHome } from 'react-icons/fi';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center gap-6 min-h-screen text-center px-4 bg-white'>
      <Link href="/">
        <FiHome
          size={48}
          className="text-blue-500 transition-all duration-300 hover:shadow-lg hover:text-blue-600 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        />
      </Link>
      <p className='text-gray-800 text-3xl font-bold'>
        We are currently working on this page and it will be available very soon
      </p>
      <p className='text-gray-500 text-sm'>
        Please check back later for updates
      </p>
      <Image     
        width={400} 
        height={400}
        alt="Under construction illustration"
        src="/not-found.png"
        loading="eager"
        className="object-contain w-80 h-80"
      />
    </div>
  );
}
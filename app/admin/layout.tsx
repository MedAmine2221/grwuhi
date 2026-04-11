"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {    const router = useRouter();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            router.replace("/admin/dashboard")
        }else{
            router.replace("/admin/auth")
        }
    })
    return(
        <>
            {children}
        </>
    )
}

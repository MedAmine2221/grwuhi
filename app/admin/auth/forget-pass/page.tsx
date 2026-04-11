"use client";;
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import InputApp from "@/components/InputApp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLoadingFalse, setLoadingTrue } from "@/redux/slice/loadingSlice";

export default function ForgotPassword() {
  const loading = useSelector((state:RootState) => state.loading.loading);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch()
  const handleSubmit = async () => {
    try {
      dispatch(setLoadingTrue());
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
      setError(String(error))  
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f7f8] px-4 relative overflow-hidden">

      {/* Decorative circles */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-36 -left-36 w-105 h-105 rounded-full bg-[#0d2f2e]/8" />
        <div className="absolute -bottom-24 -right-20 w-75 h-75 rounded-full bg-[#0d2f2e]/6" />
        <div className="absolute top-[60%] -left-16 w-45 h-45 rounded-full bg-[#d99934]/[0.07]" />
        <div className="absolute top-[10%] right-[8%] w-30 h-30 rounded-full bg-[#d99934]/6" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-[#113d3c] rounded-2xl shadow-xl shadow-[#0d2f2e]/20 border border-[#d99934]/20 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-0.75 w-full bg-[#d99934]" />

          <div className="px-8 pt-8 pb-10">

            {/* Logo + title */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-full bg-[#d99934]/15 border border-[#d99934]/35 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Warning Group"
                  width={26}
                  height={26}
                  className="cursor-pointer object-contain"
                  priority
                  onClick={()=> router.replace("/")}
                />
              </div>
              <div>
                <h1 className="text-white text-[15px] font-medium">
                  Reset Password
                </h1>
                <p className="text-white/40 text-xs mt-0.5">
                  {"CV analysis and interview preparation platform"}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Username */}
              <div className="space-y-1.5">
                <InputApp
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john_doe@gmail.com"
                  htmlFor="email"
                  label="Email"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-[#d99934] text-[#113d3c] font-medium text-sm
                           hover:opacity-85 active:scale-[0.98]
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-150
                           flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                )}
                {loading ? "Sending..." : "Send Email"}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/30
                              bg-red-500/10 px-4 py-2.5 text-sm text-red-300 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64
                          a1 1 0 00.86-1.5L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
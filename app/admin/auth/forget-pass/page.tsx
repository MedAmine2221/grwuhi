"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import InputApp from "@/components/InputApp";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLoadingFalse, setLoadingTrue } from "@/redux/slice/loadingSlice";

export default function ForgotPassword() {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      dispatch(setLoadingTrue());
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      console.error(err);
      setError(String(err));
    } finally {
      dispatch(setLoadingFalse());
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen overflow-hidden bg-[#09101c] flex items-center justify-center px-4"
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26,158,143,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,158,143,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow centre */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(26,158,143,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #d99934 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -left-20 w-80 h-80 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #1a9e8f 0%, transparent 70%)" }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="relative w-full max-w-105"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #0a1220 0%, #060b14 100%)",
            border: "1px solid rgba(26,158,143,0.15)",
            boxShadow: "0 0 0 1px rgba(217,153,52,0.05), 0 32px 64px rgba(0,0,0,0.6), 0 0 80px rgba(26,158,143,0.1)",
          }}
        >
          <div className="px-8 pt-9 pb-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-9">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.replace("/")}
                className="relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(217,153,52,0.12), rgba(26,158,143,0.08))",
                  border: "1px solid rgba(217,153,52,0.2)",
                }}
              >
                <Image src="/logo.png" alt="GRWUHI" width={26} height={26} className="object-contain" priority />
              </motion.button>

              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#1a9e8f]/60 font-medium mb-0.5">
                  GRWUHI Platform
                </p>
                <h1
                  className="text-[22px] font-semibold leading-tight tracking-tight"
                  style={{ color: "#f4f1ea" }}
                >
                  Reset password
                </h1>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-7">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[11px] text-white/20 tracking-widest uppercase">Recovery</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Success state */}
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(26,158,143,0.2), rgba(17,61,60,0.1))",
                    border: "1px solid rgba(26,158,143,0.3)",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a9e8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
                <p className="text-[15px] font-medium text-[#f4f1ea] mb-1">Email sent!</p>
                <p className="text-[12px] text-white/35 mb-6">
                  Check your inbox at <span className="text-[#d99934]/70">{email}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/admin/auth/login")}
                  className="text-[12px] text-[#1a9e8f]/60 hover:text-[#1a9e8f] transition-colors tracking-wide"
                >
                  ← Back to login
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Description */}
                <p className="text-[12px] text-white/30 mb-5 leading-relaxed">
                  {"Enter your email address and we'll send you a link to reset your password."}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <InputApp
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john_doe@gmail.com"
                      htmlFor="email"
                      label="Email address"
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.99 }}
                    className="group relative w-full py-3 rounded-xl text-[13px] font-semibold tracking-wide overflow-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: "#09101c" }}
                  >
                    <div
                      className="absolute inset-0 transition-opacity group-hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #d99934 0%, #c8852b 50%, #d99934 100%)" }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send reset link
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>

                {/* Back to login */}
                <div className="mt-5 text-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/admin/auth")}
                    className="text-[12px] text-white/25 hover:text-white/50 transition-colors tracking-wide"
                  >
                    ← Back to login
                  </motion.button>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start gap-2.5 rounded-xl px-4 py-3 text-[12px]"
                    style={{
                      background: "rgba(239,68,68,0.07)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#fca5a5",
                    }}
                  >
                    <svg className="w-4 h-4 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    {error}
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Footer strip */}
          <div
            className="px-8 py-3 border-t flex items-center justify-center"
            style={{ borderColor: "rgba(26,158,143,0.1)", background: "rgba(0,0,0,0.2)" }}
          >
            <p className="text-[11px] text-white/15 tracking-wider">
              AI Interview Coach & CV analysis platform
            </p>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
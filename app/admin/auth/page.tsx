"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { addUser } from "@/redux/slice/usersSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import InputApp from "@/components/InputApp";
import { addRaiting } from "@/redux/slice/raitingAppSlice";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("token", await user.user.getIdToken());
      const data = await getDocs(collection(db, "users"));
      const listUsers = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(addUser(listUsers));
      const raitingData = await getDocs(collection(db, "raiting"));
      const listRaiting = raitingData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(addRaiting(listRaiting));
      if (!user) alert("Incorrect login details. Please try again.");
      router.replace("/admin/dashboard");
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer. " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen overflow-hidden bg-gray-50 flex items-center justify-center px-4"
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100">
          <div className="px-8 pt-9 pb-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-9">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.replace("/")}
                className="relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                           bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm"
              >
                <Image src="/logo.png" alt="GRWUHI" width={26} height={26} className="object-contain" priority />
              </motion.button>

              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-blue-600 font-medium mb-0.5">
                  GRWUHI Platform
                </p>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back
                </h1>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-7">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 tracking-widest uppercase">Sign in</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="space-y-1.5">
                <InputApp
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  htmlFor="password"
                  label="Password"
                  inputLeft={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={showPassword ? "Hide" : "Show"}
                    >
                      {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  }
                />
              </div>

              {/* Forgot password */}
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={() => router.push("/admin/auth/forget-pass")}
                  className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgotten password?
                </button>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                className="relative w-full py-3 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Connecting…
                    </>
                  ) : (
                    <>
                      Log in
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-start gap-2.5 rounded-xl px-4 py-3 text-xs bg-red-50 border border-red-200 text-red-600"
              >
                <svg className="w-4 h-4 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                {error}
              </motion.div>
            )}
          </div>

          {/* Footer strip */}
          <div className="px-8 py-3 border-t border-gray-100 flex items-center justify-center bg-gray-50">
            <p className="text-xs text-gray-400 tracking-wider">
              AI Interview Coach & CV analysis platform
            </p>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
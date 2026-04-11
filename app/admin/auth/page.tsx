"use client";;
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { addUser } from "@/redux/slice/usersSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import CheckBoxApp from "@/components/CheckBoxApp";
import InputApp from "@/components/InputApp";
import { addRaiting } from "@/redux/slice/raitingAppSlice";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("token", await user.user.getIdToken())
      const data = await getDocs(collection(db, "users"));
      const listUsers = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      dispatch(addUser(listUsers))
      const raitingData = await getDocs(collection(db, "raiting"));
      const listRaiting = raitingData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(addRaiting(listRaiting))
      
      if(!user){
        alert("Incorrect login details. Please try again.")
      }
      router.replace("/admin/dashboard");
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer. " + error);
    } finally {
      setLoading(false);
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
                  Connecting to GRWUHI
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

              {/* Password */}
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/65 transition"
                      aria-label={showPassword ? "Masquer" : "Afficher"}
                    >
                      {showPassword ? (
                        <FiEyeOff className="cursor-pointer" />
                      ) : (
                        <FiEye className="cursor-pointer" />
                      )}
                    </button>
                  }
                />
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <CheckBoxApp text="Remember me" />
                <button
                  type="button"
                  onClick={() => router.push("/admin/auth/forget-pass")}
                  className="text-xs text-[#d99934] hover:underline focus:outline-none"
                >
                  Forgotten password?
                </button>
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
                {loading ? "Connection…" : "Log in"}
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
"use client";
import { AppRaite } from "@/constants";
import { db } from "@/firebaseConfig";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setLoadingFalse, setLoadingTrue } from "@/redux/slice/loadingSlice";
import { RootState } from "@/redux/store";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsStarHalf } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function RatingModal() {
  const [open, setOpen] = useState(false);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const display = hovered || selected;

  const raiting = async () => {
    try {
      dispatch(setLoadingTrue());
      await addDoc(collection(db, "raiting"), { starRaiting: selected });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoadingFalse());
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSubmitted(false);
    setSelected(0);
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
          bg-[#1a9e8f]/10 border border-[#1a9e8f]/30 shadow-lg
          flex items-center justify-center
          hover:bg-[#1a9e8f]/20 hover:border-[#1a9e8f]/50
          transition-colors"
      >
        <BsStarHalf size={18} className="text-[#1a9e8f]" />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          >
            {/* Modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-80 rounded-2xl overflow-hidden
                bg-linear-to-br from-[#0f2647] to-[#0d1f3c]
                border border-[#1a9e8f]/20
                shadow-[0_0_60px_rgba(26,158,143,0.1)]
                p-8 text-center"
            >
              {/* Decorative orbs */}
              <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-[#1a9e8f]/5 pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-[#d99934]/5 pointer-events-none" />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 bg-[#1a9e8f]/10 border border-[#1a9e8f]/25 text-[#1a9e8f] text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e8f] animate-pulse" />
                      Share Your Experience
                    </span>

                    <p className="text-xl font-semibold text-[#f4f1ea] mb-1.5">
                      Rate GRWUHI
                    </p>
                    <p className="text-sm text-[#8a9bb8] mb-6 leading-relaxed">
                      How was your interview prep experience?
                    </p>

                    {/* Stars */}
                    <div className="flex justify-center gap-1.5 mb-3">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <motion.button
                          key={v}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`text-3xl transition-colors duration-150 ${
                            v <= display
                              ? "text-[#d99934]"
                              : "text-[#1e3a5f] hover:text-[#d99934]/50"
                          }`}
                          onMouseEnter={() => setHovered(v)}
                          onMouseLeave={() => setHovered(0)}
                          onClick={() => setSelected(v)}
                        >
                          ★
                        </motion.button>
                      ))}
                    </div>

                    {/* Label */}
                    <p
                      className={`text-xs min-h-4.5 mb-5 transition-colors duration-200 ${
                        display ? "text-[#d99934]" : "text-[#8a9bb8]"
                      }`}
                    >
                      {display ? AppRaite[display] : "Tap a star to rate"}
                    </p>

                    {/* Submit */}
                    <button
                      disabled={!selected || loading}
                      onClick={raiting}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide
                        bg-[#1a9e8f] text-[#f4f1ea]
                        hover:bg-[#148a7d] active:scale-[0.98]
                        disabled:opacity-30 disabled:cursor-not-allowed
                        transition-all duration-200 mb-2.5"
                    >
                      {loading ? "Submitting…" : "Submit Rating"}
                    </button>

                    <button
                      onClick={handleClose}
                      className="text-xs text-[#8a9bb8] hover:text-[#f4f1ea] transition-colors"
                    >
                      Not now
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Checkmark circle */}
                    <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center
                      bg-[#1a9e8f]/10 border border-[#1a9e8f]/30 text-[#1a9e8f] text-2xl">
                      ✓
                    </div>

                    <p className="text-xl font-semibold text-[#f4f1ea] mb-2">
                      Thank you!
                    </p>
                    <p className="text-sm text-[#8a9bb8] leading-relaxed mb-6">
                      Your feedback helps us build a better interview experience for everyone.
                    </p>

                    <button
                      onClick={handleClose}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold
                        bg-[#1a9e8f]/10 border border-[#1a9e8f]/25 text-[#1a9e8f]
                        hover:bg-[#1a9e8f]/20 transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
"use client";;
import { AppRaite } from "@/constants";
import { db } from "@/firebaseConfig";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setLoadingFalse, setLoadingTrue } from "@/redux/slice/loadingSlice";
import { RootState } from "@/redux/store";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { BsStarHalf } from "react-icons/bs";
import { useSelector } from "react-redux";


export default function RatingModal() {
  const [open, setOpen] = useState(false);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useAppDispatch()
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const display = hovered || selected;
  const raiting = async () => {
    try {
        dispatch(setLoadingTrue());
        await addDoc(collection(db,'raiting'),{
            starRaiting: selected
        });
    } catch (error) {
     console.error(error);        
    } finally {
        dispatch(setLoadingFalse());
        setSubmitted(true);
    }
  }    
  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-black dark:bg-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <BsStarHalf size={20} color="white"/>
      </button>

      {/* Overlay + Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-neutral-900 rounded-2xl p-8 w-80 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {!submitted ? (
              <>
                <p className="text-lg font-medium">Rate GRWUHI</p>
                <p className="text-sm text-gray-500 mt-1">How would you rate your experience?</p>

                <div className="flex justify-center gap-2 my-5">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      className={`text-3xl transition-transform hover:scale-110 ${
                        v <= display ? "text-amber-400" : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHovered(v)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setSelected(v)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <p className="text-sm text-gray-500 min-h-4.5 mb-4">
                  {display ? AppRaite[display] : "Tap a star to rate"}
                </p>

                <button
                  disabled={loading}
                  onClick={() => {
                        raiting()
                    }
                  }
                  className="w-full py-2.5 rounded-lg bg-black text-white font-medium disabled:opacity-30 mb-2"
                >
                  {!loading ? "Submit" : "Submiting..."}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  Not now
                </button>
              </>
            ) : (
              <>
                <p className="text-3xl mb-3">🎉</p>
                <p className="font-medium text-lg">Thank you!</p>
                <p className="text-sm text-gray-500 mt-1">Your feedback helps us improve.</p>
                <button
                  onClick={() => { setOpen(false); setSubmitted(false); setSelected(0);  }}
                  className="w-full mt-5 py-2.5 rounded-lg bg-black text-white font-medium"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, ReactNode } from "react";

export default function InputApp({inputLeft, label, id, type, value, required, onChange, placeholder, htmlFor, autoComplete }: {inputLeft?: ReactNode, label: string, id: string, type: HTMLInputTypeAttribute, value: string, required?: boolean, onChange: (e: any) => void, placeholder: string, htmlFor: string, autoComplete?: HTMLInputAutoCompleteAttribute } ) {
  return (
    <>
        <label htmlFor={htmlFor} className="block text-xs font-medium text-white/55">
          {label}
        </label>
        <div className="relative">
        <input
            id={id}
            type={type}
            required={required}
            value={value}
            autoComplete={autoComplete ?? undefined}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full pr-10 pl-3.5 py-2.5 rounded-lg border border-[#d99934]/20 bg-[#0d2f2e]
            text-white text-sm placeholder:text-white/20
            focus:outline-none focus:ring-2 focus:ring-[#d99934]/15 focus:border-[#d99934]
            transition"
        />

        {inputLeft && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
            {inputLeft}
            </div>
        )}
        </div>
    </>
  )
}

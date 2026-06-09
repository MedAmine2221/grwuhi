/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, ReactNode } from "react";

export default function InputApp({inputLeft, label, id, type, value, required, onChange, placeholder, htmlFor, autoComplete }: {inputLeft?: ReactNode, label: string, id: string, type: HTMLInputTypeAttribute, value: string, required?: boolean, onChange: (e: any) => void, placeholder: string, htmlFor: string, autoComplete?: HTMLInputAutoCompleteAttribute } ) {
  return (
    <>
        <label htmlFor={htmlFor} className="block text-xs font-medium text-gray-600">
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
            className="w-full pr-10 pl-3.5 py-2.5 rounded-lg border border-gray-200 bg-white
            text-gray-900 text-sm placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400
            transition"
        />

        {inputLeft && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {inputLeft}
            </div>
        )}
        </div>
    </>
  )
}
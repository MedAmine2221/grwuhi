import { UploadCVProps } from "@/constants/interfaces";
import { useState, ChangeEvent, DragEvent } from "react";
import { FiTrash, FiUpload, FiFileText } from "react-icons/fi";

export default function UploadCV({ setCv, cv, isPressed }: UploadCVProps) {
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFile = (file?: File) => {
    if (file) {
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
      setCv(file);
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(""); setFileUrl(""); setCv(null);
  };

  const hasError = !cv && isPressed;

  return (
    <label
      onDrop={(e: DragEvent<HTMLLabelElement>) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
      onDragOver={(e: DragEvent<HTMLLabelElement>) => e.preventDefault()}
      className={`flex flex-col gap-1.5 w-full cursor-pointer`}
    >
      <span className={`text-xs font-medium uppercase tracking-wide ${hasError ? "text-red-500" : "text-gray-700"}`}>
        Your CV (PDF) <span className="text-gray-400">*</span>
      </span>

      <div className={`flex items-center justify-center gap-3 h-16 rounded-xl border-2 border-dashed transition-all duration-200
        ${hasError
          ? "border-red-400 bg-red-50/50 text-red-500"
          : fileName
            ? "border-green-400 bg-green-50/50 text-green-600"
            : "border-gray-300 bg-gray-50 text-gray-500 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
      >
        {fileName ? (
          <>
            <FiFileText size={16} />
            <span
              className="text-sm truncate max-w-45 hover:underline cursor-pointer"
              onClick={() => window.open(fileUrl)}
            >
              {fileName}
            </span>
            <FiTrash size={14} className="text-red-500 hover:text-red-600 ml-1 shrink-0" onClick={reset} />
          </>
        ) : (
          <>
            <FiUpload size={16} />
            <span className="text-sm">Drag & drop or click to select</span>
          </>
        )}
      </div>

      {hasError && <p className="text-red-500 text-xs">Please upload your CV.</p>}
      <input type="file" accept="application/pdf" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0])} className="hidden" />
    </label>
  );
}
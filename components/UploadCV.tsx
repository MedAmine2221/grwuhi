import { useState, ChangeEvent, DragEvent } from "react";

export default function UploadCV() {
    const [fileName, setFileName] = useState<string>("");
    const handleFile = (file?: File) => {
      if (file) {
        setFileName(file.name);
      }
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      handleFile(file);
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      handleFile(file);
    };
  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col cursor-pointer border-2 border-[#d99934] border-dotted bg-[#d99934]/10 w-full items-center justify-center h-32 rounded-lg hover:bg-[#d99934]/20 transition"
    >
      <p className="text-[#d99934]">
        {fileName ? fileName : "Select Your CV"}
      </p>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}

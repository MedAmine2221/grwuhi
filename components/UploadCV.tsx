import { UploadCVProps } from "@/constants/interfaces";
import { useState, ChangeEvent, DragEvent } from "react";
import { FiTrash } from "react-icons/fi";
 
export default function UploadCV({setCv, cv, isPressed}: UploadCVProps) {
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("")
    const handleFile = (file?: File) => {
      if (file) {
        setFileName(file.name);
        setFileUrl(URL.createObjectURL(file))
        setCv(file);
      }
    };
    const reset = () =>{
      setFileName("");
      setFileUrl("");
      setCv(null)
    }
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
      className={`flex flex-col cursor-pointer border-2 ${!cv && isPressed ? "border-red-600" : "border-[#d99934]"} border-dotted ${!cv && isPressed ? "bg-red-100" : "bg-[#d99934]/10"} w-full items-center justify-center h-32 rounded-lg ${!cv && isPressed ? "hover:bg-red-200" : "hover:bg-[#d99934]/20"} transition`}
    >
      {fileName ?
        <div className="flex flex-row items-center">
          <p onClick={fileName ? ()=>window.open(fileUrl) : ()=>{}} className={`text-[#d99934] mr-2 ${fileName ? "hover:underline" :""}`}>
            {fileName ? fileName : "Select Your CV"}
          </p>
          <FiTrash color="red" size={20} onClick={reset}/> 
        </div>
      : 
        <p onClick={fileName ? ()=>window.open(fileUrl) : ()=>{}} className={`${!cv && isPressed ? "text-red-600" : "text-[#d99934]"} ${fileName ? "hover:underline" :""}`}>
          {fileName ? fileName : "Select Your CV"}
        </p>
      }
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}

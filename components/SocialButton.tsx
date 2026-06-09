import { SocialButtonProps } from "@/constants/interfaces";
import { useState } from "react";

export default function SocialButton({ icon: Icon, label, link }: SocialButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center justify-center p-2 rounded-lg
                 border border-gray-200 bg-white
                 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50"
    >
      <Icon size={18} color={hovered ? "#2563eb" : "#64748b"} />
    </a>
  );
}
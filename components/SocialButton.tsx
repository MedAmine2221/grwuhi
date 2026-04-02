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
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        borderRadius: "8px",
        border: `1px solid ${hovered ? "#d99934" : "rgba(255,255,255,0.3)"}`,
        backgroundColor: hovered ? "rgba(217,153,52,0.1)" : "transparent",
        transition: "border-color 0.2s, background-color 0.2s",
        cursor: "pointer",
      }}
    >
      <Icon size={18} color={hovered ? "#d99934" : "rgba(255,255,255,0.7)"} />
    </a>
  );
}

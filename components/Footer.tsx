"use client";

import Image from "next/image";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { useState } from "react";

const NAV_LINKS = {
  "Site Map": ["Home", "Interview Prep", "Blog"],
  "Legal": ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"],
};

const SOCIAL = [
  { icon: FiLinkedin, label: "LinkedIn" },
  { icon: FiInstagram, label: "Instagram" },
  { icon: FiFacebook, label: "Facebook" },
];

function SocialButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
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

export default function Footer() {
  return (
    <footer
      className="bg-[#113d3c] w-full rounded-t-lg"
    >
      {/* Main content */}
      <div className="px-10 pt-10 pb-8 flex flex-col lg:flex-row justify-between gap-10">

        {/* Brand Column */}
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/logo.png"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              alt="GRWUHI logo"
              loading="eager"
            />
            <span className="text-white text-xl font-semibold tracking-widest">
              GRWUHI
            </span>
          </div>

          <p className="text-white/60 text-sm leading-relaxed">
            Ace your HR and technical interviews with AI-powered coaching.
            From preparation to salary negotiation — we boost your chances of getting hired.
          </p>

          {/* Social Icons */}
          <div className="flex flex-row gap-3 mt-1">
            {SOCIAL.map(({ icon, label }) => (
              <SocialButton key={label} icon={icon} label={label} />
            ))}
          </div>
        </div>

        {/* Nav Columns */}
        <div className="flex flex-row gap-16 flex-wrap">
          {Object.entries(NAV_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-3">
              <h4 className="text-[#d99934] text-xs font-semibold uppercase tracking-widest">
                {section}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/60 text-sm hover:text-white transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Gold Bottom Bar */}
      <div
        className="w-full py-2 flex items-center justify-center bg-[#d99934]"
      >
        <p className="text-white text-xs tracking-wide">
          Copyright &copy; {new Date().getFullYear()} GRWUHI — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
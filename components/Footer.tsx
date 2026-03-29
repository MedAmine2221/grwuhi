/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";;
import { NAV_LINKS, SOCIAL } from "@/constants";
import Image from "next/image";
import SocialButton from "./SocialButton";
export default function Footer() {
  return (
    <footer
      className="bg-[#113d3c] w-full rounded-t-lg"
    >
      {/* Main content */}
      <div className="px-10 pt-10 pb-8 flex flex-row justify-between gap-10">

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
            {SOCIAL.map(({ icon, label, link }) => (
              <SocialButton link={link} key={label} icon={icon} label={label} />
            ))}
          </div>
        </div>

        {/* Nav Columns */}
        <div className="flex flex-row gap-16">
          {Object.entries(NAV_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-3">
              <h4 className="text-[#d99934] text-xs font-semibold uppercase tracking-widest">
                {section}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link: any) => (
                  <li key={link?.name}>
                    <a
                      href={link?.href}
                      className="text-white/60 text-sm hover:text-white transition-colors duration-150"
                    >
                      {link?.name}
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
        className="w-full py-2 flex flex-col items-center justify-center bg-[#d99934]"
      >
        <p className="text-white text-xs tracking-wide">
          Copyright &copy; {new Date().getFullYear()} GRWUHI — All Rights Reserved.
        </p>
        <p className="text-white text-xs tracking-wide">
          Developed By <a href="https://mohamed-amine-laz.vercel.app/fr" target="_blank" className="text-[#113d3c] text-sm">Mohamed Amine LAZREG</a>
        </p>
      </div>
    </footer>
  );
}
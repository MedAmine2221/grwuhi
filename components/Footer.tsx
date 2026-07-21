"use client";
import Image from "next/image";
import { SOCIAL } from "@/constants";
import SocialButton from "./SocialButton";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white w-full border-t border-gray-200"
    >
      {/* Main row */}
      <div className="px-8 lg:px-14 py-8 flex flex-wrap items-center justify-between gap-6 border-b border-gray-100">

        {/* Left — Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <Image src="/logo.png" width={25} height={25} className="object-contain" alt="" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              GRWUHI
            </span>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed max-w-60">
            Ace your HR and technical interviews with AI-powered coaching —
            from preparation to salary negotiation.
          </p>
        </div>

        {/* Right — Badge + Socials */}
        <div className="flex flex-col items-end gap-3">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            AI-Powered Assessment
          </span>
          <div className="flex gap-2">
            {SOCIAL.map(({ icon, label, link }) => (
              <SocialButton key={label} link={link} icon={icon} label={label} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-50 px-8 lg:px-14 py-3 flex items-center justify-between flex-wrap gap-2">
        <p className="text-gray-500 text-[11px] font-medium">
          © {new Date().getFullYear()} GRWUHI — All Rights Reserved.
        </p>
        <p className="text-gray-400 text-[11px]">
          <a
            href="https://mohamed-amine-laz.vercel.app/fr"
            target="_blank"
            className="hover:text-blue-600 transition-colors"
          >
            Mohamed Amine LAZREG
          </a>
        </p>
      </div>
    </motion.footer>
  );
}
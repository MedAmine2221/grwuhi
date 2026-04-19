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
      className="bg-[#09101c] w-full border-t border-white/6"
    >
      {/* Main row */}
      <div className="px-8 lg:px-14 py-8 flex flex-wrap items-center justify-between gap-6 border-b border-white/6">

        {/* Left — Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8.5 h-8.5 rounded-[10px] bg-linear-to-br from-[#1a9e8f] to-[#162d52] border border-[#1a9e8f]/40 flex items-center justify-center">
              <Image src="/logo.png" width={18} height={18} className="object-contain" alt="" />
            </div>
            <span className="text-lg font-semibold text-[#f4f1ea] tracking-[0.12em]">
              GRWUHI
            </span>
          </div>
          <p className="text-[#8a9bb8] text-xs leading-relaxed max-w-60">
            Ace your HR and technical interviews with AI-powered coaching —
            from preparation to salary negotiation.
          </p>
        </div>

        {/* Right — Badge + Socials */}
        <div className="flex flex-col items-end gap-3">
          <span className="inline-flex items-center gap-2 bg-[#1a9e8f]/10 border border-[#1a9e8f]/25 text-[#1a9e8f] text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e8f] animate-pulse" />
            AI-Powered Assessment
          </span>
          <div className="flex gap-2">
            {SOCIAL.map(({ icon, label, link }) => (
              <SocialButton key={label} link={link} icon={icon} label={label} />
            ))}
          </div>
        </div>
      </div>

      {/* Gold bar */}
      <div className="bg-[#d99934] px-8 lg:px-14 py-2.5 flex items-center justify-between flex-wrap gap-2">
        <p className="text-[#0d1f3c] text-[11px] font-medium tracking-wide">
          © {new Date().getFullYear()} GRWUHI — All Rights Reserved.
        </p>
        <p className="text-[#0d1f3c] text-[11px]">
          <a
            href="https://mohamed-amine-laz.vercel.app/fr"
            target="_blank"
            className="font-bold text-[#09101c] hover:underline"
          >
            Mohamed Amine LAZREG
          </a>
        </p>
      </div>
    </motion.footer>
  );
}
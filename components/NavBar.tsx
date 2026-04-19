"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#09101c]/80 backdrop-blur-md border-b border-white/6"
    >
      <div className="px-8 lg:px-14 h-16 flex items-center justify-between">
        
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#1a9e8f] to-[#162d52] border border-[#1a9e8f]/40 flex items-center justify-center">
            <Image src="/logo.png" width={18} height={18} className="object-contain" alt="" />
          </div>
          <span className="text-lg font-semibold text-[#f4f1ea] tracking-[0.12em]">
            GRWUHI
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ name, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive
                    ? "text-[#d99934]"
                    : "text-[#8a9bb8] hover:text-[#f4f1ea]"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-[#d99934]/10 border border-[#d99934]/25"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </Link>
            );
          })}
        </div>

        {/* Badge */}
        <span className="hidden sm:inline-flex items-center gap-2 bg-[#1a9e8f]/10 border border-[#1a9e8f]/25 text-[#1a9e8f] text-[10px] font-medium uppercase tracking-widest px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e8f] animate-pulse" />
          AI Interview Coach
        </span>

      </div>
    </motion.nav>
  );
}
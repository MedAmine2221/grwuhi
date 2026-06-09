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
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="px-8 lg:px-14 h-16 flex items-center justify-between">
        
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
            <Image src="/logo.png" width={18} height={18} className="object-contain" alt="" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
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
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {name}
              </Link>
            );
          })}
        </div>

        {/* Badge */}
        <span className="hidden sm:inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-[10px] font-medium uppercase tracking-widest px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          AI Interview Coach
        </span>

      </div>
    </motion.nav>
  );
}
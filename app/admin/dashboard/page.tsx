"use client";
import { AppTab } from "@/components/AppTab";
import { AppRaite } from "@/constants";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Dashboard() {
  const users = useSelector((state: RootState) => state.usersResult.users);
  const starRaiting = useSelector((state: RootState) => state.raiting.raiting);

  const appRaitingRslt = useMemo(() => {
    const list = starRaiting.flat() ?? [];
    const tot = list.length;
    const som = list.reduce((a, b) => a + b.starRaiting, 0);
    return som / tot;
  }, [starRaiting]);

  const router = useRouter();
  const totalUsers = users?.flat().length ?? 0;
  const ratingLabel = !Number.isNaN(appRaitingRslt)
    ? AppRaite[Math.trunc(appRaitingRslt)]
    : null;

  const stats = [
    {
      label: "Total Users",
      icon: "mdi:account-group-outline",
      value: totalUsers,
      sub: null,
      variant: "teal" as const,
    },
    {
      label: "App Rating",
      icon: "mdi:star-outline",
      value: Number.isNaN(appRaitingRslt)
        ? "0/5"
        : `${appRaitingRslt.toFixed(1)}/5`,
      sub: ratingLabel,
      variant: "gold" as const,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a1628]">

      {/* ── Main ── */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4
                           border-b border-white/4">
          <div>
            <p className="text-[10px] text-[#8a9bb8]/50 uppercase tracking-widest mb-0.5">
              GRWUHI /{" "}
              <span className="text-[#1a9e8f]">Dashboard</span>
            </p>
            <h1 className="text-[18px] font-semibold text-[#f4f1ea] tracking-tight">
              Admin Panel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/4 border border-white/[0.07]
                            rounded-lg px-3 py-1.5 text-[11px] text-[#8a9bb8]/60
                            font-mono">
              <Icon icon="mdi:calendar-outline" className="size-3 text-[#1a9e8f]" />
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#1a9e8f] to-[#162d52]
                            border-[1.5px] border-[#1a9e8f]/40 flex items-center justify-center
                            text-[10px] font-semibold text-[#f4f1ea]">
              MAL
            </div>
                    <button
          onClick={() => {
            localStorage.removeItem("token");
            router.replace("/admin/auth");
          }}
          className="mt-auto w-9 h-9 rounded-xl flex items-center justify-center
                     bg-[#e05c3a]/8 border border-[#e05c3a]/18
                     hover:bg-[#e05c3a]/15 transition-colors"
        >
          <Icon icon="mdi:logout" className="size-4 text-[#e05c3a]" />
        </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(({ label, value, sub, icon, variant }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="relative bg-[#0d1f3c] border border-white/6 rounded-2xl
                           p-4 overflow-hidden group hover:border-[#1a9e8f]/25 transition-colors"
              >
                {/* bg orb */}
                <div
                  className={`absolute -top-8 -right-8 w-20 h-20 rounded-full pointer-events-none
                    ${variant === "gold"
                      ? "bg-[#d99934]/5"
                      : "bg-[#1a9e8f]/5"
                    }`}
                />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-medium text-[#8a9bb8]/50
                                   uppercase tracking-widest">
                    {label}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center
                      border transition-colors
                      ${variant === "gold"
                        ? "bg-[#d99934]/10 border-[#d99934]/20 group-hover:bg-[#d99934]/15"
                        : "bg-[#1a9e8f]/10 border-[#1a9e8f]/20 group-hover:bg-[#1a9e8f]/15"
                      }`}
                  >
                    <Icon
                      icon={icon}
                      className={`size-3.5 ${
                        variant === "gold" ? "text-[#d99934]" : "text-[#1a9e8f]"
                      }`}
                    />
                  </div>
                </div>

                <p className="text-[26px] font-semibold text-[#f4f1ea] tracking-tight
                              font-mono leading-none">
                  {value}
                </p>

                {sub && (
                  <p className="text-[11px] text-[#8a9bb8]/40 mt-1.5">
                    <span className={variant === "gold" ? "text-[#d99934]" : "text-[#1a9e8f]"}>
                      {sub}
                    </span>
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Table card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="bg-[#0d1f3c] border border-white/6 rounded-2xl overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3.5
                            border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-0.75 h-4.5 rounded-full bg-linear-to-b
                                from-[#1a9e8f] to-[#d99934]" />
                <h2 className="text-[13px] font-semibold text-[#f4f1ea]">
                  Users List
                </h2>
                <span className="text-[10px] text-[#8a9bb8]/55 bg-white/4
                                 border border-white/[0.07] rounded-full px-2.5 py-0.5 font-mono">
                  {totalUsers} users
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="px-4 py-3">
              <AppTab />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
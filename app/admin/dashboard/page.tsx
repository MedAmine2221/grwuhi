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
  const rating =
    Math.min(5, Math.max(1, Math.trunc(appRaitingRslt))) as keyof typeof AppRaite;

  const ratingLabel = !Number.isNaN(appRaitingRslt)
    ? AppRaite[rating]
    : null;

  const stats = [
    {
      label: "Total Users",
      icon: "mdi:account-group-outline",
      value: totalUsers,
      sub: null,
      variant: "blue" as const,
    },
    {
      label: "App Rating",
      icon: "mdi:star-outline",
      value: Number.isNaN(appRaitingRslt)
        ? "0/5"
        : `${appRaitingRslt.toFixed(1)}/5`,
      sub: ratingLabel,
      variant: "amber" as const,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── Main ── */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">
              GRWUHI /{" "}
              <span className="text-blue-600">Dashboard</span>
            </p>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              Admin Panel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-500 font-mono">
              <Icon icon="mdi:calendar-outline" className="size-3 text-blue-600" />
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-semibold text-white shadow-sm">
              MAL
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.replace("/admin/auth");
              }}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
            >
              <Icon icon="mdi:logout" className="size-4 text-red-600" />
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
                className="relative bg-white border border-gray-200 rounded-2xl p-4 overflow-hidden group hover:border-blue-300 transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {label}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center
                      border transition-colors
                      ${variant === "amber"
                        ? "bg-amber-50 border-amber-200 group-hover:bg-amber-100"
                        : "bg-blue-50 border-blue-200 group-hover:bg-blue-100"
                      }`}
                  >
                    <Icon
                      icon={icon}
                      className={`size-3.5 ${
                        variant === "amber" ? "text-amber-600" : "text-blue-600"
                      }`}
                    />
                  </div>
                </div>

                <p className="text-3xl font-bold text-gray-900 tracking-tight leading-none">
                  {value}
                </p>

                {sub && (
                  <p className="text-xs text-gray-400 mt-1.5">
                    <span className={variant === "amber" ? "text-amber-600" : "text-blue-600"}>
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
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-600 to-amber-500" />
                <h2 className="text-sm font-semibold text-gray-900">
                  Users List
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2.5 py-0.5 font-mono">
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
"use client";
// app/admin/dashboard/page.tsx
import { AppTab } from '@/components/AppTab';
import { AppRaite } from '@/constants';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';


export default function Dashboard() {
  const users = useSelector((state: RootState)=> state.usersResult.users);
  const starRaiting = useSelector((state: RootState)=> state.raiting.raiting);
  const appRaitingRslt = useMemo(()=>{
    const list = starRaiting.flat() ?? []
    const tot = list?.length
    const som = list?.reduce((a,b) => a+b.starRaiting, 0);
    return som/tot
  },[starRaiting])
  const stats = [
    { label: "Users Numbers", icon: "mdi:account-group-outline", value: users?.flat().length ?? 0 },
    { label: "App Rating", icon: "mdi:star-outline", value: `${appRaitingRslt}/5` },
  ]
  const router = useRouter()
  return (
    <main className="min-h-screen bg-[#f7f7f8] px-6 py-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[#113d3c] text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-black/40 mt-0.5 font-bold">
            App Raiting : {AppRaite[Math.trunc(appRaitingRslt)]}
          </p>
          <p className="text-sm text-black/40 mt-0.5">
            GRWUHI Users Management <br/>
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <div className="flex items-center gap-2 text-xs text-black/35 bg-white border border-black/10 rounded-lg px-3 py-1.5">
            <Icon icon="mdi:calendar-outline" className="size-3.5" />
            {new Date().toLocaleDateString("en-EN", { day: "numeric", month: "long", year: "numeric" })}
          </div>
          <button onClick={()=>{
            sessionStorage.removeItem("token");
            router.replace("/admin/auth")
          }} className="my-4 flex items-center gap-2 text-sm text-red-500 bg-red-200 border border-red-500 rounded-lg px-3 py-1.5">
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white border border-black/[0.07] rounded-2xl px-5 py-4
                       hover:border-[#d99934]/40 transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-black/40 uppercase tracking-widest">
                {label}
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#113d3c]/5 group-hover:bg-[#d99934]/10
                              flex items-center justify-center transition-colors">
                <Icon icon={icon} className="size-4 text-[#113d3c] group-hover:text-[#d99934] transition-colors" />
              </div>
            </div>
            <p className="text-3xl font-semibold text-[#113d3c]">{value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">

        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/6">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-5 rounded-full bg-[#d99934]" />
            <h2 className="text-sm font-semibold text-[#113d3c]">
              Users List
            </h2>
          </div>
          <span className="text-xs text-black/35 bg-black/4 px-2.5 py-1 rounded-full">
            8 user(s)
          </span>
        </div>

        {/* Table */}
        <div className="px-4 py-4">
          <AppTab />
        </div>
      </div>
    </main>
  )
}
/* eslint-disable react-hooks/exhaustive-deps */
"use client";;
import { Icon } from "@iconify/react";
import { SortingState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/constants/interfaces";
import Avatar from "./AppAvatar";
import { columnHelper } from "@/constants";
import DataTable from "./DataTable";
import { toSortingState } from "@/utils/functions";

export function AppTab() {
  const users = useSelector((state: RootState) => state.usersResult.users);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [sorting, setSorting] = useState<SortingState>([]);
  const [toast, setToast] = useState<string | null>(null);
  const columns = useMemo(() => [
    columnHelper.display({
      id: "select",
      header: () => {
        const allSelected = users?.every((u: User) => selectedIds.has(u.id));
        const someSelected = users?.some((u: User) => selectedIds.has(u.id));
        return (
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 accent-[#d99934] cursor-pointer"
            checked={allSelected}
            ref={(el) => { 
              if (el) el.indeterminate = !!(someSelected && !allSelected); 
            }}            
            onChange={(e) => {
              setSelectedIds(e.target.checked ? new Set(users?.map((u: User) => u.id)) : new Set());
            }}
          />
        );
      },
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 accent-[#d99934] cursor-pointer"
          checked={selectedIds.has(row.original.id)}
          onChange={(e) => {
            setSelectedIds((prev) => {
              const next = new Set(prev);
              if (e.target.checked) next.add(row.original.id);
              else next.delete(row.original.id);
              return next;
            });
          }}
        />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Nom",
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.original.name} />
          <span className="font-medium text-[#113d3c] text-sm">{row.original.name}</span>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: ({ getValue }) => (
        <span className="text-sm text-black/55 font-medium">{getValue()}</span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "CreatedAt",
      cell: ({ getValue }) => <span className="text-sm text-black/55 font-medium">{getValue()}</span>,
    }),
    columnHelper.display({
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <button
          onClick={() => showToast(`email sent to ${row.original.name} (${row.original.email})`)}
          title={`Email to ${row.original.name}`}
          className="p-1.5 rounded-lg text-[#d99934] hover:bg-[#d99934]/10
                     border border-transparent hover:border-[#d99934]/25 transition-all"
        >
          <Icon icon="mdi:email-outline" className="size-4.5" />
        </button>
      ),
    }),
  ], [selectedIds]);
  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }
  function handleSendAll() {
      const targets = users?.filter((u: User) => selectedIds.has(u.id));
      showToast(`✓ email sent to ${targets?.length} user(s)`);
  }
  return (
    <div className="relative space-y-3">
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5
                        bg-[#113d3c] border border-[#d99934]/35 text-white text-sm
                        px-4 py-3 rounded-xl shadow-lg shadow-[#113d3c]/20">
          <Icon icon="mdi:check-circle-outline" className="text-[#d99934] size-5 shrink-0" />
          {toast}
        </div>
      )}
      <DataTable
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        columns={columns}
        data={users?.flat()}
        onSortChange={(d) => setSorting(toSortingState(d))}
        sorting={sorting}
        setSorting= {setSorting}
        action= {handleSendAll}
      />
    </div>
  );
}
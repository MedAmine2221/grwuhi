/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTableProps, User } from "@/constants/interfaces";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  RowSelectionState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState, useMemo, useEffect } from "react";
import SortIcon from "./SortIcon";
import EmailModal from "./SendEmailModal";

export default function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const columns = useMemo<ColumnDef<User, any>[]>(
    () => [
      // Checkbox column
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            ref={(el) => {
              if (el) el.indeterminate = table.getIsSomePageRowsSelected();
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-3.5 w-3.5 cursor-pointer rounded accent-[#1a9e8f]"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-3.5 w-3.5 cursor-pointer rounded accent-[#1a9e8f]"
          />
        ),
        enableSorting: false,
        size: isMobile ? 40 : 36,
      },

      // Name
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
              style={{
                background: row.original.color + "22",
                color: row.original.color,
              }}
            >
              {row.original.avatar}
            </span>
            <span className="font-medium text-[#dce8f5] truncate">
              {row.getValue("name")}
            </span>
          </div>
        ),
        size: isMobile ? 120 : undefined,
      },

      // Email - hide on mobile
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => (
          <span className="text-[12px] text-[#8a9bb8] truncate block max-w-37.5 md:max-w-none">
            {getValue() as string}
          </span>
        ),
        enableHiding: true,
      },
      // Joined
      {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ getValue }) => (
          <span className="text-[12px] text-[#6e7f99] whitespace-nowrap">
            {getValue() as string}
          </span>
        ),
        size: isMobile ? 90 : undefined,
      },
    ],
    [isMobile]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination: { pageIndex: 0, pageSize },
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedUsers = selectedRows.map((r) => r.original);
  const hasSelection = selectedUsers.length > 0;

  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const totalFiltered = table.getFilteredRowModel().rows.length;
  const pageStart = pageIndex * pageSize + 1;
  const pageEnd = Math.min((pageIndex + 1) * pageSize, totalFiltered);

  async function handleSend(subject: string, message: string) {
    const listEmails = selectedUsers.map((u) => u.email);
    await fetch("https://grwuhi.vercel.app/api/send-email", {
      method: "POST",
      body: JSON.stringify({ email: listEmails, subject, message }),
    });
    alert(`Email sent to: ${selectedUsers.map((u) => u.email).join(", ")}`);
    setEmailModalOpen(false);
  }

  // Mobile pagination buttons
  const getPageButtons = () => {
    const buttons = [];
    const maxVisible = isMobile ? 3 : 5;
    let startPage = Math.max(0, pageIndex - Math.floor(maxVisible / 2));
    const endPage = Math.min(pageCount - 1, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(0, endPage - maxVisible + 1);
    }

    if (startPage > 0) {
      buttons.push(
        <button
          key="first"
          onClick={() => table.setPageIndex(0)}
          className="hidden sm:flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/4 text-[12px] text-[#8a9bb8] transition hover:bg-white/10 hover:text-[#c2d0e6]"
        >
          «
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => table.setPageIndex(i)}
          className={`flex h-7 min-w-7 items-center justify-center rounded-md border text-[12px] font-medium transition px-1 ${
            pageIndex === i
              ? "border-[#1a9e8f] bg-[#1a9e8f] text-white"
              : "border-white/10 bg-white/4 text-[#8a9bb8] hover:bg-white/10 hover:text-[#c2d0e6]"
          }`}
        >
          {i + 1}
        </button>
      );
    }

    if (endPage < pageCount - 1) {
      buttons.push(
        <button
          key="last"
          onClick={() => table.setPageIndex(pageCount - 1)}
          className="hidden sm:flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/4 text-[12px] text-[#8a9bb8] transition hover:bg-white/10 hover:text-[#c2d0e6]"
        >
          »
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-t-xl border border-white/8 bg-[#0d1825] px-3.5 py-2.5">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Selection count badge */}
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
              hasSelection
                ? "border-[#1a9e8f]/30 bg-[#1a9e8f]/12 text-[#1a9e8f]"
                : "border-white/10 bg-white/5 text-[#8a9bb8]"
            }`}
          >
            {selectedUsers.length} selected
          </span>

          {/* Email button — slides in when selection exists */}
          <button
            onClick={() => setEmailModalOpen(true)}
            className={`flex items-center gap-1.5 rounded-md bg-[#1a9e8f] px-3.5 py-1.5 text-[12px] font-medium text-white transition-all duration-200 hover:bg-[#16887b] whitespace-nowrap ${
              hasSelection
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-2 opacity-0"
            }`}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="hidden sm:inline">Send email</span>
            <span className="sm:hidden">Email</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-auto">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8a9bb8]"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search users..."
            className="w-full sm:w-44 rounded-md border border-white/10 bg-white/6 py-1.5 pl-7 pr-3 text-[12px] text-[#c2d0e6] outline-none placeholder:text-[#8a9bb8]/60 focus:border-[#1a9e8f]/50"
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto border-x border-white/8 bg-[#0d1825]">
        <table className="w-full border-collapse min-w-125">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-white/[0.07]">
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      style={{ width: header.column.getSize() }}
                      className={[
                        "px-3 py-2.5 text-left",
                        "text-[10px] font-semibold uppercase tracking-widest",
                        sorted ? "text-[#1a9e8f]" : "text-[#8a9bb8]",
                        canSort
                          ? "cursor-pointer select-none hover:text-[#c2d0e6]"
                          : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {canSort && <SortIcon state={sorted} />}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-[13px] text-[#6e7f99]"
                >
                  No users found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-white/4 transition-colors last:border-b-0 hover:bg-white/2.5 ${
                    row.getIsSelected() ? "bg-[#1a9e8f]/[0.07]" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-xl border border-white/8 bg-[#0d1825] px-3.5 py-2.5">
        {/* Per page */}
        <div className="flex items-center gap-2 text-[12px] text-[#8a9bb8] order-2 sm:order-1">
          <span className="hidden sm:inline">Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              table.setPageIndex(0);
            }}
            className="rounded-md border border-white/10 bg-white/6 px-2 py-1 text-[12px] text-[#c2d0e6] outline-none"
          >
            {[5, 10, 25].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span>per page</span>
        </div>

        {/* Page info */}
        <span className="text-[12px] text-[#8a9bb8] order-1 sm:order-2">
          Showing{" "}
          <strong className="text-[#c2d0e6]">
            {totalFiltered === 0 ? 0 : pageStart}–{pageEnd}
          </strong>{" "}
          of <strong className="text-[#c2d0e6]">{totalFiltered}</strong>
        </span>

        {/* Page buttons */}
        <div className="flex items-center gap-1 order-3 overflow-x-auto max-w-full pb-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/4 text-[12px] text-[#8a9bb8] transition hover:bg-white/10 hover:text-[#c2d0e6] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ‹
          </button>

          {getPageButtons()}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/4 text-[12px] text-[#8a9bb8] transition hover:bg-white/10 hover:text-[#c2d0e6] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ›
          </button>
        </div>
      </div>

      {/* ── Email Modal ── */}
      {emailModalOpen && (
        <EmailModal
          recipients={selectedUsers}
          onClose={() => setEmailModalOpen(false)}
          onSend={handleSend}
        />
      )}
    </>
  );
}
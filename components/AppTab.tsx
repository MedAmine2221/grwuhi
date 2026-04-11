/* eslint-disable react-hooks/incompatible-library */
// components/AppTab.tsx
"use client";

import type { SortDescriptor } from "@heroui/react";
import type { SortingState } from "@tanstack/react-table";

import { Pagination, Table, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/constants/interfaces";

// Avatar initials
function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-[#113d3c]/10 border border-[#113d3c]/20
                    flex items-center justify-center text-[10px] font-semibold text-[#113d3c] shrink-0">
      {initials}
    </div>
  );
}

const columnHelper = createColumnHelper<User>();

function toSortDescriptor(sorting: SortingState): SortDescriptor | undefined {
  const first = sorting[0];
  if (!first) return undefined;
  return { column: first.id, direction: first.desc ? "descending" : "ascending" };
}

function toSortingState(descriptor: SortDescriptor): SortingState {
  return [{ desc: descriptor.direction === "descending", id: descriptor.column as string }];
}

function SortableColumnHeader({
  children, sortDirection,
}: { children: React.ReactNode; sortDirection?: "ascending" | "descending" }) {
  return (
    <span className="flex items-center justify-between gap-2">
      {children}
      {!!sortDirection && (
        <Icon
          icon="gravity-ui:chevron-up"
          className={cn(
            "size-3 transform transition-transform duration-100 ease-out text-[#d99934]",
            sortDirection === "descending" ? "rotate-180" : "",
          )}
        />
      )}
    </span>
  );
}

const PAGE_SIZE = 4;

export function AppTab() {
  const users = useSelector((state: RootState) => state.usersResult.users);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  function handleSendAll() {
    const targets = users?.filter((u: User) => selectedIds.has(u.id));
    showToast(`✓ email sent to ${targets?.length} user(s)`);
  }

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

  const table = useReactTable({
    columns,
    data: users ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: PAGE_SIZE } },
    onSortingChange: setSorting,
    state: { sorting },
  });

  const sortDescriptor = useMemo(() => toSortDescriptor(sorting), [sorting]);
  const { pageIndex } = table?.getState().pagination;
  const pageCount = table?.getPageCount();
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const start = pageIndex * PAGE_SIZE + 1;
  const end = Math.min((pageIndex + 1) * PAGE_SIZE, users?.length ?? 0);
  const selectedCount = selectedIds.size;

  return (
    <div className="relative space-y-3">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5
                        bg-[#113d3c] border border-[#d99934]/35 text-white text-sm
                        px-4 py-3 rounded-xl shadow-lg shadow-[#113d3c]/20">
          <Icon icon="mdi:check-circle-outline" className="text-[#d99934] size-5 shrink-0" />
          {toast}
        </div>
      )}

      {/* Bulk action bar */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between
                        bg-[#113d3c] border border-[#d99934]/25
                        rounded-xl px-4 py-2.5 text-sm text-white">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#d99934]/20 border border-[#d99934]/40
                            flex items-center justify-center">
              <Icon icon="mdi:check" className="size-3 text-[#d99934]" />
            </div>
            <span className="text-white/65">
              <span className="text-[#d99934] font-semibold">{selectedCount}</span>{" "}
              ligne{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSendAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         bg-[#d99934] text-[#113d3c] font-medium text-xs
                         hover:opacity-85 active:scale-[0.97] transition-all"
            >
              <Icon icon="mdi:email-fast-outline" className="size-4" />
              Send Email ({selectedCount})
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/10 transition"
              title="Désélectionner"
            >
              <Icon icon="mdi:close" className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Users table"
            className="min-w-170"
            sortDescriptor={sortDescriptor}
            onSortChange={(d) => setSorting(toSortingState(d))}
          >
            <Table.Header>
              {table.getHeaderGroups()[0]!.headers.map((header) => (
                <Table.Column
                  key={header.id}
                  allowsSorting={header.column.getCanSort()}
                  id={header.id}
                  isRowHeader={header.id === "name"}
                >
                  {header.id === "select" || header.id === "actions"
                    ? () => flexRender(header.column.columnDef.header, header.getContext())
                    : ({ sortDirection }) => (
                        <SortableColumnHeader sortDirection={sortDirection}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </SortableColumnHeader>
                      )}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  id={row.id}
                  className={cn(
                    "transition-colors",
                    selectedIds.has(row.original.id)
                      ? "bg-[#d99934]/[0.06] border-l-2 border-[#d99934]/50"
                      : "hover:bg-[#113d3c]/[0.02]"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>
              {start} – {end} of {users?.length}
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={!table.getCanPreviousPage()}
                  onPress={() => table.previousPage()}
                >
                  <Pagination.PreviousIcon />
                  Prev.
                </Pagination.Previous>
              </Pagination.Item>
              {pages.map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === pageIndex + 1}
                    onPress={() => table.setPageIndex(p - 1)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={!table.getCanNextPage()}
                  onPress={() => table.nextPage()}
                >
                  Next.
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </div>
  );
}
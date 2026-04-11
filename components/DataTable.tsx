/* eslint-disable react-hooks/incompatible-library */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn, Pagination, Table } from '@heroui/react';
import SortableColumnHeader from './SortableColumnHeader';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { PAGE_SIZE } from '@/constants';
import { useMemo } from 'react';
import { toSortDescriptor } from '@/utils/functions';
import { Icon } from '@iconify/react';
export default function DataTable({action, selectedIds, setSorting, sorting, setSelectedIds, columns, data, onSortChange}: {action: any, setSorting: any, sorting: any, selectedIds: any, setSelectedIds: (e: any)=> void, columns: any, data: any, onSortChange: (e: any)=> any}) {
    console.log("dataaaaaaaaaaaaaa ", data);
    
    const table = useReactTable({
      columns,
      data: data ?? [],
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
    const end = Math.min((pageIndex + 1) * PAGE_SIZE, data?.length ?? 0);
    const selectedCount = selectedIds.size;
    return (
        <>
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
                    onClick={action}
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
            <Table>
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Users table"
                  className="min-w-170"
                  sortDescriptor={sortDescriptor}
                  onSortChange={onSortChange}
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
                    {table.getRowModel().rows.map((row: any) => (
                      <Table.Row
                        key={row.id}
                        id={row.id}
                        className={cn(
                          "transition-colors",
                          selectedIds.has(row.original.id)
                            ? "bg-[#d99934]/6 border-l-2 border-[#d99934]/50"
                            : "hover:bg-[#113d3c]/2"
                        )}
                      >
                        {row.getVisibleCells().map((cell: any) => (
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
                    {start} – {end} of {data?.length}
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
        </>
    )
}

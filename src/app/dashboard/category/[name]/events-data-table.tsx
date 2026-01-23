
// Libs
import { InferSelectModel } from "drizzle-orm";
import { ArrowUpDown } from "lucide-react";
import { client } from "@/lib/client";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    OnChangeFn,
    PaginationState,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
} from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Schema
import { eventTable } from "@/server/db/schema";

export default function EventsDataTable({ categoryId, pagination, activePeriod, hasEvents, setPagination }: {
    categoryId: number,
    pagination: {
        pageSize: number,
        pageIndex: number
    },
    activePeriod: "today" | "this month" | "this week",
    hasEvents: boolean,
    setPagination: OnChangeFn<PaginationState>
}) {
    const [sorting, setSorting] = useState<SortingState>([])
    const router = useRouter()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const { data: categoryEvents, isFetching: isFetchingCategoryEvents } = useQuery({
        queryKey: ["events", categoryId, pagination.pageSize, pagination.pageIndex, activePeriod],
        queryFn: async () => {
            const res = await client.event.getCategoryEvents.$get({
                categoryId: categoryId,
                period: activePeriod,
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize
            })
            return await res.json()
        },
        enabled: hasEvents,
        refetchOnWindowFocus: false
    })

    const columns: ColumnDef<Pick<InferSelectModel<typeof eventTable>, "name" | "createdAt" | "deliveryStatus">>[] = useMemo(() => [
        {
            accessorKey: "name",
            header: "Category",
            cell: ({ row }) => (
                <div className="font-semibold text-sm text-gray-600">
                    {String(row.getValue("name")).charAt(0).toUpperCase()}{String(row.getValue("name")).slice(1)}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Date
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleString()
        },
        {
            accessorKey: "deliveryStatus",
            header: "Status",
            cell: ({ row }: { row: any }) => (
                <div className={
                    cn(
                        "rounded-lg w-fit font-semibold px-2 text-sm",
                        {
                            "bg-green-100 text-green-800": row.getValue("deliveryStatus") === "DELIVERED",
                            "bg-red-100 text-red-800": row.getValue("deliveryStatus") === "FAILED",
                            "bg-yellow-100 text-yellow-800": row.getValue("deliveryStatus") === "PENDING",
                        }
                    )
                }>
                    {row.getValue("deliveryStatus")}
                </div>
            ),
        },
        ...(() => {
            return Object.entries(categoryEvents?.events[0]?.fields || {}).map((field) => ({
                accessorKey: field[0],
                header: field[0],
                cell: ({ row }: { row: any }) => {
                    return (
                        <div className="font-semibold text-sm text-gray-600">
                            {row.original.fields[field[0]] === undefined ? "-" : String(row.original.fields[field[0]])}
                        </div>
                    )
                },
            }))
        })()
    ], [categoryEvents])

    const table = useReactTable({
        data: categoryEvents?.events || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        onPaginationChange: setPagination,
        pageCount: Math.ceil((categoryEvents?.eventsCount || 0) / pagination.pageSize),
        state: {
            sorting,
            columnFilters,
            pagination: pagination
        },
    })
    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className="text-gray-500 font-semibold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {
                        isFetchingCategoryEvents ? (
                            [...Array(4)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-12 text-center bg-gray-200 border-b-2 animate-pulse"
                                    />
                                </TableRow>
                            ))
                        ) :
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table>
            <div className="flex items-center lg:flex-row flex-col justify-end space-x-6 lg:space-x-8 gap-1 pt-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

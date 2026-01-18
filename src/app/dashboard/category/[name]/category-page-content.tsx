'use client'

// Libs
import { InferSelectModel } from "drizzle-orm";
import { BarChart } from "lucide-react";
import { client } from "@/lib/client";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
} from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

// Components
import CategoryEmptyState from "./category-empty-state";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
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
import { eventCategoryTable, eventTable } from "@/server/db/schema";

interface CategoryPageContentProps {
    category: Pick<InferSelectModel<typeof eventCategoryTable>, "name" | "id">,
    hasEvents: boolean
}


export default function CategoryPageContent({ category, hasEvents: initialHasEvents }: CategoryPageContentProps) {
    const [activePeriod, setActivePeriod] = useState<"today" | "this month" | "this week">("today")
    const [sorting, setSorting] = useState<SortingState>([])
    const router = useRouter()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const params = useSearchParams()
    const pageSize = Number(params.get("pageSize") || 30)
    const pageIndex = Number(params.get("pageIndex") || 1)

    const [pagination, setPagination] = useState<{ pageIndex: number, pageSize: number }>({
        pageIndex: pageIndex - 1,
        pageSize
    })

    const { data: hasEvents } = useQuery({
        queryKey: ["category", category.id, "hasEvents"],
        queryFn: async () => {
            const res = await client.event.pullEvents.$get({ id: category.id })
            const hasEvents = res.json()

            return hasEvents
        },
        initialData: initialHasEvents
    })

    const { data: categoryData, isFetching: isFetchingCategoryData } = useQuery({
        queryKey: ["category", category.id, "detail", activePeriod],
        queryFn: async () => {
            const res = await client.eventCategory.getCategoryDetails.$get({ categoryId: category.id, period: activePeriod })
            return await res.json()
        },
        enabled: hasEvents,
        refetchOnWindowFocus: false
    })

    const { data: categoryEvents, isFetching: isFetchingCategoryEvents } = useQuery({
        queryKey: ["events", category.id, pageSize, pageIndex, activePeriod],
        queryFn: async () => {
            const res = await client.event.getCategoryEvents.$get({
                categoryId: category.id,
                period: activePeriod,
                pageIndex: pageIndex,
                pageSize
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
            header: "Date",
            cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleString()
        },
        {
            accessorKey: "deliveryStatus",
            header: "Status",
            cell: ({ row }) => (
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
                            {row.original.fields[field[0]]}
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

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)

        searchParams.set("pageSize", pagination.pageSize.toString())
        searchParams.set("pageIndex", (pagination.pageIndex + 1).toString())

        router.push(`?${searchParams.toString()}`)
    }, [pagination, router])

    if (!hasEvents) {
        return (
            <CategoryEmptyState categoryName={category.name} categoryId={category.id} />
        )
    }

    return (
        <div>
            <Tabs value={activePeriod} onValueChange={(value) => {
                setActivePeriod(value as "today" | "this week" | "this month")
                setPagination((prev) => ({
                    ...prev,
                    pageIndex: 0
                }))
            }}>
                <TabsList className="space-x-1">
                    <TabsTrigger value="today" className={cn("text-zinc-500 hover:bg-white hover:text-gray-700", activePeriod === "today" && "text-gray-700")}>Today</TabsTrigger>
                    <TabsTrigger value="this week" className={cn("text-zinc-500 hover:bg-white hover:text-gray-700", activePeriod === "this week" && "text-gray-700")}>This Week</TabsTrigger>
                    <TabsTrigger value="this month" className={cn("text-zinc-500 hover:bg-white hover:text-gray-700", activePeriod === "this month" && "text-gray-700")}>This Month</TabsTrigger>
                </TabsList>
                <TabsContent value={activePeriod}>
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="rounded-lg border-brand-400 border-2 p-8 mt-6 flex gap-2 flex-col">
                            <div className="flex justify-between items-center pb-1">
                                <p className="font-medium">Total Events</p>
                                <BarChart className="size-4 text-gray-500" />
                            </div>

                            <div>
                                {
                                    isFetchingCategoryData ? <span className="block animate-pulse rounded-sm h-6 w-18 bg-gray-200" /> : (
                                        <p className="font-bold text-3xl">{categoryData?.totalEvents}</p>
                                    )
                                }
                                <p className="text-muted-foreground text-sm">Events today</p>
                            </div>
                        </div>
                        {
                            Object.entries(categoryData?.uniqueFields || {}).map((field) => (
                                <div className="rounded-lg shadow-sm  p-8 mt-6 flex gap-2 flex-col" key={field[0]}>
                                    <div className="flex justify-between items-center pb-1">
                                        <p className="font-medium">{field[0]}</p>
                                        <BarChart className="size-4 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-3xl">{field[1]}</p>
                                        <p className="text-muted-foreground text-sm">today</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </TabsContent>
            </Tabs>
            <div className="pt-12">
                <p className="text-xl mb-2">
                    Events overview
                </p>

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
                </div>
                <div className="flex items-center justify-end space-x-6 lg:space-x-8">
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

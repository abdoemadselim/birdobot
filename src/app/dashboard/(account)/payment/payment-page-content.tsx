'use client'

// Libs
import { client } from "@/lib/client"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

// Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function PaymentPageContent() {
    const { data: payments, isPending: isPendingPayments } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await client.payment.getPayments.$get()

            return res.json()
        }
    })

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 px-6 py-4 overflow-x-auto max-w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Transaction ID</TableHead>
                        <TableHead className="pl-8">Status</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isPendingPayments ? (
                            [...Array(10)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell
                                        colSpan={5}
                                        className="h-8 text-center bg-gray-200 border-b-2 animate-pulse"
                                    />
                                </TableRow>
                            ))
                        ) :
                            payments?.map((payment) => (
                                <TableRow>
                                    <TableCell className="font-medium">{payment.transactionId}</TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "rounded-lg  font-semibold px-4 text-sm text-center w-fit py-2",
                                            {
                                                "bg-green-100 text-green-800": payment.status === "COMPLETED",
                                                "bg-red-100 text-red-800": payment.status === "CANCELLED",
                                                "bg-yellow-100 text-yellow-800": payment.status === "PENDING",
                                            }
                                        )}>
                                            {payment.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold">{payment.package.charAt(0).toUpperCase()}{payment.package.slice(1)}</TableCell>
                                    <TableCell>{payment.createdAt.toLocaleString()}</TableCell>
                                    <TableCell >${payment.total}</TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

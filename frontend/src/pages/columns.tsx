import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@/types/transaction";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "transaction_date",
        header: "Data",
        cell: ({ row }) => formatDate(row.original.transaction_date)
    },
    {
        accessorKey: "name",
        header: "Nome"
    },
    {
        accessorKey: "description",
        header: "Descrição"
    },
    {
        accessorKey: "category.name",
        header: "Categoria",
        cell: ({ row }) => (
            <span className="inline-flex rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                {row.original.category.name}
            </span>
        )
    },
    {
        accessorKey: "amount",
        header: () => (
            <div className="text-right">Valor</div>
        ),
        cell: ({ row }) => {
            const isIncome = row.original.category.type === "income"

            return (
                <div
                    className={`whitespace-nowrap text-right font-semibold tabular-nums ${isIncome
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                        }`}
                >
                    {isIncome ? "+" : "-"}{" "}
                    {formatCurrency(row.original.amount)}
                </div>
            )
        }
    }
];



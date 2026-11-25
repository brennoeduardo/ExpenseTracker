import {
    PlusIcon,
    ArrowLeftRight,
    RefreshCw,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Loader2
} from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useRef, useState } from "react"
import { getTransactions } from "@/services/transactionService"
import type { Transaction } from "@/types/transaction"
import type { PaginationState } from "@tanstack/react-table";

import {
    useReactTable,
    getCoreRowModel,
    flexRender
} from "@tanstack/react-table";

import { columns } from "./columns";
import { Button } from "@/components/ui/button"

export default function Transactions() {

    const active = useRef(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const table = useReactTable({
        data: transactions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: total,
        state: { pagination },
        onPaginationChange: setPagination
    });

    async function fetchTransactions() {
        try {

            setLoading(true)
            setError(null)

            const response = await getTransactions(
                pagination.pageIndex + 1,
                pagination.pageSize
            );

            if (active.current) {
                setTransactions(response.data);
                setTotal(response.pagination.total);
            }

        } catch (error) {
            console.error('Erro ao buscar resumo:', error)
            if (active.current) setError('Não foi possível carregar as transacoes financeiras.')
        } finally {
            if (active.current) setLoading(false)
        }
    }

    useEffect(() => {

        active.current = true

        fetchTransactions()

        return () => { active.current = false }

    }, [pagination.pageIndex, pagination.pageSize])

    return (
        <main className="min-h-screen w-full bg-background text-foreground">
            <div className="mx-auto max-w-7xl space-y-8 px-6 py-8 md:px-10">

                <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">

                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Controle financeiro
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Transações
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Gerencie suas receitas e despesas em um só lugar.
                        </p>
                    </div>

                    <Button
                        className="cursor-pointer gap-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <PlusIcon size={18} />
                        Nova transação
                    </Button>

                </header>

                <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">

                    <div className="flex items-center justify-between gap-4 border-b border-border p-5">

                        <div className="flex items-center gap-3">

                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <ArrowLeftRight size={20} />
                            </div>

                            <div className="space-y-1">
                                <h2 className="font-semibold tracking-tight">
                                    Histórico de transações
                                </h2>

                                <p className="text-xs text-muted-foreground">
                                    {total} transações cadastradas
                                </p>
                            </div>

                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={fetchTransactions}
                            disabled={loading}
                            title="Atualizar transações"
                            aria-label="Atualizar transações"
                            className="cursor-pointer rounded-lg"
                        >
                            <RefreshCw
                                size={16}
                                className={loading ? "animate-spin" : ""}
                            />
                        </Button>

                    </div>

                    <div className="overflow-x-auto">

                        <Table>

                            <TableHeader className="bg-muted/40">

                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>

                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className="h-12 whitespace-nowrap px-5 text-xs font-semibold text-muted-foreground"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}

                                    </TableRow>
                                ))}

                            </TableHeader>

                            <TableBody>

                                {loading ? (

                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-64"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">

                                                <Loader2 className="size-7 animate-spin text-blue-500" />

                                                <p className="text-sm text-muted-foreground">
                                                    Carregando transações...
                                                </p>

                                            </div>
                                        </TableCell>
                                    </TableRow>

                                ) : error ? (

                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-64"
                                        >
                                            <div
                                                role="alert"
                                                className="flex flex-col items-center gap-3 text-center"
                                            >

                                                <div className="flex size-12 items-center justify-center rounded-full bg-red-500/10">
                                                    <AlertCircle
                                                        size={24}
                                                        className="text-red-500"
                                                    />
                                                </div>

                                                <h3 className="font-semibold">
                                                    Algo deu errado
                                                </h3>

                                                <p className="text-sm text-muted-foreground">
                                                    {error}
                                                </p>

                                                <Button
                                                    variant="outline"
                                                    onClick={fetchTransactions}
                                                >
                                                    Tentar novamente
                                                </Button>

                                            </div>
                                        </TableCell>
                                    </TableRow>

                                ) : table.getRowModel().rows.length ? (

                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className="transition-colors hover:bg-muted/40"
                                        >

                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={cell.id}
                                                    className="px-5 py-4"
                                                >
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
                                            className="h-64"
                                        >
                                            <div className="flex flex-col items-center gap-3 text-center">

                                                <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                                                    <ArrowLeftRight className="text-muted-foreground" />
                                                </div>

                                                <h3 className="font-semibold">
                                                    Nenhuma transação encontrada
                                                </h3>

                                                <p className="text-sm text-muted-foreground">
                                                    Suas movimentações aparecerão aqui.
                                                </p>

                                            </div>
                                        </TableCell>
                                    </TableRow>

                                )}

                            </TableBody>

                        </Table>

                    </div>

                    <footer className="flex flex-col gap-4 border-t border-border px-5 py-4 lg:flex-row lg:items-center lg:justify-between">

                        <p className="text-xs text-muted-foreground">
                            Mostrando{" "}

                            <span className="font-medium text-foreground">
                                {total === 0
                                    ? 0
                                    : pagination.pageIndex * pagination.pageSize + 1}
                            </span>

                            {" "}–{" "}

                            <span className="font-medium text-foreground">
                                {Math.min(
                                    (pagination.pageIndex + 1) * pagination.pageSize,
                                    total
                                )}
                            </span>

                            {" "}de{" "}

                            <span className="font-medium text-foreground">
                                {total}
                            </span>

                            {" "}transações
                        </p>

                        <div className="flex flex-wrap items-center gap-4">

                            {/* Page size */}
                            <div className="flex items-center gap-2">

                                <label
                                    htmlFor="page-size"
                                    className="text-xs text-muted-foreground"
                                >
                                    Registros por página
                                </label>

                                <select
                                    id="page-size"
                                    value={pagination.pageSize}
                                    disabled={loading}
                                    onChange={(e) =>
                                        table.setPageSize(Number(e.target.value))
                                    }
                                    className="h-8 cursor-pointer rounded-md border border-border bg-background px-2 text-xs"
                                >
                                    {[5, 10, 20, 50].map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <span className="text-xs font-medium">
                                Página {total === 0 ? 0 : pagination.pageIndex + 1}
                                {" "}de {table.getPageCount()}
                            </span>

                            {/* Navigation */}
                            <div className="flex items-center gap-1.5">

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="size-8 cursor-pointer"
                                    aria-label="Primeira página"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={loading || !table.getCanPreviousPage()}
                                >
                                    <ChevronsLeft size={16} />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="size-8 cursor-pointer"
                                    aria-label="Página anterior"
                                    onClick={() => table.previousPage()}
                                    disabled={loading || !table.getCanPreviousPage()}
                                >
                                    <ChevronLeft size={16} />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="size-8 cursor-pointer"
                                    aria-label="Próxima página"
                                    onClick={() => table.nextPage()}
                                    disabled={loading || !table.getCanNextPage()}
                                >
                                    <ChevronRight size={16} />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="size-8 cursor-pointer"
                                    aria-label="Última página"
                                    onClick={() =>
                                        table.setPageIndex(table.getPageCount() - 1)
                                    }
                                    disabled={loading || !table.getCanNextPage()}
                                >
                                    <ChevronsRight size={16} />
                                </Button>

                            </div>

                        </div>

                    </footer>

                </section>

            </div>
        </main>
    )
}

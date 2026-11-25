
import { ArrowDownLeft, ArrowUpRight, Wallet, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react'
import SummaryCard from '../components/dashboard/SummaryCard'
import CreateTransaction, { type CreateTransaction as CreateTransactionType } from '../components/transactions/CreateTransaction'
import { useState, useEffect, useRef } from 'react'
import { getFinancialSummary, createTransaction } from '../services/transactionService'
import type { FinancialSummary } from '../types/transaction'
import { getCategories } from '@/services/categoriesService'
import type { Category } from '@/types/categories'
import { toast } from 'sonner'

export default function Dashboard() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [summary, setSummary] = useState<FinancialSummary | null>(null)
    const [categories, setCategories] = useState<Category[]>([])

    const active = useRef(true)

    async function handleCreateTransaction(payload: CreateTransactionType) {
        try {
            setLoading(true)
            setError(null)

            await createTransaction({
                ...payload,
                amount: Math.round(payload.amount * 100)
            })

        } catch (error) {
            if (active.current) {
                setError('Não foi possível criar uma nova transação')

                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Erro ao criar transação'
                )
            }

            throw error

        } finally {
            if (active.current) setLoading(false)
            await fetchSummary()
        }
    }

    async function fetchSummary() {
        try {

            setLoading(true)
            setError(null)

            const data = await getFinancialSummary()
            if (active.current) setSummary(data)

        } catch (error) {
            console.error('Erro ao buscar resumo:', error)
            if (active.current) setError('Não foi possível carregar o resumo financeiro.')
        } finally {
            if (active.current) setLoading(false)
        }
    }

    async function fetchCategories() {
        try {
            const data = await getCategories()

            if (active.current) setCategories(data)

        } catch (error) {
            console.error('Erro ao buscar categorias:', error)
            if (active.current) setError('Erro ao buscar categorias')
        }
    }


    useEffect(() => {
        active.current = true

        fetchSummary()
        fetchCategories()

        return () => { active.current = false }

    }, [])

    return (
        <main className="min-h-screen w-full bg-background text-foreground">
            <div className="mx-auto max-w-7xl space-y-8 px-6 py-8 md:px-10">

                <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">

                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Controle financeiro
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Visão geral
                        </h1>

                        <p className="max-w-lg text-sm text-muted-foreground">
                            Acompanhe suas finanças e gerencie suas
                            movimentações em um só lugar.
                        </p>
                    </div>

                    <CreateTransaction
                        onCreate={handleCreateTransaction}
                        categories={categories}
                    />

                </header>

                <section className="space-y-5">

                    <div className="flex items-center justify-between">

                        <div className="space-y-1">
                            <h2 className="text-lg font-semibold tracking-tight">
                                Resumo financeiro
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Visão consolidada das suas movimentações.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={fetchSummary}
                            disabled={loading}
                            title="Atualizar resumo"
                            aria-label="Atualizar resumo financeiro"
                            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <RefreshCw
                                size={16}
                                className={loading ? 'animate-spin' : ''}
                            />
                        </button>

                    </div>

                    {error ? (

                        <div
                            role="alert"
                            className="flex flex-col items-center gap-4 rounded-xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center"
                        >

                            <div className="flex size-12 items-center justify-center rounded-full bg-red-500/10">
                                <AlertCircle
                                    className="text-red-500"
                                    size={24}
                                />
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-semibold">
                                    Algo deu errado
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    {error}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={fetchSummary}
                                disabled={loading}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                            >
                                <RefreshCw
                                    size={14}
                                    className={loading ? 'animate-spin' : ''}
                                />

                                {loading ? 'Atualizando...' : 'Tentar novamente'}
                            </button>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                            <SummaryCard
                                loading={loading}
                                title="Saldo total"
                                value={summary?.balance ?? 0}
                                variant="balance"
                                icon={<Wallet size={22} strokeWidth={1.8} />}
                            />

                            <SummaryCard
                                loading={loading}
                                title="Receitas"
                                value={summary?.income ?? 0}
                                variant="income"
                                icon={<ArrowDownLeft size={22} strokeWidth={1.8} />}
                            />

                            <SummaryCard
                                loading={loading}
                                title="Despesas"
                                value={summary?.expenses ?? 0}
                                variant="expense"
                                icon={<ArrowUpRight size={22} strokeWidth={1.8} />}
                            />

                        </div>

                    )}

                </section>

                <section className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <ShieldCheck size={20} />
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold">
                            Seu controle financeiro em um só lugar.
                        </h3>

                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Acompanhe suas receitas, despesas e saldo
                            para tomar melhores decisões financeiras.
                        </p>
                    </div>

                </section>

            </div>
        </main>
    )
}

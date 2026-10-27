
import { ArrowDownLeft, ArrowUpRight, PlusIcon, Wallet } from 'lucide-react'
import SummaryCard from '../components/dashboard/SummaryCard'
import CreateTransaction from '../components/transactions/CreateTransaction'
import { useState, useEffect, useRef } from 'react'
import { getFinancialSummary } from '../services/transactionService'
import type { FinancialSummary } from '../types/transaction'

export default function Dashboard() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [summary, setSummary] = useState<FinancialSummary | null>(null)

    const active = useRef(true)

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


    useEffect(() => {
        active.current = true

        fetchSummary()

        return () => { active.current = false }

    }, [])

    return (
        <main className="min-h-screen bg-background p-6 text-foreground md:p-10">
            <div className="mx-auto max-w-6xl space-y-8 ">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold"> Visão geral </h1>
                        <p className="mt-1 text-sm text-muted"> Acompanhe suas finanças em um só lugar. </p>
                    </div>
                    <div>
                        <CreateTransaction />
                    </div>
                </header>

                {
                    error ?
                        <div
                            role="alert"
                            aria-live="assertive"
                            className="flex flex-col items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-6 text-center"
                        >
                            <svg
                                className="h-8 w-8 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                />
                            </svg>

                            <div>
                                <h3 className="font-semibold text-red-800">
                                    Não foi possível carregar o resumo
                                </h3>
                                <p className="mt-1 text-sm text-red-700">{error}</p>
                            </div>

                            <button
                                type="button"
                                onClick={fetchSummary}
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading && (
                                    <span
                                        className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                                        aria-hidden="true"
                                    />
                                )}
                                {loading ? "Tentando..." : "Tentar novamente"}
                            </button>
                        </div> :

                        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <SummaryCard
                                loading={loading}
                                title="Saldo total"
                                value={summary?.balance ?? 0}
                                variant="balance"
                                icon={<Wallet size={22} strokeWidth={1.5} />}
                            />

                            <SummaryCard
                                loading={loading}
                                title="Receitas"
                                value={summary?.income ?? 0}
                                variant="income"
                                icon={<ArrowDownLeft size={22} strokeWidth={1.5} />}
                            />

                            <SummaryCard
                                loading={loading}
                                title="Despesas"
                                value={summary?.expenses ?? 0}
                                variant="expense"
                                icon={<ArrowUpRight size={22} strokeWidth={1.5} />}
                            />

                        </section>
                }

            </div>


        </main>
    )
}

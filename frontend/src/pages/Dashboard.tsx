
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react'
import SummaryCard from '../components/dashboard/SummaryCard'
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
            <div className="mx-auto max-w-6xl space-y-8">
                <header>
                    <h1 className="text-2xl font-semibold">
                        Visão geral
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        Acompanhe suas finanças em um só lugar.
                    </p>
                </header>

                {
                    error ?
                        <div role="alert">
                            <p>{error}</p>
                            <button
                                type="button"
                                onClick={fetchSummary}
                                className="rounded-md bg-primary px-4 py-2 text-white m-1"
                            >
                                Tentar novamente
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

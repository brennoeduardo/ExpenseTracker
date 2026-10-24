
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react'
import SummaryCard from '../components/dashboard/SummaryCard'
import { useState, useEffect } from 'react'
import { getFinancialSummary } from '../services/transactionService'
import type { FinancialSummary } from '../types/transaction'

export default function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState<FinancialSummary | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        let active = true

        setLoading(true)

        async function fetchSummary() {

            try {

                const data = await getFinancialSummary()
                if (active) setSummary(data)

            } catch (error) {
                console.error(error)
                if (active) setError('Não foi possível carregar o resumo financeiro.')


            } finally {
                if (active) setLoading(false)
            }
        }

        fetchSummary()

        return () => { active = false }

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

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <SummaryCard
                        error={error}
                        loading={loading}
                        title="Saldo total"
                        value={summary?.balance ?? 0}
                        variant="balance"
                        icon={<Wallet size={22} strokeWidth={1.5} />}
                    />

                    <SummaryCard
                        error={error}
                        loading={loading}
                        title="Receitas"
                        value={summary?.income ?? 0}
                        variant="income"
                        icon={<ArrowDownLeft size={22} strokeWidth={1.5} />}
                    />

                    <SummaryCard
                        error={error}
                        loading={loading}
                        title="Despesas"
                        value={summary?.expenses ?? 0}
                        variant="expense"
                        icon={<ArrowUpRight size={22} strokeWidth={1.5} />}
                    />
                </section>
            </div>
        </main>
    )
}

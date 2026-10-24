
import type { ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'

interface SummaryCardProps {
    error: string | null,
    loading: boolean,
    title: string
    value: number
    icon: ReactNode
    variant: 'income' | 'expense' | 'balance'
}

export default function SummaryCard({
    error,
    loading,
    title,
    value,
    icon,
    variant,
}: SummaryCardProps) {

    const colors = {
        income: 'text-income',
        expense: 'text-expense',
        balance: 'text-foreground'
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value / 100)

    return (
        <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted">
                    {title}
                </span>

                <span className={colors[variant]}>
                    {icon}
                </span>
            </div>

            { error !== null ? <p>Tente novamente</p> : <p>{error}</p>}

            {
                loading && error === null
                    ?
                    <div role="status" aria-label="Carregando dados financeiros">
                        <LoaderCircle
                            size={24}
                            strokeWidth={1.5}
                            className="animate-spin text-primary"
                        />
                    </div>
                    :
                    <h2 className={`text-2xl font-bold tabular-nums ${colors[variant]}`}>
                        {variant === 'income' && '+'}
                        {variant === 'expense' && '−'}
                        {formattedValue}
                    </h2>}


        </div>
    )
}

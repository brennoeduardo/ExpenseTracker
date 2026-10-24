import type Transaction from './transaction'

export default interface Category {
    id: number
    name: string
    type: 'income' | 'expense'
    created_at: Date | null
    transactions?: Transaction[]
}
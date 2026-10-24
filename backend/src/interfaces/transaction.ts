import type Category from './category'

export default interface Transaction {
    id: number
    name: string
    amount: number
    category?: Category
    created_at: Date | null
    description: string
    category_id: number
    transaction_date: Date | null
}
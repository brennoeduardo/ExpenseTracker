import { Prisma } from "../../generated/prisma/client"
import { TransactionFilters } from "../transactionsServices"

export function buildTransactionFilters(filters: TransactionFilters) {
    const where: Prisma.transactionWhereInput = {}

    if (filters.category_id) where.category_id = filters.category_id
    if (filters.type) where.category = { type: filters.type }

    if (filters.start_date || filters.end_date) {
        where.transaction_date = {
            ...(filters.start_date && {
                gte: new Date(filters.start_date)
            }),
            ...(filters.end_date && {
                lte: new Date(filters.end_date)
            })
        }
    }

    return where
}
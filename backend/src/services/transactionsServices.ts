import { prisma } from "../database/prisma"
import { UpdateTransactionInput } from "../schemas/transactionSchema"
import { buildTransactionFilters } from "./helpers/buildTransactionFilters"

type Transaction = {
    name: string,
    amount: number,
    category_id: number,
    description: string
}

export interface TransactionFilters {
    category_id?: number
    type?: string
    start_date?: string
    end_date?: string,
    transaction_date?: {}
}

export async function findTransactions(filters: TransactionFilters) {
    return prisma.transaction.findMany({ where: buildTransactionFilters(filters), })
}

export async function findTransactionById(id: number) {
    return prisma.transaction.findUnique({ where: { id } })
}

export async function createTransaction(payload: Transaction) {
    return prisma.transaction.create({
        data: {
            name: payload.name.trim(),
            amount: payload.amount,
            description: payload.description,
            category_id: payload.category_id
        }
    })
}

export async function updateTransaction(id: number, payload: UpdateTransactionInput) {
    return prisma.transaction.update({
        where: { id },
        data: payload
    })
}

export async function deleteTransaction(id: number) {
    return prisma.transaction.delete({ where: { id } })
}

export async function findSummary(filters: TransactionFilters) {

    const where = buildTransactionFilters(filters)

    const [income, expenses] = await Promise.all([
        prisma.transaction.aggregate({
            where: {
                AND: [where, { category: { type: 'income' } }]
            },
            _sum: { amount: true }
        }),

        prisma.transaction.aggregate({
            where: {
                AND: [where, { category: { type: 'expense' } }]
            },
            _sum: { amount: true }
        })
    ])

    const totalIncome = income._sum.amount ?? 0
    const totalExpenses = expenses._sum.amount ?? 0

    const balance = totalIncome - totalExpenses

    return { income: totalIncome, expenses: totalExpenses, balance }

}
import { prisma } from "../database/prisma"
import { Prisma } from "../generated/prisma/client"

type Transaction = {
    name: string,
    amount: number,
    category_id: number,
    description: string
}

interface TransactionsFilter {
    category_id?: number
    type?: string
    start_date?: string
    end_date?: string,
    transaction_date?: {}
}

export async function findTransactions(filters?: TransactionsFilter) {

    const where: Prisma.transactionWhereInput = {}

    if (filters?.category_id !== undefined) where.category_id = Number(filters.category_id)
    if (filters?.type) where.category = { type: filters.type }
    if (filters?.start_date || filters?.end_date) {
        where.transaction_date = {
            ...(filters.start_date && {
                gte: new Date(filters.start_date)
            }),
            ...(filters.end_date && {
                lte: new Date(filters.end_date)
            })
        }
    }

    return prisma.transaction.findMany({ where })
}

export async function findTransactionById(id: number) {
    return prisma.transaction.findUnique({ where: { id } })
}

export async function createTransaction(payload: Transaction) {

    console.log(payload)
    return prisma.transaction.create({
        data: {
            name: payload.name.trim(),
            amount: payload.amount,
            description: payload.description,
            category_id: payload.category_id
        }
    })
}

export async function updateTransaction(id: number, payload: Transaction) {
    return prisma.transaction.update({
        where: { id },
        data: {
            name: payload.name.trim(),
            amount: payload.amount,
            description: payload.description,
            category_id: payload.category_id
        },
    })

}

export async function deleteTransaction(id: number) {
    return prisma.transaction.delete({ where: { id } })

}
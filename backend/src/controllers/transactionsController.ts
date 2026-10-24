
import { NextFunction, Request, Response } from 'express'
import * as transactionServices from '../services/transactionsServices'
import { transactionFilterSchema, transactionSchema, updateTransactionSchema} from '../schemas/transactionSchema'
import * as z from 'zod'

export async function getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
        const result = transactionFilterSchema.safeParse(req.query)

        if (!result.success) {
            return res.status(400).json({
                message: 'Os filtros informados são inválidos.',
                errors: z.treeifyError(result.error)
            })
        }

        const data = await transactionServices.findTransactions(result.data)

        return res.status(200).json({ message: data.length ? 'Transações encontradas com sucesso.' : 'Nenhuma transação encontrada.', data })

    } catch (error) {
        next(error)
    }
}

export async function getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) { return res.status(400).json({ message: 'O ID da transação é inválido.' }) }

        const data = await transactionServices.findTransactionById(id)

        if (!data) return res.status(404).json({ message: 'Transação não encontrada.' })

        return res.status(200).json({ message: 'Transação encontrada com sucesso.', data })

    } catch (error) {
        next(error)
    }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
        const result = transactionSchema.safeParse(req.body)

        if (!result.success) return res.status(400).json({ message: 'Os dados da transação são inválidos.', errors: z.treeifyError(result.error) })

        const data = await transactionServices.createTransaction(result.data)

        return res.status(201).json({ message: 'Transação criada com sucesso.', data })

    } catch (error) {
        next(error)
    }
}

export async function updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'O ID da transação é inválido.' })

        const result = updateTransactionSchema.safeParse(req.body)

        if (!result.success) return res.status(400).json({ message: 'Os dados para atualização são inválidos.', errors: z.treeifyError(result.error) })

        const data = await transactionServices.updateTransaction(id, result.data)

        return res.status(200).json({ message: 'Transação atualizada com sucesso.', data })

    } catch (error) {
        next(error)
    }
}

export async function deleteTransaction(req: Request, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'O ID da transação é inválido.' })

        const data = await transactionServices.deleteTransaction(id)

        return res.status(200).json({ message: 'Transação excluída com sucesso.', data })

    } catch (error) {
        next(error)
    }
}

export async function getSummary(req: Request, res: Response, next: NextFunction) {
    try {

        const result = transactionFilterSchema.safeParse(req.query)

        console.log(result)

        if(!result.success) return res.status(400).json({ message: 'Filtros invalidos', errors: z.treeifyError(result.error)})

        const data = await transactionServices.findSummary(result.data)

        return res.status(200).json({ message: data ? 'Resumo encontrado com sucesso.' : 'Nenhuma resumo encontrado.', data })
        
    } catch (error) {
        next(error)
    }
}

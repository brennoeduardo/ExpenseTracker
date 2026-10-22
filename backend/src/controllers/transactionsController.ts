import { NextFunction, Request, Response } from 'express'
import * as transactionServices from '../services/transactionsServices'

export async function getTransactions(req: Request, res: Response, next: NextFunction) {
    try {

        const data = await transactionServices.findTransactions(req.query)

        if (!data.length) return res.status(404).json({ message: 'Nao ha transacoes' })

        return res.status(200).json({ data, message: 'Transacoes retornadas com sucesso!' })

    } catch (error) {
        next(error)
    }
}

export async function getTransactionById(req: Request, res: Response, next: NextFunction) {

    try {

        const id = Number(req.params.id)

        if (!id) throw new Error('ID invalido')

        const data = await transactionServices.findTransactionById(id)

        if (!data) res.status(404).json({ message: 'Nao ha transacao' })

        return res.status(200).json({ data, message: 'Transacao retornada com sucesso!' })

    } catch (error) {
        next(error)
    }
}

export async function createTransaction(req: Request, res: Response, next: NextFunction) {
    try {

        const data = await transactionServices.createTransaction(req.body)

        if (!data) res.status(404).json({ message: 'Erro ao criar transacao' })

        return res.status(200).json({ data, message: 'Transacao criada com sucesso' })

    } catch (error) {
        next(error)
    }
}

export async function updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id)

        const data = await transactionServices.updateTransaction(id, req.body)

        if (!data) res.status(404).json({ message: 'Erro ao atualizar transacao' })

        return res.status(200).json({ data, message: 'Transacao atualizada com sucesso' })

    } catch (error) {
        next(error)
    }

}

export async function deleteTransaction(req: Request, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id)

        const data = await transactionServices.deleteTransaction(id)

        res.status(200).json({ message: 'Transacao excluida com sucesso', data })

    } catch (error) {
        next(error)
    }

}
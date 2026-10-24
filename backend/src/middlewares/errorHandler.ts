import type { Request, Response, NextFunction } from 'express'
import { Prisma } from '../generated/prisma/client'

export default function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {

    console.log(error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {

        switch (error.code) {
            case 'P2002':
                return res.status(409).json({
                    message: 'Já existe um registro com esses dados.'
                })

            case 'P2003':
                return res.status(422).json({
                    message: 'A categoria informada não existe ou está sendo utilizada por outra transação.'
                })

            case 'P2025':
                return res.status(404).json({
                    message: 'Registro não encontrado.'
                })
        }

    }

    return res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' })

}

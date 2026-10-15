import { Router, Request, Response } from 'express'

const router = Router()
// TODO

router.get('/transactions', (_req: Request, res: Response) => {
    res.status(200).json({
        message: 'Transacoes retornadas com sucesso',
        data: [{}]
    })
})
// TODO

router.get('/transactions/:id', (_req: Request, res: Response) => {
    res.status(200).json({
        message: 'Transacao retornada com sucesso',
        data: [{}]
    })
})
// TODO

router.post('/transactions', (_req: Request, res: Response) => {
    res.status(201).json({
        message: 'Transacao registrada com sucesso',
        data: [{}]
    })
})
// TODO

router.put('/transactions/:id', (_req: Request, res: Response) => {
    res.status(200).json({
        message: 'Transacao atualizada com sucesso',
        data: [{}]
    })
})
// TODO

router.delete('/transactions/:id', (_req: Request, res: Response) => {
    res.status(204).json({
        message: 'Transacao excluida com sucesso',
        data: [{}]
    })
})

export default router;
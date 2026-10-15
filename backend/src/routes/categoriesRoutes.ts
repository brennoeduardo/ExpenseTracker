import { Router, Request, Response } from 'express'
import { pool } from '../database/connection'
import { getCategories, getCategoryByID } from '../controllers/categoriesControllers'

const router = Router()

router.get('/categories', getCategories)

router.get('/categories/:id', getCategoryByID)


// TODO
router.post('/categories', (_req: Request, res: Response) => {
    res.status(201).json({
        message: 'Categorias registrada com sucesso',
        data: [{}]
    })
})
// TODO
router.put('/categories/:id', (_req: Request, res: Response) => {
    res.status(200).json({
        message: 'Categorias atualizada com sucesso',
        data: [{}]
    })
})
// TODO

router.delete('/categories/:id', (_req: Request, res: Response) => {
    res.status(204).json({
        message: 'Categorias excluida com sucesso',
        data: [{}]
    })
})

export default router;
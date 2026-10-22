import { NextFunction, Request, Response } from 'express'
import * as categoryService from '../services/categoriesServices'

export async function getCategories(req: Request, res: Response, next: NextFunction) {
    try {

        const data = await categoryService.findAll()

        res.status(200).json({
            message: 'Categorias retornadas com sucesso',
            data
        })

    } catch (error) {

    }
}

export async function getCategoryByID(req: Request, res: Response, next: NextFunction) {

    try {

        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID invalido' })

        const data = await categoryService.findById(id)

        if (!data) return res.status(404).json({ message: 'Categoria nao encontrada' })

        res.status(200).json({
            message: 'Categorias retornadas com sucesso',
            data
        })


    } catch (error) {
        next(error)
    }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
    const { name, type } = req.body ?? {}

    if (typeof name !== 'string' || !name.trim() || name.length > 100) {
        return res.status(400).json({ message: 'Nome inválido' })
    }

    if (typeof type !== 'string' || !type.trim() || type.length > 10) {
        return res.status(400).json({ message: 'Tipo inválido' })
    }

    try {

        const data = await categoryService.createCategory({ name: name.trim(), type: type.trim() })

        return res.status(201).json({ message: 'Categoria criada com sucesso', data })

    } catch (error) {
        next(error)
    }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id)

        const data = await categoryService.updateCategory(id, req.body)

        res.status(200).json({ message: 'Categoria atualizada com sucesso', data })

    } catch (error) {
        next(error)
    }

}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id)

        const data = await categoryService.deleteCategory(id)

        res.status(200).json({ message: 'Categoria excluida com sucesso', data })

    } catch (error) {
        next(error)
    }

}
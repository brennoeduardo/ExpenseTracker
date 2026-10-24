import { NextFunction, Request, Response } from 'express'
import * as categoryService from '../services/categoriesServices'
import { categorySchema, updateCategorySchema } from '../schemas/categorySchema'
import z from 'zod'

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
    try {

        const result = categorySchema.safeParse(req.body)

        if (!result.success) return res.status(400).json({ message: 'Dados invalidos', errors: z.treeifyError(result.error) })

        const category = await categoryService.createCategory(result.data)

        return res.status(201).json({ message: 'Categoria criada com sucesso', category })

    } catch (error) {
        next(error)
    }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {

        const id = Number(req.params.id)

        const result = updateCategorySchema.safeParse(req.body)

        if(!result.success) return res.status(400).json({ message: 'Dados invalidos', errors: z.treeifyError(result.error)})

        const category = await categoryService.updateCategory(id, result.data)

        res.status(200).json({ message: 'Categoria atualizada com sucesso', category })

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
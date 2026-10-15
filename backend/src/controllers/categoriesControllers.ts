import { Request, Response } from 'express'
import * as categoryService from '../services/categoriesServices'

export async function getCategories(req: Request, res: Response) {
    try {

        const data = await categoryService.findAll()

        res.status(200).json({
            message: 'Categorias retornadas com sucesso',
            data
        })

    } catch (error) {

    }
}

export async function getCategoryByID(req: Request, res: Response) {
    try {

        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID invalido' })

        const data = await categoryService.findById(id)

        console.log(data)

        if (!data) return res.status(404).json({ message: 'Categoria nao encontrada' })

        res.status(200).json({
            message: 'Categorias retornadas com sucesso',
            data
        })


    } catch (error) {

    }
}
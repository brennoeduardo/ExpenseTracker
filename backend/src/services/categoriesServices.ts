import { prisma } from "../database/prisma"
import { UpdateCategoryInput } from "../schemas/categorySchema"

type Category = {
    name: string
    type: string
}

export async function findAll() {
    return prisma.categories.findMany()
}

export async function findById(id: number) {
    return prisma.categories.findUnique({ where: { id } })
}

export async function createCategory(body: Category) {

    return prisma.categories.create({
        data: {
            name: body.name.trim(),
            type: body.type.trim()
        }
    })
}

export async function updateCategory(id: number, body: UpdateCategoryInput) {
    return prisma.categories.update({
        where: { id },
        data: body,
    })

}

export async function deleteCategory(id: number) {
    return prisma.categories.delete({ where: { id } })

}
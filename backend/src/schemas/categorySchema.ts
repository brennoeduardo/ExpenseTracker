import * as z from 'zod'

export const categorySchema = z.object({
    name: z.string().trim().min(1).max(100),
    type: z.enum(['expense', 'income'])
})

export const updateCategorySchema = categorySchema
    .partial()
    .refine(data => Object.keys(data).length > 0, {
        message: 'Informe pelo menos um campo'
    })

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
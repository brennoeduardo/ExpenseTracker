import * as z from 'zod'

export const transactionSchema = z.object({
    name: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(250),
    amount: z.int().positive(),
    category_id: z.int().positive(),
    transaction_date: z.iso.date()
})


export const transactionFilterSchema = z.object({
    category_id: z.coerce.number().int().positive().optional(),
    type: z.enum(['expense', 'income']).optional(),
    start_date: z.iso.date().optional(),
    end_date: z.iso.date().optional()
})

export const updateTransactionSchema = transactionSchema
    .partial()
    .refine(data => Object.keys(data).length > 0, {
        message: 'Informe pelo menos um campo'
    })


export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>
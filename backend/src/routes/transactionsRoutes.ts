import { Router } from 'express'
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction, getSummary } from '../controllers/transactionsController'

const router = Router()

router.get('/summary', getSummary)

router.get('/', getTransactions)
router.get('/:id', getTransactionById)
router.post('/', createTransaction)
router.put('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)

export default router;
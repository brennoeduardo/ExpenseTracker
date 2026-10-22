import { Router } from 'express'
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, updateTransaction } from '../controllers/transactionsController'

const router = Router()

router.get('/', getTransactions)
router.get('/:id', getTransactionById)
router.post('/', createTransaction)
router.put('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)

export default router;
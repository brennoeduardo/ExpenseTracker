import { Router } from 'express'
import { createCategory, deleteCategory, getCategories, getCategoryByID, updateCategory } from '../controllers/categoriesControllers'

const router = Router()

router.get('/', getCategories)
router.get('/:id', getCategoryByID)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router;
import express from 'express'
import cors from 'cors'

import healthRoutes from './src/routes/healthRoutes'
import categoriesRoutes from './src/routes/categoriesRoutes'
import transactionsRoutes from './src/routes/transactionsRoutes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/health', healthRoutes)
app.use('/categories', categoriesRoutes)
app.use('/transactions', transactionsRoutes)

export default app
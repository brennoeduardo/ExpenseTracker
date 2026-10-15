import cors from 'express'
import express from 'express'
import healthRoutes from './src/routes/healthRoutes'
import categoriesRoutes from './src/routes/categoriesRoutes'
import transactionsRoutes from './src/routes/transactionsRoutes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(healthRoutes)
app.use(categoriesRoutes)
app.use(transactionsRoutes)



export default app  
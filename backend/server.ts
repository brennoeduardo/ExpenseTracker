import app from './app'
import { pool } from './src/database/connection'

const PORT = 3000

async function main() {
    try {

        await pool.query('SELECT NOW()')
        console.log('PostgreSQL conectado!')

        app.listen(PORT, () => {
            console.log(`Servidor inicido na porta ${PORT}`)
        })

    } catch (error) {
        console.error('Erro ao conectar ao PostgreSQL:', error)
        process.exit(1)
    }
}

main()
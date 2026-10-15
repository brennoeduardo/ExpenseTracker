import { pool } from '../database/connection'

// da pra melhorar
export async function findAll() {
    try {

        const query = 'SELECT * FROM categories'

        const { rows } = await pool.query(query)

        return rows

    } catch (error) {
        process.exit(1)
    }
}

export async function findById(id: number) {
    const { rows } = await pool.query(
        'SELECT * FROM categories WHERE id = $1',
        [id]
    )

    return rows[0] ?? null
}
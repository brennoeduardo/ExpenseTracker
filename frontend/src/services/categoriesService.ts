const url = 'http://localhost:3000'

export async function getCategories() {

    const response = await fetch(`${url}/categories`)

    if (!response.ok) throw new Error(`Erro ao buscar categorias: ${response.status} ${response.statusText}`)

    const result = await response.json()

    return result.data

}
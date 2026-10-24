export async function getFinancialSummary() {

    const url = 'http://localhost:3000/transactions/summary'

    try {

        const response = await fetch(url)

        if (!response.ok) throw new Error('Erro ao tentar consumir a API')

        const result = await response.json()

        return result.data

    } catch (error) {
        console.log(error)
    }

}
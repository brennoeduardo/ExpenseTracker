import type { CreateTransaction } from "@/components/transactions/CreateTransaction"

const url = 'http://localhost:3000'

export async function getFinancialSummary() {

    const response = await fetch(`${url}/transactions/summary`)

    if (!response.ok) throw new Error(`Erro ao buscar resumo financeiro: ${response.status} ${response.statusText}`)

    const result = await response.json()

    return result.data

}

export async function createTransaction(payload: CreateTransaction) {

    const response = await fetch(`${url}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json()

    console.log(data.errors)

    if (!response.ok) throw new Error(`${data.message} - ${data.errors}` || `Erro ao criar transação: ${response.status}`)

    return data

}
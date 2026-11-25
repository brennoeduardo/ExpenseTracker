import type { CreateTransaction } from "@/components/transactions/CreateTransaction"
import type { TransactionResponse } from "@/types/transaction"

const url = 'http://localhost:3000'

export async function getFinancialSummary() {

    const response = await fetch(`${url}/transactions/summary`)

    if (!response.ok) throw new Error(`Erro ao buscar resumo financeiro: ${response.status} ${response.statusText}`)

    const result = await response.json()

    return result.data

}

export async function getTransactions(page: number = 1, limit: number = 10): Promise<TransactionResponse> {

    const response = await fetch(`${url}/transactions?page=${page}&limit=${limit}`);

    if (!response.ok) throw new Error("Erro ao buscar transações");

    return response.json();
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
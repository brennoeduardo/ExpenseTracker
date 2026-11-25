export interface FinancialSummary {
    income: number
    expenses: number
    balance: number
}

export type Transaction = {
    id: number;
    name: string;
    description: string;
    amount: number;
    category_id: number;
    transaction_date: string;
    created_at: string;
    category: {
        name: string,
        type: string
    }
}

export type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export type TransactionResponse = {
    message: string;
    data: Transaction[];
    pagination: Pagination;
}
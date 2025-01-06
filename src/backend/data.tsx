import {sql} from "@vercel/postgres"
import {unstable_noStore as noStore} from "next/cache";
import { Transaction } from "@/backend/types"

// functions for grabbing various data like all transactions, transaction by id, and the categories that a transaction can be
export async function getAllTransactions(): Promise<Transaction[]> {
    noStore();
    const data = await sql<Transaction>`SELECT *
        FROM transactions
        order by date DESC;`
    return data.rows.map((transaction: Transaction) => ({
        id: transaction.id,
        type: transaction.type,
        amount: parseFloat(transaction.amount as unknown as string),
        date: new Date(transaction.date), // Ensure the date is properly parsed
        category: transaction.category,
    }));
}

export async function getTransactionById(id: number) {

}

export async function getBalance() {
    const data = await sql`
    SELECT current_balance FROM app_state;
    `
    return data
}
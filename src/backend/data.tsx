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
    alert(id)
}

export async function getBalance() {
    const data = await sql`
    SELECT current_balance FROM app_state;
    `
    return data.rows[0].current_balance
}

export async function getCategories() {
    const data = await sql`
    SELECT category FROM categories;
    `
    return data
}

export async function getLastTransactions(num:number): Promise<Transaction[]> {
    noStore();
    const data = await sql<Transaction>`SELECT *
        FROM transactions
        order by date DESC
        LIMIT ${num};`
    return data.rows.map((transaction: Transaction) => ({
        id: transaction.id,
        type: transaction.type,
        amount: parseFloat(transaction.amount as unknown as string),
        date: new Date(transaction.date), // Ensure the date is properly parsed
        category: transaction.category,
    }));
}
'use server'
import {sql} from "@vercel/postgres"
import {unstable_noStore as noStore} from "next/cache";
import {Transaction} from "@/backend/types"

// functions for grabbing various data
export async function getAllTransactions(search = "", filter = ""): Promise<Transaction[]> {
    noStore();
    const data = await sql<Transaction>`SELECT *
                                        FROM transactions
                                        WHERE category ILIKE ${`%${search}%`}
                                          AND type ILIKE ${`%${filter}%`}
                                        ORDER BY date DESC;
    `;
    return data.rows.map((transaction: Transaction) => ({
        id: transaction.id,
        type: transaction.type,
        amount: parseFloat(transaction.amount as unknown as string),
        date: new Date(transaction.date), // Parse date as a Date object
        category: transaction.category,
    }));
}

export async function getBalance() {
    const data = await sql`
        SELECT current_balance
        FROM app_state;
    `
    return data.rows[0].current_balance
}

export async function getCategories() {
    const data = await sql`
        SELECT DISTINCT category
        FROM transactions;
    `;
    return data.rows.map(row => row.category);
}

export async function getTransactionById(id: number) {
    const data = await sql<Transaction>`
        SELECT *
        FROM transactions
        WHERE id = ${id};
    `;
    return data.rows[0];
}
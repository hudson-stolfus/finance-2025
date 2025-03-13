'use server';
import {sql} from "@vercel/postgres"
import {Transaction} from "@/backend/types"

// functions for sending various types of data to the database such as new transactions, edited transactions, or deleting transactions


export async function deleteTransaction(id: string) {
    await sql`
        DELETE
        FROM transactions
        WHERE id = ${id}
    `;
}

export async function editTransaction(transaction: Transaction) {
    await sql`
        UPDATE transactions
        SET name     = ${transaction.name},
            total   = ${transaction.total},
            date     = ${transaction.date.toISOString().slice(0, 10)}
        WHERE id = ${transaction.id}
    `;
}
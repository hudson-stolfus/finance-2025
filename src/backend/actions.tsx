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
    if (transaction.id) {
        await sql`
        UPDATE transactions
        SET name = ${transaction.name},
            total = ${transaction.total},
            date = ${transaction.date.toISOString().slice(0, 10)}
        WHERE id = ${transaction.id}
        `;
    } else {
        await sql`
        INSERT INTO transactions (total, date, name)
        VALUES (
            ${transaction.total},
            ${transaction.date.toISOString().slice(0, 10)},
            ${transaction.name}
        )`;
    }
}
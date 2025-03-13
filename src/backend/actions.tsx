'use server';
import {sql} from "@vercel/postgres"
// import {Transaction} from "@/backend/types"

// functions for sending various types of data to the database such as new transactions, edited transactions, or deleting transactions

// export async function newTransaction(Transaction: {
//     type: "income" | "expense";
//     amount: number;
//     date: Date;
//     category: string
// }) {
//     await sql`
//         WITH new_transaction AS (
//         INSERT
//         INTO transactions (type, amount, date, category)
//         VALUES (${Transaction.type}, ${Transaction.amount}, ${Transaction.date.toISOString().slice(0, 10)}, ${Transaction.category})
//     `
// }

export async function deleteTransaction(id: string) {
    await sql`
        DELETE
        FROM transactions
        WHERE id = ${id}
    `;
}

// export async function editTransaction(transaction: Transaction) {
//     await sql`
//         UPDATE transactions
//         SET type    = ${transaction.type},
//             total   = ${transaction.total},
//             date    = ${transaction.date},
//             name    = ${transaction.name}
//         WHERE id = ${transaction.id}
//     `;
// }
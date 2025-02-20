'use server';
import {sql} from "@vercel/postgres"
// import { Transaction } from "@/backend/types"
// functions for sending various types of data to the database such as new transactions, edited transactions, or deleting transactions

export async function newTransaction(Transaction: {
    type: "income" | "expense";
    amount: number;
    date: Date;
    category: string
}) {
    await sql`
        WITH new_transaction AS (
        INSERT INTO transactions (type, amount, date, category)
        VALUES (${Transaction.type}, ${Transaction.amount}, ${Transaction.date.toISOString().slice(0,10)}, ${Transaction.category})
            RETURNING amount, type
            )
        UPDATE app_state
        SET current_balance =
                CASE
                    WHEN new_transaction.type = 'income' THEN current_balance + new_transaction.amount
                    WHEN new_transaction.type = 'expense' THEN current_balance - new_transaction.amount
                    END
            FROM new_transaction;
    `
}

export async function deleteTransaction(id: string) {
    await sql`
        WITH deleted_transaction AS (
        DELETE FROM transactions
        WHERE id = ${id}
            RETURNING amount, type
)
        UPDATE app_state
        SET current_balance =
                CASE
                    WHEN deleted_transaction.type = 'income' THEN current_balance - deleted_transaction.amount
                    WHEN deleted_transaction.type = 'expense' THEN current_balance + deleted_transaction.amount
                    END
            FROM deleted_transaction;
`
}

export async function editTransaction(id: string, Transaction: {
    type: "income" | "expense";
    amount: number;
    date: Date;
    category: string
}) {
    await sql`
        WITH old_transaction AS (
            SELECT * FROM transactions
            WHERE id = ${id}
        ),
             new_transaction AS (
        UPDATE transactions
        SET type = ${Transaction.type},
            amount = ${Transaction.amount},
            date = ${Transaction.date.toISOString().slice(0,10)},
            category = ${Transaction.category}
        WHERE id = ${id}
            RETURNING amount, type
        )
        UPDATE app_state
        SET current_balance =
                CASE
                    WHEN old_transaction.type = 'income' THEN current_balance - old_transaction.amount
                    WHEN old_transaction.type = 'expense' THEN current_balance + old_transaction.amount
                    END
                    +
                CASE
                    WHEN new_transaction.type = 'income' THEN new_transaction.amount
                    WHEN new_transaction.type = 'expense' THEN -new_transaction.amount
                    END
            FROM old_transaction, new_transaction;
    `
}
'use server'
import {sql} from "@vercel/postgres"
import {unstable_noStore as noStore} from "next/cache";
import {Transaction} from "@/backend/types"

// functions for grabbing various data
export async function getAllTransactions(search = ""): Promise<Transaction[]> {
    noStore();
    const { rows } = await sql<Transaction>`
        SELECT *
        FROM transactions
        WHERE name ILIKE ${`%${search}%`}
        ORDER BY date DESC;
    `;
    return rows;
}

export async function getTransactionById(id: number) {
    alert(id)
}

export async function getBalance() {
    let result = 0;
    const { rows } = await sql<{sum: number}>`
        SELECT sum
        FROM transactions;
    `;
    rows.forEach(row => {
        result += Number(row.sum);
    });
    return result;
}

export async function getCategories() {
    const data = await sql`
        SELECT DISTINCT category FROM transactions;
    `;
    return data.rows.map(row => row.category);
}

export async function getLastTransactions(num:number): Promise<Transaction[]> {
    noStore();
    const { rows } = await sql<Transaction>`
        SELECT *
        FROM transactions
        order by date DESC
        LIMIT ${num};
    `
    return rows;
}
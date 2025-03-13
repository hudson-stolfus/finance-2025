'use server'
import {sql} from "@vercel/postgres"
import {unstable_noStore as noStore} from "next/cache";
import {Transaction} from "@/backend/types"

// functions for grabbing various data
export async function getAllTransactions(search: string = '', filter: number = 0): Promise<Transaction[]> {
    noStore();

    const {rows} = await sql<Transaction>`
        SELECT *
        FROM transactions
        WHERE name ILIKE ${`%${search}%`}
          AND (SIGN(total) = ${filter} OR ${filter} = 0)
        ORDER BY date DESC;
    `;
    return rows;
}

export async function getCategories() {
    const data = await sql`
        SELECT DISTINCT category FROM transactions;
    `;
    return data.rows.map(row => row.category);
}

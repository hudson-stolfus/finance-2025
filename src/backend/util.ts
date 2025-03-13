import {Transaction} from "@/backend/types";

export function sumBalance(transactions: Transaction[]) {
    let result = 0;
    for (const transaction of transactions) {
        result += transaction.total;
    }
    return result;
}
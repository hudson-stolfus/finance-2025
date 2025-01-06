export type Transaction = {
    id: number;
    type: "income"|"expense",
    amount: number,
    date: Date,
    category: string,
}
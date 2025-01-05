type transaction = {
    id: number;
    type: "income"|"expense",
    amount: number,
    date: Date,
    category: string,
}

type balance = {
    currentBalance: number,
    lastBalance: number,
}
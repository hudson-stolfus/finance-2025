'use client'
import { useState, useEffect, useCallback } from "react";
import { getAllTransactions } from "@/backend/data";
import { TransacTable } from "@/app/components/serverC";
import { Transaction } from "@/backend/types";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function TransactionsPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number>(0);

    const handleSearch = useCallback(async () => {
        const data = await getAllTransactions(search, filter);
        setTransactions(data);
        const balance = data.reduce((acc, transaction) => {
            return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
        setBalance(balance);
    }, [search, filter]);

    const handleExport = async () => {
        const data = await getAllTransactions(search, filter);
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "transactions.xlsx");
    };

    useEffect(() => {
        handleSearch();
    }, [search, filter, handleSearch]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Transactions</h1>
            <div className="mb-6 flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-3 mr-4 rounded-lg shadow-sm"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-3 mr-4 rounded-lg shadow-sm"
                >
                    <option value="">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button onClick={handleExport} className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-lg shadow-lg">
                    Export
                </button>
                <div className="ml-auto text-3xl font-bold text-white p-4 bg-gradient-to-r from-green-400 to-blue-500 border-2 border-green-600 rounded shadow-lg">
                    Balance: ${balance.toFixed(2)}
                </div>
            </div>
            <TransacTable transactions={transactions} />
        </div>
    );
}
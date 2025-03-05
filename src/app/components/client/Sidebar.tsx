'use client'
import React, {useState, useEffect, useCallback} from 'react';
import {getAllTransactions} from '@/backend/data';
import {Transaction} from '@/backend/types';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';

export default function Transactions() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number>(0);
    const [, setIsAddModalOpen] = useState(false);

    const handleSearch = useCallback(async () => {
        const data = await getAllTransactions(search);
        setTransactions(data);
        const newBalance = data.reduce((acc, transaction) => {
            return acc + transaction.sum;
        }, 0);
        setBalance(newBalance);
    }, [search]);

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleExport = async () => {
        const data = await getAllTransactions(search);
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
        const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
        saveAs(blob, 'transactions.xlsx');
    };

    useEffect(() => {
        handleSearch();
    }, [search, filter, handleSearch]);

    return (
        <div className="p-6 min-h-screen">
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
                <button onClick={handleExport}
                        className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-lg shadow-lg">
                    Export
                </button>
                <button onClick={handleAdd}
                        className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg">
                    Add Transaction
                </button>
                <div
                    className="ml-auto text-3xl font-bold text-white p-4 bg-gradient-to-r from-green-400 to-blue-500 border-2 border-green-600 rounded shadow-lg">
                    Balance: ${balance.toFixed(2)}
                    <div className="text-sm text-white mt-1">*Affected by Filters</div>
                </div>
            </div>
        </div>
    );
}
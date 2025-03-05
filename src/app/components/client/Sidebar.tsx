'use client'
import React, {useState, useEffect, useCallback} from 'react';
import {getAllTransactions} from '@/backend/data';
import {deleteTransaction, editTransaction, newTransaction} from '@/backend/actions';
import {TransacTable} from '@/app/components/server/serverComponents';
import {Transaction} from '@/backend/types';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import {EditTransactionModal} from "@/app/components/modals/EditTransactionModal";
import {AddTransactionModal} from "@/app/components/modals/AddTransactionModal";

export default function Transactions({categories}: { categories: string[] }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number>(0);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
    const [newCategory, setNewCategory] = useState('');

    const handleSearch = useCallback(async () => {
        const data = await getAllTransactions(search, filter);
        setTransactions(data);
        const newBalance = data.reduce((acc, transaction) => {
            return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
        setBalance(newBalance);
    }, [search, filter]);

    const handleDelete = async (id: string) => {
        await deleteTransaction(id);
        await handleSearch();
    };

    const handleEdit = (transaction: Transaction) => {
        setTransactionToEdit(transaction);
        setIsEditModalOpen(true);
    };

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (transactionToEdit) {
            const formData = new FormData(event.target as HTMLFormElement);
            const updatedTransaction = {
                ...transactionToEdit,
                type: formData.get('type') as "income" | "expense",
                amount: parseFloat(formData.get('amount') as string),
                date: new Date(formData.get('date') as string),
                category: formData.get('category') as string,
            };
            await editTransaction(transactionToEdit.id.toString(), updatedTransaction);
            setIsEditModalOpen(false);
            await handleSearch();
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const type = form.get('type') as 'income' | 'expense';
        const amount = parseFloat(form.get('amount') as string);
        const dateInput = form.get('date') as string;
        const category = newCategory || (form.get('category') as string);
        if (!type || isNaN(amount) || !dateInput || !category) {
            alert('Please fill in all fields correctly.');
            return;
        }
        const date = new Date(dateInput);
        try {
            await newTransaction({type, amount, date, category});
            setIsAddModalOpen(false);
            location.reload();
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert('Failed to add transaction. Please try again.');
        }
    };

    const handleExport = async () => {
        const data = await getAllTransactions(search, filter);
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
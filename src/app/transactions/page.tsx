'use client'
import { useState, useEffect, useCallback } from 'react';
import { getAllTransactions } from '@/backend/data';
import { deleteTransaction, editTransaction } from '@/backend/actions';
import { TransacTable} from '@/app/components/serverComponents';
import Modal from "@/app/components/serverComponents";
import { Transaction } from '@/backend/types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function TransactionsPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number>(0);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

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
            await editTransaction( transactionToEdit.id.toString(), updatedTransaction) ;
            setIsEditModalOpen(false);
            await handleSearch();
        }
    };

    const handleExport = async () => {
        const data = await getAllTransactions(search, filter);
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'transactions.xlsx');
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
                    <option value="withholding">Withholding</option>
                </select>
                <button onClick={handleExport} className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-lg shadow-lg">
                    Export
                </button>
                <div className="ml-auto text-3xl font-bold text-white p-4 bg-gradient-to-r from-green-400 to-blue-500 border-2 border-green-600 rounded shadow-lg">
                    Balance: ${balance.toFixed(2)}
                    <div className="text-sm text-white mt-1">*Affected by Filters</div>
                </div>
            </div>
            <TransacTable transactions={transactions} onDelete={handleDelete} onEdit={handleEdit} />
            {transactionToEdit && (
                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Transaction</h2>
                    <form onSubmit={handleEditSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                            <select name="type" id="type" defaultValue={transactionToEdit.type}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                                <option value="withholding">Withholding</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                            <input type="number" name="amount" id="amount" step="0.01" defaultValue={transactionToEdit.amount}
                                   className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"/>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" name="date" id="date" defaultValue={transactionToEdit.date.toISOString().split('T')[0]}
                                   className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"/>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" name="category" id="category" defaultValue={transactionToEdit.category}
                                   className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"/>
                        </div>
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">Save
                        </button>
                        <button type="button" onClick={() => setIsEditModalOpen(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">Cancel
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
}
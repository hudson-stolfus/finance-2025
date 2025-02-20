'use client';
import {useState, useEffect, FormEvent} from 'react';
import Link from 'next/link';
import Modal, {TransacTable} from '@/app/components/serverComponents';
import {newTransaction} from '@/backend/actions';
import {Transaction} from '@/backend/types';
import {getAllTransactions} from "@/backend/data";

export function HomeComponent({lastTen, balance, categories}: {
    lastTen: Transaction[];
    balance: number;
    categories: string[]
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [currentBalance, setCurrentBalance] = useState(balance);

    const handleAddTransaction = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
            setIsModalOpen(false);
            location.reload();
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert('Failed to add transaction. Please try again.');
        }
    };

    const recalculateBalance = async () => {
        const transactions = await getAllTransactions();
        const newBalance = transactions.reduce((acc, transaction) => {
            return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
        setCurrentBalance(newBalance);
    };

    useEffect(() => {
        recalculateBalance();
    }, []);

    return (
        <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 bg-gray-100 min-h-screen">
            <div className="md:w-1/3">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Current Balance</h1>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Balance: ${currentBalance}</h2>
                <button onClick={recalculateBalance}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg mb-6 inline-block">
                    Recalculate Balance
                </button>
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Transactions</h1>
                <TransacTable transactions={lastTen}/>
            </div>
            <div className="md:w-2/3">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Logo</h1>
                <Link href="/transactions"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg mb-6 inline-block">
                    View All Transactions
                </Link>
                <button onClick={handleAddTransaction}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
                    Add Transaction
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Transaction</h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                        <select name="type" id="type"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm">
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                            <option value="withholding">Withholding</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                        <input type="number" name="amount" id="amount" step="0.01"
                               className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" name="date" id="date"
                               className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" id="category"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm">
                            <option value="">New Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="newCategory"
                            id="newCategory"
                            placeholder="Enter new Category"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                    </div>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">Add
                        Transaction
                    </button>
                    <button onClick={handleCloseModal}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">Cancel
                    </button>
                </form>
            </Modal>
        </div>
    );
}
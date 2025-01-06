'use client';
import {Transaction} from "@/backend/types";
import {FormEvent, useState} from "react";
import Link from "next/link";
import Modal, {TransacTable} from "@/app/components/serverC";
import {newTransaction} from "@/backend/actions";

export function HomeComponent({ lastTen, balance, categories }: { lastTen: Transaction[]; balance: number; categories: string[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const handleAddTransaction = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.target as HTMLFormElement);

        const type = form.get("type") as "income" | "expense";
        const amount = parseFloat(form.get("amount") as string);
        const dateInput = form.get("date") as string;
        const category = newCategory || form.get("category") as string;

        if (!type || isNaN(amount) || !dateInput || !category) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const date = new Date(dateInput);

        try {
            await newTransaction({ type, amount, date, category });
            setIsModalOpen(false);
            location.reload();
        } catch (error) {
            console.error("Error adding transaction:", error);
            alert("Failed to add transaction. Please try again.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
            <div className="md:w-1/3">
                <h1 className="text-3xl font-bold mb-4">Current Balance</h1>
                <h2 className="text-2xl font-bold mb-4">Balance: ${balance}</h2>
                <h1 className="text-3xl font-bold mb-4">Transactions</h1>
                {TransacTable(lastTen)}
            </div>
            <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-4">Logo</h1>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block" href={"/transactions"}>View All Transactions</Link>
                <button onClick={handleAddTransaction} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Transaction</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                        <select name="type" id="type" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                        <input type="number" name="amount" id="amount" step="0.01" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" name="date" id="date" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" id="category"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Transaction</button>
                    <button onClick={handleCloseModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </form>
            </Modal>
        </div>
    );
}
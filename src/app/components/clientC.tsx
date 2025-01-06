'use client';
import {Transaction} from "@/backend/types";
import {FormEvent, useState} from "react";
import Link from "next/link";
import Modal, {TransacTable} from "@/app/components/serverC";
import {newTransaction} from "@/backend/actions";

export function HomeComponent({ lastTen, balance }: { lastTen: Transaction[]; balance: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTransaction = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

        const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // Use FormData for a more robust approach
            const form = new FormData(e.target as HTMLFormElement);

            const type = form.get("type") as "income" | "expense";
            const amount = parseFloat(form.get("amount") as string);
            const dateInput = form.get("date") as string;
            const category = form.get("category") as string;

            if (!type || isNaN(amount) || !dateInput || !category) {
                alert("Please fill in all fields correctly.");
                return;
            }

            const date = new Date(dateInput);

            try {
                // Call the backend function to save the transaction
                await newTransaction({ type, amount, date, category });

                // Close the modal and notify the user
                setIsModalOpen(false);
                // Reload the page to show the new transaction
                location.reload();
            } catch (error) {
                console.error("Error adding transaction:", error);
                alert("Failed to add transaction. Please try again.");
            }
        };
    return (
        <div className="flex">

            <div className="w-1/3 p-6">
                <h1 className="text-2xl font-bold mb-4">Current Balance</h1>
                <h2 className="text-xl font-bold mb-4">Balance: ${balance}</h2>
                <h1 className="text-2xl font-bold mb-4">Transactions</h1>
                {TransacTable(lastTen)}
            </div>
            <div className="w-2/3 p-6">
                <h1 className="text-2xl font-bold mb-4">Logo</h1>
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={"/transactions"}>View All Transactions</Link>
                <button onClick={handleAddTransaction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Transaction</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" id="amount" step={"0.01"} />
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" id="date" />
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="category" />
                    <button type="submit">Add Transaction</button>
                </form>
            </Modal>
        </div>
    );
}
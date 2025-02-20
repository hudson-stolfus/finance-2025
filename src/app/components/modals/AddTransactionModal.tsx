'use client';
import React, {FormEvent} from 'react';
import Modal from '@/app/components/server/serverComponents';

interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: string[];
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    newCategory: string;
    setNewCategory: React.Dispatch<React.SetStateAction<string>>;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
                                                                     isOpen,
                                                                     onClose,
                                                                     categories,
                                                                     onSubmit,
                                                                     newCategory,
                                                                     setNewCategory,
                                                                 }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Transaction</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                    <select name="type" id="type"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
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
                <button type="button" onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">Cancel
                </button>
            </form>
        </Modal>
    );
};

export {AddTransactionModal};
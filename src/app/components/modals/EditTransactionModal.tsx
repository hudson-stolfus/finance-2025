'use client';
import React, {FormEvent} from 'react';
import Modal from '@/app/components/server/serverComponents';
import {Transaction} from '@/backend/types';

interface EditTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
                                                                       isOpen,
                                                                       onClose,
                                                                       transaction,
                                                                       onSubmit,
                                                                   }) => {
    if (!transaction) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Transaction</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="number" name="amount" id="amount" step="0.01" defaultValue={transaction.sum}
                           className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"/>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" name="date" id="date" defaultValue={transaction.date.toISOString().split('T')[0]}
                           className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"/>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="category" defaultValue={transaction.name}
                           className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm"/>
                </div>
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">Save
                </button>
                <button type="button" onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">Cancel
                </button>
            </form>
        </Modal>
    );
};

export {EditTransactionModal};
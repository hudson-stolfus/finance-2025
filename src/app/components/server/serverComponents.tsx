import { Transaction } from "@/backend/types";
import React from "react";

export function TransacTable({ transactions, onDelete, onEdit }: {
    transactions: Transaction[],
    onDelete?: (id: string) => Promise<void>,
    onEdit?: (transaction: Transaction) => void
}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Type</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Category</th>
                    {(onDelete || onEdit) && <th className="py-2 px-4 border-b">Actions</th>}
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id} className={`border-b ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
                        <td className="py-2 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                        <td className="py-2 px-4">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                        <td className="py-2 px-4">{"$"+transaction.amount.toFixed(2)}</td>
                        <td className="py-2 px-4">{transaction.category}</td>
                        {(onDelete || onEdit) && (
                            <td className="py-2 px-4 flex space-x-2">
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(transaction.id.toString())}
                                        className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-lg shadow-lg"
                                    >
                                        Delete
                                    </button>
                                )}
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(transaction)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white p-1 rounded-lg shadow-lg"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900">X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

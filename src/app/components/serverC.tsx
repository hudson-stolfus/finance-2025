import { Transaction } from "@/backend/types";
import React from "react";

export function TransacTable({ transactions, onDelete }: {
    transactions: Transaction[],
    onDelete?: (id: string) => Promise<void>
}) {
    return (
        <table className="min-w-full bg-white">
            <thead>
            <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Category</th>
                {onDelete && <th className="py-2">Actions</th>}
            </tr>
            </thead>
            <tbody>
            {transactions.map((transaction) => (
                <tr key={transaction.id} className={`border border-black ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}>
                    <td className="py-2">{transaction.date.toLocaleDateString()}</td>
                    <td className="py-2">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                    <td className="py-2">{transaction.amount}</td>
                    <td className="py-2">{transaction.category}</td>
                    {onDelete && (
                        <td className="py-2">
                            <button
                                onClick={() => onDelete(transaction.id.toString())}
                                className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-lg shadow-lg"
                            >
                                Delete
                            </button>
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
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

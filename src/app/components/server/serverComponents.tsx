import { Transaction } from "@/backend/types";
import React from "react";
import {Pencil, Trash} from "lucide-react";

export function TransacTable({ transactions, onDelete, onEdit }: {
    transactions: Transaction[],
    onDelete?: (id: string) => Promise<void>,
    onEdit?: (transaction: Transaction) => void
}) {
    return transactions.map((transaction) => (
        <tr key={transaction.id} className="transaction" datatype={transaction.total > 0 ? 'income' : 'expense'}>
            <td className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</td>
            <td className="transaction-amount">{"$"+transaction.total.toFixed(2)}</td>
            <td className="transaction-name">{transaction.name}</td>
            {(onDelete || onEdit) && (
                <td className="transaction-actions">
                    {onEdit && (
                        <button onClick={() => onEdit(transaction)} className="transaction-action">
                            <Pencil size={12} />
                        </button>
                    )}
                    {onDelete && (
                        <button onClick={() => onDelete(transaction.id.toString())} className="transaction-action">
                            <Trash size={12} />
                        </button>
                    )}
                </td>
            )}
        </tr>
    ));
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

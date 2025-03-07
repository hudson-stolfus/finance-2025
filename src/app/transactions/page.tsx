'use client'
import React, {useState, useEffect} from 'react';
import {getAllTransactions} from '@/backend/data';
import {deleteTransaction} from '@/backend/actions';
import {Transaction} from '@/backend/types';
import Filter from '../components/client/Filter';
import Editor from "@/app/components/client/Editor";
import {Pencil, Trash} from "lucide-react";
import {globals} from "@/app/globals";

export default function Transactions() {
    const [transactions, setTransactions] = useState(globals.transactions);

    const [, setIsEditModalOpen] = useState(false);
    const [, setTransactionToEdit] = useState<Transaction | null>(null);

    const handleDelete = async (id: string) => {
        await deleteTransaction(id);
    };

    const handleEdit = (transaction: Transaction) => {
        setTransactionToEdit(transaction);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        globals.setSidebar(
            <>
                <Filter />
                <hr />
                <Editor initial={{ name: '', total: 0, date: new Date() }} />
            </>
        );
    }, []);
    useEffect(() => {
        globals.attachTransactionListener(setTransactions);
        getAllTransactions().then(globals.setTransactions);
    }, []);

    return (
        <div className="card">
            <table className="transactions-table">
                <thead>
                    <tr className="transactions-table-header">
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="transactions-table-body">
                {
                    transactions.map((transaction) => (
                        <tr key={transaction.id} className="transaction" datatype={transaction.total > 0 ? 'income' : 'expense'}>
                            <td className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</td>
                            <td className="transaction-amount">{"$"+transaction.total.toFixed(2)}</td>
                            <td className="transaction-name">{transaction.name}</td>
                            <td className="transaction-actions">
                                <button onClick={() => handleEdit(transaction)} className="transaction-action">
                                    <Pencil size={12} />
                                </button>
                                <button onClick={() => handleDelete(transaction.id?.toString() ?? '')} className="transaction-action">
                                    <Trash size={12} />
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
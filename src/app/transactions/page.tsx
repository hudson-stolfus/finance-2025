'use client'
import React, {useState, useEffect, useCallback} from 'react';
import {getAllTransactions} from '@/backend/data';
import {deleteTransaction} from '@/backend/actions';
import {TransacTable} from '@/app/components/server/serverComponents';
import {Transaction} from '@/backend/types';

export default function Transactions() {
    const [, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [, setIsEditModalOpen] = useState(false);
    const [, setTransactionToEdit] = useState<Transaction | null>(null);

    const handleSearch = useCallback(async () => {
        const data = await getAllTransactions();
        setTransactions(data);
        const newBalance = data.reduce((acc, transaction) => {
            return acc + transaction.total;
        }, 0);
        setBalance(newBalance);
    }, []);

    const handleDelete = async (id: string) => {
        await deleteTransaction(id);
        await handleSearch();
    };

    const handleEdit = (transaction: Transaction) => {
        setTransactionToEdit(transaction);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    return (
        <div className="card">
            <table className="transactions-table">
                <thead>
                    <tr className="transactions-table-header">
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody className="transactions-table-body">
                    <TransacTable transactions={transactions} onDelete={handleDelete} onEdit={handleEdit}/>
                </tbody>
            </table>
        </div>
    );
}
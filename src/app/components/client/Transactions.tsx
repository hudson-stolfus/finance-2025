'use client'
import React, {useState, useEffect, useCallback} from 'react';
import {getAllTransactions} from '@/backend/data';
import {deleteTransaction} from '@/backend/actions';
import {TransacTable} from '@/app/components/server/serverComponents';
import {Transaction} from '@/backend/types';

export default function Transactions() {
    const [search] = useState('');
    const [filter] = useState('');
    const [, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [, setIsEditModalOpen] = useState(false);
    const [, setTransactionToEdit] = useState<Transaction | null>(null);

    const handleSearch = useCallback(async () => {
        const data = await getAllTransactions(search);
        setTransactions(data);
        const newBalance = data.reduce((acc, transaction) => {
            return acc + transaction.sum;
        }, 0);
        setBalance(newBalance);
    }, [search]);

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
    }, [search, filter, handleSearch]);

    return (
        <table className="card">
            <thead>
                <tr className="transactions-table-header">
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody className="transactions-table">
                <TransacTable transactions={transactions} onDelete={handleDelete} onEdit={handleEdit}/>
            </tbody>
        </table>
    );
}
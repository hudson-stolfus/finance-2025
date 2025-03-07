'use client'
import React from 'react';
import {Transaction} from '@/backend/types';
import PieChartTopExpenses from "@/app/components/server/PieChartTopExpenses";
import BarChartTransactions from "@/app/components/server/BarChartTransactions";


export default function HomeComponent({transactions}: { transactions: Transaction[] }) {

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold text-center">Summary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-xl rounded-lg p-6 border">
                    <h2 className="text-xl font-semibold">Number of Transactions</h2>
                    <p className="mt-2 text-4xl font-bold text-gray-700">{transactions.length}</p>
                </div>
                <div className="bg-white shadow-xl rounded-lg p-6 border">
                    <h2 className="text-xl font-semibold">Total Income</h2>
                    <p className="mt-2 text-4xl font-bold text-green-600">
                        {'$' +
                            transactions
                                .filter((t) => t.type === 'income')
                                .reduce((acc, t) => acc + t.amount, 0)
                                .toFixed(2)}
                    </p>
                </div>
                <div className="bg-white shadow-xl rounded-lg p-6 border">
                    <h2 className="text-xl font-semibold">Total Expense</h2>
                    <p className="mt-2 text-4xl font-bold text-red-600">
                        {'$' +
                            transactions
                                .filter((t) => t.type === 'expense')
                                .reduce((acc, t) => acc + t.amount, 0)
                                .toFixed(2)}
                    </p>
                </div>
                <div className="bg-white shadow-xl rounded-lg p-6 border">
                    <h2 className="text-xl font-semibold">Final Balance</h2>
                    <p className="mt-2 text-4xl font-bold text-blue-600">
                        {'$' +
                            transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0).toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="mt-8">
                <BarChartTransactions transactions={transactions}/>
            </div>
            <div className="mt-8">
                <PieChartTopExpenses transactions={transactions}/>
            </div>
        </div>
    );
}
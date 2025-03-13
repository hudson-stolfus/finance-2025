'use client'

import TrendChart from "@/app/components/client/TrendChart";
import PieChartTopExpenses from "@/app/components/server/PieChartTopExpenses";
import React, {useEffect, useState} from "react";
import {globals} from "@/app/globals";
import {getAllTransactions} from "@/backend/data";
import Editor from "@/app/components/client/Editor";
import {sumBalance} from "@/backend/util";

export default function Stats() {
    const [transactions, setTransactions] = useState(globals.transactions);

    useEffect(() => {
        globals.attachTransactionListener(setTransactions);
        getAllTransactions().then(globals.setTransactions);
    }, []);

    useEffect(() => {
        globals.setSidebar(
            <>
                <Editor initial={{ name: '', total: 0, date: new Date() }} />
            </>
        );
    }, []);

    return (
        <div className="card">
            <div className="">
                <div className="content">
                    <h2>Final Balance</h2>
                    {'$' + sumBalance(transactions).toFixed(2)}
                </div>
                <div className="content">
                    <h2>Total Income</h2>
                    {'$' + sumBalance(transactions.filter((t) => t.total >= 0)).toFixed(2)}
                </div>
                <div className="content">
                    <h2>Total Expense</h2>
                    {'$' + sumBalance(transactions.filter((t) => t.total < 0)).toFixed(2)}
                </div>
            </div>
            <div className="mt-8">
                <TrendChart transactions={transactions} />
            </div>
            <div className="mt-8">
                {
                    transactions.length > 0 ? <PieChartTopExpenses transactions={transactions}/> : null
                }
            </div>
        </div>
    );
}
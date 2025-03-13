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
            <div className="content">
                <h1>Overview</h1>
                <div className="stats-overview">
                    <div className="stats-info">
                        Balance
                        <h2 className="balance">${sumBalance(transactions).toFixed(2)}</h2>
                    </div>
                    <div className="stats-info">
                        Income
                        <h2 className="income">${ + sumBalance(transactions.filter((t) => t.total >= 0)).toFixed(2)}</h2>
                    </div>
                    <div className="stats-info">
                        Expenses
                        <h2 className="expense">${Math.abs(sumBalance(transactions.filter((t) => t.total < 0))).toFixed(2)}</h2>
                    </div>
                </div>
            </div>
            <TrendChart transactions={transactions} />
            {transactions.length > 0 ? <PieChartTopExpenses transactions={transactions}/> : null}
        </div>
    );
}
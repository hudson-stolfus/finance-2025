'use client'

import React, {useState} from "react";
import {Transaction} from '@/backend/types';

function aggregateTransactions(transactions: Transaction[], interval: (between: Date) => {from: Date, to: Date}) {
    const groups: { [key: string]: Transaction[] } = {};

    transactions.forEach((t) => {
        // if (Object.keys(groups).length >= 8) return;
        const key = interval(t.date).from.toISOString();
        if (groups[key]) groups[key].push(t);
        else groups[key] = [ t ];
    });

    console.log(groups);

    return groups;
}

function daily(date: Date) {
    return {
        from: new Date(date.setHours(0, 0, 0, 0)),
        to: new Date(date.setHours(23, 59, 59, 99)),
    };
}

function weekly(date: Date) {
    return {
        from: new Date(date.setHours(0, 0, 0, 0) - date.getDay() * 86400000),
        to: new Date(date.setHours(23, 59, 59, 99) + (7 - date.getDay()) * 86400000),
    };
}

interface TrendChartProps {
    transactions: Transaction[];
}

export default function TrendChart(props: TrendChartProps) {

    const [interval, setInterval] = useState(() => daily);

    const aggregatedData = aggregateTransactions(props.transactions, interval);

    return (
        <div className="content">
            <div className="inline-selection">
                <button onClick={() => setInterval(() => daily)} className={interval.name == 'daily' ? 'active': ''}>Day</button>
                <button onClick={() => setInterval(() => weekly)} className={interval.name == 'weekly' ? 'active': ''}>Week</button>
                <button onClick={() => setInterval(() => daily)} className={interval.name == 'monthly' ? 'active': ''}>Month</button>
            </div>
            <div className="chart">
                <div className="chart-data">
                    {
                        Object.keys(aggregatedData).map((iso) => (
                            <div className='interval-data' key={iso}>
                                {
                                    aggregatedData[iso].map((transaction: Transaction) => (
                                        <div key={transaction.id} className='bar' data-total={transaction.total} style={{marginBottom: transaction.total * 0.75, backgroundColor: transaction.total >= 0 ? 'var(--color-positive)' : 'var(--color-negative)'}}></div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="chart-intervals">
                    {
                        Object.keys(aggregatedData).map((iso, index) => (
                            <div className="chart-interval" key={index}>
                                {new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' })}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
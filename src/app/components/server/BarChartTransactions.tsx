import {Bar} from "react-chartjs-2";
import React, {useState} from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Transaction} from '@/backend/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Group = 'day' | 'week' | 'month';

function aggregateTransactions(transactions: Transaction[], period: Group) {
    const groups: { [key: string]: { income: number; expense: number } } = {};

    transactions.forEach((t) => {
        const date = new Date(t.date);
        let key = '';
        if (period === 'day') {
            key = date.toLocaleDateString();
        } else if (period === 'week') {
            const firstDay = new Date(date);
            firstDay.setDate(date.getDate() - date.getDay());
            key = firstDay.toLocaleDateString();
        } else if (period === 'month') {
            key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        }

        if (!groups[key]) {
            groups[key] = {income: 0, expense: 0};
        }
        if (t.type === 'income') {
            groups[key].income += t.amount;
        } else if (t.type === 'expense') {
            groups[key].expense += t.amount;
        }
    });

    const sortedKeys = Object.keys(groups).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const incomeData = sortedKeys.map((key) => groups[key].income);
    const expenseData = sortedKeys.map((key) => groups[key].expense);

    return {labels: sortedKeys, incomeData, expenseData};
}

export default function BarChartTransactions({transactions}: { transactions: Transaction[] }) {
    const [grouping, setGrouping] = useState<Group>('day');
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const lastYearTransactions = transactions.filter((transaction) => new Date(transaction.date) >= oneYearAgo);
    const aggregatedData = aggregateTransactions(lastYearTransactions, grouping);

    const data = {
        labels: aggregatedData.labels,
        datasets: [
            {
                label: 'Income',
                data: aggregatedData.incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Expenses',
                data: aggregatedData.expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Last Year Incomes/Expenses',
            },
        },
    };
    return (
        <div>
            <h2 className="text-2xl font-bold text-center">View By Grouping</h2>
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={() => setGrouping('day')}
                    className={`px-4 py-2 rounded bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                        grouping === 'day' && 'ring-2 ring-blue-700'
                    }`}
                >
                    Day-to-Day
                </button>
                <button
                    onClick={() => setGrouping('week')}
                    className={`px-4 py-2 rounded bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                        grouping === 'week' && 'ring-2 ring-blue-700'
                    }`}
                >
                    Week-to-Week
                </button>
                <button
                    onClick={() => setGrouping('month')}
                    className={`px-4 py-2 rounded bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                        grouping === 'month' && 'ring-2 ring-blue-700'
                    }`}
                >
                    Month-to-Month
                </button>
            </div>
            <h2 className="text-2xl font-bold text-center">Last Year Chart</h2>
            <div className="mt-4 bg-white p-4 shadow-xl rounded-lg border">
                <Bar data={data} options={options}/>
            </div>
        </div>
    )
}
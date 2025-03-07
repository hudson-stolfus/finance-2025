import React from 'react';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, Title} from 'chart.js';
import {Transaction} from '@/backend/types';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartTopExpensesProps {
    transactions: Transaction[];
    topCount?: number;
}

export default function PieChartTopExpenses({transactions, topCount = 5}: PieChartTopExpensesProps) {
    // Aggregate expense transactions by category
    const expenseCategories: { [key: string]: number } = {};
    transactions.forEach((t) => {
        if (t.type === 'expense') {
            const category = t.category || 'Uncategorized';
            expenseCategories[category] = (expenseCategories[category] || 0) + t.amount;
        }
    });

    // Sort categories descending by amount and group remaining as "Other"
    const sortedCategories = Object.entries(expenseCategories).sort((a, b) => b[1] - a[1]);
    const topCategories = sortedCategories.slice(0, topCount);
    const otherCategories = sortedCategories.slice(topCount);
    if (otherCategories.length) {
        const otherSum = otherCategories.reduce((sum, [, amount]) => sum + amount, 0);
        topCategories.push(['Other', otherSum]);
    }

    const labels = topCategories.map(([category]) => category);
    const dataValues = topCategories.map(([, amount]) => amount);
    const totalAmount = dataValues.reduce((sum, value) => sum + value, 0);
    const backgroundColors = [
        'rgba(75,192,192,0.6)',
        'rgba(255,99,132,0.6)',
        'rgba(255,205,86,0.6)',
        'rgba(54,162,235,0.6)',
        'rgba(153,102,255,0.6)',
        'rgba(201,203,207,0.6)'
    ];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Expenses by Category',
                data: dataValues,
                backgroundColor: backgroundColors.slice(0, labels.length),
                borderColor: backgroundColors.slice(0, labels.length).map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Top Expense Categories'
            }
        }
    };

    return (
        <div className="p-6 bg-white shadow-xl rounded-lg border mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">Expenses Breakdown</h2>
            <div className="flex flex-col md:flex-row items-center">
                {/* Pie chart on the left */}
                <div className="w-full md:w-1/2 p-4">
                    <Pie data={chartData} options={chartOptions}/>
                </div>
                {/* Custom legend on the right */}
                <div className="w-full md:w-1/2 p-4">
                    <ul>
                        {labels.map((label, index) => {
                            const percentage =
                                totalAmount > 0 ? ((dataValues[index] / totalAmount) * 100).toFixed(1) : '0.0';
                            return (
                                <li key={label} className="flex items-center mb-2">
                              <span
                                  className="inline-block w-4 h-4 mr-2 rounded"
                                  style={{backgroundColor: backgroundColors[index]}}
                              ></span>
                                    <span className="font-medium">{label}</span>
                                    <span className="ml-auto font-semibold">
                                ${dataValues[index].toFixed(2)} ({percentage}%)
                              </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
import React from 'react';
import {Doughnut} from 'react-chartjs-2';
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
        if (t.total < 0) {
            expenseCategories[t.name] = (expenseCategories[t.name] || 0) + t.total;
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
        getComputedStyle(document.documentElement).getPropertyValue('--color-blue').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--color-purple').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--color-red').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--color-orange').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--color-yellow').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--color-green').trim(),
    ];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Expenses',
                data: dataValues,
                backgroundColor: backgroundColors.slice(0, labels.length),
                borderWidth: 0
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="content">
            <h1>Expenses</h1>
            {/* Pie chart on the left */}
            <div className="w-full md:w-1/2 p-8">
                <Doughnut data={chartData} options={chartOptions}/>
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
    );
}
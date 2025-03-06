'use client'

import React, {useState, useEffect, useCallback} from 'react';
import {getAllTransactions} from '@/backend/data';
import {Transaction} from '@/backend/types';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import {ArrowRightFromLine, Import, Plus} from "lucide-react";
import {usePathname} from "next/navigation";

export default function Transactions() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(0);
    const [, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<number>(0);
    const [, setIsAddModalOpen] = useState(false);
    const location = usePathname();

    const handleSearch = useCallback(async () => {
        const data = await getAllTransactions(search, filter);
        setTransactions(data);
        const newBalance = data.reduce((acc, transaction) => {
            return acc + transaction.total;
        }, 0);
        setBalance(newBalance);
    }, [search, filter]);

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleExport = async () => {
        const data = await getAllTransactions(search);
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
        const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
        saveAs(blob, 'transactions.xlsx');
    };

    useEffect(() => {
        handleSearch();
    }, [search, filter, handleSearch]);

    return location === '/transactions' ? (
        <div className="sidebar">
            <div className="sidebar-header sidebar-split">
                <div>Filter</div>
                <div className="balance">${balance.toFixed(2)}</div>
            </div>
            <div className="card">
                <input type="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <select value={filter.toString()} onChange={(e) => setFilter(Number(e.target.value))}>
                    <option value="0">All</option>
                    <option value="1">Income</option>
                    <option value="-1">Expense</option>
                </select>
            </div>
            <div className="sidebar-split">
                <button onClick={handleExport}>
                    <Import size={16} />
                    Import
                </button>
                <button onClick={handleExport}>
                    <ArrowRightFromLine />
                    Export
                </button>
            </div>
            <hr />
            <div className="sidebar-header">
                Create Transaction
            </div>
            <button onClick={handleAdd} className="highlight">
                <Plus size={16} />
                Add Transaction
            </button>
        </div>
    ) : <></>;
}
'use client'

import React, {useEffect, useState} from 'react';
import {getAllTransactions} from '@/backend/data';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import {ArrowRightFromLine, FilterIcon, Import} from "lucide-react";
import { sumBalance } from '@/backend/util';
import {globals} from "@/app/globals";

export default function Filter() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(0);
    const [balance, setBalance] = useState<number>(0);

    const handleExport = async () => {
        const data = await getAllTransactions(search);
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
        const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
        saveAs(blob, 'transactions.xlsx');
    };

    const update = () => {
        getAllTransactions(search, filter).then((result) => {
            globals.setTransactions(result);
            setBalance(sumBalance(result));
        });
    }

    useEffect(update, [filter, search]);

    return (
        <>
            <div className="sidebar-header sidebar-split">
                <div>Filter</div>
                <div className="balance">${balance.toFixed(2)}</div>
            </div>
            <div className="card">
                <input type="search" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); update(); }} />
                <FilterIcon className="input-label" size={16} />
                <select value={filter.toString()} onChange={(e) => { setFilter(Number(e.target.value)); update(); }}>
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
        </>
    );
}
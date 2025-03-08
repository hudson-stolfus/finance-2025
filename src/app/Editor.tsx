'use client'

import {DollarSign, Save} from "lucide-react";
import React, {useState} from "react";
import {Transaction} from "@/backend/types";

interface EditorProps {
    initial: Transaction
}

export default function Editor(props: EditorProps) {

    const [transaction] = useState(props.initial);

    function PrevMonth(date: Date) {
        const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return Array.from({ length: firstOfMonth }, (_, i) => i + 1);
    }

    function MonthDays(date: Date) {
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }

    function save() {

    }

    return(
        <>
            <div className="sidebar-header">
                Create Transaction
            </div>
            <div className="card">
                <DollarSign className="input-label" size={16} />
                <input type="number" id="total" step="0.01" defaultValue={transaction.total} />
            </div>
            <div className="card">
                <div>
                    <div className="date-picker-month">{transaction.date.toLocaleDateString("en-US", {year: "numeric", month: "long"})}</div>
                    {
                        PrevMonth(transaction.date).map((date) => <div className="date-picker-day" key={date}>&nbsp;</div>)
                    }
                    {
                        MonthDays(transaction.date).map((date) => <div className={`date-picker-day${transaction.date.getDate() == date ? ' highlight' : ''}`} key={date}>{date}</div>)
                    }
                </div>
            </div>
            <div className="card">
                <input type="text" id="name" placeholder="Name" defaultValue={transaction.name} />
            </div>
            <button onClick={save} className="highlight">
                <Save size={16} />
                Save
            </button>
        </>
    );
}
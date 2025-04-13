'use client'

import {DollarSign, Save} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Transaction} from "@/backend/types";
import {editTransaction} from "@/backend/actions";
import {globals} from "@/app/globals";
import {getAllTransactions} from "@/backend/data";
import Filter from "@/app/components/client/Filter";

interface EditorProps {
    initial: Transaction,
    create?: boolean
}

export default function Editor(props: EditorProps) {

    const [name, setName] = useState(props.initial.name);
    const [total, setTotal] = useState(props.initial.total);
    const [date, setDate] = useState<Date|null>(new Date(props.initial.date));

    // function PrevMonth(date: Date) {
    //     const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    //     return Array.from({ length: firstOfMonth }, (_, i) => i + 1);
    // }
    //
    // function MonthDays(date: Date) {
    //     const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    //     return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    // }

    useEffect(() => {
        setName(props.initial.name);
        setTotal(props.initial.total);
        setDate(props.initial.date);
    }, [props.initial.date, props.initial.name, props.initial.total]);

    function save() {
        editTransaction({id: props.initial.id, total, name, date} as Transaction).then(() => {
            getAllTransactions().then(globals.setTransactions);
            globals.setSidebar(
                <>
                    <Filter />
                    <hr />
                    <Editor create initial={{ name: '', total: 0, date: new Date() }} />
                </>
            );
        });
    }

    return(
        <>
            <div className="sidebar-header">
                {props.create ? 'Create Transaction' : 'Edit Transaction'}
            </div>
            <div className="card">
                <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="card" style={{ background: total > 0 ? 'hsl(from var(--color-positive) h s l / 20%)' : (total < 0 ? 'hsl(from var(--color-negative) h s l / 20%)' : 'var(--bg-secondary') }}>
                <DollarSign className="input-label" size={16} />
                <input type="number" id="total" step="0.01" value={total} onKeyDown={(e) => {
                    if (!/[0-9]|Backspace|Delete|Arrow|\./.test(e.key) && !e.metaKey) {
                        e.preventDefault();
                    }
                    if (e.key == '-') {
                        setTotal(-total);
                    }
                }} onChange={(e) => {
                        e.target.value = (Math.round(Number(e.target.value) * 100) / 100).toString();
                        setTotal(Number(e.target.value));
                    }
                } />
            </div>
            <div className="card">
                <input type="date" value={date?.toISOString().split('T')[0]} onChange={e => setDate(e.target.valueAsDate)} />
            </div>
            <button onClick={save} className="highlight">
                <Save size={16} />
                Save
            </button>
        </>
    );
}
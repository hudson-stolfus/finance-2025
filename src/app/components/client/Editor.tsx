'use client'

import {Plus} from "lucide-react";

export default function Editor() {

    function save() {

    }

    return(
        <>
            <div className="sidebar-header">
                Create Transaction
            </div>
            <button onClick={save} className="highlight">
                <Plus size={16} />
                Add Transaction
            </button>
        </>
    );
}
'use client'

import {useEffect} from "react";
import {globals} from "@/app/globals";

export default function HelpPage() {

    useEffect(() => {
        globals.setSidebar(undefined);
    }, []);

    return (
        <div className="card">
            <div className="readable">
                <h1>SHS Finance Documentation</h1>
                <div className="content">
                    <h2>View Your Balance</h2>
                    <p className="content">
                        Your current balance is displayed on the homepage. It automatically updates whenever you add, edit,
                        or delete a transaction. In case of extreme server latency, you can manually recalculate your balance.
                    </p>

                    <h2>Add a Transaction</h2>
                    <div className="content">
                        <ol>
                            <li>Click the <span className="font-semibold">&quot;Add Transaction&quot;</span> button on the
                                homepage.
                            </li>
                            <li>Fill in the form with the transaction type (income or expense), amount, date, and
                                category.
                            </li>
                            <li>Click <span className="font-semibold">&quot;Add Transaction&quot;</span> to save.</li>
                        </ol>
                    </div>

                    <h2>View All Transactions</h2>
                    <div className="content">
                        <ul>
                            <li>Click the <span className="font-semibold">&quot;View All Transactions&quot;</span> button on
                                the homepage.
                            </li>
                            <li>You can search, filter, and sort transactions by type, date, or category.</li>
                        </ul>
                    </div>

                    <h2>Edit or Delete a Transaction</h2>
                    <div className="content">
                        <ol>
                            <li>Go to the <span className="font-semibold">&quot;View All Transactions&quot;</span> page.
                            </li>
                            <li>Click the <span className="font-semibold">&quot;Edit&quot;</span> or <span
                                className="font-semibold">&quot;Delete&quot;</span> button next to the transaction you want
                                to modify.
                            </li>
                            <li>For edits, update the details and click <span
                                className="font-semibold">&quot;Save&quot;</span>.
                            </li>
                        </ol>
                    </div>

                    <h2>Export Transactions</h2>
                    <div className="content">
                        <ol>
                            <li>Go to the <span className="font-semibold">&quot;View All Transactions&quot;</span> page.
                            </li>
                            <li>Click the <span className="font-semibold">&quot;Export&quot;</span> button.</li>
                            <li>Your transactions will be downloaded as an Excel file.</li>
                        </ol>
                    </div>

                    <h2>Recalculate Balance</h2>
                    <div className="content">
                        <p> If you suspect your balance is incorrect, you can manually recalculate it: </p>
                        <div className="content">
                            Click the <span className="font-semibold">&quot;Recalculate Balance&quot;</span> button on
                            the homepage.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
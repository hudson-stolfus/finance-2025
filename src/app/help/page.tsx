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
                        You balance is located inside the navbar.
                    </p>

                    <h2>Add a Transaction</h2>
                    <div className="content">
                        <p className="content">
                            Navigate to the transaction pane on the right-hand side of your screen
                        </p>
                        <ol>
                            <li>Enter your transaction information
                            </li>
                            <li>Click <span className="font-semibold">&quot;Add Transaction&quot;</span> to save.</li>
                        </ol>
                    </div>

                    <h2>View All Transactions</h2>
                    <div className="content">
                        <p className="content">
                            By clicking the <span className="font-semibold">&quot;Transactions&quot;</span> button in the navigation pane, you can navigate to the page with all transactions. You can filter these transactions using the options in the right-hand pane.
                        </p>
                    </div>

                    <h2>Edit or Delete a Transaction</h2>
                    <div className="content">
                        <p className="content">
                            While on the <span className="font-semibold">&quot;Transactions&quot;</span> page, hover over the desired transaction. On the right hand side, edit and delete options will appear.
                        </p>
                    </div>

                    <h2>Export Transactions</h2>
                    <div className="content">
                        <p>Click the <span className="font-semibold">&quot;Export&quot;</span> button within the right-hand pane.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

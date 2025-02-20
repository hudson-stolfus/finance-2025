export default function HelpPage() {
    return (
        <div className="flex flex-col items-center bg-gray-50 p-8">
            <header className="text-left mb-8 w-3/4">
                <h1 className="text-4xl font-bold text-blue-900">Welcome to Finance 25</h1>
                <p className="text-lg text-black">Your personal finance management tool.</p>
            </header>

            <h2 className="text-2xl font-bold text-blue-900 mb-6 w-3/4 text-left">How to Use Finance 25</h2>

            <div className="mb-6 w-3/4 text-left">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">1. View Your Balance</h3>
                <p className="text-black">
                    Your current balance is displayed on the homepage. It automatically updates whenever you add, edit,
                    or delete a transaction. In case of extreme server latency, you can manually recalculate your balance.
                </p>
            </div>

            <div className="mb-6 w-3/4 text-left">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">2. Add a Transaction</h3>
                <div className="text-black">
                    <p> To add a new transaction: </p>
                    <ul className="list-disc list-inside text-black mt-2">
                        <li>Click the <span className="font-semibold">&quot;Add Transaction&quot;</span> button on the
                            homepage.
                        </li>
                        <li>Fill in the form with the transaction type (income or expense), amount, date, and
                            category.
                        </li>
                        <li>Click <span className="font-semibold">&quot;Add Transaction&quot;</span> to save.</li>
                    </ul>
                </div>
            </div>

            <div className="mb-6 w-3/4 text-left">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">3. View All Transactions</h3>
                <div className="text-black">
                    <p> To view all your transactions: </p>
                    <ul className="list-disc list-inside text-black mt-2">
                        <li>Click the <span className="font-semibold">&quot;View All Transactions&quot;</span> button on
                            the homepage.
                        </li>
                        <li>You can search, filter, and sort transactions by type, date, or category.</li>
                    </ul>
                </div>
            </div>

            <div className="mb-6 w-3/4 text-left">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">4. Edit or Delete a Transaction</h3>
                <div className="text-black">
                    <p> To edit or delete a transaction: </p>
                    <ul className="list-disc list-inside text-black mt-2">
                        <li>Go to the <span className="font-semibold">&quot;View All Transactions&quot;</span> page.
                        </li>
                        <li>Click the <span className="font-semibold">&quot;Edit&quot;</span> or <span
                            className="font-semibold">&quot;Delete&quot;</span> button next to the transaction you want
                            to modify.
                        </li>
                        <li>For edits, update the details and click <span
                            className="font-semibold">&quot;Save&quot;</span>.
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mb-6 w-3/4 text-left">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">5. Export Transactions</h3>
                <div className="text-black">
                    <p> To export your transactions to an Excel file: </p>
                    <ul className="list-disc list-inside text-black mt-2">
                        <li>Go to the <span className="font-semibold">&quot;View All Transactions&quot;</span> page.
                        </li>
                        <li>Click the <span className="font-semibold">&quot;Export&quot;</span> button.</li>
                        <li>Your transactions will be downloaded as an Excel file.</li>
                    </ul>
                </div>
            </div>

            <div className="mb-6 w-3/4 text-left">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">6. Recalculate Balance</h3>
                <div className="text-black">
                    <p> If you suspect your balance is incorrect, you can manually recalculate it: </p>
                    <ul className="list-disc list-inside text-black mt-2">
                        <li>Click the <span className="font-semibold">&quot;Recalculate Balance&quot;</span> button on
                            the homepage.
                        </li>
                        <li>This will update your balance based on all transactions in the system.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
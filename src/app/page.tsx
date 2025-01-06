'use client'
import {getAllTransactions} from "@/backend/data";
import {Transaction} from "@/backend/types";
import {seedData} from "@/backend/actions";

export default function App() {
    // const transactions: Transaction[] = await getAllTransactions();
    const handleClick = () => {
        seedData().then(r => {
            console.log(r);
        });
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            {/*<table className="w-full border-collapse">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th className="border border-gray-300 p-2 bg-gray-100 text-left">ID</th>*/}
            {/*        <th className="border border-gray-300 p-2 bg-gray-100 text-left">Type</th>*/}
            {/*        <th className="border border-gray-300 p-2 bg-gray-100 text-left">Amount</th>*/}
            {/*        <th className="border border-gray-300 p-2 bg-gray-100 text-left">Date</th>*/}
            {/*        <th className="border border-gray-300 p-2 bg-gray-100 text-left">Category</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {transactions.map((transaction) => (*/}
            {/*        <tr key={transaction.id}>*/}
            {/*            <td className="border border-gray-300 p-2">{transaction.id}</td>*/}
            {/*            <td className="border border-gray-300 p-2">{transaction.type}</td>*/}
            {/*            <td className="border border-gray-300 p-2">${transaction.amount.toFixed(2)}</td>*/}
            {/*            <td className="border border-gray-300 p-2">{transaction.date.toLocaleDateString()}</td>*/}
            {/*            <td className="border border-gray-300 p-2">{transaction.category}</td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
            <button onClick={handleClick} className={"px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"}>
                Do Shit
            </button>
        </div>
    );
}
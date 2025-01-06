import {getAllTransactions} from "@/backend/data";
import {TransacTable} from "@/app/components/serverC";

export default async function transactions() {
    const transactions = await getAllTransactions();
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            {TransacTable(transactions)}
        </div>
    );
}
import {getAllTransactions} from "@/backend/data";
import {Transaction} from "@/backend/types";
import SummaryPage from '@/app/stats/SummaryPage';



export default async function App() {
    const transactions: Transaction[] = await getAllTransactions();

    return <SummaryPage transactions={transactions}/>;
}
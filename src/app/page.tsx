import { getLastTransactions, getBalance } from '@/backend/data';
import {HomeComponent} from '@/app/components/clientC';

export default async function App() {
    const lastTen = await getLastTransactions(5);
    const balance = await getBalance();

    return <HomeComponent lastTen={lastTen} balance={balance} />;
}
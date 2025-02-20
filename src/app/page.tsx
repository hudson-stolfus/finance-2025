import {getLastTransactions, getBalance, getCategories} from '@/backend/data';
import {HomeComponent} from '@/app/components/clientComponents';

export default async function App() {
    const lastTen = await getLastTransactions(5);
    const balance = await getBalance();
    const categories = await getCategories();

    return <HomeComponent lastTen={lastTen} balance={balance} categories={categories} />;
}
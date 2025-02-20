import {getCategories} from '@/backend/data';
import HomeComponent from '@/app/components/client/HomeComponent';

export default async function App() {
    const categories: string[] = await getCategories();

    return <HomeComponent categories={categories}/>;
}
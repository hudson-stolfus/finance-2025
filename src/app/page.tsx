// import {getCategories} from '@/backend/data';
import HomeComponent from '@/app/HomeComponent';
import {Transaction} from "@/backend/types";

export default async function App() {
    // const categories: string[] = await getCategories();
    const categories: Transaction = []
    return <HomeComponent categories={categories}/>;
}
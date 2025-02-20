import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="bg-gradient-to-r from-green-400 to-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold">FIN25</Link>
                <div className="space-x-4">
                    <Link href="/help" className="text-white text-lg hover:underline">Help</Link>
                </div>
            </div>
        </nav>
    );
}
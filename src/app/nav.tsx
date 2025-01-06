import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="p-6 bg-gray-800 text-white">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/transactions">
                        Transactions
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
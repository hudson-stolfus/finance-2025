'use client'

import Link from 'next/link';
import UserCard from "@/app/components/server/userCard";
import {getBalance} from "@/backend/data";
import {useEffect, useState} from "react";

export default function Nav() {
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        getBalance().then((result: number) => {
            setBalance(Number(result));
        });
    }, [setBalance]);

    return (
        <div className='nav-wrapper'>
            <Link href="/" className="brand">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="logo" viewBox="0 0 32 32" style={{stroke:"currentColor", strokeWidth:"3", strokeLinejoin: "round"}}>
                    <path d="M22.89,14.06l-3.87,1.09c1.47-0.39,2.97,0.46,3.39,1.92l0.13,0.49c0.42,1.47-0.44,3-1.91,3.42l-1.61,0.45v1.18
                        c0,1.53-1.24,2.77-2.77,2.77h-0.5c-1.36,0-2.48-0.98-2.72-2.26l-2.27,0.64c-1.48,0.42-3-0.44-3.42-1.91L7.2,21.36
                        c-0.42-1.47,0.44-3,1.91-3.42l2.47-0.69c-1.46,0.39-2.96-0.46-3.38-1.93l-0.14-0.48c-0.42-1.48,0.44-3,1.92-3.42l3-0.85V9.38
                        c0-1.52,1.24-2.77,2.77-2.77h0.5c1.36,0,2.49,0.98,2.72,2.27l2.27-0.64c1.48-0.42,3.01,0.44,3.42,1.91l0.14,0.49
                        C25.21,12.11,24.36,13.65,22.89,14.06z"/>
                </svg>
                <span className="brand-name">
                    SHS Finance
                </span>
            </Link>
            <nav className="card">
                <UserCard />
                <span className="balance">
                    ${balance.toFixed(2)}
                </span>
                <Link href="/help">Help</Link>
            </nav>
        </div>
    );
}
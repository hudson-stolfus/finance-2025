'use client'

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {globals} from "@/app/globals";
import {useEffect} from "react";


export default function LandingPage() {
    useEffect(() => {
        globals.setSidebar(undefined);
    });

    return (
        <div className="hero">
            <div className="readable">
                <header>
                    <h1>Welcome to SHS Finance</h1>
                    <div className="content">
                        Your personal finance management tool.
                    </div>
                </header>
                <center>
                    <Link className="highlight link-button" href="/transactions">
                        Continue as John Doe <ArrowRight size={16} />
                    </Link>
                    {/*<Link href="/transactions">*/}
                    {/*    Sign In <ArrowRight />*/}
                    {/*</Link>*/}
                    {/*<Link className="highlight" href="/transactions">*/}
                    {/*    Sign Up <ArrowRight />*/}
                    {/*</Link>*/}
                </center>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    );
}
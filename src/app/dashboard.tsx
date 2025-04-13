'use client'

import React, {useEffect, useState} from "react";
import Nav from "@/app/nav";
import {globals} from "@/app/globals";

export default function Dashboard({children}: Readonly<{ children: React.ReactNode; }>) {
    const [sidebarSize, setSidebarSize] = useState(globals.sidebarSize);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 900);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);


    useEffect(() => {
        globals.attachSidebarSizeListener(setSidebarSize);
    }, []);

    return (
        <div className="dashboard" style={{ width: `calc(100vw - ${isMobile ? 0 : sidebarSize}px - calc(var(--spacing-xl) * 2))`, height: `calc(100vh - ${isMobile ? sidebarSize : 0}px - calc(var(--spacing-xl) * 2))` }}>
            <Nav />
            {children}
        </div>
    );
}

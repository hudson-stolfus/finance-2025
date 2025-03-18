'use client'

import React, {useEffect, useState} from "react";
import Nav from "@/app/nav";
import {globals} from "@/app/globals";

export default function Dashboard({children}: Readonly<{ children: React.ReactNode; }>) {
    const [sidebarSize, setSidebarSize] = useState(globals.sidebarSize);

    useEffect(() => {
        globals.attachSidebarSizeListener(setSidebarSize);
    }, []);

    return (
        <div className="dashboard" style={{ width: window.innerWidth > 900 ? `calc(100vw - ${sidebarSize}px - calc(var(--spacing-xl) * 2))` : 'calc(100vw -  calc(var(--spacing-xl) * 2))', height: window.innerWidth > 900 ? `calc(100vh - calc(var(--spacing-xl) * 2)))` : `calc(100vh - ${sidebarSize}px - calc(var(--spacing-xl) * 2))` }}>
            <Nav />
            {children}
        </div>
    );
}

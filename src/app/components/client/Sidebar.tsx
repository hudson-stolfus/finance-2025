'use client'

import React, {useEffect, useState} from 'react';
import {globals} from "@/app/globals";

export default function Sidebar() {
    const [children, setChildren] = useState(globals.sidebar);

    useEffect(() => {
        globals.attachSidebarListener(setChildren);
    }, []);

    return children ? (
        <div className="sidebar">
            {children}
        </div>
    ) : <></>;
}
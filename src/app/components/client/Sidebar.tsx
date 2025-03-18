'use client'

import React, {useEffect, useState} from 'react';
import {globals} from "@/app/globals";
import {GripHorizontal, GripVertical} from "lucide-react";

export default function Sidebar() {
    const [children, setChildren] = useState(globals.sidebar);
    const [size, setSize] = useState(globals.sidebarSize);

    const resizeX = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.classList.add('active');
        const listener = (we: MouseEvent) => {
            we.preventDefault();
            we.stopPropagation();
            if (we.clientX > window.innerWidth / 2 && we.clientX < window.innerWidth - 15) {
                setSize(window.innerWidth - we.clientX);
                globals.setSidebarSize(window.innerWidth - we.clientX);
            }
        }
        window.addEventListener('mousemove', listener);
        window.addEventListener('mouseup', () => {
            target.classList.remove('active');
            window.removeEventListener('mousemove', listener)
        });
    }

    const resizeY = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.classList.add('active');
        const listener = (we: MouseEvent) => {
            we.preventDefault();
            we.stopPropagation();
            if (we.clientY > window.innerHeight / 2 && we.clientY < window.innerHeight - 15) {
                setSize(window.innerHeight - we.clientY);
                globals.setSidebarSize(window.innerHeight - we.clientY);
            }
        }
        window.addEventListener('mousemove', listener);
        window.addEventListener('mouseup', () => {
            target.classList.remove('active');
            window.removeEventListener('mousemove', listener)
        });
    }

    useEffect(() => {
        globals.attachSidebarListener(setChildren);
        globals.attachSidebarSizeListener(setSize);
    }, []);

    return children ? (
        <>
            {window.innerWidth > 900 ? (
                    <div className="sizer-x" style={{right: `calc(${size}px - calc(var(--spacing-xl) / 2))`}} onMouseDown={resizeX}>
                        <GripVertical />
                    </div>
                ) : (
                    <div className="sizer-y" style={{bottom: `calc(${size}px - calc(var(--spacing-xl) / 2))`}} onMouseDown={resizeY}>
                        <GripHorizontal />
                    </div>
                )
            }

            <div className="sidebar" style={{flexBasis: `calc(${size}px - calc(var(--spacing-xl) * 1.5)`}}>
                {children}
            </div>
        </>
    ) : <></>;
}
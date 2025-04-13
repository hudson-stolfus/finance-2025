'use client'

import React, {useCallback, useEffect, useRef, useState} from "react";
import {Transaction} from '@/backend/types';

function aggregateTransactions(transactions: Transaction[], interval: (date: Date) => {from:  Date, to:  Date}) {
    const groups: { [key: string]: Transaction[] } = {};

    transactions.forEach((t) => {
        const key = interval(t.date).from.toISOString();
        if (groups[key]) groups[key].push(t);
        else groups[key] = [ t ];
    });
    for (let i = 48; i >= 0; i--) {
        const indexedDate = interval(new Date(new Date(new Date().getTime() - i * 86400000).setHours(0, 0, 0, 0)));
        if (!groups[indexedDate.from.toISOString()]) {
            groups[indexedDate.from.toISOString()] = [];
        }
    }

    return groups;
}

interface Interval {
    from: Date;
    to:  Date;
    width: number;
}

function daily(date: Date): Interval {
    return {
        from: new Date(date.setHours(0, 0, 0, 0)),
        width: 20,
        to: new Date(date.setHours(23, 59, 59, 99))
    };
}

function weekly(date: Date): Interval {
    return {
        from: new Date(date.setHours(0, 0, 0, 0) - date.getDay() * 86400000),
        width: 70,
        to: new Date(date.setHours(23, 59, 59, 99) + (7 - date.getDay()) * 86400000)
    };
}

function monthly(date: Date): Interval {
    return {
        from: new Date(date.getFullYear(), date.getMonth(), 1),
        width: 300,
        to: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    };
}

interface TrendChartProps {
    transactions: Transaction[];
}

export default function TrendChart(props: TrendChartProps) {
    const [interval, setInterval] = useState<(date: Date) => Interval>(() => daily);
    const [inspect, setInspect] = useState<number|undefined>(undefined);
    const [inspectEventTop, setInspectEventTop] = useState<number|undefined>(undefined);
    const [view, setView] = useState(0);
    const graphRef = useRef<HTMLDivElement>(null);

    const sortedTransactions = props.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
    const aggregatedData = aggregateTransactions(sortedTransactions, interval);
    const columns = Object.keys(aggregatedData).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime()
    });
    const scrollToEnd = useCallback(() => {
        if (graphRef.current) {
            graphRef.current.scrollTo(graphRef.current.scrollWidth, 0);
            setView(Math.round(columns.length * graphRef.current.scrollLeft / (graphRef.current.scrollWidth - graphRef.current.getBoundingClientRect().width)));
        }
    }, [columns.length]);
    const getValues = (i: number) => {
        let income = 0;
        let expense = 0;
        try {
            aggregatedData[columns[i]].forEach((t) => {
                if (t.total >= 0) income += t.total;
                else expense += t.total;
            });
        } catch {
            return { income: 0, expense: 0 };
        }

        income /= 2;
        expense /= 2;

        return {income, expense};
    }
    const inspectChart = (event: React.MouseEvent<SVGElement>)=> {
        setInspect(event.clientX - event.currentTarget.getBoundingClientRect().left);
        setInspectEventTop(event.clientY);
    };
    const inspectedInterval = Math.min(Math.round(0.999 * (inspect ?? 0) / interval(new Date()).width - 0.5), columns.length);
    const graphBounds = graphRef.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0, left: 0, top: 0, bottom: 0, right: 0 } as DOMRect;
    const graphScroll = { left: graphRef.current?.scrollLeft ?? 0, top: graphRef.current?.scrollTop ?? 0, width: graphRef.current?.scrollWidth ?? 0 };
    const clientInspect = Math.max(Math.min((inspect ?? 0) - graphScroll.left, graphBounds.width), 0) + graphBounds.left;

    let expensePath = '';
    let incomePath = '';
    let max: number = 0, min: number = 0;

    columns.forEach((column) => {
        max = Math.max(max, aggregatedData[column].reduce((a, b) => {
            if (b.total >= 0) return a + b.total;
            return a;
        }, 0));
        min = Math.min(min, aggregatedData[column].reduce((a, b) => {
            if (b.total < 0) return a + b.total;
            return a;
        }, 0));
    });

    max /= 2;
    min /= 2;

    for (let i = 0; i < columns.length; i++) {
        if (i == 0) {
            expensePath += `L ${(i + 0.5) * interval(new Date()).width} ${max - getValues(i).expense}`;
            incomePath += `L ${(i + 0.5) * interval(new Date()).width} ${max - getValues(i).income}`;
        } else {
            expensePath += `S ${i * interval(new Date()).width} ${max - getValues(i).expense} ${(i + 0.5) * interval(new Date()).width} ${max - getValues(i).expense}`;
            incomePath += `S ${i * interval(new Date()).width} ${max - getValues(i).income} ${(i + 0.5) * interval(new Date()).width} ${max - getValues(i).income}`;
        }
    }

    useEffect(() => {
        scrollToEnd();
    }, [scrollToEnd]);

    return (
        <div className="content">
            <div className="inline-selection">
                <button onClick={() => {setInterval(() => daily); scrollToEnd();}} className={interval.name == 'daily' ? 'active': ''}>Day</button>
                <button onClick={() => {setInterval(() => weekly); scrollToEnd();}} className={interval.name == 'weekly' ? 'active': ''}>Week</button>
                <button onClick={() => {setInterval(() => monthly); scrollToEnd();}} className={interval.name == 'monthly' ? 'active': ''}>Month</button>
            </div>
            <div className="chart">
                <div className="chart-data" ref={graphRef} onScroll={(e) => setView(Math.round(columns.length * e.currentTarget.scrollLeft / (e.currentTarget.scrollWidth - e.currentTarget.getBoundingClientRect().width)))}>
                    <svg width={columns.length * interval(new Date()).width} viewBox={`0 0 ${columns.length * interval(new Date()).width} ${max + Math.abs(min)}`}
                         xmlns="http://www.w3.org/2000/svg" onMouseMove={inspectChart} onMouseLeave={() => setInspect(undefined)}>
                        <path vectorEffect="non-scaling-stroke" d={incomePath.replace('L', 'M')} style={{fill: 'none', stroke: 'hsl(from var(--color-positive) h s l / 50%)', strokeWidth: 1}} />
                        <path d={`M ${interval(new Date()).width} ${max} ${incomePath} L${(columns.length - 0.5) * interval(new Date()).width} ${max} Z`} style={{fill: 'hsl(from var(--color-positive) h s l / 25%)'}} />
                        <path vectorEffect="non-scaling-stroke" d={expensePath.replace('L', 'M')} style={{fill: 'none', stroke: 'hsl(from var(--color-negative) h s l / 50%)', strokeWidth: 1}} />
                        <path d={`M ${interval(new Date()).width} ${max} ${expensePath} L${(columns.length - 0.5) * interval(new Date()).width} ${max} Z`} style={{fill: 'hsl(from var(--color-negative) h s l / 25%)'}} />
                        {/*<path vectorEffect="non-scaling-stroke" d={totalPath.replace('L', 'M')} style={{fill: 'none', stroke: 'var(--color-accent)', strokeWidth: 2}} />*/}
                        <line strokeDasharray="5,5" x1={inspect ?? 0} y1={0} x2={inspect ?? 0} y2={max + Math.abs(min)} style={{stroke: 'var(--fg-tertiary)', strokeWidth: 1, visibility: inspect ? 'visible' : 'hidden'}}></line>
                        <circle cx={inspectedInterval * interval(new Date()).width + (interval(new Date()).width / 2)} cy={max - getValues(inspectedInterval).income} r={3} style={{fill: 'var(--color-positive)', visibility: inspect ? 'visible' : 'hidden'}} />
                        <circle cx={inspectedInterval * interval(new Date()).width + (interval(new Date()).width / 2)} cy={max - getValues(inspectedInterval).expense} r={3} style={{fill: 'var(--color-negative)', visibility: inspect ? 'visible' : 'hidden'}} />
                    </svg>
                </div>
                <div className="chart-intervals">
                    <div className="chart-interval">
                        {new Date(columns[Math.floor((view * (graphScroll.width - graphBounds.width)) / graphScroll.width)] ?? Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' })}
                    </div>
                    <div className="chart-interval" style={{ visibility: inspect ? 'visible' : 'hidden', position: 'relative', left: clientInspect - graphBounds.width / 2 - graphBounds.left }}>
                        {new Date(columns[inspectedInterval] ?? Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' })}
                    </div>
                    <div className="chart-interval">
                        {new Date(columns[view + Math.round(graphBounds.width / interval(new Date()).width - 0.5)] ?? Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' })}
                    </div>
                </div>
                <div className="inspection" style={{left: clientInspect,
                    top: inspectEventTop ?? 0,
                    visibility: inspect && aggregatedData[columns[inspectedInterval]].length !== 0 ? 'visible' : 'hidden' }}>
                    {/*<div className="inspection-item">*/}
                    {/*    <h2 className="balance">${(getValues(inspectedInterval).income + getValues(inspectedInterval).expense).toFixed(2)}</h2>*/}
                    {/*    <div className="date">{new Date(columns[inspectedInterval] ?? Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>*/}
                    {/*</div>*/}
                    {
                        aggregatedData[columns[inspectedInterval]].map((t, i) => {
                            if (i <= 5) {
                                return (
                                    <div key={i} className='inspection-item'>
                                        <span className={t.total >= 0 ? 'income' : 'expense'}>${t.total.toFixed(2)}</span>
                                        <span>{t.name}</span>
                                    </div>
                                );
                            } else if (i == aggregatedData[columns[inspectedInterval]].length - 1) {
                                return (
                                    <div key={i}>{i - 5} More</div>
                                );
                            }
                            return null;
                        })
                    }
                </div>
            </div>
        </div>
    )
}
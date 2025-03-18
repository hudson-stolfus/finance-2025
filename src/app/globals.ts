import {Transaction} from "@/backend/types";
import {ReactNode} from "react";

class Globals {
    private _transactions: Transaction[];
    private _sidebar: ReactNode | undefined;
    private _sidebarSize: number;
    private _balance: number;

    private transactionListeners: ((update: Transaction[]) => void)[] = [];
    private sidebarListeners: ((update: ReactNode|undefined) => void)[] = [];
    private sidebarSizeListeners: ((update: number) => void)[] = [];
    private balanceListeners: ((update: number) => void)[] = [];

    constructor() {
        this._transactions = [];
        this._balance = 0;
        this._sidebarSize = 300;
        this.setSidebar = this.setSidebar.bind(this);
        this.setTransactions = this.setTransactions.bind(this);
        this.setBalance = this.setBalance.bind(this);

    }

    get sidebar() {
        return this._sidebar;
    }

    get sidebarSize() {
        return this._sidebarSize;
    }

    get transactions() {
        return this._transactions;
    }

    get balance() {
        return this._balance;
    }

    setSidebar(update: ReactNode): void {
        this._sidebar = update;
        this.sidebarListeners.forEach((listener) => listener(update));
    }

    setSidebarSize(update: number): void {
        this._sidebarSize = update;
        this.sidebarSizeListeners.forEach((listener) => listener(update));
    }

    setTransactions(update: Transaction[]): void {
        this._transactions = update;
        this.transactionListeners.forEach((listener) => listener(update));
    }

    setBalance(update: number): void {
        this._balance = update;
        this.balanceListeners.forEach((listener) => listener(update));
    }

    attachTransactionListener(listener: (update: Transaction[]) => void): void {
        this.transactionListeners.push(listener);
        listener(this._transactions);
    }

    attachSidebarListener(listener: (update: ReactNode|undefined) => void): void {
        this.sidebarListeners.push(listener);
        listener(this._sidebar);
    }

    attachSidebarSizeListener(listener: (update: number) => void): void {
        this.sidebarSizeListeners.push(listener);
        listener(this._sidebarSize);
    }

    attachBalanceListener(listener: (update: number) => void): void {
        this.balanceListeners.push(listener);
        listener(this._balance);
    }
}

export const globals: Globals = new Globals();
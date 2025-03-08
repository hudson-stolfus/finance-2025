import {Transaction} from "@/backend/types";
import {ReactNode} from "react";

class Globals {
    private _transactions: Transaction[];
    private _sidebar: ReactNode|undefined;

    private transactionListeners: ((update: Transaction[]) => void)[] = [];
    private sidebarListeners: ((update: ReactNode|undefined) => void)[] = [];

    constructor() {
        this._transactions = [];
        this.setSidebar = this.setSidebar.bind(this);
        this.setTransactions = this.setTransactions.bind(this);
    }

    get sidebar() {
        return this._sidebar;
    }

    get transactions() {
        return this._transactions;
    }

    setSidebar(update: ReactNode): void {
        this._sidebar = update;
        this.sidebarListeners.forEach((listener) => listener(update));
    }

    setTransactions(update: Transaction[]): void {
        this._transactions = update;
        this.transactionListeners.forEach((listener) => listener(update));
    }

    attachTransactionListener(listener: (update: Transaction[]) => void): void {
        this.transactionListeners.push(listener);
        listener(this._transactions);
    }

    attachSidebarListener(listener: (update: ReactNode|undefined) => void): void {
        this.sidebarListeners.push(listener);
        listener(this._sidebar);
    }

}

export const globals: Globals = new Globals();
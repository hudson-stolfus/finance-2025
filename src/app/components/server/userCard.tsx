import {Bolt, User} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function UserCard() {
    return (
        <Link className="user-card" href="/settings">
            <User className="user-icon" />
            <div className="user-info">
                John Doe
                <div className="user-manage">
                    <Bolt size={12}/>Manage
                </div>
            </div>
        </Link>
    );
}
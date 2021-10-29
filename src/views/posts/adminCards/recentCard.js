import React from 'react';
import { Link } from 'react-router-dom';

export function RecentPostCard() {
    return(
        <div className="bg-yellow p-4 space-y-2 text-black rounded-sm">
            <div className="space-x-2 flex items-center">
                <Link to="/admin/" className="bg-blue py-2 px-2 text-sm uppercase font-oswald text-white font-bold">Social</Link>
                <p className="font-cooper text-sm opacity-80">12 September 2021</p>
            </div>
            <h1 className="font-oswald text-lg">International Moose Count Underway</h1>
        </div>
    );
}

export function RecentPostCard2() {
    return(
        <div className="border border-blue p-4 space-y-2 text-black rounded-sm">
            <div className="space-x-2 flex items-center">
                <Link to="/admin/" className="bg-blue py-2 px-2 text-sm uppercase font-oswald text-white font-bold">Social</Link>
                <p className="font-cooper text-sm opacity-80">12 September 2021</p>
            </div>
            <h1 className="font-oswald text-lg">International Moose Count Underway</h1>
        </div>
    );
}
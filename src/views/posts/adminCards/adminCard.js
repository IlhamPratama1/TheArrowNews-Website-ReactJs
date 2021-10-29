import React from "react";
import { Link } from "react-router-dom";

export function AdminCard({ date, title, excerpt, slug }) {
    return(
        <div className="w-64 bg-blue p-7 rounded-sm text-white space-y-2">
            <p className="font-cooper text-xs">{date}</p>
            <p className="font-oswald font-bold text-3xl">{title.slice(0, 20)}</p>
            <p className="font-mont font-light text-xs opacity-80">{excerpt.slice(0, 135)}</p>
            <br />
            <Link to={`/post/single/${slug}/`} className="font-oswald font-bold bg-white text-blue text-xs uppercase py-2 px-6 cursor pointer">View post</Link>
        </div>
    );
}

export function AdminCard2({ date, title, excerpt, slug }) {
    return(
        <div className="w-64 border-2 border-blue p-7 rounded-sm space-y-2 text-black">
            <p className="font-cooper text-xs">{date}</p>
            <p className="font-oswald font-bold text-3xl">{title.slice(0, 20)}</p>
            <p className="font-mont font-light text-xs opacity-80">{excerpt.slice(0, 135)}</p>
            <br />
            <Link to={`/post/single/${slug}/`} className="font-oswald font-bold bg-black text-white text-xs uppercase py-2 px-6 cursor pointer">View post</Link>
        </div>
    );
}

export function CreateAdminCard() {
    return(
        <Link to="/admin/posts/create" className="w-64 bg-gray p-10 rounded-sm pointer">
            <div className="h-full space-y-2 text-black">
                <p className="font-oswald font-bold text-4xl uppercase">add new post</p>
                <p className="font-mont font-light text-xs">The worldwide dominance of Canada shows no signs of abating though with this year</p>
                <br />
                <div className="flex items-end">
                    <img className="w-7" src="/static/icons/add.svg" alt="add" />
                </div>
            </div>
        </Link>
    );
}

export function EmptyAdminCard() {
    return(
        <Link to="/admin/posts/create" className="w-64 bg-yellow p-10 rounded-sm pointer">
            <div className="h-full space-y-2 text-black">
                <p className="font-oswald font-bold text-4xl uppercase">Post not found</p>
                <p className="font-mont font-light text-xs">You haven't post anything yet</p>
                <br />
                <div className="flex items-end">
                    <img className="w-7" src="/static/icons/add.svg" alt="add" />
                </div>
            </div>
        </Link>
    );
}
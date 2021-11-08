import React from 'react';
import { Link } from 'react-router-dom';

export function MiniCategoryCard({ title, posts }) {
    return(
        <div className="bg-blue w-full p-2 lg:pl-4 rounded-sm">
            <div className="flex items-center lg:space-x-4 text-white">
                <h1 className="font-oswald font-bold text-xl lg:text-2xl uppercase">{title}</h1>
                <div className="w-full flex justify-end">
                    <div className="text-center">
                        <p className="font-oswald font-bold text-2xl">{posts}</p>
                        <p className="font-mont text-xs lg:text-sm">posts</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MiniCategoryCard2({ title }) {
    return(
        <div className="border-blue w-full p-2 lg:pl-4 rounded-sm border">
            <div className="flex items-center lg:space-x-4 text-black">
                <h1 className="font-oswald font-bold text-xl lg:text-2xl uppercase">{title}</h1>
                <div className="w-full flex justify-end">
                    <div className="text-center">
                        <p className="font-oswald font-bold text-2xl">5</p>
                        <p className="font-mont text-sm">posts</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AddCategoryCard() {
    return(
        <Link to='/admin/category' className="bg-gray w-full p-2 pl-4 rounded-sm flex items-center space-x-10 text-black">
            <h1 className="font-oswald font-bold text-xl lg:text-2xl uppercase">Add new</h1>
            <img className="w-2 lg:w-5" src="/static/icons/add.svg" alt="add" />
        </Link>
    );
}
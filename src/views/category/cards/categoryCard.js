import React from 'react';

export function CategoryCard({ title, about, posts, likes, views }) {
    return(
        <div className="bg-yellow w-full p-4 rounded-sm">
            <div className="grid grid-cols-2">
                <div className="space-y-2">
                    <h1 className="font-oswald font-bold text-xl lg:text-2xl uppercase">{title}</h1>
                    <p className="font-cooper text-xs">{about}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-center space-x-3 lg:space-x-6">
                        <div className="text-center">
                            <p className="font-oswald font-bold text-3xl">{posts}</p>
                            <p className="font-mont text-sm">posts</p>
                        </div>
                        <div className="text-center">
                            <p className="font-oswald font-bold text-3xl">{views}</p>
                            <p className="font-mont text-sm">views</p>
                        </div>
                        <div className="text-center">
                            <p className="font-oswald font-bold text-3xl">{likes}</p>
                            <p className="font-mont text-sm">likes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CategoryCard2({ title, about, posts, likes, views }) {
    return(
        <div className="border border-blue w-full p-4 rounded-sm">
            <div className="grid grid-cols-2 text-black">
                <div className="space-y-2">
                    <h1 className="font-oswald font-bold text-2xl uppercase">{title}</h1>
                    <p className="font-cooper text-xs">{about}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-center space-x-3 lg:space-x-6">
                        <div className="text-center">
                            <p className="font-oswald font-bold text-3xl">{posts}</p>
                            <p className="font-mont text-sm">posts</p>
                        </div>
                        <div className="text-center">
                            <p className="font-oswald font-bold text-3xl">{likes}</p>
                            <p className="font-mont text-sm">views</p>
                        </div>
                        <div className="text-center">
                            <p className="font-oswald font-bold text-3xl">{views}</p>
                            <p className="font-mont text-sm">likes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


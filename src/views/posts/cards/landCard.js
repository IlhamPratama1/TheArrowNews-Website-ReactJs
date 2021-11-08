import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function LandCard({ image, category, title, author, excerpt, views, likes, comments, slug, profile }) {
    const [ imageLoaded, setImageLoaded ] = useState(false);

    function handleImageLoaded() {
        setImageLoaded(true);
    }

    const imageStyle = !imageLoaded ? "hidden" : "w-full h-60 object-cover";

    return(
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-x-5">
            <Link to={"/post/single/" + slug}>
                {!imageLoaded &&
                    <div className="h-60 w-full animate-pulse bg-gray"></div> }
                    <img onLoad={handleImageLoaded} className={imageStyle} alt="headline" src={image} />
                </Link>
            <div className="col-span-2 space-y-2">
                <Link to={`/category/${category}`} className="uppercase font-mont font-bold text-md text-yellow text-sm">{category}</Link>
                <Link to={"/post/single/" + slug} ><h1 className="font-bold font-oswald text-2xl">{title}</h1></Link>
                <Link to={"/author/" + author} className="flex items-center space-x-2">
                    <img alt="author" src={profile} className="w-9 h-9 rounded-full" />
                    <p className="font-mont text-sm" style={{
                        'textDecoration': 'underline',
                        'textDecorationColor': '#FCA311',                            
                    }}>{author}</p>
                </Link>
                <p className="font-cooper">{excerpt.slice(0, 370)}...</p>
                <div className="flex items-center space-x-4">
                    <img alt="like" src="/static/icons/file.svg" className="w-4	h-4" />
                    <p className="text-sm">{views}</p>
                    <img alt="like" src="/static/icons/like.svg" className="w-4	h-4" />
                    <p className="text-sm">{likes}</p>
                    <img alt="chat" src="/static/icons/chat.svg" className="w-4	h-4" />
                    <p className="text-sm">{comments}</p>
                    <img alt="like" src="/static/icons/share.svg" className="w-4 h-4" />
                    <p className="text-sm">Share</p>
                </div>
            </div>
        </div>
    );
}
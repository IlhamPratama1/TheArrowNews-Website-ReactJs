import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function MiniCard({ img, title, category, author, slug }) {
    const [ imageLoaded, setImageLoaded ] = useState(false);

    function handleImageLoaded() {
        setImageLoaded(true);
    }

    const imageStyle = !imageLoaded ? "hidden" : "w-full object-cover";
    return(
        <div className="space-y-6">
            <div className="space-y-2">
                {!imageLoaded &&
                    <div className="h-36 w-full animate-pulse bg-gray"></div>
                }
                <Link to={"/post/single/" + slug} ><img onLoad={handleImageLoaded} className={imageStyle} alt="headline" src={img} /></Link>
                <Link to={`/category/${category}`} className="uppercase font-mont font-bold text-md text-yellow">{category}</Link>
                <Link to={"/post/single/" + slug} ><h1 className="font-bold font-oswald text-2xl">{title}</h1></Link>
                <p className="font-mont text-sm" style={{
                    'textDecoration': 'underline',
                    'textDecorationColor': '#FCA311',                            
                }}>{author}</p>
            </div>
        </div>
    );
}
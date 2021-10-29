import React, { useState } from 'react';

export default function AuthorView({ profile, username, email, about}) {
    const [ imageLoaded, setImageLoaded ] = useState(false);

    function handleImageLoaded() {
        setImageLoaded(true);
    }

    const imageStyle = !imageLoaded ? "hidden" : "w-14 h-14 rounded-full";

    return(
        <div className="text-center space-y-2 mb-12">
            <div className="flex justify-center">
                {!imageLoaded &&
                <div className="w-14 h-14 rounded-full animate-pulse bg-gray"></div> }
                <img alt="author" onLoad={handleImageLoaded} src={profile} className={imageStyle} />
            </div>
            <p className="font-mont font-bold" style={{
                'textDecoration': 'underline',
                'textDecorationColor': '#FCA311',                            
            }}>{username}</p>
            <p className="font-mont opacity-60">{email}</p>
            <div className="flex justify-center">
                <p className="w-4/6 font-mont">{about}</p>
            </div>
        </div> 
    );
}
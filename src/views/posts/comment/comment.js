import React, { useState } from 'react';

export default function CommentView({ id, author_image, author_name, created_date, text }) {
    const [ imageLoaded, setImageLoaded ] = useState(false);

    function handleImageLoaded() {
        setImageLoaded(true);
    }

    const imageStyle = !imageLoaded ? "hidden" : "w-14 h-14 rounded-full";

    return(
        <div key={id} className="flex items-center space-x-4 mb-6">
            {!imageLoaded &&
            <div className="w-14 h-14 rounded-full animate-pulse bg-gray"></div> }
            <img alt="author" onLoad={handleImageLoaded} src={author_image} className={imageStyle} />
            <div className="space-y-2">
                <div className="flex items-center space-x-3">
                    <p className="font-mont font-bold" style={{
                        'textDecoration': 'underline',
                        'textDecorationColor': '#FCA311',                            
                    }}>{author_name}</p>
                    <p className="font-mont font-light text-sm opacity-60">{created_date}</p>
                </div>
                <p className="font-cooper text-md">{text}</p>
            </div>
        </div>
    );
}
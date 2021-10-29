import React, { useState } from 'react';

export default function EditProfile() {
    const [postimage, setPostImage] = useState('');

    const handleImage = e => {
		if (e.target.files[0]) {
			setPostImage(e.target.files[0]);
		  }
	}

    return(
        <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-6">
            <div className="col-span-4 space-y-2">
                <h1 className="font-oswald font-bold text-lg">Posts</h1>
                <h1 className="font-mont font-bold opacity-60 text-md">Create Post</h1>
                <form className="pt-4 space-y-4">
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Title</label>
                        <input name="title" type="text" placeholder="post title" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Image</label>
                        <input
							id="post-image"
							onChange={handleImage}
							name="image"
							type="file"
						/>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Excerpt</label>
                        <input name="excerpt" type="text" placeholder="post excerpt" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <div className="space-y-2 h-full">
                        <label className="font-mont font-bold text-md">Content</label>
                        <textarea name="content" type="text" placeholder="post excerpt" className="h-56 focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></textarea>
                    </div>
                    <button className="font-oswald font-bold bg-yellow lg:text-xl lg:py-4 lg:px-8">Submit</button>
                </form>
            </div>
        </div>
        </div>
    );
}
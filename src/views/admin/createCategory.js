import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axiosInstance from '../../axios';
import { DrafCard, DrafCard2 } from '../posts/adminCards/drafCard';
import { RecentPostCard, RecentPostCard2 } from '../posts/adminCards/recentCard';

export default function CreateCategory({ posts, draft, fetchCateg }) {
    const history = useHistory();
    const [name, setName] = useState('');
    const handleChange = (e) => {
		setName(e.target.value);
	};
    
    function subminCategory(e) {
        e.preventDefault();
        axiosInstance
			.post(`post/category/`, {
				name: name
			})
			.then((res) => {
                fetchCateg();
                history.replace({ pathname: '/admin/' });
			})
            .catch((res) => {
                console.log(res);
            });
    }
    
    return(
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-10">
            <div className="col-span-4 space-y-2">
                <h1 className="font-oswald font-bold text-lg">Category</h1>
                <h1 className="font-mont font-bold opacity-60 text-md">Create Category</h1>
                <form className="pt-4 space-y-4">
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Name</label>
                        <input value={name} onChange={handleChange} name="name" type="text" placeholder="category name" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <button onClick={e => subminCategory(e)} className="font-oswald font-bold bg-yellow lg:text-xl lg:py-4 lg:px-8">Submit</button>
                </form>
            </div>
            <div className="col-span-2 space-y-6">
                <div className="space-y-2">
                    <br />
                    <h1 className="font-mont font-bold opacity-60 text-md">Drafts</h1>
                    {draft.isLoading ? <div>loading</div> :
                        draft.data.length > 0 ?
                            draft.data.map((data, i) => {
                                return(
                                    i === 0 ?
                                    <DrafCard key={i} /> :
                                    <DrafCard2 key={i} />
                                );
                            }).slice(0, 3) :
                        <div className="py-3 px-6 bg-blue text-white text-xl font-oswald">Recent post is empty</div>
                    }
                </div>
                <div className="space-y-2">
                    <h1 className="font-mont font-bold opacity-60 text-md">Recent posts</h1>
                    {posts.isLoading ? <div>loading</div> :
                        posts.data.length > 0 ?
                            posts.data.map((post, i) => {
                                return(
                                    i === 0 ?
                                    <RecentPostCard key={i} /> :
                                    <RecentPostCard2 key={i} />
                                );
                            }).slice(0, 3) :
                        <div className="py-3 px-6 bg-yellow text-black text-xl font-oswald">Draft is empty</div>
                    }
                </div>
            </div>
        </div>
    );
}
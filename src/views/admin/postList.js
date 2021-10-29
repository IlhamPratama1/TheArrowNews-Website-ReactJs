import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import { DrafCard, DrafCard2 } from '../posts/adminCards/drafCard';
import { RecentPostCard, RecentPostCard2 } from '../posts/adminCards/recentCard';

export default function PostList({ posts, draft, fetchData, fetchDraft }) {
    const [ loadingSubmit, setLoadingSubmit ] = useState(false);

    function handleDelete(e, id) {
        e.preventDefault();
        setLoadingSubmit(true);
        axiosInstance
			.delete('admin/delete/' + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
                setLoadingSubmit(false);
			})
			.then(function () {
                fetchData();
                fetchDraft();
                setLoadingSubmit(false);
			});
    }
    return(
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-10 gap-y-2">
            <div className="col-span-4 space-y-2">
                <h1 className="font-oswald font-bold text-lg">Posts</h1>
                <h1 className="font-mont font-bold opacity-60 text-md">All post</h1>
                { !posts.isLoading ? 
                posts.data.length > 0 ?
                <table>
                    <thead className="bg-blue rounded-sm text-white">
                        <tr className="font-oswald text-md uppercase">
                            <th className="p-4">Title</th>
                            <th className="p-4">category</th>
                            <th className="p-4">date</th>
                            <th className="p-4">status</th>
                            <th className="p-4">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data.map((post, i) => {
                            return(
                                <tr key={i} className="border border-blue font-cooper text-md text-black">
                                    <td className="p-4"><Link to={`/post/single/${post.slug}/`}>{post.title}</Link></td>
                                    <td className="p-4">{post.category_name}</td>
                                    <td className="p-4">{post.published}</td>
                                    <td className="p-4">{post.status}</td>
                                    <td className="flex items-center p-4 space-x-4">
                                        <Link to={`/admin/posts/edit/${post.id}`}><img className="w-6" src='/static/icons/editing.png' alt="dashboard" /></Link>
                                        <button onClick={e => handleDelete(e, post.id)}><img className="w-6" src='/static/icons/trash.png' alt="dashboard" /></button>
                                    </td>
                                </tr>
                                );
                            }) 
                        }
                    </tbody>
                </table> : <div className="bg-blue p-4 font-oswald text-xl text-white">You haven't post anything yet</div> : <div className="bg-gray animate-pulse h-16 w-full"></div>
                }
                <br />
                <div className="flex items-center space-x-2">
                    <Link to="/admin/posts/create" className="bg-gray px-4 py-4 font-oswald pointer font-bold">ADD NEW POST</Link>
                    {loadingSubmit && <svg className="animate-spin bg-yellow h-5 w-5 mr-3" viewBox="0 0 18 18"></svg> }
                </div>
            </div>
            <div className="col-span-2 space-y-6">
                <div className="space-y-2">
                    <br />
                    <h1 className="font-mont font-bold opacity-60 text-md">Drafts</h1>
                    {draft.isLoading ? <div className="bg-gray animate-pulse h-12 w-full"></div> :
                        draft.data.length > 0 ?
                            draft.data.map((data, i) => {
                                return(
                                    i === 0 ?
                                    <DrafCard key={i} /> :
                                    <DrafCard2 key={i} />
                                );
                            }).slice(0, 3) :
                        <div className="py-3 px-6 bg-blue text-white text-xl font-oswald">Draft is empty</div>
                    }
                </div>
                <div className="space-y-2">
                    <h1 className="font-mont font-bold opacity-60 text-md">Recent posts</h1>
                    {posts.isLoading ? <div className="bg-gray animate-pulse h-12 w-full"></div> :
                        posts.data.length > 0 ?
                            posts.data.map((post, i) => {
                                return(
                                    i === 0 ?
                                    <RecentPostCard key={i} /> :
                                    <RecentPostCard2 key={i} />
                                );
                            }).slice(0, 3) :
                        <div className="py-3 px-6 bg-yellow text-black text-xl font-oswald">Recent post is empty</div>
                    }
                </div>
            </div>
        </div>
    );
}
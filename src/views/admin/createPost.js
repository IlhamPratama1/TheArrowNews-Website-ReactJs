import React, { useState } from 'react';
import { DrafCard, DrafCard2 } from '../posts/adminCards/drafCard';
import { RecentPostCard, RecentPostCard2 } from '../posts/adminCards/recentCard';
import slugify from 'react-slugify';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ckeditor.css';

export default function CreatePost({ categories, posts, draft, fetchData, fetchDraft }) {
    const history = useHistory();
	const initialFormData = Object.freeze({
		title: '',
        category: 1,
        author: localStorage.getItem('user_id'),
		excerpt: '',
		content: ''
	});
    const [postData, updateFormData] = useState(initialFormData);
    const [postImage, setPostImage] = useState('');
    const [ loadingSubmit, setLoadingSubmit ] = useState(false);

    const handleChange = (e) => {
		updateFormData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};

    const handleImage = e => {
		if (e.target.files[0]) {
			setPostImage(e.target.files[0]);
		  }
	}

    function submitForm(e) {
        e.preventDefault();
        setLoadingSubmit(true);
        let formData = new FormData();
		formData.append('title', postData.title);
		formData.append('slug', slugify(postData.title));
		formData.append('author', postData.author);
        formData.append('category', postData.category);
		formData.append('excerpt', postData.excerpt);
		formData.append('content', postData.content);
		formData.append('image', postImage);
		axiosInstance.post(`admin/create/`, formData)
		.then((res) => {
            fetchData();
            fetchDraft();
            setLoadingSubmit(false);
            history.replace({ pathname: '/admin/posts/' });
		})
        .catch((err) => {
            console.log(err.response);
            setLoadingSubmit(false);
        });
    }

    function submitAsDraf(e) {
        e.preventDefault();
        setLoadingSubmit(true);
        let formData = new FormData();
		formData.append('title', postData.title);
		formData.append('slug', slugify(postData.title));
		formData.append('author', postData.author);
		formData.append('excerpt', postData.excerpt);
		formData.append('content', postData.content);
		formData.append('image', postImage);
        formData.append('status', 'draft');
		axiosInstance.post(`admin/create/`, formData)
		.then((res) => {
            fetchData();
            fetchDraft();
            setLoadingSubmit(false);
            history.replace({ pathname: '/admin/posts/' });
		})
        .catch((err) => {
            setLoadingSubmit(false);
            console.log(err.response);
        });
    }

    return(
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-10">
            <div className="col-span-4 space-y-2">
                <h1 className="font-oswald font-bold text-lg">Posts</h1>
                <h1 className="font-mont font-bold opacity-60 text-md">Create Post</h1>
                <form className="pt-4 space-y-4">
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Title</label>
                        <input value={postData.title} onChange={handleChange} name="title" type="text" placeholder="post title" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Category</label>
                        <select value={postData.category} onChange={handleChange} name='category' className="w-full border bg-white rounded px-3 py-2 outline-none">
                        {categories.isLoading ? null :
                            categories.data.map((categ, i) => {
                                return(
                                    <option key={i} value={categ.id} className="py-1">{categ.name}</option>
                                );
                            })
                        }
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Image</label>
                        <br />
                        <input
							id="post-image"
                            onChange={handleImage}
							name="image"
							type="file"
						/>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Excerpt</label>
                        <input value={postData.excerpt} onChange={handleChange} name="excerpt" type="text" placeholder="post excerpt" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <div className="space-y-2 h-full">
                        <label className="font-mont font-bold text-md">Content</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data=""
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                updateFormData({
                                    ...postData,
                                    content: data,
                                });
                            } }
                        />
                    </div>
                    <div className="space-x-2 flex items-center">
                        <button onClick={e => submitForm(e)} className="font-oswald font-bold bg-yellow lg:text-xl lg:py-4 lg:px-8">Submit</button>
                        <button onClick={e => submitAsDraf(e)} className="font-oswald font-bold bg-blue text-white lg:text-xl lg:py-4 lg:px-8">Submit as Draft</button>
                        {loadingSubmit && <svg className="animate-spin bg-yellow h-5 w-5 mr-3" viewBox="0 0 18 18"></svg> }
                    </div>
                </form>
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
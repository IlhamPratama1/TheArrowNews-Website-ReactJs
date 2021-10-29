import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ckeditor.css';

export default function EditPost({ categories, fetchData }) {
    const history = useHistory();
	const { id } = useParams();
    const initialFormData = ({
		title: '',
        category: 1,
        author: localStorage.getItem('user_id'),
		excerpt: '',
		content: '',
        status: '',
        slug: ''
	});
	const [formData, updateFormData] = useState(initialFormData);
    const [editorData, setEditorData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [ loadingSubmit, setLoadingSubmit ] = useState(false);

    const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

    const getInitData = useCallback(async () => {
        try {
            const res = await axiosInstance.get('admin/edit/postdetail/' + id);
            const initialData = {
				title: res.data.title,
                category: res.data.category,
                author: res.data.author,
                excerpt: res.data.excerpt,
                content: res.data.content,
                status: res.data.status,
                slug: res.data.slug
			};
            if (res.status === 200) {
                updateFormData(initialData);
                setEditorData(res.data.content);
                setIsLoading(false);
            }
        } catch (error) {
            throw error;
        }
    }, [updateFormData, id]);

    useEffect(() => {
		getInitData();
	}, [getInitData]);

    const handleSubmit = (e) => {
		e.preventDefault();
        setLoadingSubmit(true);
		axiosInstance.put(`admin/edit/` + id + '/', {
			title: formData.title,
            category: formData.category,
			slug: formData.slug,
			author: formData.author,
			excerpt: formData.excerpt,
            status: formData.status,
			content: formData.content,
		}).then(function(res) {
            fetchData();
            setLoadingSubmit(false);
            history.push({
                pathname: '/admin/posts/',
            });
        });
	};

    return(
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-10">
            <div className="col-span-4 space-y-2">
                <h1 className="font-oswald font-bold text-lg">Posts</h1>
                <h1 className="font-mont font-bold opacity-60 text-md">Create Post</h1>
                <form className="pt-4 space-y-4">
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Title</label>
                        {!isLoading && <input value={formData.title} onChange={handleChange} name="title" type="text" placeholder="post title" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>}
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Category</label>
                        <select value={formData.category} onChange={handleChange} name='category' className="w-full border bg-white rounded px-3 py-2 outline-none">
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
                        <label className="font-mont font-bold text-md">Excerpt</label>
                        <input value={formData.excerpt} onChange={handleChange} name="excerpt" type="text" placeholder="post excerpt" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Category</label>
                        <select value={formData.status} onChange={handleChange} name='status' className="w-full border bg-white rounded px-3 py-2 outline-none">
                            <option value="draft" className="py-1">draft</option>
                            <option value="published" className="py-1">published</option>
                        </select>
                    </div>
                    <div className="space-y-2 h-full">
                        <label className="font-mont font-bold text-md">Content</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            data={editorData}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                updateFormData({
                                    ...formData,
                                    content: data,
                                });
                            } }
                        />                    
                    </div>
                    <div className="space-x-2 flex items-center">
                        <button onClick={e => handleSubmit(e)} className="font-oswald font-bold bg-yellow lg:text-xl lg:py-4 lg:px-8">Submit</button>
                        {loadingSubmit && <svg className="animate-spin bg-yellow h-5 w-5 mr-3" viewBox="0 0 18 18"></svg> }
                    </div>
                </form>
            </div>
        </div>
    );
}
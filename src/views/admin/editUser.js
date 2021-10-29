import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';


export default function EditUser({ userData, fetchUserData }) {
    const history = useHistory();
    const initialFormData =  Object.freeze({
		email: '',
        user_name: '',
        first_name: '',
		about: '',
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

    useEffect(() => {
        if(!userData.isLoading) {
            updateFormData({
                email: userData.data.email,
                user_name: userData.data.user_name,
                first_name: userData.data.first_name,
                about: userData.data.about, 
            });
        }
    }, [userData.isLoading, userData]);

    const handleSubmit = (e) => {
		e.preventDefault();
        setLoadingSubmit(true);
        let formData = new FormData();
		formData.append('email', postData.email);
		formData.append('user_name', postData.user_name);
		formData.append('first_name', postData.first_name);
		formData.append('about', postData.about);
        if(postImage !== '') {
            formData.append('profile', postImage);
        }
		axiosInstance.put(`user/myprofile/edit/`,formData
        ).then(function(res) {
            fetchUserData();
            setLoadingSubmit(false);
            history.push({
                pathname: '/admin/profile/',
            });
        });
	};

    return(
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-10">
            <div className="col-span-4 space-y-2">
                <h1 className="font-oswald font-bold text-lg">Profile</h1>
                <h1 className="font-mont font-bold opacity-60 text-md">Edit Profile</h1>
                <form className="pt-4 space-y-4">
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Email</label>
                        <input disabled value={postData.email} onChange={handleChange} name="email" type="text" placeholder="post email" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Username</label>
                        <input disabled value={postData.user_name} onChange={handleChange} name="user_name" type="text" placeholder="post username" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Firstname</label>
                        <input value={postData.first_name} onChange={handleChange} name="first_name" type="text" placeholder="post firstname" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">Change Avatar</label>
                        <br />
                        <input
							id="post-image"
                            onChange={handleImage}
							name="image"
							type="file"
						/>
                    </div>
                    <div className="space-y-2">
                        <label className="font-mont font-bold text-md">About</label>
                        <textarea style={{'height': '10rem'}} value={postData.about} onChange={handleChange} name="about" type="text" placeholder="post about" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></textarea >
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
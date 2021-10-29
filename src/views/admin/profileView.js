import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileView({ userData }) {
    return(
        <div className="space-y-4">
            <h1 className="font-oswald font-bold text-lg pb-4">My Profile</h1>
            <div className="space-y-2">
                <h1 className="font-mont opacity-60 font-bold text-md">Username</h1>
                <h1 className="font-mont font-bold text-sm">{userData.data.user_name}</h1>
            </div>
            <div className="space-y-2">
                <h1 className="font-mont opacity-60 font-bold text-md">Avatar</h1>
                <img alt="author" src={userData.data.profile} className="w-36 rounded-full" />
            </div>
            <div className="space-y-2">
                <h1 className="font-mont opacity-60 font-bold text-md">Firstname</h1>
                <h1 className="font-mont font-bold text-sm">{userData.data.first_name}</h1>
            </div>
            <div className="space-y-2">
                <h1 className="font-mont opacity-60 font-bold text-md">Email</h1>
                <h1 className="font-mont font-bold text-sm">{userData.data.email}</h1>
            </div>
            <div className="space-y-2">
                <h1 className="font-mont opacity-60 font-bold text-md">About</h1>
                <h1 className="font-mont text-sm w-98">{userData.data.about}</h1>
            </div>
            <br />
            <Link to='/admin/myprofile/edit' className="font-oswald font-bold bg-yellow lg:text-lg lg:py-3 lg:px-7">Edit</Link>
        </div>
    );
}
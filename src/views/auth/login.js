import React, { useState, useEffect } from 'react';
import Navbar from '../templates/navbar';
import axiosInstance from '../../axios';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth';


export default function LoginView() {
    const history = useHistory();
    const auth = useAuth();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [ error, setError ] = useState({});

    function FormOnChange(e) {
        setFormData( prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    function PostLoginForm(e) {
        e.preventDefault();
        axiosInstance
			.post(`token/`, {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {				
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('user_name', res.data.username);
                auth.signin(() => {
                    history.replace(from);
                }, localStorage.getItem('refresh_token'));
			})
            .catch( function(err) {
                let errors = {}
                console.log(err.response.data.detail);
                if(err.response.data.email !== undefined) {
                    errors['email'] = err.response.data.email[0];
                }
                if(err.response.data.password !== undefined) {
                    errors['password'] = err.response.data.password[0];
                }
                if(err.response.data.detail !== undefined) {
                    errors['detail'] = err.response.data.detail;
                }
                setError(errors);
            });
    }

    useEffect(() => {
        if (auth.user) {
            history.push('/');
        }
    });

    return(
        <div className="container mx-auto">
            <div className="w-full absolute z-10">
                <Navbar />
            </div>
            <div className="grid grid-cols-2">
                <div className="">
                    <img className="h-screen w-full object-cover" alt="auth" src="/static/images/auth_image.png" />
                </div>
                <div className="flex items-center">
                    <div className="m-auto space-y-16">
                        <div className="flex items-end space-x-4">
                            <h1 className="font-oswald font-bold text-5xl uppercase">Login</h1>
                            <p className="font-oswald text-lg">or</p>
                            <Link to="/register" className="font-oswald text-5xl uppercase" style={{
                                'textDecoration': 'underline',
                                'textDecorationColor': '#FCA311',                            
                            }}>Register</Link>
                        </div>
                        <form className="space-y-4 w-98">
                            <div className="space-y-2">
                                <label className="font-mont uppercase font-bold text-lg">Email</label>
                                <input name="email" onChange={FormOnChange} value={formData.email} type="text" placeholder="enter your username" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                                <br />
                                <span style={{ color: "red" }}>{error["email"]}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="font-mont uppercase font-bold text-lg">Password</label>
                                <input name="password" onChange={FormOnChange} value={formData.password} type="password" placeholder="enter your username" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                                <br />
                                <span style={{ color: "red" }}>{error["password"]}</span>
                            </div>
                            <span style={{ color: "red" }}>{error["detail"]}</span>
                            <br />
                            <button onClick={e => PostLoginForm(e)} className="font-oswald font-bold bg-yellow lg:text-2xl lg:py-4 lg:px-8">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../auth';

export default function SignOut() {
	const history = useHistory();
    const auth = useAuth();

	useEffect(() => {
		axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		}).then(function (res) {
			console.log(res);
		}).catch(function (err) {
			console.log(err);
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('user_id');
		localStorage.removeItem('user_name');
		auth.signout(() => history.push("/login/"));
	});
	return <div>Logout</div>;
}
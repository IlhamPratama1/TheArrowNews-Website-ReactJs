import axios from 'axios';

const baseURL = 'http://ilhampratama.pythonanywhere.com/api/';
let isRefreshing = false;
let failedQueue = [];

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 100000,
	headers: {
		Authorization: localStorage.getItem('access_token') ?
			'JWT ' + localStorage.getItem('access_token') :
			null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
}

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const refreshInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

function RefreshToken() {
	return refreshInstance.post("/token/refresh/", {
		refresh: localStorage.getItem('refresh_token'),
	});
}

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {

				if (isRefreshing) {
					return new Promise(function(resolve, reject) {
						failedQueue.push({resolve, reject})
					}).then(token => {
						originalRequest.headers['Authorization'] = 'JWT ' + token;
						return axios(originalRequest);
					}).catch(err => {
						return Promise.reject(err);
					})
				}

				isRefreshing = true;
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);

				if (tokenParts.exp > now) {
					try {
						const rs = await RefreshToken();
						localStorage.setItem('access_token', rs.data.access);
						localStorage.setItem('refresh_token', rs.data.refresh);
						axiosInstance.defaults.headers['Authorization'] ='JWT ' + rs.data.access;
						originalRequest.headers['Authorization'] = 'JWT ' + rs.data.access;
						processQueue(null, rs.data.access);

						return axiosInstance(originalRequest);
					} catch (_error) {
						processQueue(_error, null);
						if (_error.response && _error.response.data) {
							return Promise.reject(_error.response.data);
						}
					} finally {
						isRefreshing = false;
					}
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/login/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);


export default axiosInstance;
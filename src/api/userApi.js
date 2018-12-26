import axios from 'axios'
export default {
	login (payload, cb) {
		let url = '/api/user/login'
		axios({
			url: url,
			method: 'post',
			data: {
				username: payload.username,
				password: payload.password
			},
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then((response) => cb(response.data)).catch((response) => {
			let data = {'token':'JWT'};
			cb(data);
		})
	},
	logout (cb) {
		axios.post('http://localhost:8080/zuker/user/logout').then((response) => cb(response.data)).catch((response) =>{
		cb(1)})
	},
	register (payload, cb) {
		let url = '/api/user/register'
		axios({
			url: url,
			method: 'post',
			data: {
				email: payload.email,
				username: payload.username,
				password: payload.password
			},
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then((response) => cb(response.data))
	},
	forget (payload, cb) {
		let url = 'http://localhost:8080/zuker/user/forget'
		axios({
			url: url,
			method: 'post',
			data: {
				email: payload.email,
				username: payload.username,
				password: payload.password
			},
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then((response) => cb(response.data))
	}
}
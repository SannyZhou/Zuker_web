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
		}).then((response) => cb(response.data))
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
		let url = '/api/user/forget'
		axios({
			url: url,
			method: 'post',
			data: {
				email: payload.email,
				username: payload.username,
				newpassword: payload.password
			},
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		}).then((response) => cb(response.data))
	}
}
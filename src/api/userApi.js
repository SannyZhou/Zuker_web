import axios from 'axios'
export default {
	login (payload, cb) {
		let url = 'http://localhost:8080/zuker/user/login'
			axios({
				url: url,
				method: 'post',
				data: {
					loginuser: payload.loginuser,
					password: payload.password
				},
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			}).then((response) => cb(response.data))
	},
	logout (cb) {
		axios.post('http://localhost:8080/zuker/user/logout').then((response) => cb(response.data))
	}
}

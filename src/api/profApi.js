import axios from 'axios'
export default {
	getProfile(cb) {
		let url = 'http://localhost:8080/zuker/profile'
		axios.get(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	getProfileLists (cb) {
		let url = 'http://localhost3:8080/zuker/profile/lists'
		axios.get(url, {
				withCredentials: true
			}).then((response) => cb(response.data))
	},
	simulateLogin (cb, profId) {
		let url = 'http://localhost:8080/zuker/profile/login/' + profId
		axios.post(url, {
			withCredentials: true
		}).then((response) => cb(response.data))
	}
}

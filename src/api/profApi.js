import axios from 'axios'
import { platform } from 'os';
export default {
	getProfile(payload, cb) {
		// let url = 'http://localhost:8080/zuker/profile/getprofile'
		// axios.get(url, {
		// 	data: payload,
		// 	withCredentials: true
		// }).then((response) => cb(response.data))
	},
	updateinfo (payload, cb){
		let url = 'http://localhost:8080/zuker/profile/update/username'
		axios({
			url: url,
			method: 'post',
			data: {
				user_id: payload.user_id,
				username: payload.username,
				email: payload.email
			},
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	updatePassword (payload, cb){
		let url = 'http://localhost:8080/zuker/profile/update/password'
		axios({
			url: url,
			method: 'post',
			data: {
				user_id: payload.user_id,
				old_password: payload.oldpassword,
				new_password: payload.newpassword
			},
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	updateImage (payload, cb){
		let url = 'http://localhost:8080/zuker/profile/update/image'
		let formed = new FormData();
		formed.append('file', payload.img_f, payload.img_f.name)
		axios({
			url: url,
			method: 'post',
			data: formed,
			headers: {
				'Content-Type': 'multipart/form-data; charset=utf-8'
			},
			withCredentials: true
		}).then((response) => cb(response.data))
	},
	// add_img(event){  
	// 	let reader =new FileReader();
	// 	let img1=event.target.files[0];
	// 	let type=img1.type;//文件的类型，判断是否是图片
	// 	let size=img1.size;//文件的大小，判断图片的大小
	// 	if(this.imgData.accept.indexOf(type) == -1){
	// 		alert('请选择我们支持的图片格式！');
	// 		return false;
	// 	}
	// 	if(size>3145728){
	// 		alert('请选择3M以内的图片！');
	// 		return false;
	// 	}
	// 	var uri = ''
	// 	let form = new FormData(); 
	// 	form.append('file',img1,img1.name);
	// 	this.$http.post('/file/upload',form,{
	// 		headers:{'Content-Type':'multipart/form-data'}
	// 	}).then(response => {
	// 		console.log(response.data)
	// 		uri = response.data.url
	// 		reader.readAsDataURL(img1);
	// 		var that=this;
	// 		reader.onloadend=function(){
	// 			that.imgs.push(uri);
	// 		}
	// 	}).catch(error => {
	// 		alert('上传图片出错！');
	// 	})    
}

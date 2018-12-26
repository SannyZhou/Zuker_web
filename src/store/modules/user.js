import * as types from '../mutation-types'
import userApi from '../../api/userApi'
import router from '../../router'
import Axios from 'axios';

const state = {
	user_id: 0,
}

const getters = {
	user_id: state => state.user_id,
}

const actions = {
	setLoggedStatuswithCookie(){
		var d = new Date();
		d.setTime(d.getTime() + 60 * 60 * 1000);
		const expires = `expires=${d.toUTCString()}`;
		document.cookie = 'login=yes;' + expires + ';path=/'
	},
	removeLoggedStatusWithCookie(){
		var d = new Date();
		d.setTime(d.getTime() - 60 * 60 * 1000);
		const expires = `expires=${d.toUTCString()}`;
		document.cookie = 'login=no;' + expires + ';path=/'
	},
	isToLogin({dispatch}, payload){
		dispatch('setLoggedStatuswithCookie');
		localStorage.setItem('JWT', payload.token);
	},
	isToLogout({dispatch, commit}){
		dispatch('removeLoggedStatusWithCookie');
		localStorage.removeItem('JWT');
		commit(types.LOG_OUT);
		delete Axios.defaults.headers.common['Authorization'];
	},
	login ({commit, dispatch}, payload) {
		userApi.login(payload, data => {
			if ('token' in data) {
				//dispatch('initProfile', {user_id:data.user_id});
				dispatch('isToLogin', {token:data.token});
				Axios.defaults.headers.common['Authorization'] = data.token;
				commit('isLogin', data.token);
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'success', 'content':'登录成功！'});
			} else {
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'error', 'content':'账号或密码错误，登录失败！'});
				localStorage.removeItem('JWT')
			}
		})
	},
	logout ({commit, dispatch}) {
		userApi.logout(data => {
			console.log('logout');
			if (data > 0) {
				commit('resetProfile')
				dispatch('isToLogout')
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'success', 'content':'退出成功！'})
			} else {
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'error', 'content':'退出失败！'})
			}
		})
	},
	register({commit, dispatch}, payload){
		userApi.register(payload, data => {
			if (data > 0){
				dispatch('initProfile')
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'success', 'content':'注册成功！'})
			} else{
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'warning', 'content':'账号已被注册！'})
			}
		})
	},
	forget({commit, dispatch}, payload){
		userApi.forget(payload, data => {
			if (data > 0){
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'success', 'content':'密码找回成功！'})
			} else{
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'warning', 'content':'信息匹配错误！'})
			}
		})
	}
}

const mutations = {
	
}

export default {
	state,
	getters,
	actions,
	mutations
}

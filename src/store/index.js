import Vue from 'vue'
import Vuex from 'vuex'

import userprofile from './modules/userprofile'
import user from './modules/user'
import other from './modules/other'

import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLogin: false,
		token: localStorage.getItem('JWT') || '',
		msgtype :"success",
		msgcontent:"",
		msgcount:0
	},
	getters: {
		isLogin: state => !!state.token,
		token: state => localStorage.getItem('JWT') || '',
		msgcount: state => state.msgcount,
		msgtype: state => state.msgtype,
		msgcontent: state => state.msgcontent,
	},
	mutations: {
		[types.LOG_OUT] (state, data){
			state.token = '';
			state.user_id = 0;
			state.isLogin = false;
		},
		[types.LOG_CHECK] (state, data){
			document.cookie
			state.token = localStorage.getItem('JWT') || '';
			state.isLogin = !!state.token;
		},
		isLogin(state, t){
			state.token = localStorage.getItem('JWT') || '';
			//state.user_id = u;
			state.isLogin = !!state.token;
		},
		isLogout(state){
			state.token = '';
			state.user_id = 0;
			state.isLogin = false;
		},
		[types.SHOW_TOP_POPUP] (state, payload) {
			state.msgtype = payload.msgtype;
			state.msgcontent = payload.content;
			state.msgcount = state.msgcount + 1;
			console.log("msg type:", state.msgtype)
			console.log("show msg:", state.msgcontent)
		}
	},
	modules: {
		userprofile,
		user,
		other,
	}
})

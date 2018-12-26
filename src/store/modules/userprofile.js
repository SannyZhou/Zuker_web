import * as types from '../mutation-types'
import profApi from '../../api/profApi'
import router from '../../router'

const state = {
	
}

const getters = {
}

const actions = {
	initProfile({commit, dispatch}, payload) {
		profApi.getProfile(payload, data => {
			data = {username:'test', email:'test'}
			commit(types.INIT_PROFILE, {data})
		})
	},
	updateinfo ({commit, dispatch}, payload) {
		profApi.updateinfo(payload, data => {
			if (data > 0) {
				dispatch('initProfile')
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'success', 'content':'修改成功！'})
			} else {
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'error', 'content':'修改失败！'})
			}
		})
	},
	// updateEmail ({commit, dispatch}, payload) {
	// 	profApi.updateEmail(payload, data => {
	// 		if (data.profId > 0) {
	// 			dispatch('initProfile')
	// 			commit(types.SHOW_TOP_POPUP, {'msgtype': 'success', 'content':'修改成功！'})
	// 		} else {
	// 			commit(types.SHOW_TOP_POPUP, {'msgtype': 'error', 'content':'修改失败！'})
	// 		}
	// 	})
	// },
	updatePassword ({commit, dispatch}, payload) {
		profApi.updatePassword(payload, data => {
			if (data == 1) {
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'success', 'content':'修改成功！'});
			} else if (data == -1) {
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'error', 'content':'密码错误！'})
			} else {
				commit(types.SHOW_TOP_POPUP, {'msgtype': 'error', 'content':'修改失败！'})
			}
		})
	},
	// updateImage ({commit, dispatch}, payload) {
	// 	profApi.updateImage(payload, data => {
	// 		if (data.profId > 0) {
	// 			dispatch('initProfile')
	// 			commit(types.SHOW_TOP_POPUP, {'msgtype': 'success', 'content':'修改成功！'})
	// 		} else {
	// 			commit(types.SHOW_TOP_POPUP, {'msgtype': 'error', 'content':'修改失败！'})
	// 		}
	// 	})
	// },
}

const mutations = {
	
}

export default {
	state,
	getters,
	actions,
	mutations
}

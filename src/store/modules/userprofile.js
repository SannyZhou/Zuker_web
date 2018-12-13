import * as types from '../mutation-types'
import profApi from '../../api/profApi'
import router from '../../router'

const state = {
	profile: {
		type: Object
	},
}

const getters = {
	profile: state => state.profile,
}

const actions = {
	initProfile({commit, dispatch}, payload) {
		profApi.getProfile(payload, data => {
			commit(types.INIT_PROFILE, {data})
			if (data.profId === 0) {
				router.replace({
					path: '/login',
					query: {redirect: router.currentRoute.fullPath}
				})
			} else {
				router.replace({name: 'profile'})
			}
		})
	},
	updateinfo ({commit, dispatch}, payload) {
		profApi.updateUsername(payload, data => {
			if (data.profId > 0) {
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
				router.replace({
					path: '/login',
					query: {redirect: router.currentRoute.fullPath}
				})
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
	[types.INIT_PROFILE](state, {data}) {
		state.profile = data
	},
	resetProfile (state) {
		state.profile = {}
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}

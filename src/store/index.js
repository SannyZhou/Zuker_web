import Vue from 'vue'
import Vuex from 'vuex'

import userprofile from './modules/userprofile'
import user from './modules/user'
import other from './modules/other'

import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loadedAll: false,
		loading: false,
		refresh: false,
		publishing: false,
		inOrOut: [false, false, false, false]
	},
	getters: {
		loadedAll: state => state.loadedAll,
		loading: state => state.loading,
		refresh: state => state.refresh,
		publishing: state => state.publishing,
		inOrOut: state => state.inOrOut
	},
	mutations: {
		[types.UPDATE_LOADING] (state, data) {
			state.loading = data
		},
		[types.UPDATE_LOADED_ALL] (state, data) {
			state.loadedAll = data
		},
		[types.UPDATE_REFRESH] (state, data) {
			state.refresh = data
			state.loadedAll = false
		},
		[types.PUBLISHING](state, data) {
			state.publishing = data
		},
		updateLogInOrOut (state, index) {
			state.inOrOut[index] = false
		},
		resetLogInOrOut (state, payload) {
			state.inOrOut = [true, true, true, true]
		}
	},
	modules: {
		userprofile,
		user,
	}
})

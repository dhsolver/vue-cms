import axios from 'axios'
import Cookies from 'js-cookie'

export const state = {
    user: {},
    token: Cookies.get('token')
}

export const getters = {
    user: state => state.user,
    token: state => state.token,
    check: state => state.user.id !== undefined
}

export const mutations = {
    saveToken(state, { token, remember }) {
        state.token = token
        Cookies.set('token', token, { expires: remember ? 365 : null })
    },

    fetchUserSuccess(state, { user }) {
        state.user = user
    },

    fetchUserFailure(state) {
        state.user = {}
        state.token = null
        Cookies.remove('token')
    },

    logout(state) {
        state.user = {}
        state.token = null

        Cookies.remove('token')
    },
}

export const actions = {
    saveToken ({ commit, dispatch }, payload) {
        commit('saveToken', payload)
    },

    async fetchUser ({ commit }) {
        try {
            // console.log(Vue.urls);;
            const { data } = await axios.get('http://junket-api.test/auth/session')

            commit('fetchUserSuccess', { user: data })
        } catch (e) {
            commit('fetchUserFailure')
        }
    },
}

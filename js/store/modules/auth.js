import axios from 'axios'
import Cookies from 'js-cookie'

export const state = {
    user: {},
    token: Cookies.get('token')
}

export const getters = {
    user: state => state.user,
    token: state => state.token,
    check: state => state.user.id !== undefined,
    isAdmin: state => state.user && (state.user.role == 'admin' || state.user.role == 'superadmin'),
    id: state => state.user.id,
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
    async fetchUser ({ commit, rootState }) {
        try {
            const { data } = await axios.get(rootState.config.urls.auth + 'session')
            commit('fetchUserSuccess', { user: data })
        } catch (e) {
            commit('fetchUserFailure')
        }
    },
}

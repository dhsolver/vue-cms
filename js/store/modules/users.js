import axios from 'axios';
import Vue from 'vue';

export const state = {
    list: [],
    current: {},
}

export const getters = {
    list: state => state.list,
    count: state => state.list.length,
    current: state => state.current,
}

export const mutations = {
    fetchUsersSuccess(state, { list }) {
        state.list = list
    },

    fetchUsersFailure(state, { list }) {
        state.list = []
    },

    pushToList(state, user) {
        state.list.push(user)
    },

    fetchUserSuccess(state, user) {
        Vue.set(state, 'current', user)
    },

    fetchUserFailure(state) {
        Vue.set(state, 'current', {})
    },
}

export const actions = {
    saveToken ({ commit, dispatch }, payload) {
        commit('saveToken', payload)
    },

    async fetchUsers ({ commit, rootState }) {
        try {
            const { data } = await axios.get(rootState.config.urls.admin + 'users')

            commit('fetchUsersSuccess', { list: data })
        } catch (e) {
            commit('fetchUsersFailure')
        }
    },

    async fetchUser ({ commit, rootState }, id) {
        try {
            commit('fetchUserSuccess', {})
            const { data } = await axios.get(rootState.config.urls.admin + `users/${id}`)
            commit('fetchUserSuccess', data)

        } catch (e) {
            console.log(e);
            commit('fetchUserFailure')
        }
    },
}

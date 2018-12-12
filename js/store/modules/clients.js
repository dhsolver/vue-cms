import axios from 'axios';
import Vue from 'vue';

export const state = {
    dropdown: [],
    list: [],
    current: {},
}

export const getters = {
    list: state => state.list,
    dropdown: state => state.dropdown,
    count: state => state.list.length,
    current: state => state.current,
}

export const mutations = {
    setDropdown(state, { list }) {
        state.dropdown = list
    },

    fetchClientsSuccess(state, { list }) {
        state.list = list
    },

    fetchClientsFailure(state, { list }) {
        state.list = []
    },

    pushToList(state, client) {
        state.list.push(client)
    },

    fetchClientSuccess(state, client) {
        Vue.set(state, 'current', client)
    },

    fetchClientFailure(state) {
        Vue.set(state, 'current', {})
    },
}

export const actions = {
    saveToken ({ commit, dispatch }, payload) {
        commit('saveToken', payload)
    },

    async fetchClients ({ commit, rootState }) {
        try {
            const { data } = await axios.get(rootState.config.urls.admin + 'clients')

            commit('fetchClientsSuccess', { list: data })
        } catch (e) {
            commit('fetchClientsFailure')
        }
    },

    async fetchClient ({ commit, rootState }, id) {
        try {
            commit('fetchClientSuccess', {})
            const { data } = await axios.get(rootState.config.urls.admin + `clients/${id}`)
            commit('fetchClientSuccess', data)

        } catch (e) {
            console.log(e);
            commit('fetchClientFailure')
        }
    },

    async fetchDropdown ({ commit, rootState }) {
        try {
            const { data } = await axios.get(rootState.config.urls.admin + 'clients?dropdown=1')

            commit('setDropdown', { list: data })
        } catch (e) {
            commit('setDropdown', { list: [] })
        }
    },
}

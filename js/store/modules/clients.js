import axios from 'axios';
import Vue from 'vue';
import { urls } from '../../config';

export const state = {
    list: [],
    current: {},
}

export const getters = {
    list: state => state.list,
    current: state => state.current,
}

export const mutations = {
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

    async fetchClients ({ commit }) {
        try {
            const { data } = await axios.get('http://junket-api.test/admin/clients')

            commit('fetchClientsSuccess', { list: data })
        } catch (e) {
            commit('fetchClientsFailure')
        }
    },

    async fetchClient ({ commit }, id) {
        try {
            commit('fetchClientSuccess', {})
            const { data } = await axios.get(urls.admin + `clients/${id}`)
            commit('fetchClientSuccess', data)

        } catch (e) {
            console.log(e);
            commit('fetchClientFailure')
        }
    },
}

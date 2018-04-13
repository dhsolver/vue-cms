import axios from 'axios'

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
}

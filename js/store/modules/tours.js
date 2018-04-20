import axios from 'axios';
import Vue from 'vue';
import { urls } from '../../config';

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
    fetchToursSuccess(state, { list }) {
        state.list = list
    },

    fetchToursFailure(state, { list }) {
        state.list = []
    },

    pushToList(state, tour) {
        state.list.push(tour)
    },

    fetchTourSuccess(state, tour) {
        Vue.set(state, 'current', tour)
    },

    fetchTourFailure(state) {
        Vue.set(state, 'current', {})
    },
}

export const actions = {
    saveToken ({ commit, dispatch }, payload) {
        commit('saveToken', payload)
    },

    async fetchTours ({ commit }) {
        try {
            const { data } = await axios.get(urls.admin + 'tours')

            commit('fetchToursSuccess', { list: data })
        } catch (e) {
            commit('fetchToursFailure')
        }
    },

    async fetchTour ({ commit }, id) {
        try {
            commit('fetchTourSuccess', {})
            const { data } = await axios.get(urls.admin + `tours/${id}`)
            commit('fetchTourSuccess', data)

        } catch (e) {
            console.log(e);
            commit('fetchTourFailure')
        }
    },
}

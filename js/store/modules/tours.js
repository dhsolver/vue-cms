import axios from 'axios';
import Vue from 'vue';

export const state = {
    list: [],
    current: { stops: [] },
    url: '',
}

export const getters = {
    list: state => state.list,
    count: state => state.list.length,
    current: state => state.current,
    saveUrl: state => `${state.url}tours/${state.current.id}`,
    createUrl: state => `${state.url}tours`,
    mediaUrl: state => `${state.url}media/upload`,
}

export const mutations = {
    setUrl(state, url) {
        Vue.set(state, 'url', url);
    },

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

    clearCurrentTour(state) {
        Vue.set(state, 'current', { stops: [] })
    },

    mediaUploadSuccess(state, {field, media}) {
        let tour = state.current;
        tour[`${field}_id`] = media.id;
        tour[field] = media;
        Vue.set(state, 'current', tour)
    },
}

export const actions = {
    saveToken ({ commit, dispatch }, payload) {
        commit('saveToken', payload)
    },

    async fetchTours ({ commit }) {
        try {
            const { data } = await axios.get(state.url + 'tours')

            commit('fetchToursSuccess', { list: data })
        } catch (e) {
            commit('fetchToursFailure')
        }
    },

    async fetchTour ({ commit }, id) {
        try {
            commit('fetchTourSuccess', { stops: [] })
            const { data } = await axios.get(state.url + `tours/${id}`)
            commit('fetchTourSuccess', data)

        } catch (e) {
            console.log(e);
            commit('clearCurrentTour')
        }
    },
}

import axios from 'axios';
import Vue from 'vue';

export const state = {
    tour: {},
    url: '',
}

export const getters = {
    tour: state => state.tour,
}

export const mutations = {
    setUrl(state, url) {
        Vue.set(state, 'url', url);
    },
    setTour(state, tour) {
        Vue.set(state, 'tour', tour)
    },
    clearTour(state) {
        Vue.set(state, 'tour', { stops: [], route: [], })
    },
}

export const actions = {
    async fetchTour ({ commit }, id) {
        try {
            commit('clearTour');
            const response = await axios.get(state.url + `tours/${id}`)
            
            if (response.status == 200) {
                commit('setTour', response.data)
            } 
            
        } catch (e) {
            commit('clearTour')
        }
    },
}

import Vue from 'vue';
import { resolve } from 'path';

export const state = {
    url: '',
    data: { },
}

export const getters = {
    // yyyyyyyyyy: state => (param) => { return state.list },
}

export const mutations = {
    updateProfile(state, data) {
        Vue.set(state, 'data', data);
    },

    setUrl(state, url) {
        Vue.set(state, 'url', url);
    },
}

export const actions = {
    fetch({ commit, dispatch }) {
        return new Promise( (resolve, reject) => {
            
            axios.get(state.url + 'profile')
                .then( ({ data }) => {
                    commit('updateProfile', data);
                    resolve();
                })
                .catch(e => {
                    commit('updateProfile', {});
                    resolve();
                })

        });
    },
}

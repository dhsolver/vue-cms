import Vue from 'vue';

export const state = {
    list: [],
}

export const getters = {
    list: state => state.list,
}

export const mutations = {
    stack(state, { message }) {
        Vue.set(state, list, [message, ...state.list]);
    },
}

import axios from 'axios';
import Vue from 'vue';

export const state = {
    something: {other: []},
}

export const getters = {
    getSomething: state => state.something,
}

export const mutations = {
    setSomething(state, data) {
        Vue.set(state, 'something', data);
    },
}

export const actions = {
}

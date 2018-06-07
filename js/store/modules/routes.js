import axios from 'axios';
import Vue from 'vue';

export const state = {
    current: [],
    mode: 'hide', // hide / show / edit
}

export const getters = {
    current: state => state.current,
    mode: state => state.mode,
}

export const mutations = {
    setMode(state, mode) {
        Vue.set(state, 'mode', mode);
    },

    setCurrent(state, routes) {
        Vue.set(state, 'current', routes);
    },

    clearCurrent(state) {
        Vue.set(state, 'current', []);
    },

    startEditing(state, initialPoint) {
        Vue.set(state, 'current', [initialPoint]);
        Vue.set(state, 'mode', 'edit');
    },

    add(state, coordinates) {
        Vue.set(state, 'current', [...state.current, coordinates]);
    },

    hide(state) {
        Vue.set(state, 'mode', 'hide');
        Vue.set(state, 'current', []);
    },
}

export const actions = {
}

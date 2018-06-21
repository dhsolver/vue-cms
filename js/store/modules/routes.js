import axios from 'axios';
import Vue from 'vue';

export const state = {
    old: [],
    current: [],
    mode: 'hide', // hide / show / edit
    id: null,
}

export const getters = {
    current: state => state.current,
    mode: state => state.mode,
    id: state => state.id,
}

export const mutations = {
    setId(state, id) {
        Vue.set(state, 'id', id);
    },

    setMode(state, mode) {
        Vue.set(state, 'mode', mode);
    },

    setCurrent(state, routes) {
        Vue.set(state, 'current', routes);
    },

    clearCurrent(state) {
        Vue.set(state, 'current', []);
        Vue.set(state, 'id', null);
        Vue.set(state, 'mode', 'hide');
    },

    startDrawing(state, initialPoint = null) {
        Vue.set(state, 'old', state.current);
        Vue.set(state, 'current', initialPoint ? [initialPoint] : []);
        Vue.set(state, 'mode', 'edit');
    },

    startEditing(state) {
        Vue.set(state, 'old', state.current);
        Vue.set(state, 'mode', 'edit');
    },

    stopEditing(state, {revert = true, hide = false}) {
        if (revert) {
            Vue.set(state, 'current', state.old);
        }
        Vue.set(state, 'mode', hide ? 'hide' : 'show');
    },

    add(state, coordinates) {
        console.log(coordinates);
        Vue.set(state, 'current', [...state.current, coordinates]);
    },

    hide(state) {
        Vue.set(state, 'mode', 'hide');
        Vue.set(state, 'current', []);
    },

    show(state, route) {
        Vue.set(state, 'mode', 'show');
        Vue.set(state, 'current', route);
    },
}

export const actions = {
}

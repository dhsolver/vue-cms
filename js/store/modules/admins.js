import axios from 'axios';
import Vue from 'vue';

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
    fetchAdminsSuccess(state, { list }) {
        state.list = list
    },

    fetchAdminsFailure(state) {
        Vue.set(state, 'list', []);
        Vue.set(state, 'current', {});
    },

    pushToList(state, admin) {
        state.list.push(admin)
    },

    fetchAdminSuccess(state, admin) {
        Vue.set(state, 'current', admin)
    },

    fetchAdminFailure(state) {
        Vue.set(state, 'current', {})
    },
}

export const actions = {
    saveToken ({ commit, dispatch }, payload) {
        commit('saveToken', payload)
    },

    async fetchAdmins ({ commit, rootState }) {
        try {
            const { data } = await axios.get(rootState.config.urls.admin + 'admins')
            console.log('wtf');
            let list = data instanceof Array ? data : [];
            commit('fetchAdminsSuccess', { list: data })
        } catch (e) {
            console.log('woof');
            
            commit('fetchAdminsFailure')
        }
    },

    async fetchAdmin ({ commit, rootState }, id) {
        try {
            commit('fetchAdminSuccess', {})
            const { data } = await axios.get(rootState.config.urls.admin + `admins/${id}`)
            commit('fetchAdminSuccess', data)

        } catch (e) {
            console.log(e);
            commit('fetchAdminFailure')
        }
    },
}

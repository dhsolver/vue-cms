import Vue from 'vue';

export const state = {
    setPointMode: false,
    clickedPoint: {},
}

export const getters = {
    setPointMode: state => state.setPointMode,
    clickedPoint: state => state.clickedPoint,
}

export const mutations = {
    setClickedPoint(state, pointObj) {
        Vue.set(state, 'clickedPoint', pointObj);
    },
}

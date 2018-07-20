import Vue from 'vue';

export const state = {
    setPointMode: false,
    clickedPoint: {},
    draggedMarker: {latLng: {}, stop: {}},
    cursor: undefined,
}

export const getters = {
    setPointMode: state => state.setPointMode,
    clickedPoint: state => state.clickedPoint,
    draggedMarker: state => state.draggedMarker,
}

export const mutations = {
    setClickedPoint(state, pointObj) {
        Vue.set(state, 'clickedPoint', pointObj);
    },

    setDraggedMarker(state, {latLng, stop}) {
        Vue.set(state, 'draggedMarker', {
            latLng,
            stop,
        })
    },

    setCursor(state, cursor) {
        Vue.set(state, 'cursor', cursor);
    }
}

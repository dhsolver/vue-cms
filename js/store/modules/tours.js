import axios from 'axios';
import Vue from 'vue';

export const state = {
    list: [],
    current: { stops: [], route: [], },
    url: '',

    currentStop: { routes: [], },
}

export const getters = {
    list: state => state.list,
    count: state => state.list.length,
    current: state => state.current,
    saveUrl: state => `${state.url}tours/${state.current.id}`,
    createUrl: state => `${state.url}tours`,
    mediaUrl: state => `${state.url}media/upload`,
    createStopUrl: state => `${state.url}tours/${state.current.id}/stops`,
    orderUrl: state => `${state.url}tours/${state.current.id}/stop-order`,
    saveStopUrl: state => `${state.url}tours/${state.current.id}/stops/${state.currentStop.id}`,
    currentStop: state => state.currentStop,
    currentStopRoutes: (state) => {
        return state.currentStop.routes.filter(obj => {
            return obj.stop_id == state.currentStop.id;
        });
    },
    getStopRoute: (state) => (next_id) => {
        let item = state.currentStop.routes.filter(obj => {
            return obj.next_stop_id == next_id;
        });

        console.log('route found');
        console.log(item);

        if (item) {
            return item;
        }
        
        return [];
    },
}

export const mutations = {
    setStopRoute(state, stopRoute) {
        let index = state.currentStop.routes.findIndex(obj => {
            return obj.next_stop_id == stopRoute.next_stop_id;
        });
        if (index > -1) {
            // update current
            console.log("updating route");
            state.currentStop.routes.splice(index, 1, stopRoute);
            return;
        }

        // add new
        console.log("adding new route");
        state.currentStop.routes.push(stopRoute);
    },

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

    setCurrent(state, tour) {
        Vue.set(state, 'current', tour)
    },

    clearCurrentTour(state) {
        Vue.set(state, 'current', { stops: [], route: [], })
    },

    mediaUploadSuccess(state, {field, media}) {
        let tour = state.current;
        tour[`${field}_id`] = media.id;
        tour[field] = media;
        Vue.set(state, 'current', tour)
    },

    pushStop(state, stop) {
        state.current.stops.push(stop)
    },

    setCurrentStop(state, stop) {
        state.currentStop = stop;
    },

    updateStop(state, stop) {
        let index = state.current.stops.findIndex(obj => obj.id == stop.id);
        if (index > -1) {
            state.current.stops.splice(index, 1, stop);
            Vue.set(state, 'currentStop', stop);
        }
    },

    removeStop(state, stopId) {
        let index = state.current.stops.findIndex(obj => obj.id == stopId);
        if (index > -1) {
            state.current.stops.splice(index, 1);
        }
    },

    setTourRoute(state, route) {
        Vue.set(state, 'current', {...state.current, route});
    },

    setEmptyStop(state, location = {}) {
        Vue.set(state, 'currentStop', {
            id: null,
            title: '',
            description: '',

            location: location,
            is_multiple_choice: false,
            question: '',
            question_answer: '',
            question_success: '',
            next_stop_id: '',
            choices: [],    
            video_url: '',

            intro_audio: "",
            intro_audio_id: "",
            background_audio: "",
            background_audio_id: "",
            play_radius: 0,
            main_image: '',
            main_image_id: '',
            image1: '',
            image1_id: '',
            image2: '',
            image2_id: '',
            image3: '',
            image3_id: '',

            routes: [],
        });
    },

    updateStopOrder(state, order) {
        let i = 0;

        order.forEach(id => {
            i++;
            
            let index = state.current.stops.findIndex(obj => obj.id == id);
            if (index > -1) {
                let stop = state.current.stops[index];
                state.current.stops.splice(index, 1, {...stop, order: i});
            }
            if (state.currentStop.id == id) {
                Vue.set(state, 'currentStop', {...state.currentStop, order: i});
            }
        });

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
            commit('clearCurrentTour');
            const response = await axios.get(state.url + `tours/${id}`)
            
            if (response.status == 200) {
                commit('setCurrent', response.data)
            } 
            
        } catch (e) {
            console.log(e);
            commit('clearCurrentTour')
        }
    },

    async deleteStop ({ commit }, id) {
        try {
            const response = await axios.delete(getters.saveUrl(state) + `/stops/${id}`)
            if (response.status == 200) {
                return true;
            } 
        } catch (e) {
            return e;
        }
    },
}

window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.moment = require('moment');

window.Vue = require('vue');
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import store from './store'
import router from './router';
import App from './components/App';

import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
fontawesome.library.add(solid, regular)

import './plugins'
import './components'

import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
Vue.component('fa', FontAwesomeIcon);

import draggable from 'vuedraggable';
Vue.component('draggable', draggable);

require('./mixins/filters');

import Form from './classes/Form';
window.Form = Form;

import MediaPaths from './mixins/MediaPaths';
Vue.mixin(MediaPaths);

import { mapState } from "vuex";

Vue.mixin({
    computed: {
        ...mapState({
            config: state => state.config,
        }),
    }
})

new Vue({
    router,
    store,
    ...App
})
require('./alerts');
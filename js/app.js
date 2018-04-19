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

Vue.filter('nl2br', value => {
    return value.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
});

import Form from './classes/Form';
window.Form = Form;

import { urls } from './config';

Vue.mixin({
    data: () => {
        return {
            get urls() {
                return urls;
            },
        }
    },
})

new Vue({
    router,
    store,
    ...App
})
require('./alerts');
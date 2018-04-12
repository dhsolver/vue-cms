window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import store from './store'
import router from './router';
import App from './components/App';

// import 'bootstrap/dist/css/bootstrap.css';

import './plugins'
import './components'

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.mixin({
    data: () => {
        return {
            get urls() {
                return {
                    auth: 'http://junket-api.test/auth/',
                    cms: 'http://junket-api.test/cms/',
                }
            },
        }
    },
})

new Vue({
    router,
    store,
    ...App
})

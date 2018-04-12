require('./bootstrap');
import Vue from 'vue';

import store from './store'
import router from './router';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.css';

import './plugins'
import './components'

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

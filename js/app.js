require('./bootstrap');
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import router from './router';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

<template>
    <div class="analytics-nav">
        <div class="topbar">
            <div class="back-btn" @click="back()">
                <fa :icon="['fas', 'arrow-left']" class="mr-2"></fa>BACK
            </div>
            <div class="nav-container">
                <fa :icon="['fas', 'chart-bar']" class="mr-2" />ANALYTICS
            </div>
        </div>
        <b-navbar-nav class="subnav">
            <b-nav-item class="subnav-item" :to="{ name: 'analytics.overview', params: {id: tourId} }" active-class="active">OVERVIEW</b-nav-item>
            <b-nav-item class="subnav-item" :to="{ name: 'analytics.details', params: {id: tourId} }" active-class="active">DETAILS</b-nav-item>
            <b-nav-item class="subnav-item" :to="{ name: 'analytics.devices', params: {id: tourId} }" active-class="active">DEVICES</b-nav-item>
            <div class="extra"></div>
        </b-navbar-nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: mapGetters({
        user: 'auth/user'
    }),

    props: ['tourId'],

    data: () => ({
    }),

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            window.location = "/";
            // this.$router.push({ name: 'login' });
        },

        back() {
            this.$router.push({ name: 'home' });
        },
    }
}
</script>

<template>
    <div class="shadow-lg rounded d-flex flex-row dash-main">

        <!-- STOP LIST -->
        <div class="bg-gray map-pin-bg rounded d-flex flex-wrap p-3 stop-list">
            <stop-box v-for="item in tour.stops" :stop="item" :key="item.id"></stop-box>
        </div>

        <!-- FORM --> 
        <div class="bg-white rounded right-side">
            <div class="d-flex">
                <b-btn variant="info" class="square f-1" @click="back()">
                    Dashboard
                </b-btn>
                <b-btn variant="info" class="square f-1">
                    Add Stop
                </b-btn>
            </div>

            <div class="feature-box">
                <div class="addlink">
                <a href="#">
                    <fa :icon="['fas', 'plus']" />
                    <br>Add Feature Image</a>
                </div>
            </div>

            <div class="circbox">
                <div class="addrescir">
                    <fa :icon="['fas', 'map-marker-alt']" size="4x" style="color: #79acd1"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware: 'auth',

    metaInfo() {
        return { title: 'Edit Tour' }
    },
    
    computed: mapGetters({
        user: 'auth/user',
        isAdmin: 'auth/isAdmin',
    }),

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            window.location = '/';
        },

        back() {
            this.$router.push({ name: 'home', params: { id: 1 } });
        }
    },

    data: () => ({
        filter: '',
        tour: {
            type: "tour",
            stops: [
                { id: 1, title: "test" },
                { id: 1, title: "test" },
                { id: 1, title: "test" },
                { id: 1, title: "test" },
            ]
        }
    }),
}
</script>

<style>
.stop-list {
    flex: 1; 
    overflow: auto;
    justify-content: space-between;
    min-width: 610px;
}
</style>
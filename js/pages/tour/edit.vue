<template>
    <div class="wrapper shadow-lg">
        <spinner v-model="loading"></spinner>

        <!-- FORM --> 
        <div v-show="! loading" class="bg-white right-side" style="overflow: auto">
            <div v-if="mode == 'tour'" class="d-flex">
                <b-btn variant="info" class="square f-1" @click="openDashboard()">
                    Dashboard
                </b-btn>
                <b-btn variant="info" class="square f-1" style="margin-left: 1px" @click="addStop()">
                    Add Stop
                </b-btn>
            </div>
            <div v-else>
                <b-btn variant="info" class="square w-100" @click="showTourForm()">
                    <fa :icon="['fas', 'chevron-left']" />&nbsp;&nbsp;Back
                </b-btn>
            </div>

            <transition :name="formTransition" mode="out-in">
                <stop-form v-if="mode == 'stop'" :stop="currentStop" ref="stopForm"></stop-form>
                <tour-form v-else ref="editForm"></tour-form>
            </transition>
        </div>

        <!-- STOP LIST -->
        <div v-show="! loading" class="left-side">
            <div class="bg-gray compass-bg p-4 h-100">
                <div v-if="tour.stops.length > 0">
                    <b-row v-for="i in Math.ceil(tour.stops.length / 4)" :key="i">
                        <b-col xl="3" class="box-col" v-for="item in tour.stops.slice((i - 1) * 4, i * 4)" :key="item.id">
                            <stop-box :stop="item" @click="editStop(item)" @delete="deleteStop(item)"></stop-box>
                        </b-col>
                    </b-row>
                </div>
                <div v-else class="no-results">No Stops</div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { urls } from '../../config';
import TourForm from './form';
import StopForm from './stop-form';

export default {
    middleware: 'auth',

    components: {
        'tour-form': TourForm,
        'stop-form': StopForm,
    },

    metaInfo() {
        return { title: 'Edit Tour' }
    },
    
    computed: {
        ...mapGetters({
            user: 'auth/user',
            isAdmin: 'auth/isAdmin',
            tour: 'tours/current',
        }),

        formTransition() {
            return this.mode == 'stop' ? 'slide' : 'slide-right';
        },
    },

    async mounted() {
        this.$store.commit('tours/setUrl', urls.cms);
        await this.$store.dispatch('tours/fetchTour', this.$route.params.id);
        this.loading = false;
    },

    data: () => ({
        loading: true,
        mode: 'tour',
        currentStop: {},
        busy: false,
    }),

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            window.location = '/';
        },

        openDashboard() {
            this.$router.push({ name: 'home', params: { id: 1 } });
        },

        showTourForm() {
            this.currentStop = {};
            this.mode = 'tour';    
        },

        editStop(stop) {
            this.currentStop = stop;
            this.mode = 'stop';
        },

        deleteStop(stop) {
            alert('delete');
        },

        addStop() {
            this.tour.stops.push( { id: this.tour.stops.length + 1, title: "Title of Stop" })
        },

    },
}
</script>

<style>
</style>
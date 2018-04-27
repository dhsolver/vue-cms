<template>
    <div class="wrapper shadow-lg">

        <!-- FORM --> 
        <div class="bg-white right-side" style="overflow: auto">
            <div v-if="editMode == 'tour'" class="d-flex">
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
                <stop-form v-if="editMode == 'stop'" :stop="currentStop"></stop-form>
                <tour-form v-else :tour="tour"></tour-form>
            </transition>
        </div>

        <!-- STOP LIST -->
        <div class="left-side">
            <div class="bg-gray compass-bg p-4 h-100">
                <b-row v-for="i in Math.ceil(tour.stops.length / 4)" :key="i">
                    <b-col xl="3" class="box-col" v-for="item in tour.stops.slice((i - 1) * 4, i * 4)" :key="item.id">
                        <stop-box :stop="item" @click="editStop(item)" @delete="deleteStop(item)"></stop-box>
                    </b-col>
                </b-row>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
        }),
        formTransition() {
            return this.editMode == 'stop' ? 'slide' : 'slide-right';
        }
    },

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
            this.editMode = 'tour';    
        },

        editStop(stop) {
            this.currentStop = stop;
            this.editMode = 'stop';
        },

        deleteStop(stop) {
            alert('delete');
        },

        addStop() {
            this.tour.stops.push( { id: this.tour.stops.length + 1, title: "Title of Stop" })
        },
    },

    data: () => ({
        tour: {
            type: "tour",
            stops: [
                { id: 1, title: "Title of Stop" },
                { id: 2, title: "Title of Stop" },
                { id: 3, title: "Title of Stop" },
                { id: 4, title: "Title of Stop" },
                { id: 5, title: "Title of Stop" },
            ]
        },
        editMode: 'tour',
        currentStop: {},
    }),
}
</script>

<style>
</style>
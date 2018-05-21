<template>
    <div class="wrapper shadow-lg">
        <spinner v-model="loading"></spinner>

        <!-- FORM --> 
        <div v-show="! loading" class="bg-white right-side" style="overflow: auto" ref="formContainer">
            <div v-if="mode == 'tour'" class="d-flex">
                <b-btn variant="info" class="square f-1" @click="openDashboard()">
                    Dashboard
                </b-btn>
                <b-btn variant="info" class="square f-1" style="margin-left: 1px" @click="stopModal()">
                    Add Stop
                </b-btn>
            </div>
            <div v-else>
                <b-btn variant="info" class="square w-100" @click="showTourForm()">
                    <fa :icon="['fas', 'chevron-left']" />&nbsp;&nbsp;Back
                </b-btn>
            </div>

            <transition :name="formTransition" mode="out-in">
                <stop-form v-if="mode == 'stop'" ref="stopForm" @addStop="stopModal()"></stop-form>
                <tour-form v-else ref="editForm"></tour-form>
            </transition>
        </div>

        <!-- STOP LIST -->
        <div v-show="! loading" class="left-side">
            <div class="bg-gray compass-bg p-4 h-100">
                <div v-if="tour.stops.length > 0">
                    <b-row v-for="i in tourRows" :key="i">
                        <b-col xl="3" class="box-col" v-for="item in tour.stops.slice((i - 1) * 4, i * 4)" :key="item.id">
                            <stop-box :stop="item" @click="editStop(item)" @deleted="deleteStop(item)"></stop-box>
                        </b-col>

                        <b-col v-if="i == tourRows" xl="3" class="box-col">
                            <div class="add-box bg-fit" @click="stopModal()">
                                <fa :icon="['fas', 'plus']" size="3x" />
                                <div class="title mt-3">ADD POINT</div>
                            </div>
                        </b-col>
                    </b-row>
                </div>
                <div v-else class="no-results">No Stops</div>
            </div>
        </div>

        <!-- ADD STOP MODAL -->
        <b-modal title="Add a Stop" v-model="showStopModal">
            <stop-form ref="stopModalForm"></stop-form>

            <div slot="modal-footer" class="w-100">
                <busy-button class="float-right" variant="primary" :busy="busy" @click="addStop">Create Stop</busy-button>
                <b-btn variant="secondary" @click="showStopModal = false">Cancel</b-btn>
            </div>
        </b-modal>
        <!-- /end ADD STOP MODAL -->

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
            currentStop: 'tours/currentStop',
        }),

        formTransition() {
            return this.mode == 'stop' ? 'slide' : 'slide-right';
        },

        tourRows() {
            return Math.ceil( (this.tour.stops.length + 1) / 4);
        }
    },

    async mounted() {
        this.$store.commit('tours/setUrl', urls.cms);
        await this.$store.dispatch('tours/fetchTour', this.$route.params.id);

        console.log(this.tour);;
        if (!this.tour.id) {
            // 404
            this.$router.push({ name: 'home' });
        }

        this.loading = false;
    },

    data: () => ({
        loading: true,
        mode: 'tour',
        busy: false,
        showStopModal: false,
    }),

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            window.location = '/';
        },

        openDashboard() {
            this.$router.push({ name: 'home' });
        },

        showTourForm() {
            this.$store.commit('tours/setCurrentStop', {});
            this.mode = 'tour';
            this.$refs.formContainer.scrollTop = 0;
        },

        editStop(stop) {
            this.$store.commit('tours/setCurrentStop', stop);
            this.mode = 'stop';
            this.$refs.formContainer.scrollTop = 0;
        },

        deleteStop(stop) {
            this.$store.commit('tours/removeStop', stop.id);            
            this.$store.commit('tours/setCurrentStop', {});
            this.mode = 'tour';
            this.$refs.formContainer.scrollTop = 0;
        },

        stopModal() {
            this.showTourForm(); // if stop form is open it breaks the modal

            this.$refs.stopModalForm.form.reset();
            this.showStopModal = true;
        },

        addStop() {
            this.busy = true;
            this.$refs.stopModalForm.submit()
                .then( ({ data }) => {
                    this.$store.commit('tours/pushStop', data.data);
                    this.busy = false;
                    this.showStopModal = false;
                    this.editStop(data.data);
                })
                .catch(e => {
                    console.log(e);
                    this.busy = false;
                });
        },
    },
}
</script>

<style>
</style>
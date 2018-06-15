<template>
    <div class="wrapper shadow-lg">
        <spinner v-model="loading"></spinner>

        <!-- FORM --> 
        <div v-show="! loading" class="bg-white right-side" style="overflow: auto" ref="formContainer">
            <div v-if="mode == 'tour'" class="d-flex">
                <b-btn variant="info" class="square f-1" @click="openDashboard()">
                    Dashboard
                </b-btn>
                <b-btn variant="info" class="square f-1" style="margin-left: 1px" @click="createStop()">
                    Add Stop
                </b-btn>
            </div>
            <div v-else>
                <b-btn variant="info" class="square w-100" @click="showTourForm()">
                    <fa :icon="['fas', 'chevron-left']" />&nbsp;&nbsp;Back
                </b-btn>
            </div>

            <transition :name="formTransition" mode="out-in">
                <stop-form v-if="mode == 'stop'" @addStop="createStop()" @deleted="deleteStop(currentStop)"></stop-form>
                <tour-form v-else></tour-form>
            </transition>
        </div>

        <!-- STOP LIST -->
        <div v-show="! loading" class="left-side bg-gray compass-bg ">

            <!-- LIST MODE -->
            <div v-if="stopMode == 'list'" class="p-4 h-100 flex flex-col">
                <div class="f-1">
                    <draggable :list="tour.stops" @change="stopOrderChanged" class="stop-list">
                        <stop-box v-for="item in tour.stops"
                            :key="item.id" 
                            :stop="item" 
                            @click="editStop(item)" 
                            @deleted="deleteStop(item)"
                            class="stop-list-child"
                        />

                        <div class="stop-list-child">
                            <div class="add-box bg-fit" @click="createStop()">
                                <fa :icon="['fas', 'plus']" size="3x" />
                                <div class="title mt-3">ADD STOP</div>
                            </div>
                        </div>
                    </draggable>
                </div>
                <div class="mt-4 mb-2" style="">
                    <b-btn variant="secondary" class="d-inline mr-3" @click="createStop()">
                        <fa :icon="['fas', 'map-marker-alt']" />&nbsp;Add Stop
                    </b-btn>
                    
                    <b-btn v-if="tour.type != 'indoor'" variant="secondary" class="d-inline" @click="stopMode = 'map'">
                        <fa :icon="['fas', 'list']" />&nbsp;Map Mode
                    </b-btn>
                </div>
            </div>

            <!-- MAP MODE -->
            <div v-else class="bg-gray h-100 p-relative">
                <div class="map-toolbar">
                    <b-btn v-if="!useMapForLocation" variant="secondary" class="d-inline" @click="createStopFromPoint()">
                        <fa :icon="['fas', 'map-marker-alt']" />&nbsp;Add Point
                    </b-btn>
                    <b-btn v-else variant="danger" class="d-inline" @click="useMapForLocation = false">
                        <fa :icon="['fas', 'times']" />&nbsp;Cancel
                    </b-btn>
                    
                    <b-btn variant="secondary" class="d-inline" @click="stopMode = 'list'">
                        <fa :icon="['fas', 'list']" />&nbsp;List Mode
                    </b-btn>
                    
                    <div v-if="tour.type == 'outdoor'" class="d-inline">
                        <b-btn v-if="routeMode != 'edit'" variant="secondary" class="d-inline" @click="editRoute()">
                            <fa :icon="['fas', 'pencil-alt']" />&nbsp;Draw Route
                        </b-btn>

                        <b-btn v-if="routeMode != 'edit'" variant="secondary" class="d-inline" @click="toggleRoute()">
                            <span v-if="routeMode == 'hide'"><fa :icon="['fas', 'eye']" />&nbsp; Show Route</span>
                            <span v-else><fa :icon="['fas', 'eye-slash']" />&nbsp;Hide Route</span>
                        </b-btn>

                        <b-btn v-if="routeMode == 'edit'" variant="success" class="d-inline" @click="saveRoute()">
                            <fa :icon="['fas', 'save']" />&nbsp;Save Route
                        </b-btn>

                        <b-btn v-if="routeMode == 'edit'" variant="danger" class="d-inline" @click="cancelRoute()">
                            <fa :icon="['fas', 'times']" />&nbsp;Cancel
                        </b-btn>
                    </div>
                </div>
                
                <tour-map @clickStop="editStop" @clickTour="showTourForm"></tour-map>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { urls } from '../../config';
import TourForm from './form';
import TourMap from './map';
import StopForm from './stop-form';

export default {
    middleware: 'auth',

    components: {
        'tour-form': TourForm,
        'stop-form': StopForm,
        'tour-map': TourMap,
    },

    metaInfo() {
        return { title: 'Edit Tour' }
    },
    
    data: () => ({
        stopOrders: [],
        loading: true,
        mode: 'tour', // tour / stop
        stopMode: 'map', // map / list
        busy: false,
        useMapForLocation: false,
    }),

    computed: {
        ...mapGetters({
            user: 'auth/user',
            isAdmin: 'auth/isAdmin',
            tour: 'tours/current',
            currentStop: 'tours/currentStop',
            routeMode: 'routes/mode',
            route: 'routes/current',
            clickedPoint: 'map/clickedPoint',
            orderUrl: "tours/orderUrl",
        }),

        formTransition() {
            return this.mode == 'stop' ? 'slide' : 'slide-right';
        },

        tourRows() {
            return Math.ceil( (this.tour.stops.length + 1) / 4);
        }
    },

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

        createStop(location = {}) {
            this.$store.commit('tours/setCurrentStop', {});
            this.$store.commit('tours/setEmptyStop', location);
            this.mode = 'stop';
            this.$refs.formContainer.scrollTop = 0;
        },

        createStopFromPoint() {
            this.useMapForLocation = true;
        },

        editRoute() {
            this.$store.commit('routes/startEditing');
        },

        saveRoute() {
            this.$store.commit('tours/setTourRoute', this.route);
            this.$store.commit('routes/stopEditing', {revert: false, hide: false} );
        },

        cancelRoute() {
            this.$store.commit('routes/stopEditing', {revert: true, hide: false} );
        },

        toggleRoute() {
            if (this.routeMode == 'show') {
                this.$store.commit('routes/hide');
            } else {
                this.$store.commit('routes/show', this.tour.route);
            }
        },

        stopOrderChanged(e) {
            console.log('stop order changed');

            let stopOrder = this.tour.stops.map(s => {
                return s.id;
            })
            
            axios.put(this.orderUrl, { order: stopOrder })
                .then(({ data }) => {
                    this.$store.commit("tours/updateStopOrder", data.data.order);
                })
                .catch(e => {
                    console.log("save order error:");
                    console.log(e);
                });

            console.log(stopOrder);
        },
    },

    async mounted() {
        this.$store.commit('tours/setUrl', urls.cms);
        await this.$store.dispatch('tours/fetchTour', this.$route.params.id);

        if (!this.tour.id) {
            // 404
            this.$router.push({ name: 'home' });
        }

        if (this.tour.type == 'indoor') {
            this.stopMode = 'list';
        }

        this.loading = false;
    },

    watch: {
        clickedPoint(newVal, oldVal) {
            if (this.useMapForLocation) {
                this.useMapForLocation = false;

                let location = {
                    latitude: newVal.latitude,
                    longitude: newVal.longitude,
                    address1: '',
                    address2: '',
                    city: '',
                    state: '',
                    zipcode: '',
                }

                this.createStop(location);    
            }
        },
    },
}
</script>

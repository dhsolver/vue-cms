<template>
    <div class="wrapper shadow-lg">
        <spinner v-model="loading" />

        <!-- FORM --> 
        <div v-show="! loading" class="bg-white right-side" style="overflow: auto" ref="formContainer">
            <div v-if="mode == 'tour'" class="d-flex">
                <b-btn variant="info" class="square f-1" @click="showDashboard()">
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
                <stop-form 
                    v-if="mode == 'stop'" 
                    @addStop="createStop()" 
                    @deleted="deleteStop(currentStop)"
                />
                <tour-form v-if="mode == 'tour' && tour.id" ref="tourForm" />
            </transition>
        </div>

        <!-- STOP LIST -->
        <div v-if="! loading" class="left-side bg-gray compass-bg">
            <transition name="fade" mode="out-in">
                <!-- LIST MODE -->
                <div v-if="stopViewMode == 'list'" class="p-2 h-100 flex flex-col" key="list">
                    <div class="f-1">
                        <draggable :list="tour.stops" @change="saveStopOrder" class="stop-list">
                            <stop-card v-for="item in tour.stops"
                                :key="item.id" 
                                :stop="item" 
                                @click="showStopForm(item.id)" 
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
                    <div class="map-toolbar">
                        <b-btn variant="secondary" class="d-inline" @click="createStop()">
                            <fa :icon="['fas', 'map-marker-alt']" />&nbsp;Add Stop
                        </b-btn>
                        
                        <b-btn v-if="tour.type != 'indoor'" variant="secondary" class="d-inline" @click="setStopViewMode('map')">
                            <fa :icon="['fas', 'list']" />&nbsp;Map Mode
                        </b-btn>
                    </div>
                </div>

                <!-- MAP MODE -->
                <div v-else class="bg-gray h-100 p-relative" key="map">
                    <div class="map-toolbar">
                        <b-btn v-if="!useMapForLocation" variant="secondary" class="d-inline" @click="createStopFromPoint()">
                            <fa :icon="['fas', 'map-marker-alt']" />&nbsp;Add Point
                        </b-btn>
                        <b-btn v-else variant="danger" class="d-inline" @click="useMapForLocation = false">
                            <fa :icon="['fas', 'times']" />&nbsp;Cancel
                        </b-btn>
                        
                        <b-btn variant="secondary" class="d-inline" @click="cancelRoute(); setStopViewMode('list')">
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
                    
                    <tour-map @clickStop="showStopForm" @clickTour="showTourForm()" />
                </div>
            </transition>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirm" yesButton="Discard Changes">
            Are you sure you want to navigate away from this form?  You currently have unsaved changes.
        </confirm-modal>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { urls } from '../config';
import Geocoding from '../mixins/Geocoding';
import TourForm from '../components/TourForm';
import TourMap from '../components/TourMap';
import StopForm from '../components/StopForm';

export default {
    metaInfo() {
        return { title: 'Edit Tour' }
    },
    
    middleware: 'auth',

    components: {
        'tour-form': TourForm,
        'stop-form': StopForm,
        'tour-map': TourMap,
    },

    mixins: [ Geocoding ],

    data: () => ({
        loading: true,
        useMapForLocation: false,
    }),

    computed: {
        ...mapState({
            stopViewMode: state => state.stops.viewMode,
            tourWasModified: state => state.tours.wasModified,
            originalRoutes: state => state.tours.originalRoutes,
            mode: state => state.tours.formViewMode,
        }),
        ...mapGetters({
            tour: 'tours/current',
            currentStop: 'tours/currentStop',
            routeMode: 'routes/mode',
            route: 'routes/current',
            clickedPoint: 'map/clickedPoint',
            stopFormHasChanges: 'tours/getStopChanges',
        }),

        formTransition() {
            return this.mode == 'stop' ? 'slide' : 'slide-right';
        },
    },

    methods: {
        showDashboard(confirmed = false) {
            if (! confirmed && this.mode == 'tour' && this.tourWasModified) {
                this.$refs.confirm.confirm(() => {
                    this.showDashboard(true);
                });
                return;
            }

            this.$router.push({ name: 'home' });
        },

        showTourForm(confirmed = false) {
            if (! confirmed && this.mode == 'stop' && this.stopFormHasChanges) {
                this.$refs.confirm.confirm(() => {
                    this.showTourForm(true);
                }, () => {
                    // stop editing route in case that was opened
                    this.cancelRoute();
                });
                return;
            }

            this.$store.commit('tours/setEmptyStop');
            this.$store.commit('tours/setFormViewMode', 'tour');
            this.$refs.formContainer.scrollTop = 0;
        },

        showStopForm(stop_id, confirmed = false) {
            if (! confirmed && this.mode == 'tour' && this.tourWasModified) {
                this.$refs.confirm.confirm(() => {
                    this.showStopForm(stop_id, true);
                });
                return;
            }

            if (! confirmed && this.mode == 'stop' && stop_id != this.currentStop && this.stopFormHasChanges) {
                this.$refs.confirm.confirm(() => {
                    this.showStopForm(stop_id, true);
                });
                return;
            }

            let stop = this.$store.getters['tours/getStopFromid'](stop_id)
            if (! stop) {
                // stop not found on current tour
                this.showDashboard();
                return;
            }

         
            // return routes object back to original
            this.$store.commit('tours/setTourRoute', this.originalRoutes);
            this.$store.commit('tours/setCurrentStop', stop);
            this.$store.commit('tours/setFormViewMode', 'stop');
            this.$refs.formContainer.scrollTop = 0;
        },

        deleteStop(stop) {
            this.$store.commit('tours/removeStop', stop.id);
            this.$store.commit('tours/setEmptyStop');
            this.$store.commit('tours/setFormViewMode', 'tour');
            this.$refs.formContainer.scrollTop = 0;
        },

        createStop(location = {}, confirmed = false) {
            if (! confirmed && this.mode == 'tour' && this.tourWasModified) {
                this.$refs.confirm.confirm(() => {
                    this.createStop(location, true);
                });
                return;
            }

            if (! confirmed && this.mode == 'stop' && this.stopFormHasChanges) {
                this.$refs.confirm.confirm(() => {
                    this.createStop(location, true);
                });
                return;
            }

            this.$store.commit('tours/setEmptyStop', location);
            this.$store.commit('tours/setFormViewMode', 'stop');
            this.$refs.formContainer.scrollTop = 0;
        },

        createStopFromPoint() {
            this.useMapForLocation = true;
        },

        editRoute() {
            if (this.mode == 'stop' && this.stopFormHasChanges) {
                console.log('yessssssss');
                this.$refs.confirm.confirm(() => {
                    this.showTourForm(true);
                    this.$store.commit('routes/startDrawing');
                });
                return;
            }

            this.showTourForm(true);
            this.$store.commit('routes/startDrawing');
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

        async saveStopOrder(e) {
            await this.$store.dispatch('tours/saveStopOrder');
        },

        setStopViewMode(mode) {
            this.$store.commit('stops/setViewMode', mode);
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
            this.setStopViewMode('list');
        }

        this.loading = false;
    },

    watch: {
        async clickedPoint(newVal, oldVal) {
            if (this.useMapForLocation) {
                this.useMapForLocation = false;

                let address = await this.reverseLookup(newVal.latitude, newVal.longitude)

                let location = {
                    ...address,
                    latitude: newVal.latitude,
                    longitude: newVal.longitude,
                }

                this.createStop(location);    
            }
        },
    },
}
</script>

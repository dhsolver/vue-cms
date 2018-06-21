<template>
    <div>
        <div class="icon-input answer-input d-flex mb-2">
            <span class="icon"><fa :icon="['fas', 'map-marker-alt']"/></span>

            <b-form-select :disabled="busy" @input="update()" v-model="next_stop_id">
                <option value="">-- Select Stop --</option>
                <option v-for="stop in otherStops" 
                    :key="stop.id" 
                    :value="stop.id"
                    v-text="stop.title"
                ></option>
            </b-form-select>
        </div>

        <b-row v-if="routeMode == 'edit'">
            <b-col xs="6">
                <b-button variant="success" @click="saveRoute(stop.id, next_stop_id)">SAVE ROUTE</b-button>
            </b-col>
            <b-col xs="6">
                <b-button variant="danger" class="ml-auto" @click="cancelRoute()">CANCEL</b-button>
            </b-col>
        </b-row>
        <b-row v-if="hasRoute && routeMode != 'edit'">
            <b-col xs="6">
                <b-button v-if="routeMode == 'hide'" variant="info" @click="toggleRoute()">SHOW ROUTE</b-button>
                <b-button v-if="routeMode == 'show'" variant="info" @click="toggleRoute()">HIDE ROUTE</b-button>
            </b-col>
            <b-col xs="6">
                <b-button variant="warning" class="ml-auto" @click="clearRoute()">CLEAR ROUTE</b-button>
            </b-col>
        </b-row>
        <b-row v-if="! hasRoute && routeMode != 'edit'">
            <b-col xs="6">
                <b-button variant="info" @click="createRoute()">SET ROUTE</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import EditsRoutes from '../mixins/EditsRoutes';

export default {
    name: 'NextStopDropdown',
    
    // mixins: [ EditsRoutes ],

    props: {
        busy: { type: Boolean, default: false },
        value: { default: '' },
    },

    computed: {
        ...mapGetters({
            tour: 'tours/current',
            stop: 'tours/currentStop',
            drawingRoute: 'routes/current',
            routeMode: 'routes/mode',
        }),
        
        /**
         * Returns all stops but the current one for the 
         * next stop dropdown.
         */
        otherStops() {
            return this.tour.stops.filter(item => item.id != this.stop.id);
        },

        route() {
            if (! this.next_stop_id) {
                return [];
            }

            return this.$store.getters['tours/getStopRoute'](this.next_stop_id) || [];
        },

        hasRoute() {
            return this.route && this.route.length > 0;
        },
    },

    data: () => ({
        next_stop_id: '',
    }),

    methods: {
        update() {
            this.$emit('input', this.next_stop_id);
        },
        createRoute() {
            this.$store.commit('routes/setCurrent', this.route);
            this.$store.commit('routes/startEditing');
        },
        clearRoute() {

        },
        toggleRoute() {
            if (this.routeMode == 'show') {
                this.$store.commit('routes/hide');
            } else {
                this.$store.commit('routes/show', this.route);
            }
        },
        saveRoute() {
            this.$store.commit('tours/setStopRoute', {
                next_stop_id: this.next_stop_id,
                route: this.drawingRoute,
            });
            this.$store.commit('routes/stopEditing', {revert: false, hide: false} );
        },
        cancelRoute() {

        },
    },

    watch: {
        value(newVal, oldVal) {
            this.next_stop_id = newVal;
        },
    },

    mounted() {
        this.next_stop_id = this.value;
    },
}
</script>
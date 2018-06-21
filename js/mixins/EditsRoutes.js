import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            routeMode: 'routes/mode',
            route: 'routes/current',
        }),
    },

    methods: {
        editRoute() {
            this.$store.commit('routes/startDrawing');
        },

        saveRoute(type = 'tour', stop_id = null, next_id = null) {
            if (type == 'tour') {
                this.$store.commit('tours/setTourRoute', this.route);
            }
            else if (type == 'stop') {
                this.$store.commit('tours/setStopRoute', {route: this.route, stop_id, next_id});
            }

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

        clearRoute() {

        },
    },
}
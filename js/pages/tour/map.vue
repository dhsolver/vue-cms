<template>
    <div class="map-container h-100">
        <div class="h-100" ref="map"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Geocoding from '../../mixins/Geocoding';

export default {
    mixins: [ Geocoding ],
    
    data: () => ({
        map: {},
        tourMarker: null,
    }),

    computed: {
        ...mapGetters({
            tour: 'tours/current',
        }),
    },

    methods: {
        initMap(element) {
            // center over the usa
            let tourCoors = null;
            let defaultPosition = { zoom: 4, center: {lat: 39.0, lng: -93.0} };

            // center over tour address
            if (this.isCompleteAddress(this.tour.location)) {
                tourCoors = {
                    lat: parseFloat(this.tour.location.latitude),
                    lng: parseFloat(this.tour.location.longitude),
                };

                defaultPosition = {
                    zoom: 12,
                    center: tourCoors,
                };
            }

            // create map
            this.map = new google.maps.Map(element, defaultPosition);

            // add tour point
            if (tourCoors) {
                this.tourMarker = new google.maps.Marker({
                    position: tourCoors,
                    map: this.map,
                    title: 'Junket Location',
                    label: 'A',
                    // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                });
            }
        },
    },

    mounted() {

        this.initMap(this.$refs.map);
    
    },

    watch: {
        tour(newVal, oldVal) {
            // reload map when tour is changed
            if (newVal.id != oldVal) {
                this.initMap(this.$refs.map);
            }
        },
    },
}
</script>

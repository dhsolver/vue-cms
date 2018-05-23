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
        stopMarkers: [],
    }),

    computed: {
        ...mapGetters({
            tour: 'tours/current',
        }),

        allMarkers() {
            if (this.tourMarker != null) {
                return [...this.stopMarkers, this.tourMarker];
            }
            return [...this.stopMarkers];
        },

        tourLocation() {
            if (this.isCompleteAddress(this.tour.location)) {
                return {
                    lat: parseFloat(this.tour.location.latitude),
                    lng: parseFloat(this.tour.location.longitude),
                };
            }

            return false;
        },
    },

    methods: {
        loadTourMarker() {
            if (this.tourLocation) {
                this.tourMarker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(this.tour.location.latitude),
                        lng: parseFloat(this.tour.location.longitude),
                    },
                    map: this.map,
                    title: 'Junket Location',
                    label: 'A',
                    // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                });

                this.tourMarker.addListener('click', () => {
                    this.$emit('clickTour');
                });
            }
        },

        loadStopMarkers() {
            this.stopMarkers = [];
            this.tour.stops.forEach(stop => {
                let m = new google.maps.Marker({
                    map: this.map,
                    title: stop.title,
                    label: String(stop.order),
                    position: { lat: parseFloat(stop.location.latitude), lng: parseFloat(stop.location.longitude) }
                    // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                });

                m.addListener('click', () => {
                    this.onClickMarker(m, stop);
                });

                this.stopMarkers.push(m);
            });
        },

        zoomToFitMarkers() {
            let markers = this.allMarkers;
            if (markers.length) {
                let bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < markers.length; i++) {
                    bounds.extend(markers[i].getPosition());
                }

                google.maps.event.addListenerOnce(this.map, 'idle', () => {
                    this.map.fitBounds(bounds);
                });
            }
        },

        initMap(element) {
            // center over the usa
            let defaultPosition = { zoom: 4, center: {lat: 39.0, lng: -93.0} };

            // center over tour
            if (this.tourLocation) {
                defaultPosition = { zoom: 12, center: this.tourLocation };
            }

            this.map = new google.maps.Map(element, defaultPosition);
            this.loadTourMarker();
            this.loadStopMarkers();
            this.zoomToFitMarkers();
        },

        onClickMarker(marker, stop) {
            console.log('clicked marker for stop: ' + stop.order);
            this.$emit('clickStop', stop);
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

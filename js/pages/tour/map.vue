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
            stop: 'tours/currentStop',
        }),

        allMarkers() {
            if (this.tourMarker != null) {
                return [...this.stopMarkers, this.tourMarker];
            }
            return [...this.stopMarkers];
        },

        tourLocation() {
            if (this.objHasCoordinates(this.tour.location)) {
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
            if (this.tourMarker) {
                this.tourMarker.setMap(null);
                this.tourMarker = null;
            }
            
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

        clearMarkers() {
            this.stopMarkers.forEach(item => {
                item.setMap(null);
            });
            this.stopMarkers.length = 0;
        },

        loadStopMarkers() {
            this.clearMarkers();
            this.tour.stops.forEach(item => {
                let m = null;

                if (item.id == this.stop.id && this.objHasCoordinates(this.stop.location)) {
                    // use current stop object to reflect live data
                    m = new google.maps.Marker({
                        map: this.map,
                        title: this.stop.title,
                        label: String(this.stop.order),
                        position: { lat: parseFloat(this.stop.location.latitude), lng: parseFloat(this.stop.location.longitude) }
                    });
                } else if (this.objHasCoordinates(item.location)) {
                    m = new google.maps.Marker({
                        map: this.map,
                        title: item.title,
                        label: String(item.order),
                        position: { lat: parseFloat(item.location.latitude), lng: parseFloat(item.location.longitude) }
                    });
                } else {
                    return;
                }

                m.addListener('click', () => {
                    this.onClickMarker(m, item);
                });

                this.stopMarkers.push(m);
            });
        },

        zoomToFitMarkers(initial = false) {
            let markers = this.allMarkers;
            if (markers.length) {
                let bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < markers.length; i++) {
                    bounds.extend(markers[i].getPosition());
                }

                if (initial) { 
                    google.maps.event.addListener(this.map, 'idle', () => {
                        this.map.fitBounds(bounds);
                        google.maps.event.clearListeners(this.map, 'idle');
                    });
                } else {
                    this.map.fitBounds(bounds);
                }
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
            google.maps.event.addListener(this.map, "click", this.onClickMap);

            this.loadTourMarker();
            this.loadStopMarkers();
            this.zoomToFitMarkers(true);
        },

        onClickMarker(marker, stop) {
            if (stop.id != this.stop.id) {
                this.$emit('clickStop', stop);
            }
        },

        onClickMap(event) {
            this.$store.commit('map/setClickedPoint', {
                latitude: event.latLng.lat(),
                longitude: event.latLng.lng(),
            });
        },
    },

    mounted() {
        this.initMap(this.$refs.map);
    },

    watch: {
        tour(newVal, oldVal) {
            console.log('tour changed');
            this.loadTourMarker();
            this.zoomToFitMarkers();
            // reload map when tour is changed
            if (newVal.id && newVal.id != oldVal.id) {
                this.initMap(this.$refs.map);
            }
        },

        stop(newVal, oldVal) {
            console.log('stop changed');
            this.loadStopMarkers();
            this.zoomToFitMarkers();
        },
    },
}
</script>

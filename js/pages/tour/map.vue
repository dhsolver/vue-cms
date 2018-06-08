<template>
    <div class="map-container h-100">
        <div class="h-100" ref="map"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Geocoding from '../../mixins/Geocoding';
var MarkerWithLabel = require('markerwithlabel')(google.maps);

export default {
    mixins: [ Geocoding ],
    
    data: () => ({
        map: {},
        tourMarker: null,
        stopMarkers: [],
        radiusCircles: [],
        routeLine: {},
    }),

    computed: {
        ...mapGetters({
            tour: 'tours/current',
            stop: 'tours/currentStop',
            routes: 'routes/current',
            routeMode: 'routes/mode',
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

        pinIcon() {
            if (! this.tour.pin_image_id) {
                return null;
            }

            return {
                url: this.tour.pin_image.path,
                size: new google.maps.Size(48, 48),
                scaledSize: new google.maps.Size(48, 48),
                // labelOrigin: new google.maps.Point(24, -5),
            }
        },
    },

    methods: {
        loadTourMarker() {
            if (this.tourMarker) {
                this.tourMarker.setMap(null);
                this.tourMarker = null;
            }
            
            if (this.tourLocation) {
                this.tourMarker = new MarkerWithLabel({
                    position: this.tourLocation,
                    map: this.map,
                    title: 'Junket Location',
                    // label: 'A',
                    icon: this.pinIcon,
                    labelAnchor: new google.maps.Point(13, 68),
                    labelClass: "pin_label", // the CSS class for the label
                    labelContent: 'T',
                    // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                });

                this.tourMarker.addListener('click', e => {
                    this.onClickTourMarker(e);
                });
            }
        },

        clearMarkers() {
            this.stopMarkers.forEach(item => {
                if (item) {
                    item.setMap(null);
                }
            });
            this.stopMarkers.length = 0;
        },

        clearRadiusCircles() {
            this.radiusCircles.forEach(item => {
                if (item) {
                    item.setMap(null);
                }
            });
            this.radiusCircles.length = 0;
        },

        loadStopMarkers() {
            this.clearRadiusCircles();
            this.clearMarkers();
            
            this.tour.stops.forEach(item => {
                let m = null;

                if (item.id == this.stop.id && this.objHasCoordinates(this.stop.location)) {
                    // draw from current stop object so it reflect the live form data
                    this.drawMarker(this.stop, true);
                } else if (this.objHasCoordinates(item.location)) {
                    // draw from object in stop list
                    this.drawMarker(item);
                } else {
                    console.log(item);
                    return;
                }
            });
        },

        drawMarker(stop, isCurrent = false) {
            let m = new MarkerWithLabel({
                map: this.map,
                title: stop.title,
                // label: String(stop.order),
                position: { lat: parseFloat(stop.location.latitude), lng: parseFloat(stop.location.longitude) },
                icon: this.pinIcon,
                labelAnchor: new google.maps.Point(13, 68),
                labelClass: isCurrent ? "pin_label_active" : "pin_label", // the CSS class for the label
                labelContent: String(stop.order),
            });

            var radiusCircle = new google.maps.Circle({
                map: this.map,
                radius: stop.play_radius ? parseFloat(stop.play_radius) : 0,  // in metres
                fillColor: '#0099ff',
                fillOpacity: 0.40,
                strokeWeight: 1,
            });
            radiusCircle.bindTo('center', m, 'position');
            this.radiusCircles.push(radiusCircle);

            m.addListener('click', () => {
                this.onClickMarker(m, stop);
            });

            this.stopMarkers.push(m);
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
            } else {
                console.log("no markers?");
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
            this.drawRoutes();
        },

        onClickTourMarker(event) {
            if (this.routeMode == 'edit') {
                this.$store.commit('routes/add', event.latLng);
                return;
            }
            this.$emit('clickTour');
        },

        onClickMarker(marker, stop) {
            if (this.routeMode == 'edit') {
                this.$store.commit('routes/add', {
                    lat: stop.location.latitude,
                    lng: stop.location.longitude,
                });
                return;
            }

            if (stop.id != this.stop.id) {
                this.$emit('clickStop', stop);
            }
        },

        onClickMap(event) {
            if (this.routeMode == 'edit') {
                this.$store.commit('routes/add', event.latLng);
                return;
            }

            this.$store.commit('map/setClickedPoint', {
                latitude: event.latLng.lat(),
                longitude: event.latLng.lng(),
            });
        },

        drawRoutes() {
            this.routeLine = new google.maps.Polyline({
                path: this.routes,
                geodesic: true,
                strokeColor: '#0099ff',
                strokeOpacity: 0.75,
                strokeWeight: 5,
            });
            this.routeLine.setMap(this.map);
        },
    },

    mounted() {
        this.initMap(this.$refs.map);
    },

    watch: {
        routes(newVal, oldVal) {
            this.routeLine.setPath(newVal);
            // var path = this.routeLine.getPath();
            // path.push(event.latLng);
        },

        tour(newVal, oldVal) {
            console.log('tour changed');
            this.loadTourMarker();
            this.loadStopMarkers();
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

<style>
.pin_label {
    background-color: #fff;
    border: 1px solid #9e9e9e;
    padding: 2px 4px;
    border-radius: 20px;
    color: #000;
    font-size: 13px;
    width: 25px;
    text-align: center;
}
.pin_label_active {
    background-color: #ff5050;
    border: 1px solid #9e9e9e;
    padding: 2px 4px;
    border-radius: 20px;
    color: #fff;
    font-size: 13px;
    width: 25px;
    text-align: center;
}
</style>
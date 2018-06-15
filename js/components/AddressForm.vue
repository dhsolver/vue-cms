<template>
    <div class="p-relative">
        <div v-if="overlay" class="overlay flex justify-center items-center">
            <p>Select a location on the map</p>
        </div>

        <google-address-search
            id="map"
            classname="form-control"
            placeholder="Search..."
            @placechanged="getAddressData"
            v-model="search"
            :country="['us']"
            ref="vga"
            :clearOnChange="true"
        />

        <b-container v-if="this.address.address1">
            <b-row>
                <b-col class="mt-3 mb-3">
                    <p>{{ address.address1 }}</p>
                    <p>{{ address.city }}, {{ address.state }} {{ address.zipcode }}</p>
                    <!-- <p class="gray">{{ address.latitude }} / {{ address.longitude }}</p> -->
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Geocoding from '../mixins/Geocoding';
export default {
    name: 'AddressForm',

    mixins: [ Geocoding ],

    props: {
        form: { type: Object, default: {} },
        value: { type: Object, default: {} },
        overlay: { type: Boolean, default: false },
    },

    data: () => ({
        address: {
            latitude: '',
            longitude: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipcode: '',
        },
        search: '',
    }),
    
    computed: {
        latitudeDisplay() {
            return this.address.latitude == '' ? 'Invalid Address' : this.address.latitude;
        },

        longitudeDisplay() {
            return this.address.longitude == '' ? 'Invalid Address' : this.address.longitude;
        },
    },

    methods: {
        getAddressData(addressData, placeResultData, id) {
            console.log('address changed');
            this.address = this.convertAddress(addressData);
            this.$emit('input', this.address);
        },

        geocode() {
            if (! this.isCompleteAddress(this.address)) {
                // address not fully filled out yet
                this.$emit('input', this.address);
                return;
            }

            this.geocodeLookup(this.address)
                .then(results => {
                    console.log(results);
                    if (results.length == 1) {
                        // all good
                        if (results[0].partial_match === true) {
                            this.setCoordinates('', '');
                            return;
                        }
                        this.setCoordinates(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    } else {
                        // multiple results - error for now
                        this.setCoordinates('', '');
                    }
                })
                .catch(e => {
                    if (e == 'ZERO_RESULTS') {
                        this.setCoordinates('', '');
                        return;
                    }
                    console.log('geocoding error: ');
                    console.log(e);
                });
        },

        setCoordinates(lat, lon) {
            console.log('wtf : ' + lat + ' / ' + lon);
            this.$emit('input', {
                ...this.address,
                latitude: lat,
                longitude: lon,
            });
        },
    },

    mounted() {
        this.address = this.value;
    },

    watch: {
        value(newVal, oldVal) {
            this.address = newVal;
        },
    }
}
</script>

<style scoped>
.overlay {
    position: absolute;
    background-color: #e20e24;
    width: 100%;
    height: 100%;
    z-index: 99;
    color: #fff;
    opacity: 0.6;
}
</style>
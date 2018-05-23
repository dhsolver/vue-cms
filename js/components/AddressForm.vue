<template>
    <div class="p-relative">
        <div v-if="overlay" class="overlay flex justify-center items-center">
            <p>Select a location on the map</p>
        </div>

        <b-form-group>
            <b-form-input id="address1"
                :disabled="form.busy"
                type="text"
                v-model="address.address1"
                required
                placeholder="Address"
                @change="geocode()"
            ></b-form-input>
            <input-help :form="form" field="address1" text=""></input-help>
        </b-form-group>
        
        <b-form-group>
            <b-form-input id="address2"
                :disabled="form.busy"
                type="text"
                @change="geocode()"
                v-model="address.address2"
                required
                placeholder="Address Line 2 (Optional)">
            </b-form-input>
            <input-help :form="form" field="address2" text=""></input-help>
        </b-form-group>
        
        <b-form-group>
            <b-form-input id="city"
                :disabled="form.busy"
                type="text"
                v-model="address.city"
                required
                @change="geocode()"
                placeholder="City">
            </b-form-input>
            <input-help :form="form" field="city" text=""></input-help>
        </b-form-group>

        <b-row class="mb-3">
            <b-col lg="8">
                <b-form-input id="state"
                    :disabled="form.busy"
                    type="text"
                    v-model="address.state"
                    required
                    @change="geocode()"
                    placeholder="State">
                </b-form-input>
            </b-col>
            <b-col lg="4">
                <b-form-input id="zipcode"
                    :disabled="form.busy"
                    type="text"
                    v-model="address.zipcode"
                    required
                    @change="geocode()"
                    placeholder="Zipcode">
                </b-form-input>
            </b-col>
            <input-help :form="form" field="zipcode" text=""></input-help>
            <input-help :form="form" field="state" text=""></input-help>
        </b-row>
        <!-- /end LOCATION & ADDRESS -->

        <!-- GPS -->
        <b-row class="mb-2 pl-2">
            <b-col lg="3" class="pt-2">
                <label for="latitude">Latitude</label>
            </b-col>
            <b-col lg="9">
                <b-form-input id="latitude"
                    :disabled="true"
                    type="text"
                    :value="latitudeDisplay"
                    placeholder="Latitude">
                </b-form-input>
                <input-help :form="form" field="latitude" text=""></input-help>
            </b-col>
        </b-row>
        <b-row class="mb-3 pl-2">
            <b-col lg="3" class="pt-2">
                <label for="longitude">Longitude</label>
            </b-col>
            <b-col lg="9">
                <b-form-input id="longitude"
                    :disabled="true"
                    type="text"
                    :value="longitudeDisplay"
                    placeholder="Longitude">
                </b-form-input>
                <input-help :form="form" field="longitude" text=""></input-help>
            </b-col>
        </b-row>
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
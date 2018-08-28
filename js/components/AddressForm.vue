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
                    <p v-if="address.country != 'US'">{{ address.country }}</p>
                    <!-- <p class="gray">{{ address.latitude }} / {{ address.longitude }}</p> -->
                </b-col>
            </b-row>
        </b-container>
        <div v-else class="p-2 gray text-center">
            No Address
        </div>
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
            country: '',
            state: '',
            zipcode: '',
        },
        search: '',
    }),
    
    methods: {
        getAddressData(addressData, placeResultData, id) {
            console.log('address changed');
            this.address = this.convertAddress(addressData);
            this.$emit('input', this.address);
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
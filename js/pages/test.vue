<template>
    <div class="pt-4 text-center" style="width: 500px; background-color: white">
        <google-address-search
            id="map"
            classname="form-control"
            placeholder="Start typing"
            @placechanged="getAddressData"
            :country="['us']"
        />
        <h3>Address:</h3>
        <p>{{ address.address1 }}</p>
        <p>{{ address.city }}, {{ address.state }} {{ address.zipcode }}</p>
        <p>{{ address.latitude }} / {{ address.longitude }}</p>
    </div>
</template>
<script>
export default {
    //https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBE11DyQrtHX_qwzpFCrFl0105E6SVVLnQ&address=elm%20street%20unit%2059%20kearny%20nj
    
    data: () => ({
        address: {
            latitude: '',
            longitude: '',
            address1: '',
            city: '',
            state: '',
            zipcode: '',
        },
    }),

    methods: {
        getAddressData(addressData, placeResultData, id) {
            console.log(addressData);
            console.log(placeResultData);
            console.log(id);

            this.address = this.convertAddress(addressData);
        },

        convertAddress(addr) {
            return {
                latitude: addr.latitude,
                longitude: addr.longitude,
                address1: addr.street_number ? `${addr.street_number} ${addr.route}` : addr.route,
                city: addr.locality,
                state: addr.administrative_area_level_1,
                zipcode: addr.postal_code,
            };
        },
    },
    
    computed: {
    },

    metaInfo () {
        return { title: "Test Page" }
    },
}
</script>

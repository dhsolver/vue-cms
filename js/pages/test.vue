<template>
    <div class="pt-4 text-center" style="width: 500px; background-color: white">
        <vue-google-autocomplete
            id="map"
            classname="form-control"
            placeholder="Start typing"
            @placechanged="getAddressData"
            :country="['us']"
        ></vue-google-autocomplete>
    </div>
</template>
<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
    components: {VueGoogleAutocomplete},

    //https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBE11DyQrtHX_qwzpFCrFl0105E6SVVLnQ&address=elm%20street%20unit%2059%20kearny%20nj
    
    data: () => ({

        
    }),

    methods: {
        getAddressData(addressData, placeResultData, id) {
            console.log(addressData);
            console.log(placeResultData);
            console.log(id);
        },
    },
    
    computed: {
    },

    metaInfo () {
        return { title: "Test Page" }
    },

}
</script>

export default {
    data: () => ({
        geocoder: new google.maps.Geocoder(),
    }),

    methods: {
        objHasCoordinates(obj) {
            return obj && obj.longitude && obj.latitude;
        },

        isCompleteAddress(obj) {
            return (obj && obj.address1 && obj.city && obj.state && obj.zipcode);
        },
        
        getAddressString(obj) {
            return `${obj.address1} ${obj.city} ${obj.state} ${obj.zipcode}`;
        },

        geocodeLookup(obj) {
            return new Promise((resolve, reject) => {
                let address = this.getAddressString(obj);
    
                this.geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == 'OK') {
                        resolve(results);
                    } else {
                        reject(status);
                    }
                });
            });
        },

        reverseLookup(lat, lng) {
            return new Promise((resolve, reject) => {
                var latlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
                this.geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == 'OK') {
                        resolve(results);
                    } else {
                        reject(status);
                    }
                });
            });
        },
    }
}
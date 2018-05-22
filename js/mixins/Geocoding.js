export default {
    data: () => ({
        geocoder: new google.maps.Geocoder(),
    }),

    methods: {
        isCompleteAddress(obj) {
            return (obj.address1 && obj.city && obj.state && obj.zipcode);
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
    }
}
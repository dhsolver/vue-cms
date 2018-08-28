export default {
    data: () => ({
        geocoder: new google.maps.Geocoder(),
    }),

    methods: {
        objHasCoordinates(obj) {
            return obj && obj.longitude && obj.latitude;
        },

        isCompleteAddress(obj) {
            return (obj && obj.address1 && obj.city && obj.state && obj.zipcode && obj.country);
        },
        
        getAddressString(obj) {
            return `${obj.address1} ${obj.city} ${obj.state} ${obj.zipcode} ${obj.country}`;
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
                    if (status == 'OK' && results.length > 0) {
                        resolve(this.buildAddressFromComponents(results[0].address_components));
                    } else {
                        resolve({
                            address1: '',
                            address2: '',
                            city: '',
                            state: '',
                            country: '',
                            zipcode: '',
                        });
                    }
                }.bind(this));
            });
        },

        /**
         * Converts Google address autocomplete data to a usable address object.
         * @param {object} addr Google address data object
         * @return {object} Formatted address object with coordinates 
         */
        convertAddress(addr) {
            return {
                latitude: addr.latitude,
                longitude: addr.longitude,
                address1: addr.street_number ? `${addr.street_number} ${addr.route}` : addr.route,
                city: addr.locality,
                state: addr.administrative_area_level_1,
                country: addr.country,
                zipcode: addr.postal_code,
            };
        },

        /**
         * Converts Google reverse lookup results to a usable address object.
         * @param {object} addr Google address_components result object
         * @return {object} Formatted address object with coordinates
         */
        buildAddressFromComponents(components) {
            let streetNo = this.getComponentType(components, 'street_number');
            let route = this.getComponentType(components, 'route');

            return {
                address1: streetNo ? `${streetNo} ${route}` : route,
                city: this.getComponentType(components, 'locality'),
                state: this.getComponentType(components, 'administrative_area_level_1'),
                country: this.getComponentType(components, 'country'),
                zipcode: this.getComponentType(components, 'postal_code'),
            };
        },

        getComponentType(components, type) {
            let result = null;

            components.forEach(item => {
                if (item.types.indexOf(type) > -1) {
                    result = item.short_name;
                }
            });

            return result;
        },
    }
}
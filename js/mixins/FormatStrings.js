export default {
    methods: {
        stringFormat(str) {
            return _.startCase(_.camelCase(str));
        },
        boolToYesNo(bool) {
            return bool ? 'Yes' : 'No';
        },
    }
}
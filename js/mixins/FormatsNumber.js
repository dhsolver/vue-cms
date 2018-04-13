export default {
    methods: {
        numberFormat(number) {
            return numeral(number).format('0,0.00');
        },
        percentageFormat(number) {
            return numeral(number).format('0.00%');
        },
        moneyFormat(number, sign='$') {
            return sign + this.numberFormat(number);
        }
    }
}
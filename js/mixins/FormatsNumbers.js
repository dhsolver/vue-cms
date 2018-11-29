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
        },
        minuteFormat(minutes) {
            let hours = (String) (Math.floor(minutes / 60));
            let min = (String) (minutes % 60);

            if (hours.length == 1) {
                hours = '0' + hours;
            }

            if (min.length == 1) {
                min = '0' + min;
            }

            return `${hours}:${min} min`;
        }
    }
}
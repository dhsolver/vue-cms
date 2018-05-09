import Vue from 'vue';

Vue.filter('capitalize', value => {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('nl2br', value => {
    return value.toString().replace(/(?:\r\n|\r|\n)/g, '<br />');
});

Vue.filter('minsec', s => {
    s = parseFloat(s);
    if (s == NaN) {
        s = parseFloat(0.0);
    }
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + Math.floor(s);
})

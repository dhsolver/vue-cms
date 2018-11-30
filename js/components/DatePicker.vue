<template>
    <div class="d-flex mb-3 align-items-baseline">
        <b-dropdown id="date-dropdown" :text="presetLabel(preset)" class="m-md-2" size="sm">
            <b-dropdown-item v-for="item in presets" 
                :key="item.key"
                @click="switchPreset(item)">
                    {{ presetLabel(item) }}
            </b-dropdown-item>
        </b-dropdown>

        <div class="mr-2">
            <fa :icon="['far', 'calendar-alt']" class="mr-2" size="lg" />
        </div>

        <v-date-picker
            class="date-input f-1"
            mode='range'
            ref="dp"
            :navVisibility="navVisibility"
            @input="switchPreset({key: 'custom', label: 'Custom Date Range'})"
            :max-date="maxDate"
            v-model='date'>
        </v-date-picker>
    </div>
</template>

<script>
import 'v-calendar/lib/v-calendar.min.css';
import FormatStrings from '../mixins/FormatStrings';

export default {
    name: 'DatePicker',
    
    mixins: [ FormatStrings ],

    props: {
        'value': {
            type: Object,
            default: () => {
                return {
                    start: moment().subtract(6, 'days').toDate(),
                    end: moment().toDate(),
                }
            }
        }
    },

    computed: {
        maxDate() {
            return moment().toDate();
        }
    },

    data() {
        return {
            preset: 'today',
            date: new Date(),
            navVisibility: 'focus',
            presets: [
                { key: 'today', start: moment().toDate(), end: moment().toDate() },
                { key: 'yesterday', start: moment().subtract(1, 'days').toDate(), end: moment().subtract(1, 'days').toDate() },
                { key: 'this_week', label: 'This Week (Sun - Today)', start: moment().day(0).toDate(), end: moment().toDate() },
                { key: 'last_week', label: 'Last Week (Sun - Sat)', start: moment().day(-7).toDate(), end: moment().day(-1).toDate() },
                { key: 'last_7', label: 'Last 7 Days', start: moment().subtract(6, 'days').toDate(), end: moment().toDate() },
                { key: 'last_14', label: 'Last 14 Days', start: moment().subtract(13, 'days').toDate(), end: moment().toDate() },
                { key: 'this_month', start: moment().startOf('month').toDate(), end: moment().toDate() },
                { key: 'last_month', start: moment().subtract(1, 'months').startOf('month').toDate(), end: moment().subtract(1, 'months').endOf('month').toDate() },
                { key: 'all_time', start: new Date(2018, 0, 1), end: moment().toDate() },
            ],
        }
    },

    methods: {
        presetLabel(preset) {
            if (preset.label) {
                return preset.label;
            }

            return this.stringFormat(preset.key);
        },

        switchPreset(preset) {
            this.preset = preset;
            if (preset.key == 'custom') {
                return;
            }

            this.date = {
                start: preset.start,
                end: preset.end,
            };
        },
    },

    mounted() {
        this.switchPreset({ key: 'this_week', label: 'This Week (Sun - Today)', start: moment().toDate(), end: moment().toDate() });
    },

    created() {
        this.date = this.value;
    },

    watch: {
        value(newVal, oldVal) {
            if (newVal != oldVal) {
                this.date = this.value;
            }
        },

        date() {
            this.$emit('input', this.date);
        },
    },
}
</script>

<style>
.date-input input:focus { outline: none }
.date-input input {
    cursor: pointer;
    min-width: 250px!important;
    border: 0px;
}
</style>
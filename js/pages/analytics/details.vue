<template>
    <div class="content">
        <date-picker v-model="dateRange" @input="fetch()"></date-picker>

        <div class="mt-4 mb-4">
            <b-button class="d-inline" size="sm" :class="{'grey-btn': mode != 'downloads'}" @click="mode = 'downloads'">Downloads</b-button>
            <b-button class="d-inline" size="sm" :class="{'grey-btn': mode != 'time_spent'}" @click="mode = 'time_spent'" >Total Time</b-button>
            <b-button class="d-inline" size="sm" :class="{'grey-btn': mode != 'actions'}" @click="mode = 'actions'" >Actions</b-button>
        </div>

        <spinner v-model="loading" class="mt-5" />

        <div v-if="! loading" class="chart-container" style="">
            <line-chart style="height: 50vh; min-height: 100px" :chart-data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script>
import FormatsNumbers from '../../mixins/FormatsNumbers';
import FormatStrings from '../../mixins/FormatStrings';
import { mapGetters } from 'vuex';

export default {
    middleware: ['auth'],

    layout: 'analytics',

    mixins: [ FormatsNumbers, FormatStrings ],
    
    metaInfo() {
        return { title: 'Analytics Details' }
    },
        
    data() {
        return {
            loading: true,
            dateRange: {},
            mode: 'downloads',
            items: [],
            profitColor: '#79acd1',
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false, 
            }
        };
    },
    
    computed: {
        ...mapGetters({
            user: 'auth/user',
            tour: 'analytics/tour',
        }),

        dataPoints() {
            return this.items.map(item => {
                switch (this.mode) {
                    case 'time_spent':
                        return item.time;
                    case 'actions':
                        return item.actions;
                    default:
                        return item.downloads;
                }
            });
        },

        labels() {
            return this.items.map(item => {
                return moment(item.yyyymmdd, 'YYYYMMDD').format('MM/DD/YY');
            });
        },

        chartData() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        label: this.stringFormat(this.mode),
                        borderColor: this.profitColor,
                        backgroundColor: this.profitColor,
                        data: this.dataPoints,
                    },
                ],
            };
        },
    },

    methods: {
        fetch() {
            this.loading = true;

            let start = moment(this.dateRange.start).format('MM/DD/YYYY');
            let end = moment(this.dateRange.end).format('MM/DD/YYYY');
            
            let url = `${this.config.urls.cms}analytics/${this.tour.id}/details/?start=${start}&end=${end}`;
            axios.get(url)
                .then( ({ data }) => {
                    if (data.data.length == 1) {
                        // if a single day is selected, display that data twice so 
                        // the line takes up the whole chart.
                        this.items = [data.data[0], data.data[0]];
                    } else {
                        this.items = data.data;
                    }
                    this.loading = false
                })
                .catch(error => this.loading = false);
        }
    },

    watch: {
        mode(to, from) {
            if (to === from) {
                return;
            }

            console.log('mode changed');
        },
    }
}
</script>
<style>
.grey-btn {
    color: #3e4759;
    background-color: #ebecee;
}
</style>
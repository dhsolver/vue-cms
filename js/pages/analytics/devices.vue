<template>
    <div class="content">
        <date-picker v-model="dateRange" @input="fetch()"></date-picker>

        <spinner v-model="loading" class="mt-5" />

        <div class="table-responsive mb-3" v-if="! loading">
            <b-table striped hover show-empty
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
            >
                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <b-row class="mb-1">
                            <b-col><b>
                                Smartphone D/L: {{ detailStat(row.item.details, 'phone', 'downloads') }} 
                                - 
                                Tablet D/L: {{ detailStat(row.item.details, 'tablet', 'downloads') }}
                            </b></b-col>
                        </b-row>
                    </b-card>
                </template>
            </b-table>
        </div>

        <div v-if="! loading" class="chart-container d-flex">
            <div class="f-1 text-center">
                <div class="donut-key apple">
                    <div class="header">
                        <fa :icon="[ 'fab', 'apple' ]" size="2x" class="mr-2"></fa> iOS
                    </div>
                    <div class="percent">{{ iosPercent }}%</div>
                    <div class="downloads">{{ numberCommasFormat(iosTotal) }}<br>Downloads</div>
                </div>
            </div>
            <donut-chart class="" :height="300" :width="300" :chart-data="chartData" :options="chartOptions" />
            <div class="f-1 text-center">
                <div class="donut-key android">
                    <div class="header">
                        <fa :icon="[ 'fab', 'android' ]" size="2x" class="mr-2"></fa> Android
                    </div>
                    <div class="percent">{{ androidPercent }}%</div>
                    <div class="downloads">{{ numberCommasFormat(androidTotal) }}<br>Downloads</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormatsNumbers from '../../mixins/FormatsNumbers';
import { mapGetters } from 'vuex';

export default {
    middleware: ['auth'],

    layout: 'analytics',

    mixins: [ FormatsNumbers ],
    
    metaInfo() {
        return { title: 'Analytics Devices' }
    },

    data() {
        return {
            labels: [
                'Android',
                'iOS',
            ],
            chartOptions: {
                responsive: false,
                maintainAspectRatio: false, 
            },
            chartColor1: '#3c4657',
            chartColor2: '#79acd1',

            stats: [],
            dateRange: {},
            loading: false,
            sortBy: 'os',
            sortDesc: true,
            fields: [
                {
                    key: 'os',
                    label: 'Operating System',
                    formatter: val => { return val == 'android' ? 'Android' : 'iOS (Apple' },
                },
                {
                    key: 'downloads',
                    formatter: (val) => this.numberCommasFormat(val),
                },
                {
                    key: 'visitors',
                    label: 'Unique Visitors',
                    formatter: (val) => this.numberCommasFormat(val),
                },
                {
                    key: 'actions',
                    formatter: (val) => this.numberCommasFormat(val),
                },
            ],
        }
    },
    
    computed: {
        chartData() {
            return {
                labels: this.labels,
                datasets: [
                    {
                        borderColor: [this.chartColor1, this.chartColor2],
                        backgroundColor: [this.chartColor1, this.chartColor2],
                        data: [this.androidTotal, this.iosTotal],
                        borderWidth: 5,
                        borderColor: '#fff',
                    },
                ],
            };
        },

        ...mapGetters({
            user: 'auth/user',
            tour: 'analytics/tour',
        }),

        items() {
            if (! this.stats) {
                return [];
            }

            return [
                { 
                    os: 'ios',
                    downloads: _.sumBy(this.stats.filter(obj => obj.os == 'ios'), stat => stat.downloads),
                    visitors: _.sumBy(this.stats.filter(obj => obj.os == 'ios'), stat => stat.visitors),
                    actions: _.sumBy(this.stats.filter(obj => obj.os == 'ios'), stat => stat.actions),
                    details: this.stats.filter(obj => obj.os == 'ios'),
                    _showDetails: true,
                },
                { 
                    os: 'android',
                    downloads: _.sumBy(this.stats.filter(obj => obj.os == 'android'), stat => stat.downloads),
                    visitors: _.sumBy(this.stats.filter(obj => obj.os == 'android'), stat => stat.visitors),
                    actions: _.sumBy(this.stats.filter(obj => obj.os == 'android'), stat => stat.actions),
                    details: this.stats.filter(obj => obj.os == 'android'),
                    _showDetails: true,
                }
            ];
        },

        androidTotal() {
            return _.sumBy(this.stats.filter(obj => obj.os == 'android'), stat => stat.downloads);
        },
        androidPercent() {
            return Math.round((this.androidTotal / (this.androidTotal + this.iosTotal)) * 100);
        },
        iosTotal() {
            return _.sumBy(this.stats.filter(obj => obj.os == 'ios'), stat => stat.downloads);
        },
        iosPercent() {
            return Math.round((this.iosTotal / (this.androidTotal + this.iosTotal)) * 100);
        },
    },

    methods: {
        detailStat(details, deviceType, stat) {
            let stats = details.filter(obj => obj.device_type == deviceType);

            if (stats.length < 1) {
                return 0;
            }

            return stats[0][stat];
        },

        fetch() {
            this.loading = true;

            let start = moment(this.dateRange.start).format('MM/DD/YYYY');
            let end = moment(this.dateRange.end).format('MM/DD/YYYY');
            
            let url = `${this.config.urls.cms}analytics/${this.tour.id}/devices/?start=${start}&end=${end}`;
            axios.get(url)
                .then( ({ data }) => {
                    this.stats = data;

                    this.loading = false
                })
                .catch(error => this.loading = false);
        }
    }
}
</script>

<style>
.donut-key {
    text-transform: uppercase;
    color: #3c4657;
    display: flex;
    flex-direction: column;
    margin: auto;
}
.donut-key .header {
    display: flex;
    align-items: center;
    font-weight: 800;
    font-size: 1.25em;
    padding-left: 5px;
}
.donut-key .percent { 
    font-size: 2.5rem;
    font-weight: 800;
    padding: 5px;
}
.donut-key .downloads {
    border-radius: 25px;
    color: #fff;
    padding: 5px;
    font-weight: 600;
}
.android {
    width: 150px;
    text-transform: uppercase;
    color: #3c4657;
}
.android .header { border-bottom: 3px solid #3c4657 }
.android .downloads { background-color: #3c4657 }
.apple {
    width: 150px;
    text-transform: uppercase;
    color: #79acd1;
}
.apple .header { border-bottom: 3px solid #79acd1 }
.apple .downloads { background-color: #79acd1 }
</style>
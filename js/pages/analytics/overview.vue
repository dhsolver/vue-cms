<template>
    <div class="content">
        <div class="table-responsive">
            <spinner v-model="loading" class="mt-5" />
            <b-table striped hover show-empty
                v-if="! loading" 
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
            >
            </b-table>
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
        return { title: 'Analytics Overview' }
    },

    data() {
        return {
            loading: true,
            sortBy: 'order',
            sortDesc: false,
            end_date: moment(new Date()).format('MM/DD/YYYY'),
            start_date: moment(new Date()).subtract(14, 'days').format('MM/DD/YYYY'),
            items: [],
            fields: [
                {
                    key: 'order',
                    label: 'Stop No.',
                    sortable: true,
                },
                {
                    key: 'title',
                    label: 'Stop Title',
                    sortable: true,
                },
                {
                    key: 'time',
                    label: 'Time Spent',
                    sortable: true,
                    formatter: (value) => { return this.minuteFormat(value) },
                },
                {
                    key: 'visits',
                    label: 'Visitors',
                    sortable: true,
                },
                {
                    key: 'actions',
                    sortable: true,
                },
            ],
        }
    },

    computed: mapGetters({
        user: 'auth/user',
        tour: 'analytics/tour',
    }),

    methods: {
        fetch() {
            let url = `${this.config.urls.cms}analytics/${this.tour.id}/overview/?start=${this.start_date}&end=${this.end_date}`;
            axios.get(url)
                .then( ({ data }) => {
                    this.items = data.stops;
                    // this.items = response.data.map(function (item) {
                    // })

                    this.loading = false
                })
                .catch(error => this.loading = false);
        }
    },

    mounted() {
        this.fetch();
    },
}
</script>

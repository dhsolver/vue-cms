<template>
    <b-card header="Clients"
        class="card-primary"
    >
        <spinner v-model="busy"></spinner>

        <!-- Customer Table -->
        <div v-if="!busy" class="table-responsive">
            <b-table
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
            >
                <template slot="created_at" slot-scope="{ item }">
                    {{ formatDateTimeFromUTC(item.created_at) }}
                </template>
                <template slot="actions" slot-scope="{ item }">
                    <router-link
                            class="btn btn-warning"
                            :to="`/customer/${item.id}`"
                    >
                        <i class="fa fa-pencil"></i>
                    </router-link>
                </template>
            </b-table>
        </div>

    </b-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import FormatsDates from "../../mixins/FormatsDates";

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    metaInfo() {
        return { title: 'Clients' }
    },
    
    mixins: [ FormatsDates ],

    computed: {
        ...mapGetters({
            items: 'clients/list'
        })
    },

    data: () => ({
        busy: true,
        fields: {
            id: { sortable: true },
            name: { sortable: true },
            email: { sortable: true },
            created_at: {
                sortable: true,
                label: 'Signup Date',
            },
            actions: {},
        },
        filter: null,
        sortBy: 'name',
        sortDesc: false,
    }),

    methods: {
    },

    async created () {
        await this.$store.dispatch('clients/fetchClients');
        this.busy = false;
    },

}
</script>

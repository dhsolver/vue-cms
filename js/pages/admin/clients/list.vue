<template>
    <b-card header="Clients"
        class="card-primary"
    >
        <b-row class="mb-3">
            <b-col md="6">
                <button class="btn btn-primary" @click.prevent="prepareAddModal">
                    <fa :icon="['fas', 'plus']" /> Add Client
                </button>
            </b-col>
            <b-col md="6">
                <b-form-input v-model="filter" placeholder="Search..." class="ml-auto" />
            </b-col>
        </b-row>
        <spinner v-model="busy"></spinner>

        <!-- Customer Table -->
        <div v-if="!busy" class="table-responsive">
            <b-table
                :items="items"
                :fields="fields"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
            >
                <template slot="created_at" slot-scope="{ item }">
                    {{ formatDateTimeFromUTC(item.created_at) }}
                </template>
                <template slot="actions" slot-scope="{ item }">
                    <router-link
                            class="btn btn-sm btn-primary"
                            :to="{ name: 'admin.client.show', params: { id: item.id } }"
                    >
                        <fa :icon="['far', 'edit']" />
                    </router-link>
                </template>
            </b-table>
        </div>

        <b-modal id="addClientModal" :title="addClientModalTitle" v-model="addClientModal">
            <client-form ref="clientForm" :client="currentClient" @success="addClientModal = false"></client-form>
            <div slot="modal-footer">
               <b-btn variant="default" @click="addClientModal = false">Close</b-btn>
               <b-btn variant="info" @click="addClient">Add</b-btn>
            </div>
        </b-modal>

    </b-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import FormatsDates from "../../../mixins/FormatsDates";
import ClientForm from './form';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    components: {
        'client-form': ClientForm,    
    },

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
        currentClient: {},
        addClientModal: false,
        addClientModalTitle: 'Add Client',
    }),

    methods: {
        prepareAddModal() {
            this.$refs.clientForm.reset(); 
            this.addClientModal = true
        },

        addClient() {
            this.$refs.clientForm.submit();
        }
    },

    async created () {
        await this.$store.dispatch('clients/fetchClients');
        this.busy = false;
    },

}
</script>

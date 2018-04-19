<template>
    <b-card header="Clients"
        class="card-primary"
    >
        <!-- Filters -->
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

        <spinner v-model="loading"></spinner>

        <!-- Client Table -->
        <b-row v-if="! loading">
            <b-col lg="12">
                <b-table
                    :items="items"
                    :fields="fields"
                    :filter="filter"
                     @filtered="onFiltered"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :current-page="currentPage"
                    :per-page="perPage"
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

                <!-- Pagination -->
                <b-row>
                    <b-col md="6" >
                        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
                    </b-col>
                    <b-col md="6" class="text-right">
                        Showing {{ perPage < totalRows ? perPage : totalRows }} of {{ totalRows }} results
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <!-- Add Modal -->
        <b-modal id="addClientModal" :title="addClientModalTitle" v-model="addClientModal">
            <client-form ref="clientForm" :client="currentClient"></client-form>
            <div slot="modal-footer">
               <b-btn variant="default" @click="addClientModal = false">Close</b-btn>
               <busy-button :busy="isAdding" variant="info" @click="addClient">Add Client</busy-button>
            </div>
        </b-modal>

    </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
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
            items: 'clients/list',
            itemCount: 'clients/count',
        })
    },

    data: () => ({
        loading: true,
        isAdding: false,
        addClientModal: false,
        addClientModalTitle: 'Add Client',
        totalRows: 0,

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
        perPage: 25,
        currentPage: 1,
    }),

    methods: {
        prepareAddModal() {
            this.$refs.clientForm.reset(); 
            this.addClientModal = true 
        },

        addClient() {
            this.isAdding = true;
            this.$refs.clientForm.submit()
                .then( ({ data }) => {
                    this.isAdding = false;
                    this.$store.commit('clients/pushToList', data.data);
                    this.addClientModal = false;
                })
                .catch(e => {
                    this.isAdding = false;
                });
        },

        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        }
    },

    async created() {
        await this.$store.dispatch('clients/fetchClients');
        this.totalRows = this.itemCount;
        this.loading = false;
    },

}
</script>

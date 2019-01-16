<template>
    <b-card header="Tours"
        header-bg-variant="secondary"
    >
        <!-- Filters -->
        <b-row class="mb-3">
            <b-col md="6">
                <button class="btn btn-secondary" @click.prevent="prepareAddModal">
                    <fa :icon="['fas', 'plus']" /> Add Tour
                </button>
            </b-col>
            <b-col md="2">
                <b-form-select
                    v-model="statusFilter"
                    class="mb-3">
                    <option value="">All Tours</option>
                    <option value="live">Live</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                </b-form-select>
            </b-col>
            <b-col md="4">
                <b-form-input v-model="searchFilter" placeholder="Search..." class="ml-auto" />
            </b-col>
        </b-row>

        <spinner v-model="loading"></spinner>

        <!-- Tour Table -->
        <b-row v-if="!loading && totalRows">
            <b-col lg="12">
                <b-table
                    :items="filteredItems"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :current-page="currentPage"
                    :per-page="perPage"
                    striped
                    hover
                >
                    <template slot="type" slot-scope="{ item }">
                        {{ item.type | capitalize }}
                    </template>
                    <template slot="pricing_type" slot-scope="{ item }">
                        {{ item.pricing_type | capitalize }}
                    </template>
                    <template slot="status" slot-scope="{ item }">
                        {{ item.status | capitalize }}
                    </template>
                    <template slot="creator.name" slot-scope="{ item }">
                        <router-link :to="{ name: 'admin.client.show', params: { id: item.creator.id } }">{{ item.creator.name }}</router-link>
                    </template>
                    <template slot="actions" slot-scope="{ item }">
                        <router-link
                                class="btn btn-sm btn-info"
                                :to="{ name: 'tour', params: { id: item.id } }"
                        >
                            <fa :icon="['far', 'edit']" />
                        </router-link>
                        <b-btn variant="secondary" size="sm" @click="transferTour(item)">
                            <fa :icon="['fas', 'user-edit']" />
                        </b-btn>
                    </template>
                </b-table>

                <!-- Pagination -->
                <b-row>
                    <b-col md="6" >
                        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" variant="secondary" />
                    </b-col>
                    <b-col md="6" class="text-right">
                        Showing {{ showing }} of {{ totalRows }} results
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row v-if="!loading && !totalRows">
            <b-col class="text-center text-muted my-4">
                <h4>No Results</h4>
            </b-col>
        </b-row>

        <!-- Add Modal -->
        <b-modal id="addTourModal" :title="addTourModalTitle" v-model="addTourModal">
            <tour-form ref="tourForm" :tour="currentTour" :clients="clients"></tour-form>
            <div slot="modal-footer">
               <b-btn variant="default" @click="addTourModal = false">Close</b-btn>
               <busy-button :busy="isAdding" variant="secondary" @click="addTour">Add Tour</busy-button>
            </div>
        </b-modal>

        <b-modal id="transferModal" title="Transfer Tour To Another Client" v-model="transferModal">
            <div class="mb-2"><b>Transfer "{{ tour.title }}"</b></div>

            <form>
                <b-form-group label="Transfer to Client:" label-for="user_id">    
                    <b-form-select 
                        v-model="transferForm.user_id" 
                        :disabled="isTransfering"
                        class="mb-3">
                        <option value="">-- Select a Client --</option>
                        <option v-for="item in clients" :value="item.id" :key="item.id">{{ item.name }}</option>
                    </b-form-select>
                    <input-help :form="transferForm" field="user_id" text=""></input-help>
                </b-form-group>
            </form>
            <div slot="modal-footer">
               <b-btn variant="default" @click="transferModal = false">Cancel</b-btn>
               <busy-button :busy="isTransfering" variant="secondary" @click="transferTour(tour, false)">Transfer Tour</busy-button>
            </div>
        </b-modal>

    </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import FormatsDates from "../../../mixins/FormatsDates";
import TourForm from './form';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    components: {
        'tour-form': TourForm,    
    },

    metaInfo() {
        return { title: 'Tours' }
    },
    
    mixins: [ FormatsDates ],

    computed: {
        ...mapGetters({
            items: 'tours/list',
            itemCount: 'tours/count',
            tour: 'tours/current',
            clients: 'clients/dropdown',
        }),

        showing() {
            let start = 1;
            if (this.currentPage > 1) {
                start += this.perPage * (this.currentPage - 1);
            }

            let end = this.currentPage * this.perPage;
            if (end > this.totalRows) {
                end = this.totalRows;
            }
            
            return `${start} - ${end}`;
        },

        filteredItems() {
            return this.items.filter((tour) => {
                return (
                    (! this.searchFilter || JSON.stringify(tour).toLowerCase().includes(this.searchFilter.toLowerCase()))
                    &&
                    (! this.statusFilter || tour.status == this.statusFilter)
                )
            })
        }
    },

    data() {
        return {
            loading: true,
            isAdding: false,
            addTourModal: false,
            addTourModalTitle: 'Add Tour',
            totalRows: 0,
            transferModal: false,
            isTransfering: false,
            transferForm: new Form({
                user_id: null,
            }),

            fields: {
                id: { sortable: true, label: 'ID' },
                title: { sortable: true },
                owner: { sortable: true, key: 'creator.name', label: 'Owner' },
                type: { sortable: true },
                pricing_type: { sortable: true, label: 'Pricing' },
                stops_count: { sortable: true, label: 'Stops' },
                length: { sortable: true, formatter: val => `${val} mi` },
                status: { sortable: true },
                published_at: {
                    key: 'published_at',
                    sortable: true, 
                    label: 'Published',
                    formatter: val => val ? this.formatDateTimeFromUTC(val) : 'N/A',
                },
                actions: {},
            },
            sortBy: 'title',
            sortDesc: false,
            currentTour: {},
            perPage: 25,
            currentPage: 1,
            statusFilter: '',
            searchFilter: '',
        };
    },

    methods: {
        async fetchTours() {
            this.loading = true;
            this.$store.commit('tours/setUrl', this.config.urls.admin);
            this.$store.commit('tours/clearCurrentTour');
            await this.$store.dispatch('tours/fetchTours');
            this.totalRows = this.itemCount;
            this.loading = false;
        },

        async transferTour(tour, modal = true) {
            if (modal) {
                this.$store.commit('tours/setCurrent', tour);
                this.transferForm.user_id = tour.user_id;
                this.transferModal = true;
                return;
            }

            this.isTransfering = true;

            this.transferForm.patch(this.config.urls.admin + `tours/${tour.id}/transfer`)
                .then( ({ data }) => {
                    this.fetchTours();
                    this.isTransfering = false;
                    this.transferModal = false;
                })
                .catch(e => {
                    this.isTransfering = false;
                    this.transferModal = false;
                });
        },

        prepareAddModal() {
            this.$refs.tourForm.reset(); 
            this.addTourModal = true 
        },

        addTour() {
            this.isAdding = true;
            this.$refs.tourForm.submit()
                .then( ({ data }) => {
                    this.isAdding = false;
                    this.$store.commit('tours/pushToList', data.data);
                    this.addTourModal = false;
                })
                .catch(e => {
                    this.isAdding = false;
                });
        },
    },

    watch: {
        filteredItems(val) {
            this.totalRows = val.length;
            this.currentPage = 1;
        },
    },

    async mounted() {
        await this.fetchTours();
        await this.$store.dispatch('clients/fetchDropdown');
    },
}
</script>

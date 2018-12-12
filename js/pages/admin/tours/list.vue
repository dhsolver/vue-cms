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
            <b-col md="6">
                <b-form-input v-model="filter" placeholder="Search..." class="ml-auto" />
            </b-col>
        </b-row>

        <spinner v-model="loading"></spinner>

        <!-- Tour Table -->
        <b-row v-if="!loading && totalRows">
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
                    striped
                    hover
                >
                    <template slot="type" slot-scope="{ item }">
                        {{ item.type | capitalize }}
                    </template>
                    <template slot="pricing_type" slot-scope="{ item }">
                        {{ item.pricing_type | capitalize }}
                    </template>
                    <template slot="created_at" slot-scope="{ item }">
                        {{ formatDateTimeFromUTC(item.created_at) }}
                    </template>
                    <template slot="actions" slot-scope="{ item }">
                        <b-btn variant="info" size="sm" @click="editTour(item.id)">
                            <fa :icon="['far', 'edit']" />
                        </b-btn>
                        <!-- <router-link
                                class="btn btn-sm btn-info"
                                :to="{ name: 'admin.tour.edit', params: { id: item.id } }"
                        >
                            <fa :icon="['far', 'edit']" />
                        </router-link> -->
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
            <tour-form ref="tourForm" :tour="currentTour"></tour-form>
            <div slot="modal-footer">
               <b-btn variant="default" @click="addTourModal = false">Close</b-btn>
               <busy-button :busy="isAdding" variant="secondary" @click="addTour">Add Tour</busy-button>
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
        }
    },

    data: () => ({
        loading: true,
        isAdding: false,
        addTourModal: false,
        addTourModalTitle: 'Add Tour',
        totalRows: 0,

        fields: {
            id: { sortable: true, label: 'ID' },
            title: { sortable: true },
            type: { sortable: true },
            pricing_type: { sortable: true, label: 'Pricing' },
            created_at: { sortable: true },
            updated_at: {
                sortable: true, 
                label: 'Last Update',
            },
            actions: {},
        },
        filter: null,
        sortBy: 'title',
        sortDesc: false,
        currentTour: {},
        perPage: 25,
        currentPage: 1,
    }),

    methods: {
        editTour(id) {
            window.location = `/#/tour/${id}`;
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

        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        }
    },

    watch: {
        filter(val) {
            if (val === '') {
                this.totalRows = this.itemCount;
            }
        },
    },

    async created() {
        this.$store.commit('tours/setUrl', this.config.urls.admin);
        console.log(this.config.urls.admin);
        this.$store.commit('tours/clearCurrentTour');
        await this.$store.dispatch('tours/fetchTours');
        this.totalRows = this.itemCount;
        this.loading = false;
    },

}
</script>

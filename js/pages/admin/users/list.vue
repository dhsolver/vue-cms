<template>
    <b-card header="Users"
        header-bg-variant="secondary"
    >
        <!-- Filters -->
        <b-row class="mb-3">
            <b-col md="6">
                <button class="btn btn-secondary" @click.prevent="prepareAddModal">
                    <fa :icon="['fas', 'plus']" /> Add User
                </button>
            </b-col>
            <b-col md="6">
                <b-form-input v-model="filter" placeholder="Search..." class="ml-auto" />
            </b-col>
        </b-row>

        <spinner v-model="loading"></spinner>

        <!-- User Table -->
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
                    <template slot="created_at" slot-scope="{ item }">
                        {{ formatDateTimeFromUTC(item.created_at) }}
                    </template>
                    <template slot="actions" slot-scope="{ item }">
                        <router-link
                                class="btn btn-sm btn-info"
                                :to="{ name: 'admin.user.show', params: { id: item.id } }"
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
        <b-modal id="addUserModal" :title="addUserModalTitle" v-model="addUserModal">
            <user-form ref="userForm" :user="currentUser"></user-form>
            <div slot="modal-footer">
               <b-btn variant="default" @click="addUserModal = false">Close</b-btn>
               <busy-button :busy="isAdding" variant="secondary" @click="addUser">Add User</busy-button>
            </div>
        </b-modal>

    </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import FormatsDates from "../../../mixins/FormatsDates";
import UserForm from './form';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    components: {
        'user-form': UserForm,    
    },

    metaInfo() {
        return { title: 'Users' }
    },
    
    mixins: [ FormatsDates ],

    computed: {
        ...mapGetters({
            items: 'users/list',
            itemCount: 'users/count',
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

    data() {
        return {
            loading: true,
            isAdding: false,
            addUserModal: false,
            addUserModalTitle: 'Add User',
            totalRows: 0,

            fields: {
                id: { sortable: true },
                name: { sortable: true },
                email: { sortable: true },
                zipcode: { sortable: true },
                created_at: {
                    sortable: true,
                    label: 'Joined',
                    formatter: val => this.formatDateTimeFromUTC(val),
                },
                actions: {},
            },
            filter: null,
            sortBy: 'name',
            sortDesc: false,
            currentUser: {},
            perPage: 25,
            currentPage: 1,
        };
    },

    methods: {
        prepareAddModal() {
            this.$refs.userForm.reset(); 
            this.addUserModal = true 
        },

        addUser() {
            this.isAdding = true;
            this.$refs.userForm.submit()
                .then( ({ data }) => {
                    this.isAdding = false;
                    this.$store.commit('users/pushToList', data.data);
                    this.addUserModal = false;
                })
                .catch(e => {
                    this.isAdding = false;
                });
        },

        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            console.log('filtered: ' + this.filter);
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
        await this.$store.dispatch('users/fetchUsers');
        this.totalRows = this.itemCount;
        this.loading = false;
    },

}
</script>

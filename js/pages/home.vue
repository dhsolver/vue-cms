<template>
    <div class="wrapper shadow-lg">
        <!-- DASHBOARD --> 
        <div class="p-50 bg-white d-flex flex-column right-side">

            <div class="f-1">
                <!-- LOGO -->            
                <div class="text-center mb-5">
                    <img src="images/junket-logo.png" alt="Junket" style="max-width: 100%" />
                </div>

                <!-- Search bar -->
                <div class="icon-input search-input mb-5 d-flex">
                    <span class="icon"><fa :icon="['fas', 'search']"/></span>
                    <input type="text" placeholder="Search Junkets" v-model="filter" />
                </div>

                <!-- Nav Buttons -->
                <div class="p-2">
                    <b-btn variant="primary" class="w-100" @click.prevent="addModal()">
                        <fa :icon="['fas', 'plus']" />&nbsp;Add a Junket
                    </b-btn>
                </div>
                <div class="p-2">
                    <b-btn variant="secondary" class="w-100">
                        <fa :icon="['fas', 'cog']" />&nbsp;My Account
                    </b-btn>
                </div>
            </div>

            <!-- Footer Icons -->
            <div class="mt-auto">
                <div class="d-flex flex-row">
                    <a href="#" @click.prevent="logout">
                        <fa :icon="['fas', 'sign-out-alt']" />&nbsp;LOGOUT
                    </a>
                    <a v-if="isAdmin" href="/#/admin" class="ml-auto">
                        <fa :icon="['fas', 'lock']" />&nbsp;ADMIN
                    </a>
                </div>
            </div>
        </div>
        
        <div class="left-side">
            <!-- JUNKET LIST -->
            <div class="bg-gray compass-bg p-3 h-100">
                <spinner v-model="loading"></spinner>
                <div v-if="! loading && filteredTours.length == 0" class="no-results">No Junkets</div>

                <b-row v-if="! loading" v-for="i in Math.ceil(tours.length / 3)" :key="i">
                    <b-col class="box-col" xl="4" v-for="item in filteredTours.slice((i - 1) * 3, i * 3)" :key="item.id">
                        <tour-box :tour="item"></tour-box>
                    </b-col>
                </b-row>
            </div>
        </div>

        <!-- ADD TOUR MODAL -->
        <b-modal title="Create a Junket" v-model="showAddModal">
            <tour-form mode="create" ref="addForm"></tour-form>

            <div slot="modal-footer" class="w-100">
                <busy-button class="float-right" variant="primary" :busy="busy" @click="add">Create Junket</busy-button>
                <b-btn variant="secondary" @click="showAddModal = false">Cancel</b-btn>
            </div>
        </b-modal>
        <!-- /end ADD TOUR MODAL -->

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { urls } from '../config';
import TourForm from './tour/form';

export default {
    middleware: 'auth',

    metaInfo() {
        return { title: 'Home' }
    },
    
    components: {
        'tour-form': TourForm,
    },

    async mounted() {
        this.$store.commit('tours/setUrl', urls.cms);
        this.$store.commit('tours/clearCurrentTour');
        await this.$store.dispatch('tours/fetchTours');
        this.loading = false;
    },

    data: () => ({
        loading: true,
        filter: '',
        showAddModal: false,
        busy: false,
    }),

    computed: {
        ...mapGetters({
            user: 'auth/user',
            isAdmin: 'auth/isAdmin',
            tours: 'tours/list',
        }),

        filteredTours() {
            if (this.filter == '') return this.tours;

            return this.tours.filter(x => 
                x.title.includes(this.filter) ||
                (x.zipcode && x.zipcode.includes(this.filter))
            );
        },
    },

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            window.location = '/';
        },

        add() {
            this.busy = true;
            this.$refs.addForm.submit()
                .then( ({ data }) => {
                    this.$router.push({ name: 'tour', params: { id: data.data.id } });
                    this.busy = false;
                })
                .catch(e => {
                    console.log(e);
                    this.busy = false;
                });
        },

        addModal() {
            this.$refs.addForm.form.reset();
            this.showAddModal = true;
        },
    },
}
</script>

<style>
.tour-list {
    flex: 1; 
    overflow: auto;
    justify-content: space-between;
    min-width: 610px;
    height: 100%;
}
</style>
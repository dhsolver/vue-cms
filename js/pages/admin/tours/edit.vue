<template>
    <b-card :header="title"
        header-bg-variant="secondary"
    >
        <spinner v-model="loading"></spinner>

        <div v-if="! loading">
            <tour-form ref="tourForm" :tour="tour"></tour-form>

            <busy-button variant="secondary" :busy="saving" @click="update">Save Tour</busy-button>
            <busy-button variant="danger" :busy="deleting" @click="destroy()" :disabled="saving">Delete Tour</busy-button>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmDelete">
            Are you sure you want to delete {{ tour.title }}?
        </confirm-modal>

    </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import TourForm from './form';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    components: { TourForm },

    data: () => ({
        loading: true,
        saving: false,
        deleting: false,
    }),

    computed: {
        ...mapGetters({
            tour: 'tours/current'
        }),

        title() {
            return "Edit Tour: " + this.tour.title;
        },
    },

    methods: {
        update() {
            this.saving = true;
            this.$refs.tourForm.submit()
                .then( ({data}) => {
                    this.$store.commit('tours/setCurrent', data.data);
                    this.saving = false;
                }).catch( e => {
                    this.saving = false;
                });
        },
        
        destroy() {
            this.$refs.confirmDelete.confirm(() => {
                this.deleting = true;
                let f = new Form({});
                console.log(this.$refs.tourForm.url);
                f.delete(this.$refs.tourForm.url)
                    .then( ({ data }) => {
                        this.deleting = false;
                        console.log('redirect back');
                        this.$router.push({ name: 'admin.tours' });
                    }).catch( e => {
                        this.deleting = false;
                    });
            });
        },
    },

    async mounted () {
        await this.$store.dispatch('tours/fetchTour', this.$route.params.id);
        this.loading = false;
    },
}
</script>

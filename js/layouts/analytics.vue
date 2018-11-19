<template>
    <main>
        <div class="root analytics">
            <div class="fill">
                <div class="wrapper shadow-lg">
                    <spinner v-if="! tour.id" v-model="loading"></spinner>
                    <div v-else>
                        <navbar :tour-id="tourId"></navbar>
                        <child :tour-id="tourId" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from './analytics/navbar';

export default {
    name: 'MainLayout',

    components: {
        navbar: Navbar,
    },

    computed: mapGetters({
        tour: 'analytics/tour',
    }),

    data: () => ({
        tourId: 0,
        loading: true,
    }),

    watch: {
        '$route' (to, from) {
            this.tourId = to.params.id;
        },
    },

    async mounted() {
        this.tourId = this.$route.params.id;

        this.$store.commit('analytics/setUrl', this.config.urls.cms);
        await this.$store.dispatch('analytics/fetchTour', this.tourId);

        // if (! this.tour.id) {
        //     // 404
        //     this.$router.push({ name: 'home' });
        // }

        this.loading = false;
    },
}
</script>

<style lang="scss" src="../../sass/app.scss"></style>
<template>
    <main>
        <div class="root analytics">
            <div class="fill">
                <div class="wrapper shadow-lg">
                    <navbar :tour-id="tourId"></navbar>
                    <child :tour-id="tourId" />
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

    data: () => ({
        tourId: 0,
    }),

    watch: {
        '$route' (to, from) {
            this.tourId = to.params.id;
        },
    },

    mounted() {
        this.tourId = this.$route.params.id;
    },
}
</script>

<style lang="scss" src="../../sass/app.scss"></style>
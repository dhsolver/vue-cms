<template>
    <transition name="fade">
        <b-card header="Tours"
            tag="dashboard"
            class="card-primary"
        >
            tour table
        </b-card>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    metaInfo() {
        return { title: 'Tours' }
    },
        
    computed: mapGetters({
    }),

    methods: {
    }
}
</script>

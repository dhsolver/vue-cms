<template>
    <transition name="fade">
        <b-card header="Users"
            tag="dashboard"
            class="card-primary"
        >
            user table
        </b-card>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    metaInfo() {
        return { title: 'Users' }
    },
        
    computed: mapGetters({
    }),

    methods: {
    }
}
</script>

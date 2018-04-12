<template>
    <transition name="fade">
        <b-card header="Clients"
            tag="dashboard"
            class="card-primary"
        >
            client table
        </b-card>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    metaInfo() {
        return { title: 'Clients' }
    },
        
    computed: mapGetters({
        user: 'auth/user'
    }),

    methods: {
    }
}
</script>

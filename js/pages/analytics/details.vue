<template>
    <div class="content">
        <!-- <spinner v-model="loading" /> -->
        Analytics Details
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        middleware: ['auth'],

        layout: 'analytics',

        metaInfo() {
            return { title: 'Analytics Details' }
        },
            
        data: () => ({
            loading: true,
        }),
        
        computed: mapGetters({
            user: 'auth/user'
        }),

        methods: {
        }
    }
</script>

<template>
    <div class="content">
        <!-- <spinner v-model="loading" /> -->
        Analytics Devices
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        middleware: ['auth'],

        layout: 'analytics',

        metaInfo() {
            return { title: 'Analytics Devices' }
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

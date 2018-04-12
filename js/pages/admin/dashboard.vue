<template>
    <transition name="fade">
        <b-card header="Admin Dashboard"
            tag="dashboard"
            class="card-primary"
        >
            <div>Hey {{ user.name }}</div>
        </b-card>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        middleware: ['auth', 'admin'],

        layout: 'admin',

        metaInfo() {
            return { title: 'Dashboard' }
        },
            
        computed: mapGetters({
            user: 'auth/user'
        }),

        methods: {
            async logout () {
                this.$store.commit('auth/logout');
                this.$router.push({ name: 'login' });
            }
        }
    }
</script>

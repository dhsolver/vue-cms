<template>
    <div class="main-layout">
        <navbar></navbar>
        <main class="container mt-4">
            <child/>
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '../components/admin/Navbar';

export default {
    name: 'MainLayout',

    computed: mapGetters({
        user: 'auth/user'
    }),

    components: {
        navbar: Navbar,
    },

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            this.$router.push({ name: 'login' });
        }
    }
}
</script>

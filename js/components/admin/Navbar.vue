<template>
    <b-navbar toggleable="md" type="dark" variant="primary">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <router-link :to="{ name: 'admin.dashboard' }" class="navbar-brand">Junket Admin</router-link>

    <b-collapse is-nav id="nav_collapse">

        <!-- Navbar left -->
        <b-navbar-nav>
            <b-nav-item :to="{ name: 'admin.clients' }" active-class="active">Clients</b-nav-item>
            <b-nav-item :to="{ name: 'admin.users' }">Users</b-nav-item>
            <b-nav-item :to="{ name: 'admin.tours' }">Tours</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
                <template slot="button-content">
                    {{ user.name }}
                </template>
                <b-dropdown-item :to="{ name: 'home' }">
                    Client Dashboard
                </b-dropdown-item>
                <b-dropdown-item href="#" @click.prevent="logout">
                    Logout
                </b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>

    </b-collapse>
    </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: mapGetters({
        user: 'auth/user'
    }),

    data: () => ({
    }),

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            this.$router.push({ name: 'login' });
        }
    }
}
</script>

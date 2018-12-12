<template>
    <div class="admin-layout">
        <navbar></navbar>
        <main class="container mt-4">
            <slot />
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '../components/admin/Navbar';

export default {
    name: 'MainLayout',

    components: {
        navbar: Navbar,
    },
}
</script>

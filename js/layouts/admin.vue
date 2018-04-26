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

    components: {
        navbar: Navbar,
    },
}
</script>

<style lang="scss" src="../../sass/admin.scss"></style>
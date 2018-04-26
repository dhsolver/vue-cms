<template>
    <div class="shadow-lg rounded d-flex flex-row dash-main">

        <!-- JUNKET LIST -->
        <div class="bg-gray compass-bg rounded d-flex flex-wrap p-3 tour-list">
            <tour-box v-for="item in tours" :tour="item" :key="item"></tour-box>
        </div>

        <!-- DASHBOARD --> 
        <div class="p-50 bg-white rounded d-flex flex-column right-side">

            <div class="f-1">
                <!-- LOGO -->            
                <div class="text-center mb-5">
                    <img src="images/junket-logo.png" alt="Junket" style="max-width: 100%" />
                </div>

                <!-- Search bar -->
                <div class="search-input mb-5 d-flex">
                    <span class="icon"><fa :icon="['fas', 'search']"/></span>
                    <input type="text" placeholder="Search Junkets" />
                </div>

                <!-- Nav Buttons -->
                <div class="p-2">
                    <b-btn variant="primary" class="w-100" @click.prevent="add">
                        <fa :icon="['fas', 'plus']" />&nbsp;Add a Junket
                    </b-btn>
                </div>
                <div class="p-2">
                    <b-btn variant="secondary" class="w-100">
                        <fa :icon="['fas', 'cog']" />&nbsp;My Account
                    </b-btn>
                </div>
            </div>

            <!-- Footer Icons -->
            <div class="mt-auto">
                <div class="d-flex flex-row">
                    <a href="#" @click.prevent="logout">
                        <fa :icon="['fas', 'sign-out-alt']" />&nbsp;LOGOUT
                    </a>
                    <a v-if="isAdmin" href="/#/admin" class="ml-auto">
                        <fa :icon="['fas', 'lock']" />&nbsp;ADMIN
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware: 'auth',

    metaInfo() {
        return { title: 'Home' }
    },
    
    computed: mapGetters({
        user: 'auth/user',
        isAdmin: 'auth/isAdmin',
    }),

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            window.location = '/';
        },

        add() {
            this.tours.push({type: "tour"});
        },
    },

    data: () => ({
        filter: '',
        tours: [
            { type: "tour" },
            { type: "tour" },
            { type: "adventure" },
        ],
    }),
}
</script>

<style>
.tour-list {
    flex: 1; 
    overflow: auto;
    justify-content: space-between;
    min-width: 610px;
}
</style>
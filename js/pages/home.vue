<template>
    <div class="wrapper shadow-lg">
        <!-- DASHBOARD --> 
        <div class="p-50 bg-white rounded d-flex flex-column right-side">

            <div class="f-1">
                <!-- LOGO -->            
                <div class="text-center mb-5">
                    <img src="images/junket-logo.png" alt="Junket" style="max-width: 100%" />
                </div>

                <!-- Search bar -->
                <div class="icon-input search-input mb-5 d-flex">
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
        
        <div class="left-side">
            <!-- JUNKET LIST -->
            <!-- <div class="bg-gray compass-bg rounded d-flex flex-wrap p-3 tour-list"> -->
            <div class="bg-gray compass-bg rounded p-3 h-100">
                <b-row v-for="i in Math.ceil(tours.length / 3)" :key="i">
                    <b-col class="box-col" xl="4" v-for="item in tours.slice((i - 1) * 3, i * 3)" :key="item.id">
                        <tour-box :tour="item"></tour-box>
                    </b-col>
                    <!-- <b-col xl="4"><tour-box :tour="tours[0]"></tour-box></b-col>
                    <b-col xl="4"><tour-box :tour="tours[0]"></tour-box></b-col>
                    <b-col xl="4"><tour-box :tour="tours[0]"></tour-box></b-col> -->
                </b-row>
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
            this.tours.push({id: this.tours.length + 1, type: "tour"});
        },
    },

    data: () => ({
        filter: '',
        tours: [
            { id: 1, type: "tour" },
            { id: 2, type: "tour" },
            { id: 3, type: "adventure" },
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
    height: 100%;
}
</style>
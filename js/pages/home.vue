<template>
    <transition name="fade">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Home</div>
                    <div class="card-body">
                       <div>Hey {{ user.name }}</div>
                       <div>
                           <button class="btn btn-primary" @click.prevent="logout">Logout</button>

                            <a href="/#/admin">
                                Admin
                            </a>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware: 'auth',

    metaInfo() {
        return { title: 'Home' }
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

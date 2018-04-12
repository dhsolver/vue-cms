<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Home</div>
                    <div class="card-body">
                       <div>Hey {{ user.name }}</div>
                       <div>
                           <button class="btn btn-primary" @click.prevent="logout">Logout</button>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        middleware: 'auth',

        metaInfo () {
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

<template>
    <div class="d-flex">
        <div class="mx-auto auth-box mt-5 shadow-lg bg-white rounded" >
            <div class="text-center mb-5">
                <img src="images/junket-logo.png" alt="Junket" class="w-100">
            </div>

            <div v-if="status == 1" class="text-center">
                Your email has been confirmed.
            </div>

            <div v-else-if="status == -1" class="text-center">
                Sorry!  We could not confirm your email, please try again.
            </div>

            <div v-else class="text-center">
                Confirming...
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    
    middleware: 'guest',

    computed: {
        ...mapGetters({
            user: 'auth/user'
        }),
    },

    metaInfo () {
        return { title: "Confirm Email" }
    },

    data: () => ({
        status: 0,
        form: new Form({
            token: '',
        }),
    }),

    methods: {
        checkToken() {
            this.form.alertOnResponse = false;
            this.form.alertOnError = false;
            this.form.post(this.config.urls.api + 'confirm-email')
                .then( ({ data }) => {
                    this.status = 1;
                })
                .catch( e => {
                    this.status = -1;
                });
        },
    },

    mounted() {
        if (! this.$route.query.token) {
            this.$router.push({ name: '404' });
            return;
        }

        this.form.token = this.$route.query.token;
        this.checkToken();
    }
}
</script>
<template>
    <div class="d-flex">
        <div class="mx-auto auth-box mt-5 shadow-lg bg-white rounded" >
            <div class="text-center mb-5">
                <img src="images/junket-logo.png" alt="Junket">
            </div>

            <b-form @submit.prevent="login">
                <b-form-group>
                    <b-form-input id="email"
                        :disabled="form.busy || busy"
                        name="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Email">
                    </b-form-input>
                    <input-help :form="form" field="email" text=""></input-help>
                </b-form-group>

                <b-form-group>
                    <b-form-input id="password"
                        :disabled="form.busy || busy"
                        name="password"
                        type="password"
                        v-model="form.password"
                        required
                        autocomplete="new-password"
                        placeholder="Password">
                    </b-form-input>
                    <input-help :form="form" field="password" text=""></input-help>
                </b-form-group>

                <b-row class="mt-3">
                    <b-col lg="12">
                        <busy-button variant="primary" type="submit" :busy="busy" class="w-100">LOGIN</busy-button>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col lg="12">
                        <facebook-login @success="fbSuccess" />
                    </b-col>
                </b-row>
                <div class="mt-5 text-center">
                    <h3>Don't have an account?</h3>
                </div>

                <div class="mt-2">
                    <b-btn :to="{ name: 'register' }" type="button" variant="secondary" class="w-100">REGISTER</b-btn>
                </div>

                <div class="mt-5 text-center">
                    <h3><router-link :to="{ name: 'forgot-password' }">I forgot my password</router-link></h3>
                </div>
            </b-form>
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

        facebookUrl() {
            return this.urls.auth + 'facebook';
        },
    },

    metaInfo () {
        return { title: "Login" }
    },

    data: () => ({
        form: new Form({
            email: '',
            password: ''
        }),
        remember: false,
        busy: false,
    }),

    methods: {
        fbSuccess(token) {
            this.busy = true;

            // submit the facebook access token to the login.
            let form = new Form({ 
                token,
                role: 'client',
            });

            form.post(this.urls.auth + 'login/facebook')
                .then( ({ data }) => {
                    // save the sites jwt auth token.
                    this.$store.commit('auth/saveToken', {
                        token: data.token,
                        remember: this.remember
                    })

                    this.loadDashboard();
                })
                .catch( e => {
                    this.busy = false;
                });
        },

        async login() {
            this.busy = true;
            
            // Submit the form.
            await this.form.post(this.urls.auth + 'login')
                .then( ({ data }) => {
                    // Save the token.
                    this.$store.commit('auth/saveToken', {
                        token: data.token,
                        remember: this.remember
                    })

                    this.loadDashboard();
                })
                .catch( e => {
                    this.busy = false;
                });
        },

        async loadDashboard() {
            // Fetch the user.
            await this.$store.dispatch('auth/fetchUser')

            if (this.user.role === 'admin') {
                this.$router.push({ name: 'admin.dashboard' })
                return;
            }
            
            // Redirect home.
            this.$router.push({ name: 'home' })
        },
    }
}
</script>
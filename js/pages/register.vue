<template>
    <div class="d-flex">
        <div class="mx-auto auth-box mt-5 shadow-lg bg-white rounded">
            <div class="text-center mb-5">
                <img src="images/junket-logo.png" alt="Junket" class="w-100">
            </div>

            <b-form @submit.prevent="register">
                <b-form-group>
                    <b-form-input id="name"
                        :disabled="form.busy"
                        name="name"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Your Name">
                    </b-form-input>
                    <input-help :form="form" field="name" text=""></input-help>
                </b-form-group>
                
                <b-form-group>
                    <b-form-input id="email"
                        :disabled="form.busy"
                        type="email"
                        name="email"
                        v-model="form.email"
                        required
                        placeholder="Email">
                    </b-form-input>
                    <input-help :form="form" field="email" text=""></input-help>
                </b-form-group>

                <b-form-group>
                    <b-form-input id="password"
                        :disabled="form.busy"
                        type="password"
                        name="password"
                        v-model="form.password"
                        required
                        autocomplete="new-password"
                        placeholder="Password">
                    </b-form-input>
                    <input-help :form="form" field="password" text=""></input-help>
                </b-form-group>
                            
                <b-form-group>
                    <b-form-input id="password_confirmation"
                        :disabled="form.busy"
                        type="password"
                        name="password_confirmation"
                        v-model="form.password_confirmation"
                        required
                        autocomplete="new-password"
                        placeholder="Confirm Password">
                    </b-form-input>
                    <input-help :form="form" field="password_confirmation" text=""></input-help>
                </b-form-group>
                            
                <b-row class="mt-3">
                    <b-col lg="12">
                        <busy-button variant="primary" type="submit" :busy="busy" class="w-100">REGISTER</busy-button>
                    </b-col>
                </b-row>

                <div class="mt-5 text-center">
                    <h3>Already have an account?</h3>
                </div>

                <div class="mt-2">
                    <b-btn :to="{ name: 'login' }" variant="secondary" class="w-100">LOGIN</b-btn>
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
    },

    metaInfo () {
        return { title: "Register" }
    },

    data: () => ({
        form: new Form({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: 'client',
        }),
        remember: false,
        busy: false,
    }),

    methods: {
        async register() {
            this.busy = true;
            
            await this.form.post(this.config.urls.auth + 'signup')
                .then( ({ data }) => {
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

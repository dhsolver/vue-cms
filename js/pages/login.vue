<template>
    <div class="row">
        <div class="col-lg-8 m-auto">
            
            <b-form @submit.prevent="login">
                <b-form-group label="Email:" label-for="email">
                    <b-form-input id="email"
                        :disabled="form.busy"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Email">
                    </b-form-input>
                    <input-help :form="form" field="email" text=""></input-help>
                </b-form-group>
                
                <b-form-group label="Password:" label-for="password">
                    <b-form-input id="password"
                        :disabled="form.busy"
                        type="password"
                        v-model="form.password"
                        required
                        autocomplete="new-password"
                        placeholder="Password">
                    </b-form-input>
                    <input-help :form="form" field="password" text=""></input-help>
                </b-form-group>
                            
                <!-- Remember Me -->
                <b-form-checkbox id="remember" v-model="remember">
                    Remember Me
                </b-form-checkbox>

                <b-row class="mt-3">
                    <b-col lg="12">
                        <busy-button variant="primary" :busy="busy" @click="login">Login</busy-button>
                    </b-col>
                </b-row>
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
        async login () {
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

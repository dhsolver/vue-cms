<template>
    <div class="d-flex">
        <div class="mx-auto auth-box mt-5 shadow-lg bg-white rounded" >
            <div class="text-center mb-5">
                <img src="images/junket-logo.png" alt="Junket" class="w-100">
            </div>

            <div v-if="success" class="text-center">
                Your password has been reset.

                <div class="mt-2">
                    <b-btn :to="{ name: 'login' }" type="button" variant="secondary" class="w-100">Login</b-btn>
                </div>
            </div>

            <div v-else>
                <div class="text-center mb-3">
                    Enter your new password:
                </div>
                
                <b-form @submit.prevent="submit">
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
                            <busy-button variant="primary" type="submit" :busy="busy" class="w-100">Reset My Password</busy-button>
                        </b-col>
                    </b-row>
                </b-form>
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
        return { title: "Reset Password" }
    },

    data: () => ({
        form: new Form({
            email: '',
            token: '',
            password: '',
            password_confirmation: '',
        }),
        busy: false,
        success: false,
    }),

    methods: {
        async submit() {
            this.busy = true;
            
            // Submit the form.
            await this.form.post(this.urls.auth + 'reset-password')
                .then( ({ data }) => {
                    this.success = true;
                })
                .catch( e => {
                    this.busy = false;
                });
        },
    },

    mounted() {
        if (! this.$route.query.token || ! this.$route.query.email) {
            this.$router.push({ name: 'login' });
            return;
        }

        this.form.email = this.$route.query.email;
        this.form.token = this.$route.query.token;
    }
}
</script>
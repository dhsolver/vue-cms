<template>
    <div class="d-flex">
        <div class="mx-auto auth-box mt-5 shadow-lg bg-white rounded" >
            <div class="text-center mb-5">
                <img src="images/junket-logo.png" alt="Junket" class="w-100">
            </div>

            <div v-if="success" class="text-center">
                An email has been sent with the information on how to reset your password.
            </div>

            <div v-else>
                <div class="text-center mb-3">
                    Enter the email associated with your account and we will send you the information requried to reset your password.
                </div>
                
                <b-form @submit.prevent="submit">
                    <b-form-group>
                        <b-form-input id="email"
                            :disabled="busy"
                            name="email"
                            type="email"
                            v-model="form.email"
                            required
                            placeholder="Email">
                        </b-form-input>
                        <input-help :form="form" field="email" text=""></input-help>
                    </b-form-group>

                    <b-row class="mt-3">
                        <b-col lg="12">
                            <busy-button variant="primary" type="submit" :busy="busy" class="w-100">Reset My Password</busy-button>
                        </b-col>
                    </b-row>
                </b-form>
            </div>

            <!-- <div class="mt-5 text-center">
                <h3>Remember your password?</h3>
            </div>

            <div class="mt-2">
                <b-btn :to="{ name: 'login' }" type="button" variant="secondary" class="w-100">Login</b-btn>
            </div> -->
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
        return { title: "Forgot Password" }
    },

    data: () => ({
        form: new Form({
            email: '',
        }),
        busy: false,
        success: false,
    }),

    methods: {
        async submit() {
            this.busy = true;
            
            await this.form.post(this.urls.auth + 'forgot-password')
                .then( ({ data }) => {
                    this.success = true;
                })
                .catch( e => {
                    this.busy = false;
                });
        },
    }
}
</script>
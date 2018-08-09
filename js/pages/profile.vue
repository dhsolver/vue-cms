<template>
    <div class="d-flex">
        <div class="mx-auto p-5 mt-5 shadow-lg bg-white rounded" style="min-width: 360px; width: 80%; max-width: 500px;">
            <div class="text-center mb-5">
                <router-link :to="{name:'home'}"><img src="images/junket-logo.png" alt="Junket"></router-link>
            </div>

            <spinner v-model="loading" />

            <div v-if="! loading">
                <h4>Name</h4>
                <b-form-group>
                    <b-form-input id="name"
                        :disabled="busy"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Name">
                    </b-form-input>
                    <input-help :form="form" field="name" text=""></input-help>
                </b-form-group>

                <h4>Company Name</h4>
                <b-form-group>
                    <b-form-input id="company_name"
                        :disabled="busy"
                        type="text"
                        v-model="form.company_name"
                        required
                        placeholder="Company Name">
                    </b-form-input>
                    <input-help :form="form" field="company_name" text=""></input-help>
                </b-form-group>

                <h4>Email Address</h4>
                <b-form-group>
                    <b-form-input id="email"
                        :disabled="busy"
                        type="text"
                        v-model="form.email"
                        required
                        placeholder="Email">
                    </b-form-input>
                    <input-help :form="form" field="email" text=""></input-help>
                </b-form-group>

                <busy-button 
                    variant="primary" 
                    class="w-100" 
                    @click="submit"
                    :busy="form.busy"
                    :disabled="busy"
                >
                    Save Changes
                </busy-button>

                <b-btn variant="secondary" class="mt-3 w-100" :disabled="busy" :to="{ name: 'home' }">
                    <fa :icon="['fas', 'arrow-left']"></fa>&nbsp;&nbsp;Back to Dashboard
                </b-btn>
                
                <hr class="mb-5 mt-5" />

                <h4>Facebook</h4>
                <b-row class="mt-3">
                    <b-col lg="12">
                        <div v-if="profile.fb_id" class="text-center">
                            Linked with Facebook ID {{ profile.fb_id }}
                        </div>
                        <facebook-login v-else @success="fbSuccess" />
                    </b-col>
                </b-row>

                <hr class="mb-5 mt-5" />

                <h3>Change your password</h3>

                <b-form-group>
                    <b-form-input id="old_password"
                        :disabled="busy"
                        type="password"
                        name="old_password"
                        v-model="passwordForm.old_password"
                        required
                        autocomplete="new-password"
                        placeholder="Current Password">
                    </b-form-input>
                    <input-help :form="passwordForm" field="old_password" text=""></input-help>
                </b-form-group>

                <b-form-group>
                    <b-form-input id="password"
                        :disabled="busy"
                        type="password"
                        name="password"
                        v-model="passwordForm.password"
                        required
                        autocomplete="new-password"
                        placeholder="New Password">
                    </b-form-input>
                    <input-help :form="passwordForm" field="password" text=""></input-help>
                </b-form-group>

                <b-form-group>
                    <b-form-input id="password_confirmation"
                        :disabled="busy"
                        type="password"
                        name="password_confirmation"
                        v-model="passwordForm.password_confirmation"
                        required
                        autocomplete="new-password"
                        placeholder="Confirm Password">
                    </b-form-input>
                    <input-help :form="passwordForm" field="password_confirmation" text=""></input-help>
                </b-form-group>

                <busy-button 
                    variant="danger" 
                    class="w-100" 
                    @click="changePassword"
                    :busy="passwordForm.busy"
                    :disabled="busy"
                >
                    Change My Password
                </busy-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { urls } from '../config';

export default {
    metaInfo() {
        return { title: 'My Account' }
    },
    
    middleware: 'auth',

    data: () => ({
        loading: false,
        form: new Form({
            name: '',
            company_name: '',
            email: '',
        }),
        passwordForm: new Form({
            old_password: '',
            password: '',
            password_confirmation: '',
        }),
        busy: false,
    }),

    computed: {
        ...mapState({
            profile: state => state.profile.data,
        }),
        ...mapGetters({
        }),
    },

    methods: {
        submit() {
            this.busy = true;

            this.form.patch(urls.cms + 'profile')
                .then( ({ data }) => {
                    this.form.update(data.data);
                    this.busy = false;
                })
                .catch(e => {
                    this.busy = false;
                });
        },

        changePassword() {
            this.busy = true;
         
            this.passwordForm.patch(urls.cms + 'profile/password')
                .then(response => {
                    this.passwordForm.reset();
                    this.busy = false;
                })
                .catch(e => {
                    this.busy = false;
                })
        },

        async fbSuccess(token) {
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

                    // update the users profile information
                    this.syncProfile();

                    this.busy = false;
                })
                .catch( e => {
                    this.busy = false;
                });
        },
        
        async syncProfile() {
            await this.$store.dispatch('profile/fetch');

            if (! this.profile.id) {
                alerts.addMessage('error', 'Unexpected error while loading user profile.  Please try again.');
                this.$router.push({ name: 'login' });
                return;
            }

            this.form.update(this.profile);
        },
    },

    created() {
        this.$store.commit('profile/setUrl', urls.cms);
        this.syncProfile();
    },
}
</script>

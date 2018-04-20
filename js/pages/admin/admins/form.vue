<template>   
    <div>
        <b-form @submit.prevent="submit">
            
            <b-form-group label="Name:" label-for="name">
                <b-form-input id="name"
                    :disabled="form.busy"
                    type="text"
                    v-model="form.name"
                    required
                    autofocus
                    placeholder="Name">
                </b-form-input>
                <input-help :form="form" field="name" text=""></input-help>
            </b-form-group>
            
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
            
            <b-form-group v-if="! hasAdmin" label="Password:" label-for="password">
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
            
        </b-form>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'AdminForm',

        props: {
            admin: Object,
            autoReset: {
                type: Boolean,
                default: false,
            }
        },
        
        data() {
            return {
                'form': new Form({
                    name: '',
                    email: '',
                    password: '',
                }),
            }
        },

        computed: {
            hasAdmin() {
                return this.admin.id ? true : false;
            },

            url() {
                let url = this.urls.admin + 'admins';
                if (this.hasAdmin) {
                    url = url + `/${this.admin.id}`;
                }
                return url;
            },
        },

        mounted() {
            if (this.admin.id) {
                this.form = new Form(this.admin);
            }
        },

        methods: {
            submit() {
                this.form.resetOnSuccess = !this.hasAdmin;

                let method = this.hasAdmin ? 'patch' : 'post';
                
                return this.form.submit(method, this.url);
            },

            reset() {
                this.form.reset();
            }
        }
    }
</script>

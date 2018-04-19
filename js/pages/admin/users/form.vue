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
            
            <b-form-group v-if="! hasUser" label="Password:" label-for="password">
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
        name: 'UserForm',

        props: {
            user: Object,
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
            hasUser() {
                return this.user.id ? true : false;
            },

            url() {
                let url = this.urls.admin + 'users';
                if (this.hasUser) {
                    url = url + `/${this.user.id}`;
                }
                return url;
            },
        },

        mounted() {
            if (this.user.id) {
                this.form = new Form(this.user);
            }
        },

        methods: {
            submit() {
                this.form.resetOnSuccess = !this.hasUser;

                let method = this.hasUser ? 'patch' : 'post';
                
                return this.form.submit(method, this.url);
            },

            reset() {
                this.form.reset();
            }
        }
    }
</script>

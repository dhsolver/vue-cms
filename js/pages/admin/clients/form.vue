<template>   
    <div>
        <b-form @submit.prevent="submit">
            
            <b-form-group label="Name:" label-for="name">
                <b-form-input id="name"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="Name">
                </b-form-input>
                <input-help :form="form" field="name" text=""></input-help>
            </b-form-group>
            
            <b-form-group label="Email:" label-for="email">
                <b-form-input id="email"
                    type="email"
                    v-model="form.email"
                    required
                    placeholder="Email">
                </b-form-input>
                <input-help :form="form" field="email" text=""></input-help>
            </b-form-group>
            
            <b-form-group v-if="! hasClient" label="Password:" label-for="password">
                <b-form-input id="password"
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
        name: 'ClientForm',

        props: ['client'],
        
        data() {
            return {
                'form': new Form({
                    name: '',
                    email: '',
                    password: '',
                }),
            }
        },

        watch: {
            'client': () => {
                console.log('client changed');
            }
        },

        computed: {
            hasClient() {
                return this.client.id ? true : false;
            }
        },

        mounted() {
            console.log('mounted: ' + this.client);

            if (this.client.id) {
                this.form = new Form(this.client);
            }
        },

        methods: {
            submit() {
                this.form.post(this.urls.admin + 'clients')
                    .then( ({data}) => {
                        console.log(data);
                        this.$store.commit('clients/pushToList', data)
                        this.$emit('success');
                        this.reset();
                    }).catch( (e) => {
                        console.log(e);
                        this.reset();
                    });
            },

            reset() {
                this.form.reset();
            }
        }
    }
</script>

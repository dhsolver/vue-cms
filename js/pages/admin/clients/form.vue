<template>   
    <div>
        <b-form @submit="submit">
            
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
            
            <b-form-group label="Password:" label-for="password">
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

        methods: {
            submit() {
                this.form.post(this.urls.admin + 'clients')
                    .then( ({data}) => {
                        console.log(data);

                        this.$emit('success');
                    }).catch( (e) => {
                        console.log(e);
                    });
            }
        }
    }
</script>

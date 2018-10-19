<template>   
    <div>
        <b-form @submit.prevent="submit">
            
            <b-form-group label="Client:" label-for="user_id">    
                <b-form-select 
                    v-model="form.user_id" 
                    :disabled="form.busy"
                    class="mb-3">

                    <option value="">-- Select a Client --</option>
                    <option v-for="item in clients" :value="item.id" :key="item.id">{{ item.name }}</option>
                </b-form-select>
                <input-help :form="form" field="user_id" text=""></input-help>
            </b-form-group>

            <b-form-group label="Title:" label-for="title">
                <b-form-input id="title"
                    :disabled="form.busy"
                    type="text"
                    v-model="form.title"
                    required
                    placeholder="Title">
                </b-form-input>
                <input-help :form="form" field="title" text=""></input-help>
            </b-form-group>
            
            <b-form-group label="Description:" label-for="description">
                <b-form-textarea id="textarea1"
                    v-model="form.description"
                    placeholder="Tour Description"
                    :rows="5"
                    :disabled="form.busy"
                    required
                    :max-rows="8">
                </b-form-textarea>
                <input-help :form="form" field="description" text=""></input-help>
            </b-form-group>
            
            <b-form-group label="Tour Type:" label-for="type">    
                <b-form-select 
                    v-model="form.type" 
                    :options="tourTypes" 
                    :disabled="form.busy"
                    class="mb-3" />
                <input-help :form="form" field="type" text=""></input-help>
            </b-form-group>

            <b-form-group label="Pricing Type:" label-for="pricing_type">    
                <b-form-select 
                    v-model="form.pricing_type" 
                    :options="pricingTypes" 
                    :disabled="form.busy"
                    class="mb-3" />
                <input-help :form="form" field="pricing_type" text=""></input-help>
            </b-form-group>
        </b-form>
    </div>
</template>

<script type='es6'>
    import { mapGetters } from 'vuex';

    export default {
        name: 'TourForm',

        props: {
            tour: Object,
            autoReset: {
                type: Boolean,
                default: false,
            }
        },
        
        data() {
            return {
                'form': new Form({
                    user_id: '',
                    title: '',
                    description: '',
                    pricing_type: 'free',
                    'type': 'outdoor',
                }),
                tourTypes: [
                    { value: 'outdoor', text: 'Outdoor' },
                    { value: 'indoor', text: 'Indoor' },
                    { value: 'adventure', text: 'Adventure' },
                ],
                pricingTypes: [
                    { value: 'free', text: 'Free' },
                    { value: 'premium', text: 'Premium' },
                ],
            }
        },

        watch: {
            'tour': () => {
                console.log('tour changed');
            }
        },

        computed: {
            ...mapGetters({
                clients: 'clients/list',
            }),

            hasTour() {
                return this.tour.id ? true : false;
            },

            url() {
                let url = this.config.urls.admin + 'tours';
                if (this.hasTour) {
                    url = url + `/${this.tour.id}`;
                }
                return url;
            },
        },

        async mounted() {
            if (this.tour.id) {
                this.form = new Form(this.tour);
            }

            await this.$store.dispatch('clients/fetchClients');
        },

        methods: {
            submit() {
                this.form.resetOnSuccess = !this.hasTour;

                let method = this.hasTour ? 'patch' : 'post';
                
                return this.form.submit(method, this.url);
            },

            reset() {
                this.form.reset();
            }
        }
    }
</script>

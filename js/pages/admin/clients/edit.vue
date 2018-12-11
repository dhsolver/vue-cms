<template>
    <b-card :header="title"
        header-bg-variant="secondary"
    >
        <spinner v-model="loading"></spinner>

        <div v-if="! loading">
            <client-form ref="clientForm" :client="client"></client-form>

            <busy-button variant="secondary" :busy="saving" @click="update">Save Client</busy-button>
            <busy-button variant="danger" :busy="deleting" @click="destroy()" :disabled="saving">Delete Client</busy-button>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmDelete">
            Are you sure you want to delete {{ client.name }}?
        </confirm-modal>

    </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import ClientForm from './form';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    components: { ClientForm },

    data: () => ({
        loading: true,
        saving: false,
        deleting: false,
    }),

    computed: {
        ...mapGetters({
            client: 'clients/current'
        }),

        title() {
            return "Edit Client: " + this.client.name;
        },
    },

    methods: {
        update() {
            this.saving = true;
            this.$refs.clientForm.submit()
                .then( ({data}) => {
                    this.$store.commit('clients/fetchClientSuccess', data.data);
                    this.saving = false;
                }).catch( e => {
                    this.saving = false;
                });
        },
        
        destroy() {
            this.$refs.confirmDelete.confirm(() => {
                this.deleting = true;
                let f = new Form({});
                console.log(this.$refs.clientForm.url);
                f.delete(this.$refs.clientForm.url)
                    .then( ({ data }) => {
                        this.deleting = false;
                        console.log('redirect back');
                        this.$router.push({ name: 'admin.clients' });
                    }).catch( e => {
                        this.deleting = false;
                    });
            });
        },
    },

    async mounted () {
        await this.$store.dispatch('clients/fetchClient', this.$route.params.id);
        this.loading = false;
    },
}
</script>

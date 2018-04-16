<template>
    <b-card :header="client.name"
        class="card-primary"
    >
        <spinner v-model="busy"></spinner>

        <client-form v-if="! busy" ref="clientForm" :client="client" @success="onSuccess"></client-form>

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
        busy: true,
    }),

    computed: {
        ...mapGetters({
            client: 'clients/current'
        })
    },

    methods: {
        onSuccess() {

        },
    },

    async mounted () {
        await this.$store.dispatch('clients/fetchClient', this.$route.params.id);
        this.busy = false;
    },
}
</script>

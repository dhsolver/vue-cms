<template>
    <b-card :header="title"
        header-bg-variant="secondary"
    >
        <spinner v-model="loading"></spinner>

        <div v-if="! loading" class="d-flex flex-col">
            <div class="mb-1 ml-auto">
                <busy-button variant="light" size="sm" :busy="changingRole.user" @click="changeRole('user')" :disabled="busy">Demote Client to Member</busy-button>
                <busy-button variant="light" size="sm" :busy="changingRole.admin" @click="changeRole('admin')" :disabled="busy">Promote Client to Admin</busy-button>
            </div>

            <client-form ref="clientForm" :client="client"></client-form>

            <div>
                <busy-button variant="secondary" :busy="saving" @click="update" :disabled="busy">Save Client</busy-button>
                <busy-button variant="danger" :busy="deleting" @click="destroy()" :disabled="busy">Delete Client</busy-button>
            </div>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmDelete">
            Are you sure you want to delete {{ client.name }}?
        </confirm-modal>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmChangeRole">
            Are you sure you want to change {{ client.name }}'s account type to {{ newRole | capitalize }}?
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
        busy: false,
        loading: true,
        saving: false,
        deleting: false,
        changingRole: { user: false, admin: false },
        newRole: '',
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
        changeRole(role) {
            this.newRole = role;
            this.$refs.confirmChangeRole.confirm(() => {
                this.busy = true;
                this.changingRole[role] = true;
                axios.patch(this.config.urls.admin + `change-role/${this.client.id}`, { role })
                    .then( ({data}) => {
                        // redirect to new role page
                        alerts.addMessage('success', 'Users role has been changed.');
                        this.$router.push({ name: `admin.${role}.show`, params: { id: this.client.id } });
                    }).catch( e => {
                        this.changingRole[role] = false;
                        this.busy = false;
                    });
            });
        },
        
        update() {
            this.busy = true;
            this.saving = true;
            this.$refs.clientForm.submit()
                .then( ({data}) => {
                    this.$store.commit('clients/fetchClientSuccess', data.data);
                    this.saving = false;
                    this.busy = false;
                }).catch( e => {
                    this.saving = false;
                    this.busy = false;
                });
        },
        
        destroy() {
            this.$refs.confirmDelete.confirm(() => {
                this.busy = true;
                this.deleting = true;
                let f = new Form({});
                console.log(this.$refs.clientForm.url);
                f.delete(this.$refs.clientForm.url)
                    .then( ({ data }) => {
                        this.$router.push({ name: 'admin.clients' });
                    }).catch( e => {
                        this.deleting = false;
                        this.busy = false;
                    });
            });
        },
    },

    async mounted () {
        await this.$store.dispatch('clients/fetchClient', this.$route.params.id);
        if (! this.client.id) {
            this.$router.push({ name: 'admin.clients' });
        }
        this.loading = false;
    },
}
</script>

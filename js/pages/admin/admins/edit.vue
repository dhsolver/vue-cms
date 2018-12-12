<template>
    <b-card :header="title"
        header-bg-variant="secondary"
    >
        <spinner v-model="loading"></spinner>

        <div v-if="! loading" class="d-flex flex-col">
            <div class="mb-1 ml-auto">
                <busy-button variant="light" size="sm" :busy="changingRole.user" @click="changeRole('user')" :disabled="busy">Demote Admin to Mobile User</busy-button>
                <busy-button variant="light" size="sm" :busy="changingRole.client" @click="changeRole('client')" :disabled="busy">Demote Admin to Client</busy-button>
            </div>

            <admin-form ref="adminForm" :admin="admin"></admin-form>

            <div>
                <busy-button variant="secondary" :busy="saving" @click="update" :disabled="busy">Save Admin</busy-button>
                <busy-button variant="danger" :busy="deleting" @click="destroy()" :disabled="busy">Delete Admin</busy-button>
            </div>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmDelete">
            Are you sure you want to delete {{ admin.name }}?
        </confirm-modal>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmChangeRole">
            Are you sure you want to change {{ admin.name }}'s account type to {{ newRole | capitalize }}?
        </confirm-modal>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import AdminForm from './form';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    components: { AdminForm },

    data: () => ({
        busy: false,
        loading: true,
        saving: false,
        deleting: false,
        changingRole: { user: false, client: false },
        newRole: '',
    }),

    computed: {
        ...mapGetters({
            admin: 'admins/current'
        }),

        title() {
            return "Edit Admin: " + this.admin.name;
        },
    },

    methods: {
        changeRole(role) {
            this.newRole = role;
            this.$refs.confirmChangeRole.confirm(() => {
                this.busy = true;
                this.changingRole[role] = true;
                axios.patch(this.config.urls.admin + `change-role/${this.admin.id}`, { role })
                    .then( ({data}) => {
                        // redirect to new role page
                        alerts.addMessage('success', 'Users role has been changed.');
                        this.$router.push({ name: `admin.${role}.show`, params: { id: this.admin.id } });
                    }).catch( e => {
                        this.changingRole[role] = false;
                        this.busy = false;
                    });
            });
        },
        
        update() {
            this.saving = true;
            this.$refs.adminForm.submit()
                .then( ({data}) => {
                    this.$store.commit('admins/fetchAdminSuccess', data.data);
                    this.saving = false;
                    this.busy = false;
                }).catch( e => {
                    this.saving = false;
                    this.busy = false;
                });
        },
        
        destroy() {
            this.$refs.confirmDelete.confirm(() => {
                this.deleting = true;
                let f = new Form({});
                f.delete(this.$refs.adminForm.url)
                    .then( ({ data }) => {
                        this.$router.push({ name: 'admin.admins' });
                    }).catch( e => {
                        this.deleting = false;
                        this.busy = false;
                    });
            });
        },
    },

    async mounted () {
        await this.$store.dispatch('admins/fetchAdmin', this.$route.params.id);
        if (! this.admin.id) {
            this.$router.push({ name: 'admin.admins' });
        }
        this.loading = false;
    },
}
</script>

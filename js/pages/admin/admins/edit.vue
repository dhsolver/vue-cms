<template>
    <b-card :header="title"
        class="card-primary"
    >
        <spinner v-model="loading"></spinner>

        <div v-if="! loading">
            <admin-form ref="adminForm" :admin="admin"></admin-form>

            <busy-button variant="info" :busy="saving" @click="update">Save Admin</busy-button>
            <busy-button variant="danger" :busy="deleting" @click="destroy()" :disabled="saving">Delete Admin</busy-button>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmDelete">
            Are you sure you want to delete {{ admin.name }}?
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
        loading: true,
        saving: false,
        deleting: false,
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
        update() {
            this.saving = true;
            this.$refs.adminForm.submit()
                .then( ({data}) => {
                    this.$store.commit('admins/fetchAdminSuccess', data.data);
                    this.saving = false;
                }).catch( e => {
                    this.saving = false;
                });
        },
        
        destroy() {
            this.$refs.confirmDelete.confirm(() => {
                this.deleting = true;
                let f = new Form({});
                f.delete(this.$refs.adminForm.url)
                    .then( ({ data }) => {
                        this.deleting = false;
                        this.$router.push({ name: 'admin.admins' });
                    }).catch( e => {
                        this.deleting = false;
                    });
            });
        },
    },

    async mounted () {
        await this.$store.dispatch('admins/fetchAdmin', this.$route.params.id);
        this.loading = false;
    },
}
</script>

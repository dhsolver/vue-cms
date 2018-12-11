<template>
    <b-card :header="title"
        header-bg-variant="secondary"
    >
        <spinner v-model="loading"></spinner>

        <div v-if="! loading">
            <user-form ref="userForm" :user="user"></user-form>

            <busy-button variant="secondary" :busy="saving" @click="update">Save User</busy-button>
            <busy-button variant="danger" :busy="deleting" @click="destroy()" :disabled="saving">Delete User</busy-button>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmDelete">
            Are you sure you want to delete {{ user.name }}?
        </confirm-modal>

    </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import UserForm from './form';

export default {
    middleware: ['auth', 'admin'],

    layout: 'admin',

    components: { UserForm },

    data: () => ({
        loading: true,
        saving: false,
        deleting: false,
    }),

    computed: {
        ...mapGetters({
            user: 'users/current'
        }),

        title() {
            return "Edit User: " + this.user.name;
        },
    },

    methods: {
        update() {
            this.saving = true;
            this.$refs.userForm.submit()
                .then( ({data}) => {
                    this.$store.commit('users/fetchUserSuccess', data.data);
                    this.saving = false;
                }).catch( e => {
                    this.saving = false;
                });
        },
        
        destroy() {
            this.$refs.confirmDelete.confirm(() => {
                this.deleting = true;
                let f = new Form({});
                console.log(this.$refs.userForm.url);
                f.delete(this.$refs.userForm.url)
                    .then( ({ data }) => {
                        this.deleting = false;
                        console.log('redirect back');
                        this.$router.push({ name: 'admin.users' });
                    }).catch( e => {
                        this.deleting = false;
                    });
            });
        },
    },

    async mounted () {
        await this.$store.dispatch('users/fetchUser', this.$route.params.id);
        this.loading = false;
    },
}
</script>

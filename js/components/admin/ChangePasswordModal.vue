<template>
    <b-modal id="changePasswordModal" :title="title" v-model="value">
        
                <b-form @submit.prevent="submit">
                    <b-form-group>
                        <b-form-input id="password"
                            :disabled="form.busy"
                            type="password"
                            name="password"
                            v-model="form.password"
                            required
                            autocomplete="new-password"
                            placeholder="Password">
                        </b-form-input>
                        <input-help :form="form" field="password" text=""></input-help>
                    </b-form-group>

                    <b-form-group>
                        <b-form-input id="password_confirmation"
                            :disabled="form.busy"
                            type="password"
                            name="password_confirmation"
                            v-model="form.password_confirmation"
                            required
                            autocomplete="new-password"
                            placeholder="Confirm Password">
                        </b-form-input>
                        <input-help :form="form" field="password_confirmation" text=""></input-help>
                    </b-form-group>
                </b-form>

        <div slot="modal-footer">
            <b-btn variant="default" @click.prevent="cancel()" :disabled="busy">Cancel</b-btn>
            <b-btn variant="danger" @click.prevent="save()" :disabled="busy">Change Password</b-btn>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'ChangePasswordModal',

    props: {
        value: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: 'Change Password',
        },
        user_id: {
            type: Number,
        },
    },

    data: () => ({
        form: new Form({
            email: '',
            token: '',
            password: '',
            password_confirmation: '',
        }),
        busy: false,
    }),

    methods: {
        save() {
            this.busy = true;
            this.form.patch(this.config.urls.admin + `change-password/${this.user_id}`)
                .then( ({ data }) => {
                    this.busy = false;
                    this.$emit('input', false);
                })
                .catch( e => {
                    this.busy = false;
                });
        },

        cancel() {
            this.$emit('input', false);
        },
    },
    
    watch: {
        value() {
            this.form.reset();
        }
    }
}
</script>

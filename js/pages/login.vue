<template>
    <div class="row">
        <div class="col-lg-8 m-auto">
            
            <form @submit.prevent="login" @keydown="form.onKeydown($event)">
                <!-- Email -->
                <div class="form-group row">
                    <label class="col-md-3 col-form-label text-md-right">Email</label>
                    <div class="col-md-7">
                    <input v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }" class="form-control" type="email" name="email">
                    <has-error :form="form" field="email"/>
                    </div>
                </div>

                <!-- Password -->
                <div class="form-group row">
                    <label class="col-md-3 col-form-label text-md-right">Password</label>
                    <div class="col-md-7">
                    <input v-model="form.password" :class="{ 'is-invalid': form.errors.has('password') }" class="form-control" type="password" name="password">
                    <has-error :form="form" field="password"/>
                    </div>
                </div>

                <!-- Remember Me -->
                <div class="form-group row">
                    <div class="col-md-3"/>
                    <div class="col-md-7 d-flex">
                        <input type="checkbox" id="remember" name="remember" v-model="remember" />
                        <label for="remember">Remember Me</label>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-md-7 offset-md-3 d-flex">
                        <!-- Submit Button -->
                        <v-button :loading="form.busy">
                            Login
                        </v-button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Form from 'vform'

export default {
    middleware: 'guest',

    components: {
    },

    metaInfo () {
        return { title: "Login" }
    },

    data: () => ({
        form: new Form({
            email: '',
            password: ''
        }),
        remember: false
    }),

    methods: {
        async login () {
            // Submit the form.
            const { data } = await this.form.post(this.urls.auth + 'login')

            // Save the token.
            this.$store.dispatch('auth/saveToken', {
              token: data.token,
              remember: this.remember
            })

            // Fetch the user.
            await this.$store.dispatch('auth/fetchUser')

            // Redirect home.
            this.$router.push({ name: 'home' })
        }
    }
}
</script>

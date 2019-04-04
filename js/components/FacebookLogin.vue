<template>
    <button class="btn btn-fb w-100" @click="login">
        <fa size="lg" :icon="['fab', 'facebook']"/> &nbsp;Sign in with Facebook
    </button>
</template>

<script>
    export default {
        name: 'FacebookLogin',

        props: {
            type: {
                type: String,
                default: 'primary'
            },
        },

        methods: {
            login() {
                FB.login(response => {
                    if (response.authResponse) {
                        this.$emit('success', response.authResponse.accessToken);
                    } else {
                        this.$emit('error', response);
                    }
                }, { scope: 'email,public_profile' });
            },
            
            success() {

            },

            error() {

            },
        },

        created() {
            window.fbAsyncInit = () => {
                FB.init({
                    appId      : this.config.keys.facebook,
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v3.1'
                });
                FB.AppEvents.logPageView();   
            };
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        },
    }
</script>

<style>
    .btn-fb {
        background-color: #365899 !important;
        color: #fff;
    }
</style>
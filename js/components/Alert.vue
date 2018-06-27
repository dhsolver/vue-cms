<template>
    <div :class="messageClass" role="alert" v-if="visible">
        <button type="button" class="close ml-3" aria-label="Close" @click="dismiss()"><span aria-hidden="true">&times;</span></button>
        <strong class="text-uppercase mr-2">{{ msg.type }}!</strong> <span v-html="$options.filters.nl2br(msg.message)"></span>
    </div>
</template>

<script>
export default {
    name: 'Alert',

    props: ['msg'],

    data() {
        return {
            'visible': true,
        }
    },

    mounted() {
        var message = this;
        setTimeout(function() {
            message.dismiss();
        }, 5000);
    },

    methods: {

        classFromType(type) {
            if (type === 'error') return 'danger';
            return type;
        },

        dismiss() {
            this.visible = false;
        }

    },

    computed: {
        messageClass: function() {
            return 'alert alert-' + this.classFromType(this.msg.type);
        }
    }
}
</script>

<style>
#alerts {
    position: absolute;
    z-index: 9999;
    right: 25px;
    top: 70px;
}
</style>
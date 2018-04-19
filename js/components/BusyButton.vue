<template>
    <b-btn :variant="variant" @click.prevent="onClick" :disabled="busy">
        <fa v-if="busy" class="fa-spin" :icon="['fas', 'spinner']" />
        <span v-else>
            <slot></slot>
        </span>
    </b-btn>
</template>

<script>
    export default {
        name: 'BusyButton',

        props: {
            variant: String,
            size: {
                type: String,
                default: 'lg',
            },
            busy: Boolean,
            title: String,
        },

        data: () => ({
        }),

        methods: {
            onClick(e) {
                this.$emit('click', e);
            },
        }
    }
</script>

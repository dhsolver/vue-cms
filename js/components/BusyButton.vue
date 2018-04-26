<template>
    <b-btn :variant="variant" :size="size" :disabled="busy">
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
                default: 'md',
            },
            busy: Boolean,
        },
    }
</script>

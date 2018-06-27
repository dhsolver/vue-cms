<template>
    <div class="spinner-container" v-bind:class="{ 'd-none': hidden }">
        <vue-spinner-component
            :status="value"
            :size="75"
            :depth="10"
            color="#79acd1"
        />
    </div>
</template>

<script>
import Spinner from 'vue-spinner-component/src/Spinner.vue';

export default {
    name: 'spinner',

    components: {
        'vue-spinner-component': Spinner
    },

    props: ['value'],

    computed: {
        hidden() {
            return !this.value;
        }
    },

    data() {
        return {
        }
    }
}
</script>

<style>
    .spinner-container {
        text-align: center;
        width: 100%;
        display: block;
        clear: both;
        padding: 25px 0;
    }
    .spinner-container .sl-spinner {
        margin: auto;
    }
</style>

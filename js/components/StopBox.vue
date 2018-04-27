<template>
    <div class="stop-box" style="background: url('images/pix-3.jpg');">
        <div class="white-circle">31</div>

        <div class="title">
            Title of Stop
        </div>

        <div class="delete">
            <fa :icon="['fas', 'times']" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "StopBox",

        props: ['stop'],

        data: () => ({
        }),

        computed: {
        },

        methods: {
        },
    }
</script>

<style>
</style>
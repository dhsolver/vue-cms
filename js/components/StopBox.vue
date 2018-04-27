<template>
    <div class="stop-box bg-fit" style="background: url('images/pix-3.jpg');" @click="$emit('click')">
        <div class="white-circle">31</div>

        <div class="title">
            Title of Stop
        </div>

        <div class="delete" @click.stop="$emit('delete')">
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
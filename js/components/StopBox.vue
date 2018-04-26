<template>
    <div class="stop-box">
        <img src="images/pix-3.jpg" alt="stop image" width="200" height="200" />

        <div class="overlay">
            <div class="white-circle">31</div>

            <div class="title">
                Title of Junket 
            </div>

            <div class="delete">
                <fa :icon="['fas', 'times']" />
            </div>
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
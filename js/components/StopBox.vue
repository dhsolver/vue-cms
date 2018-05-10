<template>
    <div class="stop-box bg-fit" :style="backgroundImage" @click="$emit('click')">
        <div class="white-circle">{{ stop.order }}</div>

        <div class="title">
            {{ stop.title }}
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
            backgroundImage() {
                let url = this.imagePath(this.stop.main_image);
                if (url) {
                    return `background: url(${url})`;
                } else {
                    return '';
                }
            },
        },

        methods: {
        },
    }
</script>

<style>
</style>
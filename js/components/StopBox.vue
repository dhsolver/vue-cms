<template>
    <div class="stop-box bg-fit" :style="backgroundImage" @click="$emit('click')">
        <div class="white-circle">{{ stop.order }}</div>

        <div class="title">
            {{ stop.title }}
        </div>

        <div class="delete" @click.stop="deleteStop">
            <fa v-if="busy" class="fa-spin" :icon="['fas', 'spinner']" />
            <fa v-else :icon="['fas', 'times']" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "StopBox",

        props: ['stop'],

        data: () => ({
            busy: false,
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
            async deleteStop() {
                this.busy = true;
                if (await this.$store.dispatch('tours/deleteStop', this.stop.id)) {
                    this.$emit('deleted');
                }
                this.busy = false;
            },
        },
    }
</script>

<style>
</style>
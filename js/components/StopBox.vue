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
import { mapGetters } from 'vuex';
export default {
    name: "StopBox",

    props: ['stop'],

    data: () => ({
        busy: false,
    }),

    computed: {
        ...mapGetters({
            saveTourUrl: 'tours/saveUrl',
        }),
        
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
        deleteStop() {
            this.busy = true;
            axios.delete(this.saveTourUrl + `/stops/${this.stop.id}`)
                .then( ({ data }) => {
                    this.$emit('deleted');
                    this.busy = false;
                })
                .catch( e => {
                    alerts.addMessage('error', e.response.data.message);
                    this.busy = false;
                })
        },
    },
}
</script>

<style>
</style>
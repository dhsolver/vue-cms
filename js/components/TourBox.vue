<template>
    <div class="tour-box">
        <div class="heading bg-fit" @click="editTour()" style="background: url('images/pix-2.jpg');">
            <!-- <img src="images/pix-2.jpg" alt="tour image" width="275" hegiht="185" /> -->
            <div class="title">
                Title of Junket<br />City, State
            </div>
            <div class="category" :class="typeClass">
                <fa :icon="['fas', 'map-marker-alt']" />&nbsp;{{ this.tour.type }}
            </div>
            <div class="count">
                <fa :icon="['fas', 'map-marker-alt']" />&nbsp;31
            </div>
        </div>
        <div class="footer d-flex p-1">
            <div>
                <a href="#" class="skinny"><fa :icon="['fas', 'chart-bar']" />&nbsp;Analytics</a>
            </div>
            <div class="ml-auto">
                <a href="#" class="skinny" ><fa :icon="['fas', 'link']" />&nbsp;URL</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TourBox",

        props: ['tour'],

        data: () => ({
        }),

        computed: {
            typeClass() {
                return this.tour.type == 'adventure' ? 'bg-success' : 'bg-info';
            },
        },

        methods: {
            editTour() {
                this.$router.push({ name: 'tour', params: { id: 1 } });
            }
        },
    }
</script>

<style>
</style>
<template>
    <div class="tour-box">
        <div class="heading">
            <img src="images/pix-2.jpg" alt="tour image" width="275" hegiht="185" />
            <div class="title">
                Title of Junket<br />City, State
            </div>
            <div class="category" :class="typeClass">
                <fa :icon="['fas', 'map-marker-alt']" />&nbsp;{{ this.type }}
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
        <!--<div class="btcount_pt">
            <i class="fa fa-map-marker" aria-hidden="true"></i> 31
        </div>
        <div class="anlinks clearfix">
            <span class="analytbox">
                <i class="fa fa-bar-chart" aria-hidden="true"></i> ANALYTICS 
            </span>
            <span class="urlbox">
                <i class="fa fa-link" aria-hidden="true"></i> URL
            </span>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: "TourBox",

        props: ['type'],

        data: () => ({
        }),

        computed: {
            typeClass() {
                return this.type == 'adventure' ? 'bg-success' : 'bg-info';
            },
        },

        methods: {
        },
    }
</script>

<style>
</style>
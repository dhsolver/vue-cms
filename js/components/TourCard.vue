<template>
    <div class="tour-box">
        <div class="heading bg-fit" @click="editTour()" :style="backgroundImage">
            <div class="title">
                {{ tour.title }}<br />{{ location }}
            </div>
            <div class="category" :class="typeClass">
                <fa :icon="['fas', 'map-marker-alt']" />&nbsp;{{ this.tour.type }}
            </div>
            <div class="count">
                <fa :icon="['fas', 'map-marker-alt']" />&nbsp;{{ this.tour.stops_count }}
            </div>
        </div>
        <div class="footer d-flex p-1">
            <div>
                <router-link :to="{ name: 'analytics.overview', params: { id: this.tour.id } }" class="skinny">
                    <fa :icon="['fas', 'chart-bar']" />&nbsp;Analytics
                </router-link>
            </div>
            <div class="ml-auto">
                <a href="#" class="skinny" ><fa :icon="['fas', 'link']" />&nbsp;URL</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TourCard",

    props: ['tour'],

    computed: {
        typeClass() {
            return this.tour.type == 'adventure' ? 'bg-success' : 'bg-info';
        },

        location() {
            if (this.tour.city && this.tour.state) {
                return this.tour.city + ', ' + this.tour.state;
            }
            return '';
        },

        backgroundImage() {
            let url = this.imagePath(this.tour.main_image, 'sm');
            if (url) {
                return `background: url(${url})`;
            } else {
                return '';
            }
        },
    },

    methods: {
        editTour() {
            this.$router.push({ name: 'tour', params: { id: this.tour.id } });
        }
    },
}
</script>
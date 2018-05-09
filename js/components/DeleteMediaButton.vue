<template>
    <div class="delete" @click.stop="deleteMedia">
        <fa v-if="busy" class="fa-spin" :icon="['fas', 'spinner']" />
        <fa v-else :icon="['fas', 'times']" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'DeleteMediaButton',

    props: {
        id: {
            type: String,
            required: true,
        },
        'type': {
            type: String, // tour/stop
            required: true,
        },
    },

    data: () => ({
        busy: false,
    }),

    computed: {
        ...mapGetters({
            tour: 'tours/current',
            tourUrl: 'tours/saveUrl',
        }),

        url() {
            if (this.type == 'stop') {
                return ``;
            } else {
                return `${this.tourUrl}/media`;
            }
        },
    },

    methods: {
        deleteMedia() {
            this.busy = true;
            this.$emit('beforeDelete');

            axios.delete(this.url, {params: {[this.id]: ''}})
                .then( (response) => {
                    this.$store.commit('tours/fetchTourSuccess', response.data.data);
                    this.busy = false;
                    alerts.addMessage('success', 'Media was removed successfully.');
                    this.$emit('deleted');
                })
                .catch(e => {
                    console.log(e);
                    this.busy = false;
                    alerts.addMessage('error', 'An error occured while trying to delete the file.  Please try again.');
                });
        },
    }
}
</script>

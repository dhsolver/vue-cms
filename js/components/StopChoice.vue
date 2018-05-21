<template>
    <div class="decision-point">
        <div class="icon-input question-input d-flex mb-2">
            <span class="icon text-uppercase" v-text="letter"></span>
            <input type="text" placeholder="Answer" @input="updateAnswer()" v-model="answer" />
            <span class="icon-right" @click="$emit('delete')"><fa :icon="['fas', 'times']"/></span>
        </div>
        <div class="icon-input answer-input d-flex">
            <span class="icon"><fa :icon="['fas', 'map-marker-alt']"/></span>
            <b-form-select :disabled="busy" @input="updateNextStop()" v-model="next_stop_id">
                <option value="">-- Select Stop --</option>
                <option v-for="stop in otherStops" 
                    :key="stop.id" 
                    :value="stop.id"
                    v-text="stop.title"
                ></option>
            </b-form-select>
        </div>

        <hr>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'StopChoice',
    
    props: {
        busy: { type: Boolean, default: false },
        value: { type: Object, default: {} },
    },

    computed: {
        ...mapGetters({
            tour: 'tours/current',
            stop: 'tours/currentStop',
        }),
        
        letter() {
            let alpha = 'abcdefghijklmnopqrstuvwxyz';
            return alpha[this.value.order - 1] + '.';
        },

        /**
         * Returns all stops but the current one for the 
         * next stop dropdown.
         */
        otherStops() {
            return this.tour.stops.filter(item => item.id != this.stop.id);
        },
    },

    data: () => ({
        answer: '',
        next_stop_id: '',
    }),

    methods: {
        updateAnswer() {
            this.$emit('input', {
                ...this.value,
                answer: this.answer,
            });
        },

        updateNextStop() {
            this.$emit('input', {
                ...this.value,
                next_stop_id: this.next_stop_id,
            });
        },
    },

    watch: {
        value(newVal, oldVal) {
            console.log(newVal);
            this.answer = newVal.answer;
            this.next_stop_id = newVal.next_stop_id;
        },
    },

    mounted() {
        this.answer = this.value.answer;
        this.next_stop_id = this.value.next_stop_id;
    },
}
</script>

<style>
.tab-content .decision-point:last-of-type hr {
    display: none!important;
}
</style>
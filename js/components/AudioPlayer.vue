<template>
    <div class="mb-3">

        <div class="audio-wrapper">

            <div class="audio-player">
                <div class="top">
                    <div class="control">
                        <a href="#" @click.prevent="togglePlayback">
                            <fa v-if="playing" :icon="['fas', 'pause']"/>
                            <fa v-else :icon="['fas', 'play']"/>
                        </a>
                        0:00 / {{ duration }}
                    </div>
                    <div class="volume">
                        <div class="icon">
                            <fa :icon="['fas', 'volume-up']"/>
                        </div>
                        <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
                        </div>
                    </div>
                    <div class="upload">
                        <a href="#">
                            <fa :icon="['fas', 'upload']"/>
                        </a>
                        <div class="lbl">UPLOAD</div>
                    </div>
                </div>
                <div class="progress-bar">
                    <input type="range" min="0" :max="duration" :value="seek" class="slider" @change="scrub">
                </div>
            </div>

        </div>

        <!-- <span>Total duration: {{ duration }} seconds</span>
        <span>Progress: {{ (progress * 100) }}%</span>
        <button @click="togglePlayback">{{ playing ? 'Pause' : 'Play' }}</button>
        <button @click="stop">Stop</button> -->
    </div>
</template>

<script>
import VueHowler from 'vue-howler'

export default {
    name: 'AudioPlayer',
    
    mixins: [VueHowler],

    data: () => ({
    }),

    methods: {
        scrub(e) {
            console.log(e);
        },
    }
}
</script>

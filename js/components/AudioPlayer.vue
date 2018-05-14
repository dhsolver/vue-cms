<template>
    <div class="mb-3">
        <div class="audio-wrapper">
            <div class="audio-player">
                <div class="top">
                    <div class="control">
                        <a href="#" @click.prevent="togglePlayback" :disabled="isEmpty">
                            <fa v-if="playing" :icon="['fas', 'pause']"/>
                            <fa v-else :icon="['fas', 'play']"/>
                        </a>
                        {{ seek | minsec }} / {{ duration | minsec }}
                    </div>
                    <div class="volume">
                        <div class="icon">
                            <fa :icon="['fas', 'volume-up']"/>
                        </div>
                        <div class="slidecontainer">
                        <input type="range" min="0" max="100" v-model="volume" class="slider" ref="volumeSlider" :disabled="isEmpty" />
                        </div>
                    </div>
                    <div v-if="isEmpty" class="action">
                        <fa v-if="busy" :icon="['fas', 'spinner']" class="fa-spin"/>
                        <a v-else href="#" @click.prevent="$emit('upload')">
                            <fa :icon="['fas', 'upload']"/>
                        </a>
                        <div class="lbl">UPLOAD</div>
                    </div>
                    <div v-else class="action remove">
                        <div class="delete" @click.stop="$emit('delete')">
                            <fa :icon="['fas', 'times']" />
                        </div>
                        <div class="lbl">REMOVE</div>
                    </div>
                </div>
                <div class="progress-bar">
                    <input type="range" min="0" :max="duration" v-model="seek" class="slider" @change="changeSeek" ref="seekSlider" :disabled="isEmpty" />
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import { Howl } from 'howler';

export default {
    name: 'AudioPlayer',
    
    props: {
        busy: false,
        id: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            default: '',
        },
    },

    data: () => ({
        volume: 50,
        howler: null,
        seek: 0.0,
        seekPoll: null,
    }),

    computed: {
        isEmpty() {
            return this.source == '' || this.howler == null;
        },

        playing() {
            if (this.isEmpty) {
                return false;
            }

            return this.howler.playing();
        },

        duration() {
            if (this.isEmpty) {
                return 0;
            }
            
            return this.howler.duration();
        },
    },

    methods: {
        changeSeek() {
            if (this.isEmpty) {
                this.seek = 0;
            }

            this.howler.seek(parseInt(this.seek));
        },

        drawVolumeProgress() {
            let val = parseInt(this.volume) / 100;
            this.$refs.volumeSlider.style.backgroundImage =
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #79acd1), '
                + 'color-stop(' + val + ', #d9d1d1)'
                + ')';
        },

        drawPlaybackProgress() {
            let val = parseInt(this.duration) == 0 ? 0 : this.seek / this.duration;
            this.$refs.seekSlider.style.backgroundImage =
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #79acd1), '
                + 'color-stop(' + val + ', #d9d1d1)'
                + ')';
        },

        togglePlayback() {
            if (this.isEmpty) {
                return;
            }

            if (this.playing) {
                this.howler.pause();
            } else {
                this.howler.play();
            }
        },

        load() {
            if (this.source == '') {
                if (this.howler != null) {
                    // clear old source
                    this.howler.stop();
                    this.howler = null;
                }
                this.seek = 0;
                this.drawPlaybackProgress()
                return;
            }

            this.howler = new Howl({
                src: [this.source],
                loop: false,
                volume: this.volume / 100,
            });

            this.drawVolumeProgress();
        }
    },

    mounted() {
        if (this.source) {
            this.load();
        }
    },

    watch: {
        volume(val) {
            if (! this.isEmpty) {
                this.howler.volume(val / 100);
                this.drawVolumeProgress();
            }
        },

        seek(newVal, oldVal) {
            this.drawPlaybackProgress();
        },

        playing(playing) {
            // Update the seek
            this.seek = this.howler.seek();

            if (playing) {
                // Start the seek poll
                this.seekPoll = setInterval(
                    () => this.seek = this.isEmpty ? 0 : this.howler.seek(),
                    1000 / 4
                )
            } else {
                // Stop the seek poll
                clearInterval(this.seekPoll)
            }
        },

        source(val) {
            console.log('source changed: ' + val);
            this.load();
        },
    },
}
</script>

<style lang="scss" scoped>
$audioGray: #d9d1d1;
$blue:    #79acd1 !default;
$darkBlue: #3e4759 !default;
$red:     #e20e24 !default;
$darkRed: #ad1a28 !default;

.audio-wrapper { 
    border: 2px solid $darkBlue;
    border-radius: 15px;
    overflow: hidden;
}
.audio-player {
    width: 100%;
    height: 65px;
}
.audio-player .control a { color: #fff; margin-right: 5px; }
.audio-player .control a:hover { color: #d9d1d1; }
.top { 
    height: 50px; 
    display: flex; 
}
.control { 
    flex: 1 1 auto;
    background-color: $darkBlue;
    text-align: center;
    color: #fff;
    font-weight: none;
    padding-top: 12px;
}
.control i { margin-right: 10px; }
.volume { 
    padding: 5px;
    width: 120px; 
    background-color: #fff;  
    border-right: 2px solid $darkBlue;
    color: $darkBlue;
    padding: 15px 10px 0px 5px;
    display: flex;
}
.volume .icon { padding: 0px 5px; }
.action {
    padding: 5px 5px 5px 5px;
    width: 60px; 
    background-color: #fff;
    text-align: center;
}
.action .lbl { 
    font-size: 10px;
    color: $darkBlue;
    font-weight: bold;
    line-height: 10px;
}
.audio-player .delete {
    position: inherit!important;
    width: 100%!important;
}
.audio-player .action a { color: $blue; font-size: 1.3rem; }
.audio-player .action a:hover { color: $darkBlue; }
.audio-player .action.remove a { color: $red; font-size: 1.3rem; }
.audio-player .action.remove a:hover { color: $darkRed; }

.progress-bar { 
    height: 15px; 
    background-color: $audioGray; 
    border-top: 1px solid #fff; 
    overflow: hidden;
}

.slidecontainer {
    flex: 1;
}

.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 13px;
    border-radius: 5px;
    background: $audioGray;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}
.slider:hover {
    opacity: 1;
}
.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    border: 1px solid $blue;
}
.slider::-moz-range-thumb {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    border: 1px solid $blue;
}

</style>
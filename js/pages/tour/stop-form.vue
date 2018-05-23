<template>
    <div>
        <div v-show="hasStop">
            <!-- FEATURE IMAGE -->
            <input id="main_image" name="main_image" type="file" class="input-file" @change="uploadMedia" hidden>
            <div v-if="! form.main_image_id" class="feature-box empty" @click.stop="openFileDialog('main_image')">
                <div class="addlink">
                    <fa v-if="busyUploading == 'main_image'" class="fa-spin" size="lg" :icon="['fas', 'spinner']" />
                    <fa v-else size="lg" :icon="['fas', 'plus']" />
                    <br>Add Feature Image
                </div>
            </div>
            <div v-else 
                class="feature-box" 
                @click.stop="openFileDialog('main_image')"
                :style="{ 'background-image': `url('${imagePath(form.main_image)}')` }" 
            >
                <div class="delete" @click.stop="deleteMedia('main_image')">
                    <fa :icon="['fas', 'times']" />
                </div>
            </div>
        </div>

        <div class="p-3">
            <b-form-group>
                <b-form-input id="title"
                    :disabled="form.busy"
                    type="text"
                    v-model="form.title"
                    required
                    placeholder="Title">
                </b-form-input>
                <input-help :form="form" field="title" text=""></input-help>
            </b-form-group>
            
            <b-form-group>
                <b-form-textarea id="description"
                    :disabled="form.busy"
                    type="text"
                    v-model="form.description"
                    required
                    rows="5"
                    placeholder="Description">
                </b-form-textarea>
                <input-help :form="form" field="description" text=""></input-help>
            </b-form-group>

            <div v-if="hasStop">
                <div class="flex align-items-base">
                    <h4 class="f-1">Location</h4>
                    <a v-if="!useMapForLocation" href="#" class="reverse mr-2" @click.prevent="useMapForLocation = true">
                        <fa :icon="['fas', 'map-marker-alt']" />&nbsp;Use Map
                    </a>
                    <a v-else href="#" class="reverse mr-2" @click.prevent="useMapForLocation = false">
                        Cancel
                    </a>
                </div>
                <address-form :form="form" v-model="form.location" @input="updateLocation" :overlay="useMapForLocation"></address-form>

                <h4 class="mt-4">Play Radius</h4>

                <b-form-group>
                    <b-form-input id="play_radius"
                        :disabled="form.busy"
                        type="text"
                        v-model="form.play_radius"
                        required
                        placeholder="Geofence Radius">
                    </b-form-input>
                    <input-help :form="form" field="play_radius" text=""></input-help>
                </b-form-group>

                <!-- AUDIO -->
                <h4 class="info-heading">
                    Audio
                    <span class="info-icon" v-b-tooltip.hover title="Audio must be in MP3 format, mono recommended">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>

                <input id="audio" name="audio" type="file" class="input-file" @change="(e) => uploadMedia(e, 'audio')" hidden>
                <audio-player 
                    id="audio"
                    :source="audioSource(form.audio)"
                    :busy="busyUploading == 'audio'"
                    @upload="openFileDialog('audio')"
                    @delete="deleteMedia('audio')"
                />

                <!-- MEDIA -->
                <h4 class="info-heading mt-3">
                    Media
                    <span class="info-icon" v-b-tooltip.hover title="Images must be at least X by X">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>

                <!-- IMAGES  -->
                <b-row class="image-row mb-3">
                    <b-col lg="4">
                        <input id="image1" name="image1" type="file" class="input-file" @change="uploadMedia" hidden>
                        <image-box 
                            id="image1"
                            :url="imagePath(form.image1)" 
                            :busy="busyUploading == 'image1'"
                            @click="openFileDialog('image1')" 
                            @delete="deleteMedia('image1')"
                        ></image-box>
                    </b-col>
                    <b-col lg="4">
                        <input id="image2" name="image2" type="file" class="input-file" @change="uploadMedia" hidden>
                        <image-box 
                            id="image2"
                            :url="imagePath(form.image2)" 
                            :busy="busyUploading == 'image2'"
                            @click="openFileDialog('image2')" 
                            @delete="deleteMedia('image2')"
                        ></image-box>
                    </b-col>
                    <b-col lg="4">
                        <input id="image3" name="image3" type="file" class="input-file" @change="uploadMedia" hidden>
                        <image-box 
                            id="image3"
                            :url="imagePath(form.image3)" 
                            :busy="busyUploading == 'image3'"
                            @click="openFileDialog('image3')" 
                            @delete="deleteMedia('image3')"
                        ></image-box>
                    </b-col>
                </b-row>
                <!-- /end IMAGES -->

                <!-- YOUTUBE -->
                <youtube-input :form="form" id="video_url" v-model="form.video_url"></youtube-input>
                <!-- /end YOUTUBE -->

                <!-- QUESTIONS -->
                <h4 class="info-heading mt-3">
                    Connections
                    <span class="info-icon" v-b-tooltip.hover title="need info for this">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>

                <h3>Question Prompt</h3>
                <b-form-group>
                    <b-form-textarea id="question"
                        :disabled="form.busy"
                        type="text"
                        v-model="form.question"
                        required
                        rows="4"
                        placeholder="">
                    </b-form-textarea>
                    <input-help :form="form" field="question" text=""></input-help>
                </b-form-group>

                <b-tabs pills class="mt-3" v-model="isMultipleChoice">
                    <b-tab title="Fill-In-The-Blank" :active="! form.is_multiple_choice">
                        <h3 class="mt-3">Correct Answer</h3>
                        <b-form-group>
                            <b-form-textarea id="question_answer"
                                :disabled="form.busy"
                                type="text"
                                v-model="form.question_answer"
                                required
                                rows="4"
                                placeholder="">
                            </b-form-textarea>
                            <input-help :form="form" field="question_answer" text=""></input-help>
                        </b-form-group>

                        <h3>Success Message</h3>
                        <b-form-group>
                            <b-form-textarea id="question_success"
                                :disabled="form.busy"
                                type="text"
                                v-model="form.question_success"
                                required
                                rows="4"
                                placeholder="">
                            </b-form-textarea>
                            <input-help :form="form" field="question_success" text=""></input-help>
                        </b-form-group>
                    </b-tab>

                    <b-tab title="Multiple Choice" :active="form.is_multiple_choice">
                        <!-- Multiple Choice -->
                        <h3 class="mt-3">Options</h3>

                        <stop-choice v-for="(item, index) in form.choices"
                            :key="index+item.id"
                            :busy="form.busy"
                            v-model="form.choices[index]"
                            @delete="deleteChoice(index)"
                        ></stop-choice>
                        
                        <b-btn size="sm" variant="primary" class="w-100 mt-3" @click="addChoice">
                        <fa :icon="['fas', 'map-marker-alt']"/>&nbsp;&nbsp;Add Decision Point</b-btn>
                        <!-- /end Multiple Choice -->
                    </b-tab>
                </b-tabs>

                <!-- /end QUESTIONS -->

                <!-- SAVE -->
                <b-row class="mt-5">
                    <b-col lg="6">
                        <busy-button :busy="form.busy" variant="primary" class="w-100" @click="save">
                            <fa :icon="['fas', 'check']"/>&nbsp;&nbsp;Save
                        </busy-button>
                    </b-col>
                    <b-col lg="6">
                        <b-btn variant="secondary" class="w-100" @click="addStop()">
                            <fa :icon="['fas', 'map-marker-alt']"/>&nbsp;&nbsp;Add a Stop
                        </b-btn>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UploadsMedia from '../../mixins/UploadsMedia';
import Geocoding from '../../mixins/Geocoding';

export default {
    mixins: [ UploadsMedia, Geocoding ],
    
    data: () => ({
        form: new Form({
            id: null,
            title: '',
            description: '',

            location: {},
            is_multiple_choice: false,
            question: '',
            question_answer: '',
            question_success: '',
            choices: [],    
            video_url: '',

            audio: '',
            audio_id: '',
            play_radius: '',
            main_image: '',
            main_image_id: '',
            image1: '',
            image1_id: '',
            image2: '',
            image2_id: '',
            image3: '',
            image3_id: '',
        }),

        useMapForLocation: false,
    }),

    computed: {
        ...mapGetters({
            tour: 'tours/current',
            stop: 'tours/currentStop',
            createStopUrl: 'tours/createStopUrl',
            saveStopUrl: 'tours/saveStopUrl',
            clickedPoint: 'map/clickedPoint',
        }),
        
        hasStop() {
            return this.stop.id ? true : false;
        },

        isMultipleChoice: {
            get: function () {
                return this.form.is_multiple_choice ? 1 : 0;
            },
            set: function (newValue) {
                this.form.is_multiple_choice = newValue == 1;
            }
        },
    },

    methods: {
        submit() {
            let url = this.createStopUrl;
            let method = 'post';

            if (this.hasStop) {
                url = this.saveStopUrl;
                method = 'patch'
            }

            console.log(this.form.originalData);
            return this.form.submit(method, url);
        },

        save() {
            // remove other type of questions when switching type
            if (this.isMultipleChoice) {
                this.form.question_answer = '';
                this.form.question_success = '';

                // reset choice order
                for (var i = 1; i <= this.form.choices.length; i++) {
                    this.form.choices[i-1].order = i;
                }
            } else {
                this.form.choices = [];
            }

            this.submit()
                .then( ({ data }) => {
                    console.log(data);
                    this.$store.commit('tours/updateStop', data.data);
                    this.form.fill(this.stop);
                })
                .catch(e => {
                    console.log('save stop error:');
                    console.log(e);
                });
        },

        addChoice() {
            this.form.choices.push({
                id: '',
                tour_stop_id: this.stop.id,
                order: this.form.choices.length + 1,
                answer: '',
                next_stop_id: -1,
            });
        },

        deleteChoice(index) {
            this.form.choices.splice(index, 1);
        },

        addStop() {
            console.log('adding stop...');
            this.$emit('addStop')
        },
        
        updateLocation() {
            console.log('location changed');
            this.$store.commit('tours/setCurrentStop', this.form.data());
        },

        /**
         * Enables mode to allow user to select a location by clicking 
         * anywhere on the map.
         */
        selectMapPoint() {
            this.useMapForLocation = true;
        },
    },

    mounted() {
        if (this.hasStop) {
            this.form.fill(this.stop);
        }
    },

    watch: {
        stop(newVal, oldVal) {
            if (newVal.id && newVal.id != oldVal.id) {
                console.log('reload stop form');
                this.form.fill(newVal);
            }
        },

        clickedPoint(newVal, oldVal) {
            if (this.useMapForLocation) {
                console.log('clicked point:');
                console.log(newVal);

                // this.reverseLookup(newVal.latitude, newVal.longitude)
                //     .then(results => {
                //         console.log('reverse lookup results:');
                //         console.log(results);
                //     })
                //     .catch(e => {
                //         if (e == 'ZERO_RESULTS') {
                //             // poor location
                //         }
                //         console.log('error looking up coors: ' + e);
                //     })

                this.form.location = {
                    ...this.form.location,
                    latitude: newVal.latitude,
                    longitude: newVal.longitude,
                    address1: '',
                    address2: '',
                    city: '',
                    state: '',
                    zipcode: '',
                }

                this.useMapForLocation = false;
                this.updateLocation();
            }
        },
    },
}
</script>

<style>
</style>
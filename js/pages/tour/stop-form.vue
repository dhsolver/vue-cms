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

            <div v-show="hasStop">
                <h4>Location</h4>
                <b-tabs pills>
                    <b-tab title="Address" active>
                        
                        <!-- STREET ADDRESS -->
                        <b-form-group class="mt-3">
                            <b-form-input id="address"
                                :disabled="form.busy"
                                type="text"
                                v-model="form.address"
                                required
                                placeholder="Address">
                            </b-form-input>
                            <input-help :form="form" field="address" text=""></input-help>
                        </b-form-group>
                        
                        <b-form-group>
                            <b-form-input id="city"
                                :disabled="form.busy"
                                type="text"
                                v-model="form.city"
                                required
                                placeholder="City">
                            </b-form-input>
                            <input-help :form="form" field="city" text=""></input-help>
                        </b-form-group>

                        <b-row class="mb-3">
                            <b-col lg="8">
                                <b-form-input id="state"
                                    :disabled="form.busy"
                                    type="text"
                                    v-model="form.state"
                                    required
                                    placeholder="State">
                                </b-form-input>
                            </b-col>
                            <b-col lg="4">
                                <b-form-input id="zipcode"
                                    :disabled="form.busy"
                                    type="text"
                                    v-model="form.zipcode"
                                    required
                                    placeholder="Zipcode">
                                </b-form-input>
                            </b-col>
                            <input-help :form="form" field="zipcode" text=""></input-help>
                            <input-help :form="form" field="state" text=""></input-help>
                        </b-row>
                        <!-- /end STREET ADDRESS -->
                        
                    </b-tab>
                    <b-tab title="Use Map">
                        <div class="m-5">
                            Don't know what this would do?
                        </div>
                    </b-tab>
                    <b-tab title="GPS">
                        <!-- GPS -->

                        <b-row class="mt-4">
                            <b-col lg="3" class="pt-2">
                                <label for="latitude">Latitude</label>
                            </b-col>
                            <b-col lg="9">
                                <b-form-input id="latitude"
                                    :disabled="form.busy"
                                    type="text"
                                    v-model="form.latitude"
                                    placeholder="Latitude">
                                </b-form-input>
                                <input-help :form="form" field="latitude" text=""></input-help>
                            </b-col>
                        </b-row>

                        <b-row class="mt-4">
                            <b-col lg="3" class="pt-2">
                                <label for="latitude">Longitude</label>
                            </b-col>
                            <b-col lg="9">
                                <b-form-input id="longitude"
                                    :disabled="form.busy"
                                    type="text"
                                    v-model="form.longitude"
                                    placeholder="Longitude">
                                </b-form-input>
                                <input-help :form="form" field="longitude" text=""></input-help>
                            </b-col>
                        </b-row>

                        <!-- /end GPS -->
                    </b-tab>
                </b-tabs>

                <!-- /end LOCATION -->

                <h4 class="mt-4">Play Radius</h4>

                <b-form-group>
                    <b-form-input id="geo_radius"
                        :disabled="form.busy"
                        type="text"
                        v-model="form.geo_radius"
                        required
                        placeholder="Geofence Radius">
                    </b-form-input>
                    <input-help :form="form" field="geo_radius" text=""></input-help>
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

                <b-tabs pills class="mt-3">
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

                        <div class="icon-input question-input d-flex mb-2">
                            <span class="icon">A.</span>
                            <input type="text" placeholder="Answer" />
                            <span class="icon-right"><fa :icon="['fas', 'times']"/></span>
                        </div>
                        <div class="icon-input answer-input d-flex">
                            <span class="icon"><fa :icon="['fas', 'map-marker-alt']"/></span>
                            <b-form-select :disabled="form.busy">
                                <option value="">Location</option>
                            </b-form-select>
                        </div>

                        <hr>

                        <div class="icon-input question-input d-flex mb-2">
                            <span class="icon">B.</span>
                            <input type="text" placeholder="Answer" />
                            <span class="icon-right"><fa :icon="['fas', 'times']"/></span>
                        </div>
                        <div class="icon-input answer-input d-flex">
                            <span class="icon"><fa :icon="['fas', 'map-marker-alt']"/></span>
                            <b-form-select :disabled="form.busy">
                                <option value="">Location</option>
                            </b-form-select>
                        </div>

                        <hr>

                        <div class="icon-input question-input d-flex mb-2">
                            <span class="icon">C.</span>
                            <input type="text" placeholder="Answer" />
                            <span class="icon-right"><fa :icon="['fas', 'times']"/></span>
                        </div>
                        <div class="icon-input answer-input d-flex">
                            <span class="icon"><fa :icon="['fas', 'map-marker-alt']"/></span>
                            <b-form-select :disabled="form.busy">
                                <option value="">Location</option>
                            </b-form-select>
                        </div>

                        <b-btn size="sm" variant="primary" class="w-100 mt-3">
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
                        <b-btn variant="secondary" class="w-100">
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

export default {
    mixins: [UploadsMedia],
    
    data: () => ({
        form: new Form({
            id: null,
            title: '',
            description: '',

            is_multiple_choice: false,
            question: '',
            question_answer: '',
            question_success: '',
            choices: [],    
            video_url: '',

            audio: '',
            audio_id: '',
            main_image: '',
            main_image_id: '',
            image1: '',
            image1_id: '',
            image2: '',
            image2_id: '',
            image3: '',
            image3_id: '',

        }),

        locationType: 'gps',
    }),

    computed: {
        ...mapGetters({
            tour: 'tours/current',
            stop: 'tours/currentStop',
            createStopUrl: 'tours/createStopUrl',
            saveStopUrl: 'tours/saveStopUrl',
        }),
        
        hasStop() {
            return this.stop.id ? true : false;
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

            return this.form.submit(method, url);
        },

        save() {
            this.submit()
                .then( ({ data }) => {
                    console.log(data);
                    this.$store.commit('tours/updateStop', data.data);
                })
                .catch(e => {
                    console.log('save stop error:');
                    console.log(e);
                });
        },

    },

    mounted() {
        if (this.hasStop) {
            this.form.fill(this.stop);
        }
    },

    watch: {
        stop(newVal) {
            if (newVal.id) {
                this.form.fill(newVal);
            }
        },
    },
}
</script>

<style>
</style>
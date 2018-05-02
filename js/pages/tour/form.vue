<template>
    <div>
        <div v-show="hasTour">
            <div class="feature-box">
                <div class="addlink">
                <a href="#">
                    <fa :icon="['fas', 'plus']" />
                    <br>Add Feature Image</a>
                </div>
            </div>

            <div class="circbox">
                <div class="addrescir">
                    <fa :icon="['fas', 'map-marker-alt']" size="4x" style="color: #79acd1"/>
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
            
            <h4>Pricing</h4>
            <b-form-group>    
                <b-form-select 
                    v-model="form.pricing_type" 
                    :disabled="form.busy">
                    <option value="">-- Select Pricing --</option>
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                </b-form-select>
                <input-help :form="form" field="pricing_type" text=""></input-help>
            </b-form-group>

            <h4>Junket Info</h4>
            <b-form-group>    
                <b-form-select 
                    v-model="form.type" 
                    :disabled="form.busy">
                    <option value="">-- Select Type --</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="indoor">Indoor</option>
                    <option value="adventure">Adventure</option>
                </b-form-select>
                <input-help :form="form" field="type" text=""></input-help>
            </b-form-group>

            <div v-show="hasTour">
                <b-form-group>
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
                
                <h4>Social</h4>

                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon fb-circle">
                            <fa :icon="['fab', 'facebook-f']"/>
                        </span>
                        <input type="text" placeholder="Facebook URL" />
                    </div>
                </b-form-group>
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon ig-circle">
                            <fa :icon="['fab', 'instagram']"/>
                        </span>
                        <input type="text" placeholder="Instagram URL" />
                    </div>
                </b-form-group>
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon twitter-circle">
                            <fa :icon="['fab', 'twitter']"/>
                        </span>
                        <input type="text" placeholder="Twitter URL" />
                    </div>
                </b-form-group>

                <!-- AUDIO -->
                <h4 class="info-heading">
                    Audio
                    <span class="info-icon" v-b-tooltip.hover title="Audio must be in MP3 format, mono recommended">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>

                <h3>Intro Audio</h3>
                <audio-player :sources="introAudioSource" @uploaded="uploadIntroAudio()"></audio-player>
                
                <h3>Background Audio</h3>
                <audio-player :sources="backgroundAudioSource" @uploaded="uploadedBackgroundAudio()"></audio-player>
                
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
                        <image-box url="/images/pix-3.jpg"></image-box>
                    </b-col>
                    <b-col lg="4">
                        <image-box url=""></image-box>
                    </b-col>
                    <b-col lg="4">
                        <image-box url=""></image-box>
                    </b-col>
                </b-row>

                <!-- YOUTUBE -->
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon yt-circle">
                            <fa size="xs" :icon="['fas', 'play']"/>
                        </span>
                        <input type="text" placeholder="Youtube Video URL" />
                    </div>
                </b-form-group>

                <div class="image-box yt-placeholder">
                    <div class="label">
                        <div><fa size="4x" color="#e03d3f" :icon="['fab', 'youtube']"/></div>
                        <div>Enter YouTube URL Above</div>
                    </div>
                </div>

                <!-- <iframe id="ytplayer" type="text/html" style="width:100%; height: 200px;"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=0&origin=http://example.com"
                frameborder="0"></iframe> -->

                <!-- PRIZE -->
                <h4 class="mt-3">Trophy</h4>

                <div class="trophy-box d-flex">
                    <img src="/images/trophy.png" width="100" height="100" class="mr-3" />
                    <b-btn variant="primary" class="f-1" height="100">
                        <fa size="lg" :icon="['fas', 'plus']"/><br/>
                        Upload Custom
                    </b-btn>
                </div>

                <b-form-group class="mt-3">
                    <b-form-textarea id="prize_details"
                        :disabled="form.busy"
                        type="text"
                        v-model="form.prize_details"
                        required
                        rows="3"
                        placeholder="Price Details">
                    </b-form-textarea>
                    <input-help :form="form" field="prize_details" text=""></input-help>
                </b-form-group>
                <b-form-group>
                    <b-form-textarea id="prize_instructions"
                        :disabled="form.busy"
                        type="text"
                        v-model="form.prize_instructions"
                        required
                        rows="3"
                        placeholder="Redemption Instructions">
                    </b-form-textarea>
                    <input-help :form="form" field="prize_instructions" text=""></input-help>
                </b-form-group>

                <!-- SAVE BUTTONS -->
                <h4 class="info-heading">
                    Save
                    <span class="info-icon" v-b-tooltip.hover title="Safe info">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>
                <b-row>
                    <b-col lg="6">
                        <busy-button :busy="form.busy" variant="primary" class="w-100" @click="save">
                            <fa :icon="['fas', 'check']"/>&nbsp;&nbsp;Save
                        </busy-button>
                    </b-col>
                    <b-col lg="6">
                        <b-btn variant="secondary" class="w-100" @click="addStop">
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
export default {
    data: () => ({
        form: new Form({
            id: '',
            title: '',
            description: '',
            type: '',
            pricing_type: '',

            intro_audio: '',
            background_audio: '',
        }),
    }),

    computed: {
        ...mapGetters({
            tour: 'tours/current',
            createUrl: 'tours/createUrl',
            saveUrl: 'tours/saveUrl',
        }),
        
        hasTour() {
            return this.tour.id ? true : false;
        },

        introAudioSource() {
            return this.intro_audio ? [this.intro_audio] : ['none'];
        },

        backgroundAudioSource() {
            return this.background_audio ? [this.background_audio] : ['none'];
        },
    },

    methods: {
        uploadedBackgroundAudio() {
            this.background_audio = 'media/test.mp3';
        },

        uploadedIntroAudio() {
            this.intro_audio = 'media/test.mp3';
        },

        submit() {
            let url = this.createUrl;
            let method = 'post';

            if (this.hasTour) {
                url = this.saveUrl;
                method = 'patch'
            }

            return this.form.submit(method, url);
        },

        save() {
            this.submit()
                .then( ({ data }) => {
                    console.log(data);
                })
                .catch(e => {
                    console.log('save tour error:');
                    console.log(e);
                });
        },

        addStop() {
            this.tour.stops.push( { id: this.tour.stops.length + 1, title: "Title of Stop" })
        },
    },

    mounted() {
        this.form.fill(this.tour);
    },

    // watch: {
    //     tour(newVal) {
    //         this.form.fill(newVal);
    //     },
    // },
}
</script>

<style>
</style>
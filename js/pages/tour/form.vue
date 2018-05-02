<template>
    <div>
        <div v-show="hasTour">
            <input id="main_image" name="main_image" type="file" class="input-file" @change="uploadImage" hidden>
            <div v-if="! form.main_image" class="feature-box empty" @click.stop="openFileDialog('main_image')">
                <div class="addlink">
                    <fa :icon="['fas', 'plus']" />
                    <br>Add Feature Image
                </div>
            </div>
            <div v-else 
                class="feature-box" 
                @click.stop="openFileDialog('main_image')"
                :style="{ 'background-image': `url('${form.main_image_path}')` }" 
            >
                <div class="delete" @click.stop="deleteMedia('main_image')">
                    <fa :icon="['fas', 'times']" />
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
                    <b-form-input id="address1"
                        :disabled="form.busy"
                        type="text"
                        v-model="form.address1"
                        required
                        placeholder="Address">
                    </b-form-input>
                    <input-help :form="form" field="address1" text=""></input-help>
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
                        <input type="text" placeholder="Facebook URL" v-model="form.facebook_url" id="facebook_url" />
                    </div>
                    <input-help :form="form" field="facebook_url" text=""></input-help>
                </b-form-group>
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon ig-circle">
                            <fa :icon="['fab', 'instagram']"/>
                        </span>
                        <input type="text" placeholder="Instagram URL" v-model="form.instagram_url" id="instagram_url" />
                    </div>
                    <input-help :form="form" field="instagram_url" text=""></input-help>
                </b-form-group>
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon twitter-circle">
                            <fa :icon="['fab', 'twitter']"/>
                        </span>
                        <input type="text" placeholder="Twitter URL" v-model="form.twitter_url" id="twitter_url" />
                    </div>
                    <input-help :form="form" field="twitter_url" text=""></input-help>
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
                        <input type="text" placeholder="Youtube Video URL" id="video_url" v-model="form.video_url" />
                    </div>
                    <input-help :form="form" field="video_url" text=""></input-help>
                </b-form-group>

                <iframe v-if="videoSource" id="ytplayer" type="text/html" style="width:100%; height: 200px;" :src="videoSource" frameborder="0"></iframe>
                <div v-else class="image-box yt-placeholder">
                    <div class="label">
                        <div><fa size="4x" color="#e03d3f" :icon="['fab', 'youtube']"/></div>
                        <div>Enter YouTube URL Above</div>
                    </div>
                </div>
                <!-- 
                    test urls:
                    https://youtu.be/Bey4XXJAqS8
                    https://www.youtube.com/watch?v=Bey4XXJAqS8

                    <iframe id="ytplayer" type="text/html" style="width:100%; height: 200px;"
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
        maxAudioSize: 100000000,
        maxImageSize: 25000000,

        form: new Form({
            id: null,
            title: '',
            description: '',
            type: '',
            pricing_type: '',

            address1: '',
            address2: '',
            background_audio: '',
            city: '',
            deleted_at: '',
            description: '',
            end_image: '',
            end_message: '',
            end_point: '',
            end_video_url: '',
            facebook_url: '',
            image_1: '',
            image_1_path: '',
            image_2: '',
            image_2_path: '',
            image_3: '',
            image_3_path: '',
            instagram_url: '',
            intro_audio: '',
            main_image: '',
            main_image_path: '',
            pricing_type: '',
            prize_details: '',
            prize_instructions: '',
            published_at: '',
            start_image: '',
            start_message: '',
            start_point: '',
            start_video_url: '',
            state: '',
            stops: [],
            title: '',
            trophy_image: '',
            twitter_url: '',
            type: '',
            video_url: '',
            zipcode: '',
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

        videoSource() {
            if (!this.form.video_url.includes('youtube.com/watch?v=')) {
                return '';
            }
            
            //https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=0&origin=http://example.com
            // return this.form.video_url + '&autoplay=0&origin=https://cms.wejunket.com';
            // return this.form.video_url + '&autoplay=1&origin=http://example';
            let v = this.getUrlQueryParam('v', this.form.video_url);
            if (v) {
                return `https://www.youtube.com/embed/${v}?autoplay=0&origin=http://example.com`;
            }

            return '';
        }
    },

    methods: {
        deleteMedia(name) {
            console.log('delete media not implemented yet');
        },

        openFileDialog(id) {
            document.getElementById(id).click();
        },

        uploadImage(e) {
            // validate file
            let file = e.target.files[0];
            if (! file) {
                console.log('no file');
                return;
            }

            if (file.size > this.maxImageSize) {
                this.clearFile(e.target);
                alerts.addMessage('error', 'Images must be less than 25 MB.');
                return;
            }

            let f = new Form({
                [e.target.name]: file,
            })

            f.submit('post', this.saveUrl + '/media', true)
                .then(response => {
                    this.$store.commit('tours/fetchTourSuccess', response.data.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        clearFile(target) {
            target.value = null;
            this.form[target.name] = '';
        },

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
        
        getUrlQueryParam(name, url) {
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        save() {
            this.submit()
                .then( ({ data }) => {
                    console.log(data);
                    this.$store.commit('tours/fetchTourSuccess', data.data);
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

    watch: {
        tour(newVal) {
            this.form.fill(newVal);
        },
    },
}
</script>

<style>
</style>
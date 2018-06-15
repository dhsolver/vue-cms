<template>
    <div>
        <div v-show="hasTour">
            <!-- FEATURE IMAGE -->
            <input id="main_image" name="main_image" type="file" class="input-file" @change="(e) => uploadMedia(e, 'image')" hidden>
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
                :style="{ 'background-image': `url('${imagePath(form.main_image, 'sm')}')` }" 
            >
                <div class="delete" @click.stop="deleteMedia('main_image')">
                    <fa :icon="['fas', 'times']" />
                </div>
            </div>

            <div class="circbox"
                v-if="tour.type != 'indoor'"
                @click.stop="openFileDialog('pin_image')">
                <input id="pin_image" name="pin_image" type="file" class="input-file" @change="(e) => uploadMedia(e, 'icon')" hidden>
                <div class="addrescir">
                    <fa v-if="! form.pin_image" :icon="['fas', 'plus']" size="3x" style="color: #79acd1" />
                    <img v-if="form.pin_image" :src="imagePath(form.pin_image, 'ico')" width="48" height="48"/>
                    <div v-if="form.pin_image" class="delete" @click.stop="deleteMedia('pin_image')">
                        <fa :icon="['fas', 'times']" />
                    </div>
                </div>
            </div>
            <!-- /end FEATURE IMAGE -->
        </div>

        <div class="p-3">
            <!-- MAIN FORM -->
            <h4>Title</h4>
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
            
            <h4>Description</h4>
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

            <h4>Junket Type</h4>
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

            <div v-if="hasTour">
                <h4>Location</h4>
                <address-form :form="form" v-model="form.location" @input="updateLocation"></address-form>

                <!-- SOCIAL URLS -->
                <h4>Social</h4>

                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon fb-circle">
                            <fa :icon="['fab', 'facebook-f']"/>
                        </span>
                        <input type="text" placeholder="Facebook URL" v-model="form.facebook_url" id="facebook_url" :disabled="form.busy" />
                    </div>
                    <input-help :form="form" field="facebook_url" text=""></input-help>
                </b-form-group>
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon ig-circle">
                            <fa :icon="['fab', 'instagram']"/>
                        </span>
                        <input type="text" placeholder="Instagram URL" v-model="form.instagram_url" id="instagram_url" :disabled="form.busy" />
                    </div>
                    <input-help :form="form" field="instagram_url" text=""></input-help>
                </b-form-group>
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon twitter-circle">
                            <fa :icon="['fab', 'twitter']"/>
                        </span>
                        <input type="text" placeholder="Twitter URL" v-model="form.twitter_url" id="twitter_url" :disabled="form.busy" />
                    </div>
                    <input-help :form="form" field="twitter_url" text=""></input-help>
                </b-form-group>
                <!-- /end SOCIAL URLS -->

                <!-- AUDIO -->
                <h4 class="info-heading">
                    Audio
                    <span class="info-icon" v-b-tooltip.hover title="Audio must be in MP3 format, mono recommended">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>

                <h3>Intro Audio</h3>
                <input id="intro_audio" name="intro_audio" type="file" class="input-file" @change="(e) => uploadMedia(e, 'audio')" hidden>
                <audio-player 
                    id="intro_audio"
                    :source="audioSource(form.intro_audio)"
                    :busy="busyUploading == 'intro_audio'"
                    @upload="openFileDialog('intro_audio')"
                    @delete="deleteMedia('intro_audio')"
                />
                
                <h3>Background Audio</h3>
                <input id="background_audio" name="background_audio" type="file" class="input-file" @change="(e) => uploadMedia(e, 'audio')" hidden>
                <audio-player 
                    id="background_audio"
                    :source="audioSource(form.background_audio)" 
                    :busy="busyUploading == 'background_audio'"
                    @upload="openFileDialog('background_audio')" 
                    @delete="deleteMedia('background_audio')"
                />
                
                <!-- MEDIA -->
                <h4 class="info-heading mt-3">
                    Media
                    <span class="info-icon" v-b-tooltip.hover :title="`Images must be at least ${minImageSize}x${minImageSize}`">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>

                <!-- IMAGES  -->
                <b-row class="image-row mb-3">
                    <b-col lg="4">
                        <input id="image1" name="image1" type="file" class="input-file" @change="(e) => uploadMedia(e, 'image')" hidden>
                        <image-box 
                            id="image1"
                            :url="imagePath(form.image1, 'sm')" 
                            :busy="busyUploading == 'image1'"
                            @click="openFileDialog('image1')" 
                            @delete="deleteMedia('image1')"
                        ></image-box>
                    </b-col>
                    <b-col lg="4">
                        <input id="image2" name="image2" type="file" class="input-file" @change="(e) => uploadMedia(e, 'image')" hidden>
                        <image-box 
                            id="image2"
                            :url="imagePath(form.image2, 'sm')" 
                            :busy="busyUploading == 'image2'"
                            @click="openFileDialog('image2')" 
                            @delete="deleteMedia('image2')"
                        ></image-box>
                    </b-col>
                    <b-col lg="4">
                        <input id="image3" name="image3" type="file" class="input-file" @change="(e) => uploadMedia(e, 'image')" hidden>
                        <image-box 
                            id="image3"
                            :url="imagePath(form.image3, 'sm')" 
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

                <!-- PRIZE -->
                <h4 class="mt-3">Trophy</h4>

                <div class="trophy-box d-flex">
                    <input id="trophy_image" name="trophy_image" type="file" class="input-file" @change="(e) => uploadMedia(e, 'icon')" hidden>

                    <img v-if="! form.trophy_image" src="/images/trophy.png" width="100" height="100" class="mr-3" />
                    <div v-else 
                        class="trophy-img mr-3" 
                        :style="{ 'background-image': `url('${imagePath(form.trophy_image)}')` }" 
                    >
                        <div class="delete" @click.stop="deleteMedia('trophy_image')">
                            <fa :icon="['fas', 'times']" />
                        </div>
                    </div>

                    <b-btn variant="primary" class="f-1" height="100" @click.stop="openFileDialog('trophy_image')" :disabled="busyUploading == 'trophy_image'">
                        <fa v-if="busyUploading == 'trophy_image'" size="lg" class="fa-spin" :icon="['fas', 'spinner']" />
                        <fa v-else size="lg" :icon="['fas', 'plus']"/><br/>
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
                <!-- /end PRIZE -->

                <!-- START/END POINTS -->
                <div v-if="tour.type == 'adventure'">
                    <h4 class="mt-3">START POINT</h4>

                    <b-form-group>
                        <b-form-select :disabled="form.busy" v-model="form.start_point_id">
                            <option value="">-- Select Stop --</option>
                            <option v-for="item in tour.stops" 
                                :key="item.id" 
                                :value="item.id"
                                v-text="item.title"
                            ></option>
                        </b-form-select>
                        
                        <input-help :form="form" field="start_point_id" text=""></input-help>
                    </b-form-group>

                    <b-form-group>
                        <b-form-textarea id="start_message"
                            :disabled="form.busy"
                            type="text"
                            v-model="form.start_message"
                            required
                            rows="3"
                            placeholder="Start Point Message">
                        </b-form-textarea>
                        <input-help :form="form" field="start_message" text=""></input-help>
                    </b-form-group>

                    <h3>Start Point Media</h3>
                    <b-row class="image-row mb-3">
                        <b-col lg="4">
                            <input id="start_image" name="start_image" type="file" class="input-file" @change="(e) => uploadMedia(e, 'image')" hidden>
                            <image-box 
                                id="start_image"
                                :url="imagePath(form.start_image, 'sm')" 
                                :busy="busyUploading == 'start_image'"
                                @click="openFileDialog('start_image')" 
                                @delete="deleteMedia('start_image')"
                            ></image-box>
                        </b-col>
                    </b-row>

                    <youtube-input :form="form" id="start_video_url" v-model="form.start_video_url"></youtube-input>

                    <h4 class="mt-3">END POINT</h4>
                    <b-form-group>
                        <b-form-select :disabled="form.busy" v-model="form.end_point_id">
                            <option value="">-- Select Stop --</option>
                            <option v-for="item in tour.stops" 
                                :key="item.id" 
                                :value="item.id"
                                v-text="item.title"
                            ></option>
                        </b-form-select>
                        
                        <input-help :form="form" field="end_point_id" text=""></input-help>
                    </b-form-group>

                    <b-form-group>
                        <b-form-textarea id="end_message"
                            :disabled="form.busy"
                            type="text"
                            v-model="form.end_message"
                            required
                            rows="3"
                            placeholder="End Point Message">
                        </b-form-textarea>
                        <input-help :form="form" field="end_message" text=""></input-help>
                    </b-form-group>

                    <h3>End Point Media</h3>
                    <b-row class="image-row mb-3">
                        <b-col lg="4">
                            <input id="end_image" name="end_image" type="file" class="input-file" @change="(e) => uploadMedia(e, 'image')" hidden>
                            <image-box 
                                id="end_image"
                                :url="imagePath(form.end_image, 'sm')" 
                                :busy="busyUploading == 'end_image'"
                                @click="openFileDialog('end_image')" 
                                @delete="deleteMedia('end_image')"
                            ></image-box>
                        </b-col>
                    </b-row>

                    <youtube-input :form="form" id="end_video_url" v-model="form.end_video_url"></youtube-input>
                </div>
                <!-- /end START/END POINTS -->
                
                <!-- SAVE BUTTONS -->
                <h4 class="info-heading mt-4">
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
                        <busy-button :busy="form.busy" variant="danger" class="w-100" @click="destroy()">
                            <fa :icon="['fas', 'times']"/>&nbsp;&nbsp;Delete
                        </busy-button>
                    </b-col>
                </b-row>
            </div>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirmDelete">
            Are you sure you want to delete this Tour?
        </confirm-modal>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import UploadsMedia from "../../mixins/UploadsMedia";
import Geocoding from "../../mixins/Geocoding";

export default {
    mixins: [UploadsMedia, Geocoding],

    data: () => ({
        form: new Form({
            id: null,
            title: "",
            description: "",
            type: "",
            pricing_type: "",

            location: {
                latitude: "",
                longitude: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipcode: ""
            },
            background_audio: "",
            background_audio_id: "",
            deleted_at: "",
            description: "",
            end_image: "",
            end_message: "",
            end_point_id: "",
            end_video_url: "",
            facebook_url: "",
            image1: "",
            image1_id: "",
            image2: "",
            image2_id: "",
            image3: "",
            image3_id: "",
            instagram_url: "",
            intro_audio: "",
            intro_audio_id: "",
            main_image: "",
            main_image_id: "",
            pin_image: "",
            pin_image_id: "",
            pricing_type: "",
            prize_details: "",
            prize_instructions: "",
            published_at: "",
            start_image: "",
            start_message: "",
            start_point_id: "",
            start_video_url: "",
            stops: [],
            route: [],
            stopRoutes: [],
            title: "",
            trophy_image: "",
            trophy_image_id: "",
            twitter_url: "",
            type: "",
            video_url: ""
        })
    }),

    computed: {
        ...mapGetters({
            tour: "tours/current",
            createUrl: "tours/createUrl",
            saveUrl: "tours/saveUrl",
        }),

        hasTour() {
            return this.tour.id ? true : false;
        }
    },

    methods: {
        submit() {
            let url = this.createUrl;
            let method = "post";

            if (this.hasTour) {
                url = this.saveUrl;
                method = "patch";
            }

            return this.form.submit(method, url);
        },

        save() {
            this.submit()
                .then(({ data }) => {
                    console.log(data);
                    this.$store.commit("tours/setCurrent", data.data);
                })
                .catch(e => {
                    console.log("save tour error:");
                    console.log(e);
                });
        },

        updateLocation() {
            console.log('tour location changed');
            this.$store.commit('tours/setCurrent', this.form.data());
        },

        destroy() {
            this.$refs.confirmDelete.confirm(() => {
                this.form.busy = true;
                let f = new Form({});
                f.delete(this.saveUrl)
                    .then( ({ data }) => {
                        this.$router.push({ name: 'home' });
                        this.form.busy = false;
                    }).catch( e => {
                        alerts.addMessage('error', e.response.data.message);
                        this.form.busy = false;
                    });
            });
        },
    },

    mounted() {
        if (this.tour.id) {
            this.form.fill(this.tour);
        }
    },

    watch: {
        tour(newVal) {
            if (newVal.id) {
                this.form.fill(newVal);
            }
        }
    }
};
</script>

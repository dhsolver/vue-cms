<template>
    <div>
        <div v-show="hasTour">
            <!-- FEATURE IMAGE -->
            <input id="main_image" name="main_image" type="file" class="input-file" @change="uploadImage" hidden>
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
                <input id="pin_image" name="pin_image" type="file" class="input-file" @change="uploadIcon" hidden>
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
                    :disabled="busy"
                    type="text"
                    v-model="form.title"
                    required
                    placeholder="Title">
                </b-form-input>
                <input-help :form="form" field="title" text=""></input-help>
            </b-form-group>
            
            <!-- STATUS / PUBLISH -->
            <div v-if="hasTour" class="d-flex mb-3" style="align-items: baseline">
                <h4 class="info-heading mt-3 f-1">
                    Status: 
                    <span v-if="tour.status == 'draft'" class="text-danger">DRAFT</span>
                    <span v-if="tour.status == 'live'" class="text-success">LIVE</span>
                    <span v-if="tour.status == 'pending'" class="text-warning">PENDING</span>
                    <span class="info-icon" v-b-tooltip.hover :title="statusDescription">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>
                <div class="ml-auto">
                    <busy-button v-if="tour.status == 'draft'" variant="success" size="sm" :disabled="busy" @click.prevent="publish()">Publish</busy-button>
                    <busy-button v-if="tour.status == 'live'" variant="danger" size="sm" :disabled="busy" @click.prevent="unpublish()">Unpublish</busy-button>
                    <busy-button v-if="! isAdmin && tour.status == 'pending'" class="ml-3" variant="danger" size="sm" :disabled="busy" @click.prevent="unpublish()">Cancel</busy-button>
                </div>
            </div>
            <div v-if="isAdmin && tour.status == 'pending'" class="d-flex mb-4">
                <busy-button variant="success" size="sm" :disabled="busy" @click.prevent="publish()">Approve</busy-button>
                <busy-button class="ml-3" variant="danger" size="sm" :disabled="busy" @click.prevent="unpublish()">Cancel</busy-button>
            </div>
            
            <div v-if="hasTour">
                <h4>Description</h4>
                <b-form-group>
                    <b-form-textarea id="description"
                        :disabled="busy"
                        type="text"
                        v-model="form.description"
                        required
                        rows="5"
                        placeholder="Description">
                    </b-form-textarea>
                    <input-help :form="form" field="description" text=""></input-help>
                </b-form-group>
            </div>
            
            <h4>Pricing</h4>
            <b-form-group>    
                <b-form-select 
                    v-model="form.pricing_type" 
                    :disabled="busy">
                    <option value="">-- Select Pricing --</option>
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                </b-form-select>
                <input-help :form="form" field="pricing_type" text=""></input-help>
            </b-form-group>

            <b-form-group v-if="this.isAdmin && form.pricing_type == 'premium'">    
            <h4>In-App ID</h4>
                <b-form-input id="in_app_id"
                    :disabled="busy"
                    type="text"
                    v-model="form.in_app_id"
                    placeholder="In-App ID">
                </b-form-input>
                <input-help :form="form" field="in_app_id" text=""></input-help>
            </b-form-group>

            <h4>Junket Type</h4>
            <b-form-group>    
                <b-form-select 
                    v-model="form.type" 
                    :disabled="busy">
                    <option value="">-- Select Type --</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="indoor">Indoor</option>
                    <option value="adventure">Adventure</option>
                </b-form-select>
                <input-help :form="form" field="type" text=""></input-help>
            </b-form-group>

            <div v-if="hasTour">
                <h4>Location</h4>
                <address-form id="location" :form="form" v-model="form.location" @input="updateLocation"></address-form>

                <!-- SOCIAL URLS -->
                <h4>Social</h4>

                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon fb-circle">
                            <fa :icon="['fab', 'facebook-f']"/>
                        </span>
                        <input type="text" placeholder="Facebook URL" v-model="form.facebook_url" id="facebook_url" :disabled="busy" />
                    </div>
                    <input-help :form="form" field="facebook_url" text=""></input-help>
                </b-form-group>
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon ig-circle">
                            <fa :icon="['fab', 'instagram']"/>
                        </span>
                        <input type="text" placeholder="Instagram URL" v-model="form.instagram_url" id="instagram_url" :disabled="busy" />
                    </div>
                    <input-help :form="form" field="instagram_url" text=""></input-help>
                </b-form-group>
                <b-form-group>
                    <div class="icon-input social-input d-flex">
                        <span class="icon twitter-circle">
                            <fa :icon="['fab', 'twitter']"/>
                        </span>
                        <input type="text" placeholder="Twitter URL" v-model="form.twitter_url" id="twitter_url" :disabled="busy" />
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
                <input id="intro_audio" name="intro_audio" type="file" class="input-file" @change="uploadAudio" hidden>
                <audio-player 
                    id="intro_audio"
                    :source="audioSource(form.intro_audio)"
                    :busy="busyUploading == 'intro_audio'"
                    @upload="openFileDialog('intro_audio')"
                    @delete="deleteMedia('intro_audio')"
                />
                
                <h3>Background Audio</h3>
                <input id="background_audio" name="background_audio" type="file" class="input-file" @change="uploadAudio" hidden>
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
                        <input id="image1" name="image1" type="file" class="input-file" @change="uploadImage" hidden>
                        <image-box 
                            id="image1"
                            :url="imagePath(form.image1, 'sm')" 
                            :busy="busyUploading == 'image1'"
                            @click="openFileDialog('image1')" 
                            @delete="deleteMedia('image1')"
                        ></image-box>
                    </b-col>
                    <b-col lg="4">
                        <input id="image2" name="image2" type="file" class="input-file" @change="uploadImage" hidden>
                        <image-box 
                            id="image2"
                            :url="imagePath(form.image2, 'sm')" 
                            :busy="busyUploading == 'image2'"
                            @click="openFileDialog('image2')" 
                            @delete="deleteMedia('image2')"
                        ></image-box>
                    </b-col>
                    <b-col lg="4">
                        <input id="image3" name="image3" type="file" class="input-file" @change="uploadImage" hidden>
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

                    <img v-if="! form.trophy_image" src="/images/trophy-default.png" width="100" height="100" class="mr-3" />
                    <div v-else 
                        class="trophy-img mr-3" 
                        :style="{ 'background-image': `url('${imagePath(form.trophy_image)}')` }" 
                    >
                        <img src="/images/trophy-cutout.png" width="100" height="100"/>
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

                <div class="form-check mt-3 mb-3">
                    <div class="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" class="custom-control-input" id="has_prize" v-model="form.has_prize">
                        <label class="custom-control-label" for="has_prize">Offer Prize</label>
                    </div>
                </div>

                <div v-if="form.has_prize">
                    <h3>Prize Details</h3>
                    <b-form-group>
                        <b-form-textarea id="prize_details"
                            :disabled="busy"
                            type="text"
                            v-model="form.prize_details"
                            required
                            rows="3"
                            placeholder="Prize Details">
                        </b-form-textarea>
                        <input-help :form="form" field="prize_details" text=""></input-help>
                    </b-form-group>

                    <h3>Time Limit
                        <span class="info-icon" v-b-tooltip.hover title="The length of time (in hours) that the prize will be available after a user has won it.">
                            <fa :icon="['fas', 'info']"/>
                        </span>
                    </h3>
                    <b-form-group>
                        <b-form-input id="prize_time_limit"
                            :disabled="busy"
                            type="text"
                            v-model="form.prize_time_limit"
                            required
                            placeholder="Time Limit">
                        </b-form-input>
                        <input-help :form="form" field="prize_time_limit" text=""></input-help>
                    </b-form-group>
                    
                    <h3>Prize Location</h3>
                    <address-form id="prize_location" :form="form" v-model="form.prize_location" @input="updatePrizeLocation"></address-form>

                    <h3>PRIZE INSTRUCTIONS</h3>
                    <b-form-group>
                        <b-form-textarea id="prize_instructions"
                            :disabled="busy"
                            type="text"
                            v-model="form.prize_instructions"
                            required
                            rows="3"
                            placeholder="Redemption Instructions">
                        </b-form-textarea>
                        <input-help :form="form" field="prize_instructions" text=""></input-help>
                    </b-form-group>
                </div>
                <!-- /end PRIZE -->

                <!-- START/END POINTS -->
                <div v-if="tour.type == 'adventure'" class="mb-3">
                    <h4 class="mt-3">START POINT</h4>

                    <b-form-group>
                        <b-form-select :disabled="busy" v-model="form.start_point_id">
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
                            :disabled="busy"
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
                            <input id="start_image" name="start_image" type="file" class="input-file" @change="uploadImage" hidden>
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
                        <b-form-select :disabled="busy" v-model="form.end_point_id">
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
                            :disabled="busy"
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
                            <input id="end_image" name="end_image" type="file" class="input-file" @change="uploadImage" hidden>
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
                <b-row>
                    <b-col lg="6">
                        <busy-button 
                            :busy="busy" 
                            variant="primary" 
                            class="w-100" 
                            @click="save" 
                            :disabled="! tourWasModified"
                        >
                            <fa :icon="['fas', 'check']"/>&nbsp;&nbsp;Save
                        </busy-button>
                    </b-col>
                    <b-col lg="6">
                        <busy-button :busy="busy" variant="danger" class="w-100" @click="destroy()">
                            <fa :icon="['fas', 'times']"/>&nbsp;&nbsp;Delete
                        </busy-button>
                    </b-col>
                </b-row>
            </div>
        </div>

        <!-- Confirmation modals -->
        <confirm-modal ref="confirmDelete">
            Are you sure you want to delete this Tour?
        </confirm-modal>
        <confirm-modal ref="confirmUnpublish">
            Are you sure you want to unpublish this Tour?  This will remove it from the mobile app's tour list.
        </confirm-modal>
        <confirm-modal ref="confirmCancelApproval">
            Are you sure you want to cancel your publish tour request?
        </confirm-modal>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import UploadsMedia from "../mixins/UploadsMedia";
import Geocoding from "../mixins/Geocoding";

export default {
    mixins: [ UploadsMedia, Geocoding ],

    data: () => ({
        busy: false,
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
                country: "",
                state: "",
                zipcode: ""
            },
            background_audio: "",
            background_audio_id: "",
            deleted_at: "",
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
            prize_time_limit: "",
            prize_location: {
                latitude: "",
                longitude: "",
                address1: "",
                address2: "",
                city: "",
                country: "",
                state: "",
                zipcode: ""
            },
            start_image: "",
            start_message: "",
            start_point_id: "",
            start_video_url: "",
            stops: [],
            route: [],
            title: "",
            trophy_image: "",
            trophy_image_id: "",
            twitter_url: "",
            type: "",
            video_url: "",
            in_app_id: '',
        }),
    }),

    computed: {
        ...mapState({
            tourWasModified: state => state.tours.wasModified,
            formViewMode: state => state.tours.formViewMode,
        }),
        ...mapGetters({
            tour: "tours/current",
            createUrl: "tours/createUrl",
            saveUrl: "tours/saveUrl",
            isAdmin: 'auth/isAdmin',
        }),

        hasTour() {
            return this.tour.id ? true : false;
        },

        statusDescription() {
            switch(this.tour.status) {
                case 'live':
                    return 'This tour is published and live in the mobile app.';
                case 'pending':
                    return 'This tour is awaiting admin approval to be published in the mobile app.';
                default:
                    return 'This tour is not published and will not appear in the mobile app.';
            }
        },
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

                    this.form.fill(this.tour);
                    this.$store.commit('tours/setOriginalRoutes', this.tour.route);

                    Vue.nextTick(() => {
                        this.markFormAsChanged(false);
                    });
                })
                .catch(e => {
                    console.log("save tour error:");
                    console.log(e);
                });
        },

        updateLocation() {
            console.log('tour location changed');
            console.log(this.form.location);
            this.$store.commit('tours/setCurrent', {...this.form.data()});
        },

        updatePrizeLocation() {
            console.log('tour prize location changed');
            console.log(this.form.prize_location);
            this.$store.commit('tours/setCurrent', {...this.form.data()});
        },

        destroy() {
            this.$refs.confirmDelete.confirm(() => {
                this.busy = true;
                let f = new Form({});
                f.delete(this.saveUrl)
                    .then( ({ data }) => {
                        this.$router.push({ name: 'home' });
                        this.busy = false;
                    }).catch( e => {
                        alerts.addMessage('error', e.response.data.message);
                        this.busy = false;
                    });
            });
        },
        
        markFormAsChanged(onoff) {
            this.$store.commit('tours/setWasModified', onoff);
        },

        async publish() {
            // handle publish from outside this component so you can prompt 
            // for confirmation of changes
            this.$emit('publish');
        },

        async unpublish(confirmed = false) {
            if (! confirmed && this.tour.is_awaiting_approval) {
                return this.$refs.confirmCancelApproval.confirm(() => {
                    this.unpublish(true);
                });
            } else if (! confirmed) {
                return this.$refs.confirmUnpublish.confirm(() => {
                    this.unpublish(true);
                });
            }

            this.busyPublishing = true;
            this.busy = true;

            axios.put(this.saveUrl + '/unpublish', {})
                .then(response => {
                    this.$store.commit('tours/setCurrent', response.data.data);
                    alerts.addMessage('success', response.data.message);
                    this.busyPublishing = false;
                    this.busy = false;

                    Vue.nextTick(() => {
                        this.markFormAsChanged(false);
                    });
                })
                .catch(e => {
                    console.log(e);
                    if (e.response.data.message) {
                        alerts.addMessage('error', e.response.data.message);
                        this.busyPublishing = false;
                        this.busy = false;
                    }
                })
        },
    },

    async mounted() {
        // if (this.tour.id) {
            console.log('(mount) initial tour set');
            this.form = new Form(this.tour);
            // this.form.fill(this.tour);
            this.$store.commit('tours/setOriginalRoutes', this.tour.route);
            await Vue.nextTick();
            this.markFormAsChanged(false);
        // }
    },

    watch: {
        async tour(newVal, oldVal) {
            console.log('tour watch changed');
            if (! newVal.id) {
                // new tour
                console.log('new tour');
                this.form = new Form(newVal);
                this.$store.commit('tours/setOriginalRoutes', newVal.route);

                await Vue.nextTick();
                this.markFormAsChanged(true);
                return;
            }

            if (newVal.id != oldVal.id) {
                console.log("tour form data changed");
                console.log(newVal);
                this.form.fill(newVal);
                this.$store.commit('tours/setOriginalRoutes', newVal.route);
                await Vue.nextTick();
                this.markFormAsChanged(false);
                return
            }

            if (! oldVal.id) {
                // tour set initially
                console.log('initial tour set');
                this.form.fill(newVal);
                this.$store.commit('tours/setOriginalRoutes', newVal.route);
                this.markFormAsChanged(false);
                return;
            }

            // state object was modified (location/routes/radius), update the form to reflect changes
            this.form.update(newVal);
        },

        'form': {
            handler() {
                console.log('form was modified');
                if (this.form.isDirty()) {
                    console.log('tour form has changed');
                    this.markFormAsChanged(true);
                }
            },
            deep: true,
        },
    }
};
</script>

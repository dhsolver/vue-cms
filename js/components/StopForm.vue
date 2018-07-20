<template>
    <div>
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

        <div class="p-3">
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

            <div v-if="tour.type != 'indoor'">
                <div class="flex align-items-base">
                    <h4 class="f-1">Location</h4>
                    <a v-if="!useMapForLocation" href="#" class="reverse mr-2" @click.prevent="useMap()">
                        <fa :icon="['fas', 'map-marker-alt']" />&nbsp;Use Map
                    </a>
                    <a v-else href="#" class="reverse mr-2" @click.prevent="cancelUseMap()">
                        Cancel
                    </a>
                </div>
                <address-form 
                    :form="form" 
                    v-model="form.location" 
                    @input="updateCurrentStop" 
                    :overlay="useMapForLocation" />

                <h4 class="mt-4 info-heading">
                    Trigger Radius
                    <span class="info-icon" v-b-tooltip.hover title="Radius in meters">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                </h4>

                <b-form-group>
                    <b-form-input id="play_radius"
                        :disabled="form.busy"
                        type="text"
                        v-model="form.play_radius"
                        required
                        @input="updateCurrentStop"
                        placeholder="Location Trigger">
                    </b-form-input>
                    <input-help :form="form" field="play_radius" text=""></input-help>
                </b-form-group>
            </div>

            <!-- AUDIO -->
            <h4 class="info-heading">
                Audio
                <span class="info-icon" v-b-tooltip.hover title="Audio must be in MP3 format, mono recommended">
                    <fa :icon="['fas', 'info']"/>
                </span>
            </h4>
            
            <div v-if="tour.type == 'indoor'">
                <h3>Intro Audio</h3>
                <input id="intro_audio" name="intro_audio" type="file" class="input-file" @change="uploadAudio" hidden>
                <audio-player 
                    id="intro_audio"
                    :source="audioSource(form.intro_audio)"
                    :busy="busyUploading == 'intro_audio'"
                    @upload="openFileDialog('intro_audio')"
                    @delete="deleteMedia('intro_audio')"
                />
            </div>
            
            <h3 v-if="tour.type == 'indoor'">Background Audio</h3>
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

            <!-- QUESTIONS -->
            <div v-if="tour.type == 'adventure'">
                <h4 class="info-heading mt-3">
                    Decisions
                    <span class="info-icon" v-b-tooltip.hover title="Decisions are the choices that the user will make after they receive all the information you provided on this stop. The choice that they make will help determine their points and reveal the next location that the user will go to. Decisions are either multiple choice or fill in the blank. Each choice must lead to another stop.">
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

                        <h3>Next Stop</h3>
                        <next-stop-dropdown v-model="form.next_stop_id" :busy="form.busy" @changeRoute="updateRoutes" />
                    </b-tab>

                    <b-tab title="Multiple Choice" :active="form.is_multiple_choice">
                        <!-- Multiple Choice -->
                        <h3 class="mt-3">Options</h3>

                        <stop-choice v-for="(item, index) in form.choices"
                            :key="index + '' + item.id"
                            :busy="form.busy"
                            v-model="form.choices[index]"
                            @delete="deleteChoice(index)"
                            @changeRoute="updateRoutes"
                        ></stop-choice>
                        
                        <b-btn size="sm" variant="primary" class="w-100 mt-3" @click="addChoice">
                        <fa :icon="['fas', 'map-marker-alt']"/>&nbsp;&nbsp;Add Decision Point</b-btn>
                        <!-- /end Multiple Choice -->
                    </b-tab>
                </b-tabs>

                <!-- /end QUESTIONS -->
            </div>
            <!-- <div v-if="tour.type == 'outdoor'">
                <h4 class="info-heading mt-3">
                    Next Stop
                    <span class="info-icon" v-b-tooltip.hover title="Set the route to the next stop here">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                    <next-stop-dropdown class="mt-2" v-model="form.next_stop_id" :busy="form.busy" :no-routes="true" />
                </h4>
            </div> -->

            <!-- SAVE -->
            <b-row class="mt-5">
                <b-col lg="6">
                    <busy-button :busy="form.busy" variant="primary" class="w-100" @click="save" :disabled="!hasChanges">
                        <fa :icon="['fas', 'check']"/>&nbsp;&nbsp;Save
                    </busy-button>
                </b-col>
                <b-col lg="6">
                    <busy-button :busy="form.busy" variant="danger" class="w-100" @click="deleteStop">
                        <fa :icon="['fas', 'times']"/>&nbsp;&nbsp;Delete
                    </busy-button>
                </b-col>
            </b-row>
        </div>

        <!-- Confirmation modal -->
        <confirm-modal ref="confirm" yesButton="Delete">
            Are you sure you want to delete this stop?
        </confirm-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UploadsMedia from '../mixins/UploadsMedia';
import Geocoding from '../mixins/Geocoding';

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
            next_stop_id: null,
            choices: [],
            video_url: '',

            intro_audio: "",
            intro_audio_id: "",
            background_audio: "",
            background_audio_id: "",
            play_radius: 0,
            main_image: '',
            main_image_id: '',
            image1: '',
            image1_id: '',
            image2: '',
            image2_id: '',
            image3: '',
            image3_id: '',

            routes: [],
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
            saveTourUrl: 'tours/saveUrl',

            routes: 'routes/current',
            routeMode: 'routes/mode',
            draggedMarker: 'map/draggedMarker',
            hasChanges: 'tours/getStopChanges',
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
        updateRoutes(routes) {
            this.form.routes = routes;
        },

        submit() {
            let url = this.createStopUrl;
            let method = 'post';

            if (this.hasStop) {
                url = this.saveStopUrl;
                method = 'patch'
            }

            return this.form.submit(method, url);
        },

        async save() {
            // remove other type of questions when switching type
            if (this.isMultipleChoice) {
                this.form.next_stop_id = null;
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
                    if (this.hasStop) {
                        this.$store.commit('tours/updateStop', data.data);
                    } else {
                        this.$store.commit('tours/pushStop', data.data);
                        this.$store.commit('tours/setCurrentStop', data.data);
                    }
                    
                    this.form.fill(this.stop);

                    Vue.nextTick(() => {
                        this.markFormAsChanged(false);
                    });
                })
                .catch(e => {
                    console.log('save stop error:');
                    console.log(e);
                });
        },

        addChoice() {
            console.log('adding choice...');
            this.form.choices.push({
                id: '',
                tour_stop_id: this.stop.id,
                order: this.form.choices.length + 1,
                answer: '',
                next_stop_id: null,
            });
        },

        deleteChoice(index) {
            this.form.choices.splice(index, 1);
        },

        addStop() {
            console.log('adding stop...');
            this.$emit('addStop')
        },
        
        updateCurrentStop() {
            console.log('update current changed');
            if (this.form.isDirty()) {
                // console.log('stop location changed');
                this.$store.commit('tours/setCurrentStop', {...this.form.data()});
                this.markFormAsChanged(true);
            }
        },

        async deleteStop(confirm = true) {
            this.$refs.confirm.confirm(() => {
                this.form.busy = true;
                axios.delete(this.saveTourUrl + `/stops/${this.stop.id}`)
                    .then( ({ data }) => {
                        this.$emit('deleted');
                        this.form.busy = false;
                    })
                    .catch( e => {
                        alerts.addMessage('error', e.response.data.message);
                        this.form.busy = false;
                    })  
            });
        },

        useMap() {
            this.$store.commit('map/setCursor', 'n-resize');
            this.useMapForLocation = true;
            this.$store.commit('tours/setStopMode', 'map');
        },

        cancelUseMap() {
            this.useMapForLocation = false
            this.$store.commit('map/setCursor', undefined);
        },

        markFormAsChanged(changed = false) {
            this.$store.commit('tours/setStopChanges', changed);
        },
    },

    async mounted() {
        this.form.fill(this.stop);
        await Vue.nextTick();
        this.markFormAsChanged(false);
    },

    watch: {
        async stop(newVal, oldVal) {
            // this is a fix because when the stop form changes for some reason
            // the v-model syncs twice and updates this value signaling 'changes' 
            // in the stop form.
            // this.form.next_stop_id = '';
            // await Vue.nextTick();
            console.log('stop watch changed');
            if (! newVal.id) {
                // new stop
                console.log('new stop');
                this.form = new Form(newVal);

                await Vue.nextTick();
                this.markFormAsChanged(true);
                return;
            }

            if (newVal.id != oldVal.id) {
                // stop has actually changed
                console.log("stop form stop changed");
                console.log(newVal);
                if (this.tour.type == 'adventure') {
                    this.$store.commit('routes/clearCurrent');
                }
                this.form.fill(newVal);
                await Vue.nextTick();
                this.markFormAsChanged(false);
                return;
            }

            if (! oldVal.id) {
                // stop is set initially
                this.form.fill(newVal);
                this.markFormAsChanged(false);
                return;
            }

            // this.form.fill(newVal);
        },

        'form': {
            handler() {
                if (this.form.isDirty()) {
                    console.log('stop form changes');
                    this.markFormAsChanged(true);
                }
            },
            deep: true,
        },
        
        async clickedPoint(newVal, oldVal) {
            if (this.useMapForLocation) {
                this.useMapForLocation = false;
                this.$store.commit('map/setCursor', undefined);

                let address = await this.reverseLookup(newVal.latitude, newVal.longitude)

                this.form.location = {
                    ...address,
                    latitude: newVal.latitude,
                    longitude: newVal.longitude,
                }

                // this.markFormAsChanged(true);
                this.updateCurrentStop();
            }
        },

        async draggedMarker(newVal, oldVal) {
            if (newVal.stop.id != this.stop.id) {
                return;
            }

            let address = await this.reverseLookup(newVal.latLng.lat, newVal.latLng.lng)

            this.form.location = {
                ...address,
                latitude: newVal.latLng.lat,
                longitude: newVal.latLng.lng,
            }

            // this.markFormAsChanged(true);
            this.updateCurrentStop();
        },

        'form.choices': {
            handler(newVal, oldVal) {
                // console.log(newVal);
                // console.log(newVal == this.form.choices);
            },
            deep: true,
        },
    },
}
</script>

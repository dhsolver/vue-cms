<template>
    <div>
        <div class="feature-box">
            <div class="addlink">
            <a href="#">
                <fa :icon="['fas', 'plus']" />
                <br>Add Feature Image</a>
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
            <audio-player :sources="['none']"></audio-player>

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
                <b-tab title="Fill-In-The-Blank" >
                    <h3 class="mt-3">Correct Answer</h3>
                    <b-form-group>
                        <b-form-textarea id="answer"
                            :disabled="form.busy"
                            type="text"
                            v-model="form.answer"
                            required
                            rows="4"
                            placeholder="">
                        </b-form-textarea>
                        <input-help :form="form" field="answer" text=""></input-help>
                    </b-form-group>

                    <h3>Success Message</h3>
                    <b-form-group>
                        <b-form-textarea id="message"
                            :disabled="form.busy"
                            type="text"
                            v-model="form.message"
                            required
                            rows="4"
                            placeholder="">
                        </b-form-textarea>
                        <input-help :form="form" field="message" text=""></input-help>
                    </b-form-group>
                </b-tab>

                <b-tab title="Multiple Choice" active>
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
                    <b-btn variant="primary" class="w-100">
                        <fa :icon="['fas', 'check']"/>&nbsp;&nbsp;Save
                    </b-btn>
                </b-col>
                <b-col lg="6">
                    <b-btn variant="secondary" class="w-100">
                        <fa :icon="['fas', 'map-marker-alt']"/>&nbsp;&nbsp;Add a Stop
                    </b-btn>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['stop'],

        data: () => ({
            locationType: 'gps',

            form: new Form({}),
            busy: false,
        }),

        methods: {
        }
    }
</script>

<style>
</style>
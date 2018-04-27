<template>
    <div class="wrapper shadow-lg">

        <!-- FORM --> 
        <div class="bg-white rounded right-side" style="overflow: auto">
            <div class="d-flex">
                <b-btn variant="info" class="square f-1" @click="back()">
                    Dashboard
                </b-btn>
                <b-btn variant="info" class="square f-1" style="margin-left: 1px">
                    Add Stop
                </b-btn>
            </div>

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
                        :disabled="form.busy"
                        class="mb-3">
                        <option value="">Free</option>
                        <option value="">Premium</option>
                    </b-form-select>
                    <input-help :form="form" field="pricing_type" text=""></input-help>
                </b-form-group>

                <h4>Junket Info</h4>

                <b-form-group>    
                    <b-form-select 
                        v-model="form.type" 
                        :disabled="form.busy">
                        <option value="">Outdoor</option>
                        <option value="">Indoor</option>
                        <option value="">Adventure</option>
                    </b-form-select>
                    <input-help :form="form" field="type" text=""></input-help>
                </b-form-group>

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

                <b-form-group>
                    <div class="d-flex">
                        <b-form-input id="state"
                            :disabled="form.busy"
                            type="text"
                            v-model="form.state"
                            required
                            placeholder="State"
                            class="f-1">
                        </b-form-input>

                        <b-form-input id="zipcode"
                            :disabled="form.busy"
                            type="text"
                            v-model="form.zipcode"
                            required
                            placeholder="Zipcode"
                            class="f-5 ml-2">
                        </b-form-input>
                    </div>
                    <input-help :form="form" field="zipcode" text=""></input-help>
                    <input-help :form="form" field="state" text=""></input-help>
                </b-form-group>
                
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

                <h4 class="float-left">Audio</h4>
                    <span class="info-icon">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                <div class="clearfix"></div>

                <h4 class="float-left">Media</h4>
                    <span class="info-icon">
                        <fa :icon="['fas', 'info']"/>
                    </span>
                <div class="clearfix"></div>

            </div>
        </div>

        <!-- STOP LIST -->
        <div class="left-side">
            <div class="bg-gray compass-bg rounded p-3 h-100">
                <b-row v-for="i in Math.ceil(tour.stops.length / 4)" :key="i">
                    <b-col xl="3" class="box-col" v-for="item in tour.stops.slice((i - 1) * 4, i * 4)" :key="item.id">
                        <stop-box :stop="item"></stop-box>
                    </b-col>
                </b-row>
            </div>
        </div>
<!--         
        <div class="bg-gray map-pin-bg rounded d-flex flex-wrap p-3 stop-list">
            <stop-box v-for="item in tour.stops" :stop="item" :key="item.id"></stop-box>
        </div> -->

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    middleware: 'auth',

    metaInfo() {
        return { title: 'Edit Tour' }
    },
    
    computed: mapGetters({
        user: 'auth/user',
        isAdmin: 'auth/isAdmin',
    }),

    methods: {
        async logout () {
            this.$store.commit('auth/logout');
            window.location = '/';
        },

        back() {
            this.$router.push({ name: 'home', params: { id: 1 } });
        }
    },

    data: () => ({
        filter: '',
        form: new Form({
            title: '',
        }),

        tour: {
            type: "tour",
            stops: [
                { id: 1, title: "test" },
                { id: 1, title: "test" },
                { id: 1, title: "test" },
                { id: 1, title: "test" },
            ]
        }
    }),
}
</script>

<style>
.stop-list {
    flex: 1; 
    overflow: auto;
    justify-content: space-between;
    min-width: 610px;
}
.ig-circle {
    width: 25px;
    height: 25px;
    color: #fff;
    text-align: center;
    border-radius: 20px;
    background: #dc8e3f;
    background: -moz-linear-gradient(top, #dc8e3f 0%, #c32b66 52%, #7c22b7 100%);
    background: -webkit-linear-gradient(top, #dc8e3f 0%,#c32b66 52%,#7c22b7 100%);
    background: linear-gradient(to bottom, #dc8e3f 0%,#c32b66 52%,#7c22b7 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#dc8e3f', endColorstr='#7c22b7',GradientType=0 )
}
.fb-circle {
    width: 25px;
    height: 25px;
    color: #fff;
    text-align: center;
    border-radius: 20px;
    background: #3b5998;
}
.twitter-circle {
    width: 25px;
    height: 25px;
    color: #fff;
    text-align: center;
    border-radius: 20px;
    background: #75bbf1;
}
.social-input .icon {
    width: 25px!important;
    margin-right: 10px!important;
    color: #fff;
}
</style>
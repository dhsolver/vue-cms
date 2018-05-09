<template>
    <div>
        <b-form-group>
            <div class="icon-input social-input d-flex">
                <span class="icon yt-circle">
                    <fa size="xs" :icon="['fas', 'play']"/>
                </span>
                <input type="text" placeholder="Youtube Video URL" :id="id" v-model="url" />
            </div>
            <input-help :form="form" :field="id" text=""></input-help>
        </b-form-group>

        <iframe v-if="source" id="ytplayer" type="text/html" style="width:100%; height: 200px;" :src="source" frameborder="0"></iframe>
        <div v-else class="image-box yt-placeholder">
            <div class="label">
                <div><fa size="4x" color="#e03d3f" :icon="['fab', 'youtube']"/></div>
                <div>Enter YouTube URL Above</div>
            </div>
        </div>
    </div>
</template>

<script>
// test urls:
// https://youtu.be/Bey4XXJAqS8
// https://www.youtube.com/watch?v=Bey4XXJAqS8
// https://www.youtube.com/watch?v=2MpUj-Aua48
// https://www.youtube.com/watch?v=xcJtL7QggTI
// https://www.youtube.com/watch?v=Bfoyi_oLrDU

export default {
    name: 'YoutubeInput',

    props: {
        form: {
            type: Object,
            default: {},
        },
        'value': {
            type: String,
            default: '',
        },
        'id': {
            type: String,
            default: 'video_url',
        }
    },
    
    computed: {
        url: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        },

        source() {
            if (!this.url || !this.url.includes('youtube.com/watch?v=')) {
                return '';
            }
            
            //https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=0&origin=http://example.com
            // return this.form.video_url + '&autoplay=0&origin=https://cms.wejunket.com';
            // return this.form.video_url + '&autoplay=1&origin=http://example';
            let v = this.getUrlQueryParam('v', this.url);
            if (v) {
                return `https://www.youtube.com/embed/${v}?autoplay=0&origin=http://cms.wejunket.com`;
            }

            return '';
        },
    },
    
    methods: {
        getUrlQueryParam(name, url) {
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
    }
}
</script>

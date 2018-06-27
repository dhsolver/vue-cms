import { mapGetters } from 'vuex';

export default {
    data: () => ({
        maxAudioSize: 30, // MB
        maxImageSize: 15, // MB
        minImageSize: 400,
        minIconSize: 48,
        busyUploading: '',
    }),

    computed: {
        ...mapGetters({
            mediaUrl: 'tours/mediaUrl',
        }),
    },

    methods: {
        deleteMedia(field) {
            this.form[field] = null;
            this.form[`${field}_id`] = null;
        },
        
        openFileDialog(id) {
            document.getElementById(id).click();
        },
        
        uploadImage(e) {
            return this.uploadMedia(e, 'image');
        },

        uploadAudio(e) {
            return this.uploadMedia(e, 'audio');
        },

        uploadIcon(e) {
            return this.uploadMedia(e, 'icon');
        },

        uploadMedia(e, type = 'image') {
            // validate file
            let file = e.target.files[0];
            if (! file) {
                console.log('no file');
                return;
            }

            if (type == 'audio') {
                if (file.size > (this.maxAudioSize * 1000000)) {
                    this.clearFile(e.target);
                    alerts.addMessage('error', `Audio files must be less than ${this.maxAudioSize} MB.`);
                    return;
                }
            } else {
                if (file.size > (this.maxImageSize * 1000000)) {
                    this.clearFile(e.target);
                    alerts.addMessage('error', `Images must be less than ${this.maxImageSize} MB.`);
                    return;
                }
            }

            let field = e.target.name;
            this.busyUploading = field;
            this.form.busy = true;

            let f = new Form({
                [type]: file,
            })

            f.submit('post', this.mediaUrl, true)
                .then( ({data}) => {
                    this.form[`${field}_id`] = data.data.id;
                    this.form[field] = data.data;
                    
                    this.form.busy = false;
                    this.busyUploading = '';
                    this.clearFile(e.target);
                })
                .catch(e => {
                    console.log(e);
                    this.form.busy = false;
                    this.busyUploading = '';
                    this.clearFile(e.target);
                });
        },

        clearFile(target) {
            target.value = null;
        },
    }
}
import { mapGetters } from 'vuex';

export default {
    data: () => ({
        maxAudioSize: 100000000,
        maxImageSize: 25000000,
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

        uploadMedia(e, type = 'image') {
            // validate file
            let file = e.target.files[0];
            if (! file) {
                console.log('no file');
                return;
            }

            if (type == 'audio') {
                if (file.size > this.maxAudioSize) {
                    this.clearFile(e.target);
                    alerts.addMessage('error', 'Audio files must be less than 100 MB.');
                    return;
                }
            } else {
                if (file.size > this.maxImageSize) {
                    this.clearFile(e.target);
                    alerts.addMessage('error', 'Images must be less than 25 MB.');
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
            // this.form[target.name] = '';
        },

    }
}
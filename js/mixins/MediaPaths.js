export default {
    methods: {
        imagePath(media) {
            if (!media || !media.path) {
                return '';
            }
            return media.path;
        },

        audioSource(media) {
            if (!media || !media.path) {
                return '';
            }
            return media.path;
        },
    }
}
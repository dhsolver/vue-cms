export default {
    methods: {
        imagePath(media, variant = null) {
            if (!media || !media.path) {
                return '';
            }

            if (variant == 'sm') {
                return media.small_path;
            }

            if (variant == 'ico') {
                return media.icon_path;
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
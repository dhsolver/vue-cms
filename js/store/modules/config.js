let host = process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_API_URL : process.env.MIX_PROD_API_URL;
let supportUrl = process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_SUPPORT_URL : process.env.MIX_PROD_SUPPORT_URL;

export const state = {
    urls: {
        auth: `${host}/auth/`,
        cms: `${host}/cms/`,
        admin: `${host}/admin/`,
        api: `${host}/`,
        support: supportUrl,
    },
    keys: {
        facebook: process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_FACEBOOK_APP_ID : process.env.MIX_PROD_FACEBOOK_APP_ID,
    },
    media: {
        max_audio_size: process.env.MIX_MAX_AUDIO_SIZE, // megabytes
        max_image_size: process.env.MIX_MAX_IMAGE_SIZE, // megabytes
        min_image_size: process.env.MIX_MIN_IMAGE_SIZE, // pixels
        min_icon_size: process.env.MIX_MIN_ICON_SIZE, // pixels
    }
}

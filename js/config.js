
let host = process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_API_URL : process.env.MIX_PROD_API_URL;

let urls = {
    auth: `${host}/auth/`,
    cms: `${host}/cms/`,
    admin: `${host}/admin/`,
};

let keys = {
    FACEBOOK_APP_ID: process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_FACEBOOK_APP_ID : process.env.MIX_PROD_FACEBOOK_APP_ID,
    GOOGLE_API_KEY: process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_GOOGLE_API_KEY : process.env.MIX_PROD_GOOGLE_API_KEY,
};

export {
    urls,
    keys,
};


let host = process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_API_URL : process.env.MIX_PROD_API_URL;
let supportHost = process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_SUPPORT_URL : process.env.MIX_PROD_SUPPORT_URL;

let urls = {
    auth: `${host}/auth/`,
    cms: `${host}/cms/`,
    admin: `${host}/admin/`,
    api: `${host}/`,
};

let keys = {
    FACEBOOK_APP_ID: process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_FACEBOOK_APP_ID : process.env.MIX_PROD_FACEBOOK_APP_ID,
};

export {
    urls,
    keys,
    supportHost,
};

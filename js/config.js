
let host = process.env.NODE_ENV == 'development' ? process.env.MIX_DEV_API_URL : process.env.MIX_PROD_API_URL;

let urls = {
    auth: `${host}/auth/`,
    cms: `${host}/cms/`,
    admin: `${host}/admin/`,
}

export {
    urls,
}

# junket-cms
Junket CMS Frontend SPA using Vue

### 3rd Party Plugins
- [Laravel Mix](https://github.com/JeffreyWay/laravel-mix)
- [Vuex Store](https://vuex.vuejs.org/en/intro.html)
- [Vue-Router](https://router.vuejs.org/en/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Bootstrap-Vue](https://bootstrap-vue.js.org/)
- [Bootswatch Bootstrap Themes](https://bootswatch.com/)
- [Howler for audio](https://github.com/goldfire/howler.js)

### Config

Rename the .env.example file to .env and set the proper URLs for development and production.  You will also need to enter the Facebook API key.

The contents of the /public directory is the local development version and the /dist directory is production.

The Google Maps API key is hard coded into the index.html files, you can set different ones for /public and /dist.

You can also configure the client side media requirements

```
MIX_MAX_AUDIO_SIZE=30
MIX_MAX_IMAGE_SIZE=15
MIX_MIN_IMAGE_SIZE=400
MIX_MIN_ICON_SIZE=48
```

### Development Setup

1. Make sure URLs are set properly in the .env file

2. Run hot loader

```
npm run hot-ssl
```

3. Point a webserver at the contents of the /public directory.

You will likely have issues running https in chrome.  Adding the SSL cert to keychain should resolve this:

```
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain private.crt
```

### How to Deploy

The front end SPA is published to an S3 bucket, which is distributed via CloudFront.  
Reference on S3/CloudFront setup: [S3 Static Sites](https://gist.github.com/bradwestfall/b5b0e450015dbc9b4e56e5f398df48ff)

Note: Updating the files on the S3 bucket alone will not make the changes live.  The files need to be invalidated on the CDN so that they can then be updated.

#### Deployment NPM Script

There is a deployment NPM script to handle this task, but there are assumptions for the local AWS profile and the CloudFront distribution ID.  You may have to edit these values in the package.json file.

**This requires the [aws-cli](https://aws.amazon.com/cli/)

1. Make sure URLs are set properly in the .env file

2. Run deploy script

```
npm run deploy
```

3. Wait for the CDN to reset and refresh the browser

```
https://cms.wejunket.com
```

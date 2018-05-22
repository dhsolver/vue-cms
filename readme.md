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

### Development Setup

1. Make sure to set MIX_DEV_API_URL environment var to your local install of the Junket API

```
MIX_DEV_API_URL=http://junket-api.test
```

2. Run hot loading watcher

```
npm run hot
```

3. Visit the root of the /public directory in browser


### How to Deploy

1. Make sure MIX_PROD_API_URL environment var is set properly

```
MIX_PROD_API_URL=https://api.wejunket.com
```

2. Compile js/css for produciton with Mix

```
npm run prod
```

3. Upload contents of dist directory to server or CDN

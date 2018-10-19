let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
 if (mix.inProduction()) {

    mix.js('js/app.js', 'dist/js')
        .sass('sass/app.scss', 'dist/css')
        .sass('sass/admin.scss', 'dist/css')
        .copyDirectory('assets/images', 'dist/images')
        .copyDirectory('assets/favicons', 'dist/');

 } else {

    mix.js('js/app.js', 'public/js')
        .sass('sass/app.scss', 'public/css')
        .sass('sass/admin.scss', 'public/css')
        .copyDirectory('assets/images', 'public/images')
        .copyDirectory('assets/favicons', 'public/');
 
 }

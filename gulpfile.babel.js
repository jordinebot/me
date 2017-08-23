'use strict';

import autoprefixer from 'gulp-autoprefixer';
import bump         from 'gulp-bump';
import concat       from 'gulp-concat';
import cssnano      from 'gulp-cssnano';
import del          from 'del';
import environments from 'gulp-environments';
import glob         from 'glob';
import gulp         from 'gulp';
import header       from 'gulp-header';
import newer        from 'gulp-newer';
import plumber      from 'gulp-plumber';
import rollup       from 'gulp-rollup';
import sass         from 'gulp-sass';
import uglify       from 'gulp-uglify';
import watch        from 'gulp-watch';

/* Define environments */
let development = environments.development,
    production  = environments.production;

/* Load Package info */
let pkg = require('./package.json');

/* Define project paths and special files */
const base = {
    root : '.',
    src  : 'src',
    dest : 'dist'
};

const routes = {
    scripts: {
        watch : `${base.src}/es6/**/*.js`,
        src   : `${base.src}/es6/**/*.js`,
        dest  : `${base.dest}/js/`,
        entry : `${base.src}/es6/${pkg.main}`,
    },
    styles: {
        watch : `${base.src}/scss/**/*.scss`,
        src   : `${base.src}/scss/styles.scss`,
        dest  : `${base.dest}/css/`
    },
    templates: {
        watch : `${base.src}/templates/**/*`,
        src   : `${base.src}/templates/**/*`,
        dest  : `${base.dest}/`,
    },
    vendor: {
        src   : `${base.root}/vendor/**/*`,
        dest  : `${base.dest}/vendor/`,
    }
};

gulp.task('clean', () => {
    return del(base.dest);
});

gulp.task('templates', () => {
    return gulp.src(routes.templates.src)
        .pipe(newer(routes.templates.dest))
        .pipe(gulp.dest(routes.templates.dest));
});

gulp.task('styles:transpile', () => {
    let banner = '/* <%= pkg.title %> - Author: <%= pkg.author.name %> <<%= pkg.author.email %>> Version: <%= pkg.version %> */\n';
    return gulp.src(routes.styles.src)
        .pipe(plumber())
        .pipe(sass())
        .pipe(production(cssnano({ discardComments: true })))
        .pipe(autoprefixer())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest(routes.styles.dest));
});

gulp.task('scripts:transpile', () => {
    let banner = '/* <%= pkg.title %> - Author: <%= pkg.author.name %> <<%= pkg.author.email %>> Version: <%= pkg.version %> */\n';
    return gulp.src(routes.scripts.src)
        .pipe(rollup({
            format: 'iife',
            plugins: [
                require('rollup-plugin-babel')({
                    presets : [['es2015', { 'modules': false }]],
                    plugins : ['external-helpers'],
                    babelrc : false
                }),
            ],
            entry: routes.scripts.entry
        }))
        .pipe(production(uglify()))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest(routes.scripts.dest));
});

gulp.task('build', ['clean'], () => {
    gulp.start('templates');
    gulp.start('styles:transpile');
    gulp.start('scripts:transpile');
    // gulp.start('vendor');
});

gulp.task('develop', ['build'], () => {
    gulp.watch(routes.templates.watch, ['templates']);
    gulp.watch(routes.styles.watch, ['styles:transpile']);
    gulp.watch(routes.scripts.watch, ['scripts:transpile']);
});

gulp.task('default', ['develop']);

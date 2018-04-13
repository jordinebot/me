import { StylesLoader } from './styles.class.js';
import { Navigation } from './navigation.class.js';

const DOM = {
    head: document.getElementsByTagName('head')[0],
    body: document.getElementsByTagName('body')[0],
    //nav:  document.getElementById('main_navigation'),
};

const styles = [
    //'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700',
    'css/styles.css',
];

const stylesLoader = new StylesLoader(styles, init);

function init() {
    /* Navigation Hover Effect */
    //const nav = new Navigation(DOM.nav);
}


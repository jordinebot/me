import loadStyleSheet from './styles.js';
import { Navigation } from './navigation.class.js';

const DOM = {
    head: document.getElementsByTagName('head')[0],
    body: document.getElementsByTagName('body')[0],
    nav:  document.getElementById('main_navigation'),
};

const styles = [
    'https://fonts.googleapis.com/css?family=Inconsolata',
    'css/styles.css',
];

styles.map(s => loadStyleSheet(s));
DOM.body.classList.remove('loading-styles'); // TODO: Add an event to detect CSS loaded

/* Navigation Hover Effect */
const nav = new Navigation(DOM.nav);


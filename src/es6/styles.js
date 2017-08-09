export default function loadStyleSheet(src) {
    if (document.createStyleSheet) { /* IE fallback */
        document.createStyleSheet(src);
    } else {
        let link   = document.createElement('link');
        link.href  = src;
        link.rel   = 'stylesheet';
        link.type  = 'text/css';
        link.media = 'screen';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
}


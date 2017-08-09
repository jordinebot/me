let loaded = 0;

function styleLoadedEvent(total, callback) {
    if (++loaded === total) {
        callback();
    }
}

export function loadStyleSheet(src, required, callback) {
    if (document.createStyleSheet) { /* IE fallback */
        document.createStyleSheet(src);
    } else {
        let link   = document.createElement('link');
        link.href  = src;
        link.rel   = 'stylesheet';
        link.type  = 'text/css';
        link.media = 'screen';

        // Inspired by https://stackoverflow.com/a/36786630/1534704
        link.addEventListener('load', ((r, c) => styleLoadedEvent(r, c))(required, callback));

        document.getElementsByTagName('head')[0].appendChild(link);
    }
}


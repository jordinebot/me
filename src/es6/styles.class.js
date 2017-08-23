export class StylesLoader {
    constructor(required, callback) {
        this.required = required;
        this.callback = callback;
        this.head = document.getElementsByTagName('head')[0];

        this.loaded = 0;

        this.bindings();
        this.required.map(r => this.load(r));
    }

    done(event) {
        if (++this.loaded === this.required.length) {
            if (typeof this.callback === 'function') {
                this.callback();
            }
        }
    }

    load(src) {
        if (document.createStyleSheet) {
            document.createStyleSheet(src);
        } else {
            let link   = document.createElement('link');
            link.href  = src;
            link.rel   = 'stylesheet';
            link.type  = 'text/css';

            // Inspired by https://stackoverflow.com/a/36786630/1534704
            link.addEventListener('load', this.done);
            this.head.appendChild(link);
        }
    }

    bindings() {
        this.done = this.done.bind(this);
    }
}

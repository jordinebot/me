const TOP    = 'top',
      RIGHT  = 'right',
      BOTTOM = 'bottom',
      LEFT   = 'left';

export class Navigation {
    constructor(node) {
        this.node = node;
        this.outside = node.parentNode;
        this.items = node.querySelectorAll('.menu-item');
        this.hover = node.querySelectorAll('.hover')[0];

        this.bindings();
        this.events();
    }

    update(event) {
        event.stopPropagation();
        let reference = this.node.getBoundingClientRect();
        let boundingBox = event.currentTarget.getBoundingClientRect();

        let width = boundingBox.width;
        let position = boundingBox.left - reference.left;

        this.leaveBy = position >= reference.width / 2 ? reference.width + 30 : -30;

        this.hover.style.width = width + 'px';
        this.hover.style.left = position + 'px';
    }

    clear(event) {
        this.hover.style.width = 0;
        this.hover.style.left = this.leaveBy + 'px';
    }

    bindings() {
        this.update = this.update.bind(this);
        this.clear = this.clear.bind(this);
    }

    events() {
        this.items.forEach(i => i.addEventListener('mouseover', this.update));
        this.outside.addEventListener('mouseleave', this.clear);
    }
}

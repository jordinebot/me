export class Navigation {
    constructor(node) {
        this.node = node;
        this.items = node.querySelectorAll('.menu-item');
        this.hover = node.querySelectorAll('.hover')[0];

        this.reference = node.getBoundingClientRect();

        this.bindings();
        this.events();
    }

    update(event) {
        let boundingBox = event.currentTarget.getBoundingClientRect();
        let width = boundingBox.width;
        let position = boundingBox.left - this.reference.left;

        this.hover.style.width = width + 'px';
        this.hover.style.left = position + 'px';
    }

    bindings() {
        this.update = this.update.bind(this);
    }

    events() {
        this.items.forEach(i => i.addEventListener('mouseover', this.update));
    }
}

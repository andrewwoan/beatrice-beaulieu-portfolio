import EventEmitter from "events";

export default class Component extends EventEmitter {
    constructor({ element, elements }) {
        super();
        this.selector = element;
        this.selectorChildren = { ...elements };

        this.create();
        this.addEventListeners();
    }

    create() {
        if (this.selector instanceof window.HTMLElement) {
            this.element = this.selector;
        } else {
            this.element = document.querySelector(this.selector);
        }
        this.elements = {};

        Object.entries(this.selectorChildren).forEach((entry) => {
            let key = entry[0];
            let data = entry[1];
            if (
                data instanceof window.HTMLElement ||
                data instanceof window.NodeList ||
                Array.isArray(data)
            ) {
                this.elements[key] = data;
            } else {
                this.elements[key] = document.querySelectorAll(data);

                if (this.elements[key].length === 0) {
                    this.elements[key] = null;
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = this.element.querySelector(data);
                }
            }
        });
    }

    addEventListeners() {}

    removeEventListeners() {}
}

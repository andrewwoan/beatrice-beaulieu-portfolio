import GSAP from "gsap";

export default class Page {
    constructor({ id, element, elements }) {
        this.selector = element;
        this.selectorChildren = { ...elements };
        this.id = id;
    }

    create() {
        // 1. Select the DOM element, inside block body which wraps the whole pug like .home
        this.element = document.querySelector(this.selector);
        this.elements = {};

        // For each object in to select, check type and assign key value pair,
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

                // If it's basically just a string select that string and it'll get it as an element
                if (this.elements[key].length === 0) {
                    this.elements[key] = null;
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = this.element.querySelector(data);
                }
            }

            // console.log(this.elements);
        });
        // console.log("created: ", this.id, this.element);
    }

    // 2. Create Show/Hide
    showPage() {
        return new Promise((resolve) => {
            GSAP.from(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            });
        });
    }

    hidePage() {
        return new Promise((resolve) => {
            GSAP.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            });
        });
    }
}

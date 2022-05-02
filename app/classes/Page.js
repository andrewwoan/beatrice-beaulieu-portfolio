export default class Page {
    constructor({ id, element, elements }) {
        this.selector = element;
        this.selectorChildren = { ...elements };
        this.id = id;
    }

    create() {
        // Select the DOM element, inside block body which wraps the whole pug like .home
        this.element = document.querySelector(this.selector);
        this.elements = {};

        // For each object in to select, check type and assign key value pair,
        Object.entries(this.selectorChildren).forEach((entry) => {
            let key = entry[0];
            let data = entry[1];
            if (
                entry instanceof window.HTMLElement ||
                entry instanceof window.NodeList ||
                Array.isArray(entry)
            ) {
                this.elements[key] = data;
            } else {
                this.elements[key] = document.querySelectorAll(data);

                // What does this do exactly?
                if (this.elements[key].length === 0) {
                    this.elements[key] = null;
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = this.element.querySelector(data);
                }
            }

            console.log(this.elements);
        });
        console.log("created: ", this.id, this.element);
    }
}

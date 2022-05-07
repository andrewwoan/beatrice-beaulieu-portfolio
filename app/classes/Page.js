import GSAP from "gsap";
import NormalizeWheel from "normalize-wheel";

import Title from "./animations/Title";
import AsyncLoad from "./AsyncLoad";

export default class Page {
    constructor({ id, element, elements }) {
        this.selector = element;
        this.selectorChildren = {
            ...elements,
            animationTitles: '[data-animation="title"]',
            preload: "[data-src]",
        };
        this.id = id;
    }

    create() {
        // Lerping for smooth scrolling of
        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            limit: 0,
        };

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
        });

        this.createAnimations();
        this.createPreloader();
    }

    createAnimations() {
        this.animation = [];
        if (this.animationTitles) {
            this.animationTitles = Object.entries(
                this.elements.animationTitles
            ).map((entry) => {
                let data = entry[1];

                return new Title({ element: data });
            });
            this.animation.push(...this.animationTitles);
        }
    }

    createPreloader() {
        // this.preloaders = Object.entries(this.elements.preload).map((entry) => {
        //     let data = entry[1];
        //     return new AsyncLoad({ element: data });
        // });
    }

    // 2. Create Show/Hide
    showPage() {
        return new Promise((resolve) => {
            this.animateIn = GSAP.timeline();
            this.animateIn.fromTo(
                this.element,
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                }
            );

            this.animateIn.call(() => {
                this.addEventListeners();
                resolve();
            });
        });
    }

    hidePage() {
        return new Promise((resolve) => {
            this.removeEventListeners();
            this.animateOut = GSAP.timeline();
            this.animateOut.to(this.element, {
                autoAlpha: 0,
                onComplete: resolve,
            });
        });
    }

    onMouseWheel(event) {
        const { pixelY } = NormalizeWheel(event);

        if (pixelY >= 0) {
            this.scroll.target += 30;
        } else {
            this.scroll.target -= 30;
        }
    }

    onResize() {
        if (this.elements.wrapper) {
            this.scroll.limit =
                this.elements.wrapper.clientHeight - window.innerHeight;
        }

        // each(this.animations, animation => {
        //     animation.onResize && animation.onResize()
        //   })
    }

    update() {
        this.scroll.current = GSAP.utils.interpolate(
            this.scroll.current,
            this.scroll.target,
            0.1
        );
        if (this.scroll.current < 0.1) {
            this.scroll.current = 0;
        }

        this.scroll.target = GSAP.utils.clamp(
            0,
            this.scroll.limit,
            this.scroll.target
        );

        this.elements.wrapper.style.transform = `translateY(-${this.scroll.current}px)`;
    }

    addEventListeners() {
        window.addEventListener("wheel", this.onMouseWheel.bind(this));
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.onMouseWheel.bind(this));
    }

    destroy() {}
}

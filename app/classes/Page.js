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
            moveup: '[data-animation="moveup"]',
            draw: '[data-animation="draw"]',
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
        if (this.elements.preload) {
            this.preloaders = Object.entries(this.elements.preload).map(
                (entry) => {
                    let data = entry[1];
                    return new AsyncLoad({ element: data });
                }
            );
        }
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
                this.setSmoothScroll();
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
            this.scroll.target += 80;
        } else {
            this.scroll.target -= 80;
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

    setSmoothScroll() {
        if (this.elements.wrapper) {
            this.scroll.limit =
                this.elements.wrapper.clientHeight - window.innerHeight;
        }
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

        // Move Animations
        if (this.elements.moveup) {
            this.elements.moveup.forEach((element, index) => {
                let speed = 0;
                if (index === 0) {
                    speed = 0.1;
                } else {
                    speed = 0.2 * (index % 3);
                }
                element.style.transform = `translateY(-${
                    this.scroll.current * speed
                }px)`;
            });
        }
    }

    workMove(event) {
        console.log(this.moving.movingImage.src);
    }

    workEnter(event) {
        this.elements.work.addEventListener(
            "mousemove",
            this.workMove.bind(this)
        );

        this.moving = { element: this.elements.work };

        this.moving.movingWrapper = document.createElement("div");
        this.moving.movingWrapper.className += ".home-work-image-wrapper";

        this.moving.movingImage = document.createElement("img");
        this.moving.movingImage.className += ".home-work-image";

        this.moving.movingWrapper.appendChild(this.moving.movingImage);
        this.moving.element.appendChild(this.moving.movingWrapper);
    }

    workLeave(event) {
        console.log(event);

        this.moving.element.removeChild(this.moving.movingWrapper);

        this.elements.work.removeEventListener(
            "mousemove",
            this.workMove.bind(this)
        );
    }

    hoverImage(event) {
        // console.log(event);
        // console.log(
        //     event.srcElement.children[0].children[1].children[0].currentSrc
        // );
        // this.moving.movingImage.src =
        //     event.srcElement.children[0].children[1].children[0].currentSrc;

        GSAP.fromTo(
            this.moving.movingImage,
            {
                opacity: 0,
                attr: {
                    src: this.moving.movingImage.src,
                },
            },
            {
                opacity: 1,
                duration: 1,
                attr: {
                    src: event.srcElement.children[0].children[1].children[0]
                        .currentSrc,
                },
            }
        );
    }

    addEventListeners() {
        window.addEventListener("wheel", this.onMouseWheel.bind(this));

        if (this.elements.work) {
            console.log(this.elements.work);
            this.elements.work.addEventListener(
                "mouseenter",
                this.workEnter.bind(this)
            );
            this.elements.work.addEventListener(
                "mouseleave",
                this.workLeave.bind(this)
            );
        }

        if (this.elements.links) {
            this.elements.links.forEach((element) => {
                element.addEventListener(
                    "mouseenter",
                    this.hoverImage.bind(this)
                );
            });
        }
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.onMouseWheel.bind(this));
    }

    destroy() {}
}

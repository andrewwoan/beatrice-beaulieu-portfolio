import GSAP from "gsap";
import Animation from "../Animation";

export default class Move extends Animation {
    constructor({ element, elements }) {
        super({ element, elements });
    }

    animateIn() {
        GSAP.fromTo(
            this.element,
            { autoAlpha: 0, delay: 0.5 },
            { autoAlpha: 1, duration: 1.5 }
        );
    }

    animateOut() {
        GSAP.set(this.element, { autoAlpha: 0 });
    }

    onResize() {}
}

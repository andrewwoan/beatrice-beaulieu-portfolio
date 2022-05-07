import Component from "./Component";
import GSAP from "gsap";

export default class Animation extends Component {
    constructor({ element, elements }) {
        super({ element, elements });
        this.element = element;
        this.createObserver();

        this.animateOut;
    }

    createObserver() {
        this.observer = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry);
                if (entry.isIntersecting) {
                    this.animateIn();
                } else {
                    this.animateOut();
                }
            });
        });

        this.observer.observe(this.element);
    }

    animateIn() {}

    animateOut() {}
}

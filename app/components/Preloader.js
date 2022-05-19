import Component from "../classes/Component";
import GSAP from "gsap";

export default class Preloader extends Component {
    constructor() {
        // Select all the images from the component class
        super({
            element: ".preloader",
            elements: {
                text: ".preloader-text",
                progress: ".preloader-progress",
                images: document.querySelectorAll("img"),
            },
        });

        // Set a queue
        this.queue = 0;

        // console.log(this.element, this.elements);

        this.createLoader();
    }

    // for each of these images load the image
    createLoader() {
        Object.entries(this.elements.images).forEach((element) => {
            // element[1].onload = () => this.onAssetLoaded(element[1]);
            // element[1].src = element[1].getAttribute("data-src");

            // this.onAssetLoaded();
            element[1].onload = () => this.onAssetLoaded();
            element[1].src = element[1].getAttribute("data-src");
        });
    }

    // when the asset is loaded, add to the progress, when it hit's 100 activated animation onloaded()
    onAssetLoaded() {
        this.queue += 1;

        const progress = Math.round(
            (this.queue / this.elements.images.length) * 100
        );

        this.elements.progress.innerHTML = progress;

        if (progress === 100) {
            this.onLoaded();
        }
    }

    onLoaded() {
        return new Promise((resolve) => {
            this.animateOut = new GSAP.timeline();

            this.animateOut.to(this.element, {
                autoAlpha: 0,
                duration: 2,
            });

            this.animateOut.call(() => {
                this.emit("completed");
            });
        });
    }

    hide() {}

    destroy() {
        this.element.parentNode.removeChild(this.element);
    }
}

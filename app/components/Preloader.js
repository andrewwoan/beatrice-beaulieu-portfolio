import Component from "../classes/Component";

export default class Preloader extends Component {
    constructor() {
        super({
            element: ".preloader",
            elements: {
                text: ".preloader__text",
                progress: ".preloader__progress",
            },
        });

        console.log(this.element, this.elements);

        setTimeout(() => {
            this.emit("completed");
        }, 1000);
    }
}

import Component from "../classes/Component";
import GSAP from "gsap";
import { COLOR_BLACK, COLOR_GRAY } from "../utils/colors";

export default class Navigation extends Component {
    constructor({ template }) {
        super({
            element: ".navigation",
            elements: {
                links: "navigation__list__link",
                items: "navigation__list__item",
            },
        });

        this.onChange(template);
    }

    onChange(template) {
        if (template === "home") {
            GSAP.to(this.element, {
                color: COLOR_GRAY,
                duration: 1.5,
            });

            // add navigation logic here if necessary
            // GSAP.to(this.elements.links[1], {});
        } else {
            GSAP.to(this.element, {
                color: COLOR_BLACK,
                duration: 1.5,
            });
        }
    }
}

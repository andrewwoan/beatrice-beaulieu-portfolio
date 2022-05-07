import Component from "../classes/Component";

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
        console.log(template);
    }
}

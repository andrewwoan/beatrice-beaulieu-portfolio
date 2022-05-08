import Page from "../classes/Page";

export default class Home extends Page {
    constructor() {
        super({
            id: "home",
            element: ".home",
            elements: {
                navigation: document.querySelector(".navigation"),
                wrapper: ".home__wrapper",
                gallery: ".home__gallery",
            },
        });
    }

    create() {
        super.create();
        // creating new button
    }

    destroy() {
        // removeevent listners
    }
}

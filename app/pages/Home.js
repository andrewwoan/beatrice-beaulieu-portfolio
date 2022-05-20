import Page from "../classes/Page";

export default class Home extends Page {
    constructor() {
        super({
            id: "home",
            element: ".home",
            elements: {
                navigation: document.querySelector(".navigation"),
                wrapper: ".home-wrapper",
                links: ".project-link",
                images: ".home-work-image",
                work: ".work-list-wrapper",
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

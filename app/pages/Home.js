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
                gallery: ".home__gallery__wrapper",
            },
        });
    }
}

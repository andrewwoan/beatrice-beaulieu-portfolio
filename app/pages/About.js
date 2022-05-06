import Page from "../classes/Page";

export default class About extends Page {
    constructor() {
        super({ id: "about", wrapper: ".about__wrapper", element: ".about" });
    }
}

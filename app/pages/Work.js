import Page from "../classes/Page";

export default class Work extends Page {
    constructor() {
        super({
            id: "work",
            element: ".work",
            elements: { wrapper: ".work-wrapper" },
        });
    }
}

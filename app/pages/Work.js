import Page from "../classes/Page";

export default class Work extends Page {
    constructor() {
        super({ id: "work", wrapper: ".work__wrapper", element: ".work" });
    }
}

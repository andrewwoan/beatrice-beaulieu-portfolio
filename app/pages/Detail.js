import Page from "../classes/Page";

export default class Detail extends Page {
    constructor() {
        super({
            id: "detail",
            wrapper: ".detail__wrapper",
            element: ".detail",
        });
    }
}

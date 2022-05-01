import About from "./pages/About";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Work from "./pages/Work";

class App {
    constructor() {
        this.createContent();
        this.createPages();
    }

    createContent() {
        // Grab the content div that will be replaced on each page with new data depending on the page
        this.content = document.querySelector(".content");
        // Grab the data-attribute set in the block variables for
        this.template = this.content.getAttribute("data-template");

        console.log(this.template);
    }

    createPages() {
        this.pages = {
            about: new About(),
            detail: new Detail(),
            home: new Home(),
            work: new Work(),
        };

        console.log(this.pages);
    }
}

new App();

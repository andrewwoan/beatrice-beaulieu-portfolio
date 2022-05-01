import About from "./pages/About";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Work from "./pages/Work";

class App {
    constructor() {
        this.createPages();
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

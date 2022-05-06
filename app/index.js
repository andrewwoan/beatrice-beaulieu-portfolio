// Pages
import About from "./pages/About";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Work from "./pages/Work";

// Components
import Preloader from "./components/Preloader";

// Three.js Experience
import Experience from "./experience/Experience";

class App {
    constructor() {
        this.update();
        this.createPreloader();
        this.createExperience();
        this.createContent();
        this.createPages();
        this.addEventListeners();
        this.addLinkListeners();
    }

    // Create the preloader after content/pages
    createPreloader() {
        this.preloader = new Preloader();
        this.preloader.once("completed", this.onPreloaderCompleted.bind(this));
    }

    createExperience() {
        this.experience = new Experience();
    }

    onPreloaderCompleted() {
        console.log("preloader done");
        this.preloader.destroy();
        // Could also put it here instead:
        this.onResize();
        this.page.showPage();
    }

    createContent() {
        // Grab the content div that will be replaced on each page with new data depending on the page
        this.content = document.querySelector(".content");
        // Grab the data-attribute set in the block variables for
        this.template = this.content.getAttribute("data-template");

        // console.log(this.template);
    }

    createPages() {
        this.pages = {
            about: new About(),
            detail: new Detail(),
            home: new Home(),
            work: new Work(),
        };

        //1. Grab the page for the current template we're on
        this.page = this.pages[this.template];

        //2. Create the page's content by calling it's create method
        this.page.create();

        //3. Animate the page in
        // this.page.showPage();
    }

    onResize() {
        if (this.page && this.page.onResize) {
            this.page.onResize();
        }
    }

    addEventListeners() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    // 4. Manage Link Clicks
    addLinkListeners() {
        const links = document.querySelectorAll("a");

        // Easier to override: https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick
        links.forEach((link) => {
            link.onclick = (event) => {
                event.preventDefault();
                const { href } = link;

                this.getNextPage(href);
            };
        });
    }

    // Get the next page with API call
    async getNextPage(url) {
        await this.page.hidePage();

        const request = await fetch(url);

        if (request.status === 200) {
            // Get the ENTIRE html markup of the next page
            const entireHTML = await request.text();
            const temporaryDiv = document.createElement("div");

            temporaryDiv.innerHTML = entireHTML;

            // We only want the content to be selected NOT the html header stuff
            const divContent = temporaryDiv.querySelector(".content");

            // Grab the data-template of the next page and set it to the current page
            this.template = divContent.getAttribute("data-template");
            this.content.setAttribute("data-template", this.template);
            // Update innerhtml
            this.content.innerHTML = divContent.innerHTML;

            this.page = this.pages[this.template];
            this.page.create();
            this.onResize();

            this.page.showPage();
            // Because we used .onclick - it gets overriden and we don't have to remove any
            this.addLinkListeners();
        } else {
            alert("Error Requesting Page");
        }
    }

    update() {
        if (this.page && this.page.update()) {
            this.page.update();
        }
        // window.requestAnimationFrame(this.update.bind(this));
        this.frame = window.requestAnimationFrame(this.update.bind(this));
    }
}

new App();

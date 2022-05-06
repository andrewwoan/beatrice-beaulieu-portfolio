import * as THREE from "three";

let instance = null;

export default class Experience {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;

        this.domElement = document.querySelector(".experience");
    }
    resize() {}

    update() {}

    destroy() {}
}

import * as THREE from "three";

let instance = null;

export default class Experience {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }
    resize() {}

    update() {}

    destroy() {}
}

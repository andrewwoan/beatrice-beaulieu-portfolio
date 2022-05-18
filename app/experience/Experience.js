import * as THREE from "three";
import World from "./World";

let instance = null;

export default class Experience {
    constructor() {
        this.createScene();
        this.createRenderer();
        this.createCamera();
        this.createWorld();
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createRenderer() {
        this.domElement = document.querySelector(".experience");
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.domElement.appendChild(this.renderer.domElement);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }

    createWorld() {
        this.world = new World();
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    onResize() {
        console.log("rezising rendereer");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    update() {
        this.cube.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {}
}

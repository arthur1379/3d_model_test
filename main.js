import * as THREE from 'three';
import {MapControls} from 'three/addons/controls/MapControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'https://threejs.org/examples/jsm/loaders/FBXLoader.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background.
renderer.setClearColor(new THREE.Color('rgb(180, 180, 180)'));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

// Sets orbit control to move the camera around.
const controls = new MapControls(camera, renderer.domElement);
// 這裡找到解答了 https://discourse.threejs.org/t/uncaught-referenceerror-orbitcontrols-is-not-defined/20397

// Camera positioning.
camera.position.set(6, 200, 14);
// Has to be done everytime we update the camera position.
controls.update();


const loader = new GLTFLoader();
loader.load('public/scene_new.glb', function(glb){
    const model = glb.scene;
    scene.add(model);
});

/*
const loader = new FBXLoader();
loader.load('public/Scene_0715_test.fbx', function (object) {
    object.scale.set(0.1, 0.1, 0.1); // 縮放模型
    scene.add(object);
}, undefined, function (error) {
    console.error('An error happened while loading the FBX model:', error);
});
*/

let light = new THREE.DirectionalLight(0xFFFFFF, 5.0);
light.position.set(2, 10, 1);
light.target.position.set(0, 0, 0);

scene.add(light);
scene.add(light.target);

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 添加淡入效果
window.addEventListener('load', () => {
    document.body.style.opacity = '1'; // 觸發淡入動畫
});
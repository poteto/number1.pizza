/// <reference path='./index.d.ts'/>
import {
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';

import MTLLoader from 'three/examples/js/loaders/MTLLoader';
import OBJLoader from 'three/examples/js/loaders/OBJLoader';
import OrbitControls from 'three/examples/js/controls/OrbitControls';
import Detector from 'three/examples/js/Detector';

import pizzaMtl from './models/pizza/pepperoni pizza.mtl';
import pizzaObj from './models/pizza/pepperoni pizza.obj';

import './models/pizza/pizzaTxt.png';
import './style.css';

let controls, camera, scene, renderer;

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

init();
animate();

function init() {
  scene = new Scene();
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // setup scene and camera
  scene.background = new Color().setHSL(0.6, 0, 1);
  camera.position.z = 5;

  // renderer
  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // lighting
  let keyLight = new DirectionalLight(new Color('hsl(30, 100%, 75%)'), 1.0);
  keyLight.position.set(-100, 0, 100);

  let fillLight = new DirectionalLight(new Color('hsl(240, 100%, 75%)'), 0.75);
  fillLight.position.set(100, 0, 100);

  let backLight = new DirectionalLight(0xffffff, 1.0);
  backLight.position.set(100, 0, -100).normalize();

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);

  // orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  // model
  let mtlLoader = new MTLLoader();
  let objLoader = new OBJLoader();
  mtlLoader.setTexturePath('/');
  mtlLoader.setPath('/');
  mtlLoader.load(pizzaMtl, materials => {
    materials.preload();
    objLoader.setMaterials(materials);
    objLoader.setPath('/');
    objLoader.load(pizzaObj, object => {
      scene.add(object);
    });
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

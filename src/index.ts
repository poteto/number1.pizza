/// <reference path='./index.d.ts'/>
import {
  AmbientLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer
} from 'three';
import MTLLoader from 'three/examples/js/loaders/MTLLoader';
import OBJLoader from 'three/examples/js/loaders/OBJLoader';
import pizzaMtl from './models/pizza/pepperoni pizza.mtl';
import pizzaObj from './models/pizza/pepperoni pizza.obj';
import './models/pizza/pizzaTxt.png';

let container, stats;
let camera, scene, renderer;
let mouseX = 0,
  mouseY = 0;
let windowHalfX, windowHalfY;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 250;

  // scene
  scene = new Scene();
  let ambientLight = new AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);

  let pointLight = new PointLight(0xffffff, 0.8);
  camera.add(pointLight);
  scene.add(camera);

  // model
  let mtlLoader = new MTLLoader();
  mtlLoader.setTexturePath('/');
  mtlLoader.setPath('/');
  mtlLoader.load(pizzaMtl, materials => {
    materials.preload();
    let objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/');
    objLoader.load(pizzaObj, object => {
      scene.add(object);
      object.position.y -= 60;
    });
  });

  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 2;
  mouseY = (event.clientY - windowHalfY) / 2;
}

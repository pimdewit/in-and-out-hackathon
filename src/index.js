import { APP_SETTINGS, MATERIALS, SUBJECT_CONFIG, CAMERA_POSITIONS, WORLD_CONFIG, UI_CONFIG, USER_SETTINGS, PASSES } from './constants';

import loop from 'raf-loop';
import resize from 'brindille-resize';

import { WebGLRenderer, Scene, PerspectiveCamera, PointLight, FogExp2, TextureLoader, PlaneGeometry, MeshLambertMaterial, Mesh } from 'three';

import WAGNER from '@superguigui/wagner';

import preloader from './utils/preloader'

// import OrbitControls from './controls/OrbitControls';

import * as Elastic from 'gsap/src/minified/TweenMax.min';

import Debug from './objects/debug';
import Floor from './objects/floor';
import Smoke from './objects/smoke';
import { Drawer } from './ui/drawer';
import { GUI } from './ui/gui';

let STATE = '';

const drawer = new Drawer(UI_CONFIG.DRAWER);
drawer.addToggle(UI_CONFIG.DRAWER_TOGGLE);

const gui = new GUI();
gui.objectToList(USER_SETTINGS).then(list => {
  UI_CONFIG.DRAWER_CONTAINER.appendChild(list);
});

const loadManifest = [
  { type: 'Texture', url: './src/smoke.png', id: 'smokeTexture' },
  { type: 'Texture', id: 'inout'}
];

let inorout = '';

if (Math.random() > 0.5) {
  loadManifest[1].url = './src/in.png';

  inorout = 'in';
} else {
  loadManifest[1].url = './src/out.png';

  inorout = 'out';
}

let positions = {
  smoke: -7,
  camera: CAMERA_POSITIONS.FRONT,
  pen: 0
};


/* -------------------------------------------------------------------------- */
/* Init renderer and canvas */
const container = APP_SETTINGS.PARENT_ELEMENT;
const renderer = new WebGLRenderer({antialias: true});

renderer.setClearColor(WORLD_CONFIG.COLOR);
renderer.setPixelRatio(USER_SETTINGS.SCREEN_DENSITY);

container.appendChild(renderer.domElement);

/* Composer for special effects */
const composer = new WAGNER.Composer(renderer);

/* Main scene and camera */
const scene = new Scene();
const camera = new PerspectiveCamera(50, resize.width / resize.height, 0.1, 700);
setCameraPosition(CAMERA_POSITIONS.FRONT);
// const controls = new OrbitControls(camera, { element: renderer.domElement, parent: renderer.domElement, distance: 10 });

/* -------------------------------------------------------------------------- */
/* Environment */
const fog = new FogExp2(WORLD_CONFIG.COLOR, 0.035);
scene.fog = fog;

const sideLight = new PointLight(0xFFFFFF, 1);
sideLight.position.x = 200;
sideLight.position.y = 10;
sideLight.position.z = 10;
scene.add(sideLight);

const backLight = new PointLight(0xFFFFFF, 1);
backLight.position.x = -10;
backLight.position.y = 10;
backLight.position.z = 100;
scene.add(backLight);

const topLight = new PointLight(0xffffff, 1);
topLight.position.y = 100;
scene.add(topLight);

/* Add a floor to the scene. */
const floor = new Floor(MATERIALS.FLOOR, -2);
scene.add(floor);

/* Actual content of the scene */
const pen = new Debug(3, SUBJECT_CONFIG);
scene.add(pen);

/* Various event listeners */
resize.addListener(onResize);

/* Create and launch main loop */
const engine = loop(render);
engine.start();

UI_CONFIG.START.addEventListener('click', () => {
  STATE = 'shaking';

  setTimeout(() => {
    TweenLite.to(positions, 2, { smoke: -2, ease: Elastic.easeOut });
  }, 500);

  setTimeout(() => {
    UI_CONFIG.BTNCONTAINER.classList.remove('hide');
  }, 2500);
});

UI_CONFIG.STOP.forEach(node => {
  node.addEventListener('click', event => {
    STATE = 'stopped';

    if (event.target.classList.contains(inorout)) {
      UI_CONFIG.WINORLOSE.innerHTML = 'you win. well done.';
    } else {
      UI_CONFIG.WINORLOSE.innerHTML = 'you lose. :(';
    }

    TweenLite.to(positions, 0.3, { smoke: -7, ease: Elastic.easeOut });
    TweenLite.to(positions, 2, { pen: 45, ease: Elastic.easeInOut });

    UI_CONFIG.WINORLOSE.classList.add('fade-in');
    UI_CONFIG.BTNCONTAINER.classList.add('hide');

  });
});

/* -------------------------------------------------------------------------- */

/**
 * Resize canvas
 */
function onResize() {
  const width = resize.width;
  const height = resize.height;
  const density = USER_SETTINGS.SCREEN_DENSITY;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width * density, height * density);
}

function setCameraPosition(position) {
  camera.position.set(
    position.x,
    position.y,
    position.z
  );
}

function render() {
  // controls.update();

  pen.rotation.y += 0.01; // for the lulz

  if (smokeParticles) {
    smokeParticles.rotation.z += 0.01;
  }

  if (STATE === 'shaking') {
    shakeThatThang(pen);
    smokeParticles.position.y = positions.smoke;

    shakeThatThang(camera);
  }

  if (STATE === 'stopped') {
    smokeParticles.position.y = positions.smoke;

    pen.rotation.z = positions.pen;
  }

  if (USER_SETTINGS.POST_PROCESSING) {
    composer.reset();
    composer.render(scene, camera);

    for (let index = 0; index < PASSES.length; index++) {
      const pass = PASSES[index];
      composer.pass(pass);
    }

    composer.toScreen();
  } else {
    renderer.render(scene, camera);
  }
}

function shakeThatThang(element) {
  element.position.setY(getShakeNumber(SUBJECT_CONFIG.SHAKE_AMOUNT));
}

function getShakeNumber(amount) {
  const random = Math.random();

  return random * amount;
}

let smokeParticles = null;

preloader.load(loadManifest, () => {
  smokeParticles = new Smoke(preloader.getTexture('smokeTexture'));
  smokeParticles.position.y = positions.smoke;
  smokeParticles.position.z = 3;
  scene.add(smokeParticles);

  const inoutSize = 0.4;

  const inoutGeo = new PlaneGeometry(inoutSize, inoutSize, inoutSize);
  const inoutMaterial = new MeshLambertMaterial({ color: 0xffffff, map: preloader.getTexture('inout'), transparent: true });
  const inout = new Mesh(inoutGeo, inoutMaterial);
  inout.rotation.x = Math.PI / 2;
  inout.position.y = -2.01;
  pen.add(inout);
});

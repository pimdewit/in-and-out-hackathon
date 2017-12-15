import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import Godray from '@superguigui/wagner/src/passes/godray/godraypass';
import DOFPass from '@superguigui/wagner/src/passes/dof/DOFPass';
import { Vector3 } from 'three';

/**
 * Settings changeable by the user.
 * @param {Boolean} POST_PROCESSING Flag to enable/disable post shaders.
 */
export const USER_SETTINGS = {
  POST_PROCESSING: false,
  // SCREEN_DENSITY: window.devicePixelRatio
};

/**
 * Application settings.
 * @param {HTMLElement} PARENT_ELEMENT Element to append the canvas to.
 */
export const APP_SETTINGS = {
  PARENT_ELEMENT: document.querySelector('#app')
};

export const CAMERA_POSITIONS = {
  FRONT: new Vector3(0, 0, 10),
  BACK: new Vector3(0, 0, -10),
  SIDE: new Vector3(0, -10, 0)
};

/**
 * Materials used in the scene.
 */
export const MATERIALS = {
  SUBJECT: {
    color: 0x212223,
    roughness: 0.5,
    metalness: 1,
    flatShading: true
  },
  FLOOR: {
    color: 0x3498db,
    roughness: 1,
    metalness: 0.2,
    flatShading: true
  },
  BASE: {
    color: 0xe74c3c,
    roughness: 0.2,
    metalness: 0.2,
    flatShading: true
  },
  TIP: {
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true
  },
  CLICKER: {
    color: 0x212223,
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true
  },
  CLICKERTWO: {
    color: 0x212223,
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true
  }
};

export const SUBJECT_CONFIG = {
  BASE: {
    POSITION: new Vector3(0, 0, 0),
    MATERIAL: MATERIALS.BASE
  },
  TIP: {
    POSITION: new Vector3(0, 2.3, 0),
    MATERIAL: MATERIALS.TIP
  },
  CLICKER: {
    POSITION: new Vector3(0, -1.7, 0),
    MATERIAL: MATERIALS.CLICKER
  },
  CLICKERTWO: {
    POSITION: new Vector3(0, -1.9, 0),
    MATERIAL: MATERIALS.CLICKERTWO
  },
  SHAKE_AMOUNT: 0.2,
};

/**
 * Settings for the environment.
 * @param {Number} COLOR
 */
export const WORLD_CONFIG = {
  COLOR: 0x3498db,
};

/**
 * Config for the UI
 */
export const UI_CONFIG = {
  DRAWER: document.querySelector('.drawer-backdrop'),
  DRAWER_CONTAINER: document.querySelector('.drawer-container'),
  DRAWER_TOGGLE: document.querySelector('.drawer-toggle'),
  DRAWER_TOGGLE_ACTIVE: 'drawer-toggle--open',
  START: document.querySelector('.start'),
  START_ACTIVE: 'start--started',
  STOP: document.querySelectorAll('.stop'),
  IN: document.querySelector('.in'),
  OUT: document.querySelector('.out'),
  WINORLOSE: document.querySelector('.winorlose'),
  BTNCONTAINER: document.querySelector('.buttoncontainer')
};

/**
 * passes.
 * @type {Array}
 * @desc The passes will overlay eachother in the same order as the array.
 */
export const PASSES = [
  new FXAAPass(),
  // new BloomPass({ blurAmount: 1, applyZoomBlur: false }),
  // new DOFPass({ focalPass: 0.6, aperture: 0.03 }),
  new Godray({ blurAmount: 0 }),
  // new VignettePass({ reduction: 0.4 }),
  new NoisePass({ speed: 0.2, amount: 0.05 })
];

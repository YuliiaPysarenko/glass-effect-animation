import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

// Loaders
export const textureLoader = new THREE.TextureLoader();
export const cubeTextureLoader = new THREE.CubeTextureLoader();
export const gltfLoader = new GLTFLoader();
export const fontLoader = new FontLoader();

// Materials params
export const glassParams = {
  transparent: true,
  transmission: 1.0,
  opacity: 1.0,
  thickness: 0.6,
  roughness: 0.1,
  metalness: 0.5,
  ior: 1.0,
  dispersion: 9.0,
  clearcoat: 0.9,
};

interface ObjectType {
  [key: string]: {
    model: { positionX: number[]; positionY: number, rotation?: number[] };
    title: { text: string; positionX: number[]; positionY: number };
  };
}

export const objectPositions: ObjectType = {
  Apple: {
    model: {
      positionX: [0.7, 1],
      positionY: 1,
      rotation: [0, 0, 0.4],
    },
    title: {
      text: "How about \nbeautiful \nglass animation?",
      positionX: [-0.3, -1],
      positionY: 1,
    },
  },
  Icosphere: {
    model: { positionX: [-0.7, -1.5], positionY: 2 },
    title: { text: "Pretty good, huh?", positionX: [0.3, 1], positionY: 2 },
  },
  Figure: {
    model: { positionX: [0.7, 1.5], positionY: 3 },
    title: {
      text: "Absolutely love it :)",
      positionX: [-0.3, -1],
      positionY: 3,
    },
  },
  Hero: {
    model: { positionX: [0, 0], positionY: 1 },
    title: { text: "", positionX: [0, 0], positionY: 1 },
  },
};

export const glassMaterial = new THREE.MeshPhysicalMaterial(glassParams);

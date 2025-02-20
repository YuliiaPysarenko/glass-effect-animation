import * as THREE from "three";
import { cubeTextureLoader } from "../vars";

const envMaps = (function () {
  const path = "/ArstaBridge/";
  const format = ".jpg";
  const urls = [
    path + "posx" + format,
    path + "negx" + format,
    path + "posy" + format,
    path + "negy" + format,
    path + "posz" + format,
    path + "negz" + format,
  ];

  const reflectionCube = cubeTextureLoader.load(urls);
  const refractionCube = cubeTextureLoader.load(urls);
  refractionCube.mapping = THREE.CubeRefractionMapping;

  return {
    none: null,
    reflection: reflectionCube,
    refraction: refractionCube,
  };
})();

export function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");
    scene.environment = envMaps.reflection;

    return scene;
}
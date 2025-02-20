import * as THREE from "three";
import { sizes } from "../vars";

export const setCameraGroup = (scene: THREE.Scene) => {
  // Group
  const cameraGroup = new THREE.Group();
  scene.add(cameraGroup);

  // Base camera
  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 6;
  cameraGroup.add(camera);

  return { cameraGroup, camera };
};

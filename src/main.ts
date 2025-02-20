import * as THREE from "three";
import { setTitle, setGlass, setModels } from "./js/components";
import { sizes } from "./js/vars";
import { buildScene, buildRenderer, setCameraGroup } from "./js/core";
import { setLights } from "./js/lights";

const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");
const objectsDistance = 3;
const scene = buildScene();
const { cameraGroup, camera } = setCameraGroup(scene);

// Hero
setTitle(["Animation", "Amazing"], scene, 0.5, { x: 0, y: -0.3, z: 0 });
setGlass(scene);
setModels(scene, camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.pixelRatio);
});

// Renderer
if (!canvas) {
  throw new Error("Canvas element not found");
}

const renderer = buildRenderer(canvas);

// Scroll
let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);
  if (newSection !== currentSection) {
    currentSection = newSection;
  }
});

// Cursor
const cursor = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

setLights(scene);

const clock = new THREE.Clock();
let previousTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

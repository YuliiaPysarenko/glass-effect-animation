import * as THREE from "three";
import * as dat from "lil-gui";

const gui = new dat.GUI();
gui.open( false );

const params = {
  colorLight1: "#fe106f",
  colorLight2: "#1affc6",
  colorLight3: "#1a29ff",
  colorLight4: "#ae33fb",
  colorLight5: "#fbfa63",
  colorLight6: "#ff00ae",
};

export const setLights = (scene: THREE.Scene) => {
  const directionalLight1 = new THREE.DirectionalLight("#ffffff", 1);
  directionalLight1.position.set(-3, -3, 5).normalize();
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight("#ffffff", 1);
  directionalLight2.position.set(3, -3, 5).normalize();
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight("#ff00ae", 2);
  directionalLight3.position.set(2, -10.25, 1);
  scene.add(directionalLight3);

  // const helper1 = new THREE.DirectionalLightHelper(directionalLight1, 0.5);
  // scene.add(helper1);

  // const helper2 = new THREE.DirectionalLightHelper(directionalLight2, 0.5);
  // scene.add(helper2);

  // const helper3 = new THREE.DirectionalLightHelper(directionalLight3, 0.5);
  // scene.add(helper3);

  const pointLight1 = new THREE.PointLight(params.colorLight1, 2.5, 0, 0);
  pointLight1.position.set(1, -2.1, 0.6);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(params.colorLight2, 2.5, 0, 0);
  pointLight2.position.set(-2.15, -3.7, 0.5);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(params.colorLight3, 2.5, 0, 0);
  pointLight3.position.set(0, -3.3, 0.5);
  scene.add(pointLight3);

  const pointLight4 = new THREE.PointLight(params.colorLight4, 3.5, 0, 0);
  pointLight4.position.set(2.5, -7.25, 0.25);
  scene.add(pointLight4);

  const pointLight5 = new THREE.PointLight(params.colorLight5, 4.5, 0, 0);
  pointLight5.position.set(1.9, -6.85, 0.5);
  scene.add(pointLight5);

  // const sphereSize = 1;
  // const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, sphereSize);
  // scene.add(pointLightHelper1);

  // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize);
  // scene.add(pointLightHelper2);

  // const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, sphereSize);
  // scene.add(pointLightHelper3);

  // const pointLightHelper4 = new THREE.PointLightHelper(pointLight4, sphereSize);
  // scene.add(pointLightHelper4);

  // const pointLightHelper5 = new THREE.PointLightHelper(pointLight5, sphereSize);
  // scene.add(pointLightHelper5);

  gui.addColor(params, "colorLight1").onChange(() => {
    pointLight1.color.set(params.colorLight1);
  });
  gui
    .add(pointLight1.position, "x")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight1X");
  gui
    .add(pointLight1.position, "y")
    .min(-8)
    .max(8)
    .step(0.001)
    .name("pLight1Y");
  gui
    .add(pointLight1.position, "z")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight1Z");

  gui.addColor(params, "colorLight2").onChange(() => {
    pointLight2.color.set(params.colorLight2);
  });
  gui
    .add(pointLight2.position, "x")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight2X");
  gui
    .add(pointLight2.position, "y")
    .min(-8)
    .max(8)
    .step(0.001)
    .name("pLight2Y");
  gui
    .add(pointLight2.position, "z")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight2Z");

  gui.addColor(params, "colorLight3").onChange(() => {
    pointLight3.color.set(params.colorLight3);
  });
  gui
    .add(pointLight3.position, "x")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight3X");
  gui
    .add(pointLight3.position, "y")
    .min(-8)
    .max(8)
    .step(0.001)
    .name("pLight3Y");
  gui
    .add(pointLight3.position, "z")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight3Z");

  gui.addColor(params, "colorLight4").onChange(() => {
    pointLight4.color.set(params.colorLight4);
  });
  gui
    .add(pointLight4.position, "x")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight4X");
  gui
    .add(pointLight4.position, "y")
    .min(-8)
    .max(8)
    .step(0.001)
    .name("pLight4Y");
  gui
    .add(pointLight4.position, "z")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight4Z");

  gui.addColor(params, "colorLight5").onChange(() => {
    pointLight5.color.set(params.colorLight5);
  });
  gui
    .add(pointLight5.position, "x")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight5X");
  gui
    .add(pointLight5.position, "y")
    .min(-8)
    .max(8)
    .step(0.001)
    .name("pLight5Y");
  gui
    .add(pointLight5.position, "z")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("pLight5Z");

  gui.addColor(params, "colorLight6").onChange(() => {
    directionalLight3.color.set(params.colorLight6);
  });
  gui
    .add(directionalLight3.position, "x")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("dLight3X");
  gui
    .add(directionalLight3.position, "y")
    .min(-10)
    .max(8)
    .step(0.001)
    .name("dLight3Y");
  gui
    .add(directionalLight3.position, "z")
    .min(-3)
    .max(3)
    .step(0.001)
    .name("dLight3Z");
};

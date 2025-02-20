import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { fontLoader, glassMaterial, sizes } from "../vars.js";
import { resizeModels } from "../helpers/resize.js";

// Cursor
const cursor = { x: 0, y: 0 };

export const setGlass = (scene: THREE.Scene) => {
  let letters: THREE.Mesh;
  const clock = new THREE.Clock();

  fontLoader.load("./archivo_black_regular.json", (font) => {
    const letterGeometry = new TextGeometry("GLASS", {
      font: font,
      size: 0.6,
      depth: 0.1,
      curveSegments: 12,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    letterGeometry.center();
    letters = new THREE.Mesh(letterGeometry, glassMaterial);
    letters.scale.set(1, 1, 1);
    letters.position.z = 0.7;
    letters.position.y = 0.175;

    scene.add(letters);

    const update = () => {
      const deltaTime = clock.getDelta(); // Час між кадрами
      const maxRotation = THREE.MathUtils.degToRad(60); // 60 градусів

      const targetX = cursor.y * 0.3;
      const targetY = cursor.x * 0.3;

      // for a float rotation
      letters.rotation.x += (targetX - letters.rotation.x) * deltaTime * 5;
      letters.rotation.y += (targetY - letters.rotation.y) * deltaTime * 5;

      // limit rotation
      letters.rotation.x = THREE.MathUtils.clamp(
        letters.rotation.x,
        -maxRotation,
        maxRotation
      );
      letters.rotation.y = THREE.MathUtils.clamp(
        letters.rotation.y,
        -maxRotation,
        maxRotation
      );
    };

    function animate() {
      requestAnimationFrame(animate);
      update();
    }

    animate();
    resizeModels([letters]);
  });

  window.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = e.clientY / sizes.height - 0.5;
  });

  window.addEventListener("mouseleave", () => {
    cursor.x = 0;
    cursor.y = 0;
  });

  window.addEventListener("resize", () => {
    resizeModels([letters]);
  });
};

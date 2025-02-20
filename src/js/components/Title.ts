import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { fontLoader } from "../vars.js";
import { resizeModels } from "../helpers/resize.js";

let textMeshes: THREE.Mesh[] = [];

export const setTitle = (
  text: string | string[],
  scene: THREE.Scene,
  size = 0.5,
  position: { x: number; y: number; z: number } = { x: 0, y: 0.2, z: 0 },
  textName = "Hero"
): void => {
  if (!Array.isArray(text)) text = [text];

  fontLoader.load("/bebas_neue_regular.json", (font) => {
    const textMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    const lineHeight = 1;

    text.forEach((line, index) => {
      const textGeometry = new TextGeometry(line, {
        font: font,
        size: size,
        depth: 0.0,
        curveSegments: 12,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      textGeometry.center();

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      const positionY =
        textName !== "Hero" ? position.y : (position.y + index) * lineHeight;

      textMesh.position.set(position.x, positionY, position.z);
      textMesh.scale.set(1, 1, 1);

      scene.add(textMesh);

      textMesh.name = textName;
      textMeshes.push(textMesh);
    });

    window.addEventListener("resize", () => {
      resizeModels(textMeshes);
    });

    resizeModels(textMeshes);

    function animate() {
      requestAnimationFrame(animate);
    }
    animate();
  });
};

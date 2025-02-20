import * as THREE from "three";
import { objectPositions } from "../vars";

export const resizeModels = (models: THREE.Mesh[]) => {
  const scaleFactor = Math.min(window.innerWidth / 768, 1);
  let isMobile = window.innerWidth < 768;

  models.forEach((mesh) => {
    let modelName;
    mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
    if (mesh.geometry.type === "TextGeometry") {
      modelName = mesh.name;
    } else if (mesh.parent && mesh.parent.name) {
      modelName = mesh.parent.name;
    }
    if (!modelName) return;

    const { model, title } = objectPositions[modelName];
    if (mesh.geometry.type === "TextGeometry") {
      mesh.position.x = title.positionX[isMobile ? 0 : 1];
    } else {
      mesh.position.x = model.positionX[isMobile ? 0 : 1];
    }
  });
};
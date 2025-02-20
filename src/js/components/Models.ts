import * as THREE from "three";
import { gltfLoader, glassMaterial, sizes, objectPositions } from "../vars";
import { resizeModels } from "../helpers/resize";
import { setTitle } from "./Title";

export const setModels = async (scene: THREE.Scene, camera: THREE.Camera) => {
  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const rotationSpeeds: { [key: string]: number } = {};

  const maxSpeed = 3.0;
  const minSpeed = 0.2;
  const acceleration = 0.1;
  const deceleration = 0.05;

  let meshes: THREE.Mesh[] = [];

  gltfLoader.load("/glass_animation.glb", (glb) => {
    glb.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = glassMaterial;
        child.material.side = THREE.DoubleSide;
        meshes.push(child);
        rotationSpeeds[child.uuid] = minSpeed;
      }
    });

    renderMeshes(meshes, scene);
    scene.add(glb.scene);

    const update = () => {
      const deltaTime = clock.getDelta();
      raycaster.setFromCamera(mouse, camera);

      meshes.forEach((mesh) => {
        const modelIntersects = raycaster.intersectObject(mesh);

        if (modelIntersects.length) {
          rotationSpeeds[mesh.uuid] = Math.min(
            rotationSpeeds[mesh.uuid] + acceleration * deltaTime * 60,
            maxSpeed
          );
        } else {
          rotationSpeeds[mesh.uuid] = Math.max(
            rotationSpeeds[mesh.uuid] - deceleration * deltaTime * 60,
            minSpeed
          );
        }

        mesh.rotation.y += rotationSpeeds[mesh.uuid] * deltaTime;
      });
    };

    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / sizes.width) * 2 - 1;
      mouse.y = -(event.clientY / sizes.height) * 2 + 1;
    });

    window.addEventListener("resize", () => {
      resizeModels(meshes);
    });
    resizeModels(meshes);

    function animate() {
      requestAnimationFrame(animate);
      update();
    }
    animate();
  });
};

function renderMeshes(meshes: THREE.Object3D[], scene: THREE.Scene) {
  let isMobile = window.innerWidth < 768;
  const objectsDistance = 3;

  meshes.forEach((mesh: THREE.Object3D) => {
    if (!mesh || !mesh.parent) {
      return; // If it's not a mesh or it doesn't have a parent, skip it
    }

    if (mesh.parent.name && objectPositions[mesh.parent.name]) {
      const { model, title } = objectPositions[mesh.parent.name];
      mesh.position.x = model.positionX[isMobile ? 0 : 1];
      mesh.position.y = -objectsDistance * model.positionY;
      
      if (model.rotation?.length === 3) {
        mesh.rotation.set(
          model.rotation[0],
          model.rotation[1],
          model.rotation[2]
        );
      }
      setTitle(
        title.text,
        scene,
        0.25,
        {
          x: isMobile ? title.positionX[0] : title.positionX[1],
          y: -objectsDistance * title.positionY,
          z: 0,
        },
        mesh.parent.name
      );
    }
  });
}

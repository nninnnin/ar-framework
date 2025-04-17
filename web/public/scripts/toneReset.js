window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  if (!scene) {
    throw Error(
      "No <a-scene> element found in the document. Make sure to include it in your HTML file."
    );
  }

  scene.addEventListener("loaded", () => {
    const renderer = scene.renderer;

    const video = document.querySelector("video");
    const videoTexture = new THREE.VideoTexture(video);

    if (
      videoTexture.encoding === THREE.LinearEncoding &&
      renderer.outputEncoding !== THREE.LinearEncoding
    ) {
      renderer.outputEncoding = THREE.LinearEncoding;
    }

    modelToneSetter();
  });
});

function modelToneSetter() {
  const models = document.querySelectorAll(
    "a-gltf-model"
  );

  models.forEach((modelElement) => {
    console.log(modelElement);

    modelElement.addEventListener(
      "model-loaded",
      (event) => {
        const object3D = modelElement.object3D;

        if (object3D) {
          traverseModel(object3D, (child) => {
            if (child.isMesh) {
              child.material.map.encoding =
                THREE.sRGBEncoding;
              child.material.toneMapped = true;
              child.material.map.needsUpdate = true;
            }
          });
        }
      }
    );
  });
}

function traverseModel(model, callback) {
  callback(model);

  const children = model.children;

  if (children.length === 0) return;

  for (let i = 0; i < children.length; i++) {
    traverseModel(children[i], callback);
  }
}

AFRAME.registerComponent("gltf-tone-mapped", {
  init: function () {
    this.el.addEventListener("model-loaded", () => {
      const mesh = this.el.getObject3D("mesh");
      if (!mesh) return;

      mesh.traverse((child) => {
        if (child.isMesh) {
          const material = child.material.clone(); // 기존 머티리얼 복사
          material.onBeforeCompile = (shader) => {
            shader.fragmentShader =
              shader.fragmentShader.replace(
                "#include <output_fragment>",
                `
              vec3 toneMapped = ACESFilmicToneMapping( outgoingLight );
              gl_FragColor = vec4( toneMapped, 1.0 );
              `
              );

            shader.fragmentShader =
              `
              vec3 ACESFilmicToneMapping(vec3 color) {
                float a = 2.51;
                float b = 0.03;
                float c = 2.43;
                float d = 0.59;
                float e = 0.14;
                return clamp((color*(a*color + b)) / (color*(c*color + d) + e), 0.0, 1.0);
              }
            ` + shader.fragmentShader;
          };

          child.material = material;
          child.material.needsUpdate = true;
        }
      });
    });
  },
});

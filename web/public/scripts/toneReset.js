window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  if (!scene) {
    throw Error(
      "No <a-scene> element found in the document. Make sure to include it in your HTML file."
    );
  }

  scene.addEventListener("renderstart", () => {
    const renderer = scene.renderer;
    renderer.outputEncoding = THREE.LinearEncoding;
    renderer.outputColorSpace = THREE.LinearEncoding;
  });
});

function traverseModel(model, callback) {
  callback(model);

  const children = model.children;

  if (children.length === 0) return;

  for (let i = 0; i < children.length; i++) {
    traverseModel(children[i], callback);
  }
}

AFRAME.registerComponent("gltf-tone-mapped", {
  tick: function () {
    if (this.hasSetEncoding) return;

    const scene = document.querySelector("a-scene");

    if (!scene) {
      return;
    }

    const renderer = scene.renderer;

    if (!renderer) return;

    if (
      renderer.outputEncoding ===
        THREE.LinearEncoding &&
      renderer.outputColorSpace ===
        THREE.LinearEncoding
    ) {
      return;
    }

    renderer.outputEncoding = THREE.LinearEncoding;
    renderer.outputColorSpace = THREE.LinearEncoding;
    this.hasSetEncoding = true;
  },
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

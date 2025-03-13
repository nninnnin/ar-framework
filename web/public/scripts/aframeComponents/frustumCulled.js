AFRAME.registerComponent("frustum-culled", {
  schema: {
    cull: { default: true },
  },
  init: function () {
    this.el.addEventListener("model-loaded", () => {
      const model = el.getObject3D("mesh");
      model.traverse((node) => {
        if (node.isMesh) {
          node.frustumCulled = false;
          // node.frustumCulled = this.data.cull;
        }
      });
    });
  },
});

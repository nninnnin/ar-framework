AFRAME.registerComponent("frustum-culled", {
  schema: {
    cull: { default: false },
  },
  init: function () {
    this.el.addEventListener("model-loaded", () => {
      const model = this.el.getObject3D("mesh");

      model.traverse((node) => {
        if (node.isMesh) {
          node.frustumCulled = this.data.cull;
        }
      });
    });
  },
});

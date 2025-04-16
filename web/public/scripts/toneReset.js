window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  if (!scene) {
    throw Error(
      "No <a-scene> element found in the document. Make sure to include it in your HTML file."
    );
  }

  scene.addEventListener("loaded", () => {
    console.log("scene loaded!");

    const renderer = scene.renderer;

    const video = document.querySelector("video");
    const videoTexture = new THREE.VideoTexture(video);

    console.log(
      "Renderer outputEncoding: ",
      renderer.outputEncoding
    );

    console.log(
      "Renderer tone mapping: ",
      renderer.toneMapping
    );

    console.log(
      "Video texture encoding: ",
      videoTexture.encoding
    );

    if (
      videoTexture.encoding === THREE.LinearEncoding &&
      renderer.outputEncoding !== THREE.LinearEncoding
    ) {
      renderer.outputEncoding = THREE.LinearEncoding;
    }
  });
});

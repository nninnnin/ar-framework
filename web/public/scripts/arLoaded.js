const addLocationARLoadedHandler = (handleLoaded) => {
  window.addEventListener(
    // Fired when the origin coordinates are set
    "gps-camera-origin-coord-set",
    () => {
      console.log("origin coordinates set");

      const video = document.querySelector("video");
      const alreadyCanPlay = video.readyState >= 3;

      if (alreadyCanPlay) {
        handleLoaded();
      } else {
        video.addEventListener("canplay", () => {
          handleLoaded();
        });
      }
    }
  );
};

const throwSceneNotFound = () => {
  throw Error(
    "No <a-scene> element found in the document. Make sure to include it in your HTML file."
  );
};

const addFaceARLoadedHandler = (handleLoaded) => {
  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector("a-scene");

    if (!scene) {
      throwSceneNotFound();
    }

    scene.addEventListener("arReady", handleLoaded);
  });
};

const addMarkerARLoadedHandler = (handleLoaded) => {
  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector("a-scene");

    if (!scene) {
      throwSceneNotFound();
    }

    scene.addEventListener("arReady", handleLoaded);
  });
};

const addARLoadedHandler = (arType, handler) => {
  if (arType === "location") {
    addLocationARLoadedHandler(handler);
  } else if (arType === "face") {
    addFaceARLoadedHandler(handler);
  } else if (arType === "marker") {
    addMarkerARLoadedHandler(handler);
  }
};
